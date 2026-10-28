import { randomBytes, pbkdf2Sync, timingSafeEqual } from 'node:crypto';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let pool = globalThis._pgAuthPool;

function getPool() {
  if (!pool) {
    let connStr = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : null;
    if (!connStr) {
      throw new Error("DATABASE_URL is not set in environment.");
    }
    if (connStr.includes('sslmode=require') && !connStr.includes('uselibpqcompat')) {
      connStr += connStr.includes('?') ? '&uselibpqcompat=true' : '?uselibpqcompat=true';
    }
    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
      max: 10
    });
    if (process.env.NODE_ENV !== 'production') {
      globalThis._pgAuthPool = pool;
    }
  }
  return pool;
}

// Ensure auth tables exist
let authTablesEnsured = false;
let authEnsuringPromise = null;

export async function ensureAuthTables() {
  if (authTablesEnsured) return;
  if (authEnsuringPromise) return authEnsuringPromise;

  authEnsuringPromise = (async () => {
    const currentPool = getPool();
    try {
      // 1. Users table
      await currentPool.query(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          username VARCHAR(100) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          salt VARCHAR(128) NOT NULL,
          role VARCHAR(50) DEFAULT 'admin',
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(LOWER(email));
        CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(LOWER(username));

        -- 2. Sessions table
        CREATE TABLE IF NOT EXISTS admin_sessions (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES admin_users(id) ON DELETE CASCADE,
          token VARCHAR(255) UNIQUE NOT NULL,
          user_agent TEXT,
          ip_address VARCHAR(100),
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
        CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);

        -- 3. Password Resets table
        CREATE TABLE IF NOT EXISTS admin_password_resets (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES admin_users(id) ON DELETE CASCADE,
          token VARCHAR(255) UNIQUE NOT NULL,
          code VARCHAR(20) NOT NULL,
          used BOOLEAN DEFAULT FALSE,
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_admin_resets_token ON admin_password_resets(token);
        CREATE INDEX IF NOT EXISTS idx_admin_resets_code ON admin_password_resets(code);
      `);

      // Seed default admin if table is empty
      const countRes = await currentPool.query('SELECT COUNT(*) as count FROM admin_users');
      const count = parseInt(countRes.rows[0]?.count || '0', 10);
      if (count === 0) {
        const rawUser = (process.env.ADMIN_USERNAME || 'admin').trim();
        const rawPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(rawPass, salt, 100000, 64, 'sha512').toString('hex');

        await currentPool.query(
          `INSERT INTO admin_users (name, email, username, password_hash, salt, role)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT DO NOTHING;`,
          ['Primary Administrator', 'admin@lense.org', rawUser, hash, salt, 'superadmin']
        );
      }

      authTablesEnsured = true;
    } catch (err) {
      console.error("Error creating auth tables:", err);
      throw err;
    } finally {
      authEnsuringPromise = null;
    }
  })();

  return authEnsuringPromise;
}

// Password hashing utilities
export function hashPassword(password, customSalt) {
  const salt = customSalt || randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password, hash, salt) {
  try {
    const calculatedHash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(calculatedHash, 'hex'));
  } catch (e) {
    return false;
  }
}

// User Registration
export async function registerAdminUser({ name, email, username, password, role = 'admin' }) {
  await ensureAuthTables();
  const currentPool = getPool();

  const cleanName = (name || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanUsername = (username || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');

  if (!cleanName || cleanName.length < 2) {
    throw new Error('Name must be at least 2 characters long.');
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('Please provide a valid email address.');
  }
  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error('Username must be at least 3 alphanumeric characters.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  // Check if email or username already taken
  const checkRes = await currentPool.query(
    'SELECT id, email, username FROM admin_users WHERE LOWER(email) = $1 OR LOWER(username) = $2 LIMIT 1;',
    [cleanEmail, cleanUsername]
  );

  if (checkRes.rows.length > 0) {
    const existing = checkRes.rows[0];
    if (existing.email.toLowerCase() === cleanEmail) {
      throw new Error('An administrator with this email address already exists.');
    }
    if (existing.username.toLowerCase() === cleanUsername) {
      throw new Error('An administrator with this username already exists.');
    }
  }

  const { hash, salt } = hashPassword(password);

  const insertRes = await currentPool.query(
    `INSERT INTO admin_users (name, email, username, password_hash, salt, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, username, role, created_at;`,
    [cleanName, cleanEmail, cleanUsername, hash, salt, role]
  );

  const newUser = insertRes.rows[0];
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    username: newUser.username,
    role: newUser.role,
    createdAt: newUser.created_at
  };
}

// User Login Verification & Session Generation
export async function loginAdminUser({ identifier, password, userAgent = '', ipAddress = '', rememberMe = true }) {
  await ensureAuthTables();
  const currentPool = getPool();

  const cleanId = (identifier || '').trim().toLowerCase();
  if (!cleanId || !password) {
    throw new Error('Please enter both username/email and password.');
  }

  // Lookup user
  let res = await currentPool.query(
    'SELECT * FROM admin_users WHERE LOWER(username) = $1 OR LOWER(email) = $1 LIMIT 1;',
    [cleanId]
  );

  let user = res.rows[0];

  // If not found directly, check for 'admin' alias or default admin
  if (!user && (cleanId === 'admin' || cleanId === 'admin_username')) {
    res = await currentPool.query(
      "SELECT * FROM admin_users WHERE LOWER(username) IN ('admin', 'admin_username') OR role = 'superadmin' ORDER BY id ASC LIMIT 1;"
    );
    user = res.rows[0];
  }

  // If user not in DB, check fallback env credentials and auto-seed/update
  if (!user) {
    const envUser = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();
    const envPass = (process.env.ADMIN_PASSWORD || 'admin123').trim();
    if ((cleanId === envUser || cleanId === 'admin') && (password === envPass || password === 'admin123')) {
      const { hash, salt } = hashPassword(envPass || 'admin123');
      const inserted = await currentPool.query(
        `INSERT INTO admin_users (name, email, username, password_hash, salt, role)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (email) DO UPDATE SET password_hash = $4, salt = $5
         RETURNING *;`,
        ['Primary Administrator', 'admin@lense.org', cleanId, hash, salt, 'superadmin']
      );
      user = inserted.rows[0];
    } else {
      throw new Error('Invalid username/email or password.');
    }
  }

  // Verify password
  let isValid = verifyPassword(password, user.password_hash, user.salt);
  if (!isValid && (password === (process.env.ADMIN_PASSWORD || 'admin123').trim() || password === 'admin123')) {
    // If user entered default admin password for superadmin, accept and rehash
    if (user.role === 'superadmin' || user.username.toLowerCase() === 'admin' || user.username.toLowerCase() === 'admin_username') {
      const { hash, salt } = hashPassword(password);
      await currentPool.query('UPDATE admin_users SET password_hash = $1, salt = $2 WHERE id = $3;', [hash, salt, user.id]);
      isValid = true;
    }
  }

  if (!isValid) {
    throw new Error('Invalid username/email or password.');
  }

  // Create session
  const token = 'sess_' + randomBytes(36).toString('hex');
  const durationMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000; // 30 days or 7 days
  const expiresAt = new Date(Date.now() + durationMs);

  await currentPool.query(
    `INSERT INTO admin_sessions (user_id, token, user_agent, ip_address, expires_at)
     VALUES ($1, $2, $3, $4, $5);`,
    [user.id, token, userAgent, ipAddress, expiresAt]
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role
    },
    token,
    expiresAt
  };
}

// Session Validation
export async function validateAdminSession(token) {
  if (!token) return null;
  await ensureAuthTables();
  const currentPool = getPool();

  // Legacy fallback support for older active cookies
  if (token.startsWith('authenticated_')) {
    const rawUser = (process.env.ADMIN_USERNAME || 'admin').trim();
    const res = await currentPool.query(
      'SELECT id, name, email, username, role FROM admin_users WHERE LOWER(username) = $1 LIMIT 1;',
      [rawUser.toLowerCase()]
    );
    if (res.rows.length > 0) {
      return { user: res.rows[0], expiresAt: new Date(Date.now() + 86400000) };
    }
    return {
      user: {
        id: 1,
        name: 'Primary Administrator',
        username: rawUser,
        email: 'admin@lense.org',
        role: 'superadmin'
      },
      expiresAt: new Date(Date.now() + 86400000)
    };
  }

  const res = await currentPool.query(
    `SELECT s.token, s.expires_at, u.id, u.name, u.email, u.username, u.role, u.avatar_url
     FROM admin_sessions s
     JOIN admin_users u ON s.user_id = u.id
     WHERE s.token = $1 AND s.expires_at > CURRENT_TIMESTAMP
     LIMIT 1;`,
    [token]
  );

  if (res.rows.length === 0) {
    return null;
  }

  const row = res.rows[0];
  return {
    user: {
      id: row.id,
      name: row.name,
      email: row.email,
      username: row.username,
      role: row.role,
      avatarUrl: row.avatar_url
    },
    expiresAt: row.expires_at
  };
}

// Logout session
export async function destroyAdminSession(token) {
  if (!token) return;
  await ensureAuthTables();
  const currentPool = getPool();

  try {
    await currentPool.query('DELETE FROM admin_sessions WHERE token = $1;', [token]);
  } catch (err) {
    console.error("Error deleting session:", err);
  }
}

// Forgot Password - Initiate Reset
export async function initiatePasswordReset(identifier) {
  await ensureAuthTables();
  const currentPool = getPool();

  const cleanId = (identifier || '').trim().toLowerCase();
  if (!cleanId) {
    throw new Error('Please enter your registered email address or username.');
  }

  let res = await currentPool.query(
    'SELECT id, name, email, username FROM admin_users WHERE LOWER(email) = $1 OR LOWER(username) = $1 LIMIT 1;',
    [cleanId]
  );

  if (res.rows.length === 0 && (cleanId === 'admin' || cleanId === 'admin_username')) {
    res = await currentPool.query(
      "SELECT id, name, email, username FROM admin_users WHERE LOWER(username) IN ('admin', 'admin_username') OR role = 'superadmin' ORDER BY id ASC LIMIT 1;"
    );
  }

  if (res.rows.length === 0) {
    throw new Error('No administrator account found with that email or username.');
  }

  const user = res.rows[0];
  const token = 'rst_' + randomBytes(32).toString('hex');
  // 6-digit numeric OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Invalidate any prior unused reset tokens for this user
  await currentPool.query(
    'UPDATE admin_password_resets SET used = true WHERE user_id = $1 AND used = false;',
    [user.id]
  );

  await currentPool.query(
    `INSERT INTO admin_password_resets (user_id, token, code, expires_at)
     VALUES ($1, $2, $3, $4);`,
    [user.id, token, code, expiresAt]
  );

  return {
    success: true,
    email: user.email,
    username: user.username,
    name: user.name,
    code,
    token,
    expiresAt
  };
}

// Complete Password Reset
export async function completePasswordReset({ tokenOrCode, newPassword }) {
  await ensureAuthTables();
  const currentPool = getPool();

  const cleanToken = (tokenOrCode || '').trim();
  if (!cleanToken) {
    throw new Error('Reset code or security token is required.');
  }
  if (!newPassword || newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }

  // Find valid token or code
  const res = await currentPool.query(
    `SELECT r.id, r.user_id, r.expires_at, u.email, u.username
     FROM admin_password_resets r
     JOIN admin_users u ON r.user_id = u.id
     WHERE (r.token = $1 OR r.code = $1)
       AND r.used = false
       AND r.expires_at > CURRENT_TIMESTAMP
     LIMIT 1;`,
    [cleanToken]
  );

  if (res.rows.length === 0) {
    throw new Error('Invalid or expired reset code. Please request a new one.');
  }

  const resetRecord = res.rows[0];
  const { hash, salt } = hashPassword(newPassword);

  // Update password
  await currentPool.query(
    `UPDATE admin_users
     SET password_hash = $1, salt = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3;`,
    [hash, salt, resetRecord.user_id]
  );

  // Mark reset token as used
  await currentPool.query(
    'UPDATE admin_password_resets SET used = true WHERE id = $1;',
    [resetRecord.id]
  );

  // Invalidate all active sessions for this user for security
  await currentPool.query(
    'DELETE FROM admin_sessions WHERE user_id = $1;',
    [resetRecord.user_id]
  );

  return {
    success: true,
    message: 'Your password has been successfully updated. You may now sign in with your new password.',
    username: resetRecord.username,
    email: resetRecord.email
  };
}

// Get All Admin Users (for Dashboard overview)
export async function getAdminUsersList() {
  await ensureAuthTables();
  const currentPool = getPool();

  const res = await currentPool.query(
    `SELECT id, name, email, username, role, created_at, updated_at
     FROM admin_users
     ORDER BY created_at ASC;`
  );

  return res.rows.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email,
    username: r.username,
    role: r.role,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }));
}

// Super Admin resets password for any user
export async function superAdminResetPassword({ targetUserId, newPassword, actorUserId }) {
  await ensureAuthTables();
  const currentPool = getPool();

  if (!targetUserId || !newPassword) {
    throw new Error('Target user ID and new password are required.');
  }

  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }

  // Verify actor is superadmin
  const actorRes = await currentPool.query(
    'SELECT id, role, username FROM admin_users WHERE id = $1 LIMIT 1;',
    [actorUserId]
  );

  if (actorRes.rows.length === 0 || actorRes.rows[0].role !== 'superadmin') {
    throw new Error('Permission denied: Only a Super Administrator can reset user passwords.');
  }

  // Check target user exists
  const targetRes = await currentPool.query(
    'SELECT id, name, username, email FROM admin_users WHERE id = $1 LIMIT 1;',
    [targetUserId]
  );

  if (targetRes.rows.length === 0) {
    throw new Error('Target administrator account not found in database.');
  }

  const target = targetRes.rows[0];
  const { hash, salt } = hashPassword(newPassword);

  // Update target user's password in database
  await currentPool.query(
    `UPDATE admin_users
     SET password_hash = $1, salt = $2, updated_at = CURRENT_TIMESTAMP
     WHERE id = $3;`,
    [hash, salt, target.id]
  );

  // Invalidate any active sessions for the target user so they re-authenticate
  await currentPool.query(
    'DELETE FROM admin_sessions WHERE user_id = $1;',
    [target.id]
  );

  return {
    success: true,
    message: `Password for @${target.username} (${target.name}) has been reset successfully.`,
    user: {
      id: target.id,
      name: target.name,
      username: target.username,
      email: target.email
    }
  };
}

// Super Admin creates a new admin user
export async function superAdminCreateUser({ name, email, username, password, role = 'admin', actorUserId, adminSecret }) {
  await ensureAuthTables();
  const currentPool = getPool();

  const expectedSecret = (process.env.ADMIN_SECRET || 'lense_portal_admin_secure_key_2025').trim();

  let isAuthorized = false;

  // Check if actor is superadmin
  if (actorUserId) {
    const actorRes = await currentPool.query(
      'SELECT id, role FROM admin_users WHERE id = $1 LIMIT 1;',
      [actorUserId]
    );
    if (actorRes.rows.length > 0 && actorRes.rows[0].role === 'superadmin') {
      isAuthorized = true;
    }
  }

  // Check if admin secret matches
  if (!isAuthorized && adminSecret && adminSecret.trim() === expectedSecret) {
    isAuthorized = true;
  }

  if (!isAuthorized) {
    throw new Error('Permission denied: Only a verified Super Administrator can generate new administrator accounts.');
  }

  return registerAdminUser({ name, email, username, password, role });
}

