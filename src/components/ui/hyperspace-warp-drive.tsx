import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HyperspaceWarpDriveProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  showHeroContent?: boolean;
}

export const Component: React.FC<HyperspaceWarpDriveProps> = ({
  children,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  showHeroContent = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Scene & Camera Setup ---
    // Using OrthographicCamera ensures the PlaneGeometry(2, 2) covers 100% of the screen seamlessly
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      if (planeMaterial && planeMaterial.uniforms.u_resolution) {
        planeMaterial.uniforms.u_resolution.value.set(width, height);
      }
    };

    // Clean previous children if re-mounting
    while (currentMount.firstChild) {
      currentMount.removeChild(currentMount.firstChild);
    }
    currentMount.appendChild(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';

    // --- GLSL Shader Code ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // Pseudo-random number generator
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
          // Normalize coordinates centered on screen aspect ratio
          vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
          vec3 color = vec3(0.01, 0.0, 0.05); // Deep space background
          
          // Mouse influence
          st += u_mouse * 0.08;

          float len = length(st);
          
          // Convert to polar coordinates
          vec2 polar = vec2(atan(st.y, st.x), len);
          
          // Number of stars/streaks
          float num_stars = 220.0;
          polar.x *= num_stars;

          // Create star seeds
          float star_seed = floor(polar.x) + 0.5;
          float random_star = random(vec2(star_seed));
          
          // Animate stars moving outwards (warp drive speed)
          float time_offset = u_time * (0.6 + random_star * 0.6);
          float star_pos = fract(random_star + time_offset) * 2.2;
          
          // Create streaks
          float streak_width = 0.005 + random_star * 0.005;
          float star_streak = smoothstep(-streak_width, streak_width, polar.y - star_pos) - 
                            smoothstep(streak_width, streak_width + 0.25, polar.y - star_pos);

          // Fade stars at center and far edges
          star_streak *= smoothstep(0.0, 0.35, polar.y) * smoothstep(1.5, 0.75, polar.y);

          // Brightness and color based on position and randomness
          float brightness = 0.5 + random_star * 0.5;
          vec3 star_color = vec3(0.7, 0.85, 1.0) * brightness; // Cool cyan/white streaks

          // Occasional violet/pink glowing streaks
          if (random(vec2(star_seed, 2.0)) > 0.95) {
              star_color = vec3(0.9, 0.4, 1.0) * (brightness * 1.2);
          }

          color += star_streak * star_color;
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // --- Shader Material ---
    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_mouse: { value: new THREE.Vector2() },
    };

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthWrite: false,
      depthTest: false,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    updateSize();

    // --- Mouse Interaction ---
    const handleMouseMove = (event: MouseEvent) => {
      uniforms.u_mouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
      uniforms.u_mouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, false);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    // --- Responsive Handling ---
    const handleResize = () => {
      updateSize();
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      planeGeometry.dispose();
      planeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-y-auto md:overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 100% Fullscreen Fixed Canvas */}
      <div
        ref={mountRef}
        className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden"
      />

      {/* Radial Gradient Overlay */}
      <div className="fixed inset-0 z-[1] bg-radial from-transparent via-slate-950/60 to-slate-950/90 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full min-h-screen md:min-h-0 flex flex-col justify-between overflow-y-auto md:overflow-hidden">
        {showHeroContent && (
          <div className="flex flex-col items-center justify-center text-center p-8 mt-12 max-w-4xl">
            <h1
              className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4"
              style={{ textShadow: '0 0 30px rgba(173, 216, 230, 0.5)' }}
            >
              {title || 'Engage Warp Drive'}
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed"
              style={{ textShadow: '0 0 15px rgba(0,0,0,0.8)' }}
            >
              {subtitle ||
                'Witness the power of procedural generation with GLSL shaders, creating an infinite, high-performance visual experience.'}
            </p>
            {ctaText && (
              <button
                onClick={onCtaClick}
                className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-lg hover:from-cyan-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-cyan-500/25 active:scale-95"
              >
                {ctaText}
              </button>
            )}
          </div>
        )}

        {/* Children components */}
        {children}
      </div>
    </div>
  );
};
