import React, { useEffect, useRef } from 'react';

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const connectionDistanceSq = connectionDistance * connectionDistance;
    const baseSpeed = 0.2;
    let currentSpeedMultiplier = 1;
    let targetSpeedMultiplier = 1;
    let isDocumentVisible = !document.hidden;
    let mouseTimeoutId: ReturnType<typeof setTimeout> | null = null;

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * baseSpeed;
        this.vy = (Math.random() - 0.5) * baseSpeed;
        this.radius = Math.random() * 2 + 1;
        
        const isDarkMode = document.documentElement.classList.contains('dark');
        const paletteDark = [
          '154, 52, 18',  // Dark Orange (#9a3412)
          '234, 88, 12',  // Orange (#ea580c)
          '245, 158, 11', // Amber (#f59e0b)
          '251, 191, 36'  // Light Orange (#fbbf24)
        ];
        const paletteLight = [
          '37, 99, 235',  // blue-600
          '29, 78, 216',  // blue-700
          '59, 130, 246', // blue-500
          '96, 165, 250'  // blue-400
        ];
        const palette = isDarkMode ? paletteDark : paletteLight;
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }

      update() {
        this.x += this.vx * currentSpeedMultiplier;
        this.y += this.vy * currentSpeedMultiplier;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.6)`;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${this.color}, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < connectionDistanceSq) {
            const distance = Math.sqrt(distanceSq);
            const opacity = (1 - distance / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
        if (distanceMouseSq < connectionDistanceSq) {
          const distanceMouse = Math.sqrt(distanceMouseSq);
          const opacity = (1 - distanceMouse / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * 0.05;

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      targetSpeedMultiplier = 3; 
      
      if (mouseTimeoutId) {
        clearTimeout(mouseTimeoutId);
      }
      mouseTimeoutId = setTimeout(() => {
        targetSpeedMultiplier = 1;
      }, 100);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      targetSpeedMultiplier = 1;
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'class') {
          initParticles();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (mouseTimeoutId) {
        clearTimeout(mouseTimeoutId);
      }
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
