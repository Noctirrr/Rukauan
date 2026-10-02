import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Romantic3DWorldProps {
  intensity?: 'subtle' | 'normal' | 'dreamy';
}

export const Romantic3DWorld: React.FC<Romantic3DWorldProps> = ({ intensity = 'normal' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile for performance optimization
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfcf5f6, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    // WebGL Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported or context initialization failed:", e);
      return;
    }

    // Warm Romantic Lighting
    const ambientLight = new THREE.AmbientLight(0xfff0f4, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffe3eb, 1.8);
    keyLight.position.set(5, 10, 7);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffb7c5, 2.0, 30);
    rimLight.position.set(-6, -4, 5);
    scene.add(rimLight);

    // Create 3D Heart Geometry using ExtrudeGeometry and Heart Shape
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.20, y, x, y);
    heartShape.bezierCurveTo(x - 0.30, y, x - 0.30, y + 0.35, x - 0.30, y + 0.35);
    heartShape.bezierCurveTo(x - 0.30, y + 0.55, x - 0.10, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.60, y + 0.77, x + 0.80, y + 0.55, x + 0.80, y + 0.35);
    heartShape.bezierCurveTo(x + 0.80, y + 0.35, x + 0.80, y, x + 0.50, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    // Translucent Pink Heart Material
    const heartMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf59eb0,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.65, // translucent glass-like
      thickness: 0.5,
      transparent: true,
      opacity: 0.75,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    // Floating Hearts Group
    const heartsGroup = new THREE.Group();
    const heartCount = isMobile ? 8 : (intensity === 'dreamy' ? 18 : 12);
    const heartObjects: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatOffset: number;
    }[] = [];

    for (let i = 0; i < heartCount; i++) {
      const mesh = new THREE.Mesh(heartGeometry, heartMaterial);
      const scale = 0.5 + Math.random() * 0.9;
      mesh.scale.set(scale, scale, scale);

      const baseX = (Math.random() - 0.5) * 22;
      const baseY = (Math.random() - 0.5) * 16;
      const baseZ = -4 + Math.random() * 10;

      mesh.position.set(baseX, baseY, baseZ);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      heartsGroup.add(mesh);
      heartObjects.push({
        mesh,
        baseX,
        baseY,
        baseZ,
        speedY: 0.003 + Math.random() * 0.004,
        rotSpeedX: 0.005 + Math.random() * 0.008,
        rotSpeedY: 0.007 + Math.random() * 0.01,
        rotSpeedZ: 0.003 + Math.random() * 0.006,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }
    scene.add(heartsGroup);

    // Drifting Sparkles & Stars Particle System
    const particleCount = isMobile ? 60 : 150;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      particleSpeeds[i] = 0.005 + Math.random() * 0.012;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Canvas-generated soft golden/pink sparkle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 235, 240, 1)');
      grad.addColorStop(0.3, 'rgba(250, 190, 205, 0.8)');
      grad.addColorStop(0.7, 'rgba(245, 160, 180, 0.25)');
      grad.addColorStop(1, 'rgba(245, 160, 180, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * -1.5;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (prefersReducedMotion) {
        if (renderer) renderer.render(scene, camera);
        return;
      }

      const elapsed = (currentTime - startTime) * 0.001;

      // Camera parallax lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

      camera.position.x = currentMouseX + Math.sin(elapsed * 0.3) * 0.4;
      camera.position.y = currentMouseY + Math.cos(elapsed * 0.2) * 0.3;
      camera.lookAt(0, 0, 0);

      // Animate floating hearts
      heartObjects.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX;
        item.mesh.rotation.y += item.rotSpeedY;
        item.mesh.rotation.z += item.rotSpeedZ;

        // Gentle floating up and drifting
        item.mesh.position.y =
          item.baseY + Math.sin(elapsed * 0.8 + item.floatOffset) * 1.2;
        item.mesh.position.x =
          item.baseX + Math.cos(elapsed * 0.5 + item.floatOffset) * 0.6;
      });

      // Animate drifting sparkles upward
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        if (positions[i * 3 + 1] > 12) {
          positions[i * 3 + 1] = -12;
          positions[i * 3] = (Math.random() - 0.5) * 30;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      heartGeometry.dispose();
      heartMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #fff7f8 0%, #fdeff2 45%, #fae6ea 100%)',
      }}
      aria-hidden="true"
    />
  );
};
