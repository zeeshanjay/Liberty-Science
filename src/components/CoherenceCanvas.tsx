"use client";

import { useEffect, useRef } from "react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: string;
}

const NODE_COLORS = [
  "rgba(15, 110, 104, 0.65)", // Liberty Teal
  "rgba(234, 88, 12, 0.55)",  // Torch Flame Orange
  "rgba(29, 78, 216, 0.50)",  // Royal Cobalt
  "rgba(217, 119, 6, 0.55)",  // Warm Gold
];

export function CoherenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      lastX: width / 2,
      lastY: height / 2,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = (e.clientX - mouse.lastX) * 0.14;
      mouse.vy = (e.clientY - mouse.lastY) * 0.14;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const count = Math.min(Math.floor((width * height) / 22000), 65);
    const nodes: NodeParticle[] = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.9 + 1.2,
      phase: Math.random() * Math.PI * 2,
      color: NODE_COLORS[idx % NODE_COLORS.length],
    }));

    let tick = 0;

    const render = () => {
      tick += 0.012;
      ctx.clearRect(0, 0, width, height);

      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      const maxLinkDist = 175;

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        p.x += p.vx + Math.sin(tick + p.phase) * 0.12;
        p.y += p.vy - Math.cos(tick * 0.8 + p.phase) * 0.12;

        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influenceRadius = 220;

          if (dist < influenceRadius && dist > 1) {
            const force = (1 - dist / influenceRadius) * 0.048;
            p.x += mouse.vx * force * 3.2 - (dx / dist) * force * 4;
            p.y += mouse.vy * force * 3.2 - (dy / dist) * force * 4;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxLinkDist * maxLinkDist) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxLinkDist) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(15, 110, 104, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Rich multi-tone ambient radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 15% 0%, rgba(15, 110, 104, 0.09), transparent 70%), radial-gradient(ellipse 60% 45% at 88% 12%, rgba(234, 88, 12, 0.075), transparent 65%), radial-gradient(ellipse 65% 55% at 50% 60%, rgba(29, 78, 216, 0.05), transparent 70%)",
        }}
      />
      {/* Warm architectural micro-grid overlay */}
      <div className="absolute inset-0 bg-micro-grid bg-[size:64px_64px] opacity-55 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_25%,#000_45%,transparent_100%)]" />
      {/* Interactive Neural Coherence Particle Web */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.18]"
      />
    </div>
  );
}
