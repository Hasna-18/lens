'use client';

import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export const LiquidChrome = ({
  baseColor = [0.1, 0.42, 0.86],
  speed = 0.3,
  amplitude = 0.4,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  className = '',
  style = {},
  ...props
}) => {
  const containerRef = useRef(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    let renderer;
    try {
      // Clamp DPR to max 1.25 for buttery smooth 60-120 FPS without GPU fill-rate throttling
      const clampedDpr = Math.min(typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1, 1.25);
      renderer = new Renderer({
        antialias: false,
        alpha: true,
        dpr: clampedDpr,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported for LiquidChrome:', e);
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          #pragma unroll
          for (float i = 1.0; i < 7.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 18.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / max(abs(sin(uTime - uv.y - uv.x)), 0.08);
          return vec4(color, 1.0);
      }

      void main() {
          gl_FragColor = renderImage(vUv);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width || 1, gl.canvas.height || 1, (gl.canvas.width || 1) / (gl.canvas.height || 1)])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const width = container.clientWidth || container.offsetWidth || 1;
      const height = container.clientHeight || container.offsetHeight || 1;
      renderer.setSize(width, height);
      const resUniform = program.uniforms.uResolution.value;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / (gl.canvas.height || 1);
    }

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Mouse movement with smooth interpolation
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;

    function handleMouseMove(event) {
      const rect = container.getBoundingClientRect();
      targetMouseX = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      targetMouseY = Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height));
    }

    function handleTouchMove(event) {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        targetMouseX = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        targetMouseY = Math.max(0, Math.min(1, 1 - (touch.clientY - rect.top) / rect.height));
      }
    }

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    let animationId = null;
    let isVisible = true;

    // Viewport Visibility: pause RAF when scrolled out of view to save 100% GPU
    let visibilityObserver = null;
    if (typeof IntersectionObserver !== 'undefined') {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !animationId) {
            animationId = requestAnimationFrame(update);
          }
        },
        { threshold: 0.02 }
      );
      visibilityObserver.observe(container);
    }

    function update(t) {
      if (!isVisible) {
        animationId = null;
        return;
      }
      animationId = requestAnimationFrame(update);

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;
      const mouseUniform = program.uniforms.uMouse.value;
      mouseUniform[0] = currentMouseX;
      mouseUniform[1] = currentMouseY;

      program.uniforms.uTime.value = t * 0.001 * speedRef.current;
      renderer.render({ scene: mesh });
    }

    animationId = requestAnimationFrame(update);

    gl.canvas.style.display = 'block';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.pointerEvents = 'none';

    container.appendChild(gl.canvas);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (visibilityObserver) visibilityObserver.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`liquidChrome-container relative overflow-hidden will-change-transform ${className}`}
      style={{ width: '100%', height: '100%', ...style }}
      {...props}
    />
  );
};

export default LiquidChrome;
