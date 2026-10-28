import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAdminSession, getAdminUsersList, superAdminCreateUser } from '../../../../lib/betterAuth.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const sessionData = await validateAdminSession(sessionCookie.value);
    if (!sessionData?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const users = await getAdminUsersList();

    return NextResponse.json({
      success: true,
      users,
      currentUserRole: sessionData.user.role
    });
  } catch (error) {
    console.error('Fetch admin users error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve administrator list' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Session required' },
        { status: 401 }
      );
    }

    const sessionData = await validateAdminSession(sessionCookie.value);
    if (!sessionData?.user || sessionData.user.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Only a Super Administrator can generate new admin users.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, email, username, password, role = 'admin' } = body;

    const newUser = await superAdminCreateUser({
      name,
      email,
      username,
      password,
      role: role === 'superadmin' ? 'superadmin' : 'admin',
      actorUserId: sessionData.user.id
    });

    return NextResponse.json({
      success: true,
      message: `Administrator @${newUser.username} (${newUser.name}) successfully generated and saved to database.`,
      user: newUser
    }, { status: 201 });

  } catch (error) {
    console.error('Create admin user error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create administrator' },
      { status: 400 }
    );
  }
}
