import React, { useEffect, useRef } from 'react';
import { SceneId } from '../app/sceneRegistry';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
  // For vortex / convergence
  targetX?: number;
  targetY?: number;
}

interface ParticleFieldProps {
  currentScene: SceneId;
  reducedMotion?: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({ currentScene, reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle colors based on luxury theme
    const colors = [
      '#e7c889', // Champagne gold
      '#f7e4bd', // Light champagne
      '#f4c7d5', // Blush pink
      '#ffffff', // Starlight pearl
      '#ffd27d'  // Warm gold
    ];

    // Determine particle count based on screen size for optimal 60fps performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 45 : 90;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.6 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        baseAlpha,
        alpha: baseAlpha,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.15, // gently drift upwards like warm embers
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Shooting star state for Scene 06
    let shootingStar: { x: number; y: number; length: number; speed: number; angle: number; alpha: number } | null = null;
    let lastShootingStarTime = 0;

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const isGrandReveal = currentScene === 'grand-reveal';
      const isStarrySky = currentScene === 'wishes-sky';
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw normal & ambient floating particles
      particles.forEach((p) => {
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.25;
        p.alpha = Math.max(0.05, Math.min(1, p.alpha));

        if (isGrandReveal) {
          // Subtle magnetic attraction towards center 20.10 reveal
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 50) {
            p.x += (dx / dist) * 0.8;
            p.y += (dy / dist) * 0.8;
          }
        } else {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw glowing particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      // Special shooting star for Scene 06
      if (isStarrySky) {
        const now = Date.now();
        if (!shootingStar && now - lastShootingStarTime > 4000 && Math.random() < 0.03) {
          shootingStar = {
            x: Math.random() * (width * 0.7),
            y: Math.random() * (height * 0.4),
            length: Math.random() * 80 + 70,
            speed: Math.random() * 12 + 10,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            alpha: 1
          };
          lastShootingStarTime = now;
        }

        if (shootingStar) {
          const cos = Math.cos(shootingStar.angle);
          const sin = Math.sin(shootingStar.angle);

          ctx.save();
          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - cos * shootingStar.length,
            shootingStar.y - sin * shootingStar.length
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
          grad.addColorStop(0.3, `rgba(231, 200, 137, ${shootingStar.alpha * 0.8})`);
          grad.addColorStop(1, 'rgba(231, 200, 137, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - cos * shootingStar.length,
            shootingStar.y - sin * shootingStar.length
          );
          ctx.stroke();
          ctx.restore();

          shootingStar.x += cos * shootingStar.speed;
          shootingStar.y += sin * shootingStar.speed;
          shootingStar.alpha -= 0.02;

          if (shootingStar.alpha <= 0) {
            shootingStar = null;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentScene, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
};
