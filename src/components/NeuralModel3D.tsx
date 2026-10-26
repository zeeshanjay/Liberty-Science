"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, RotateCw } from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  color: string;
  pulsePhase: number;
  cluster: "hippocampus" | "prefrontal" | "motor" | "autonomic";
}

interface SignalPulse {
  from: number;
  to: number;
  progress: number;
  speed: number;
  color: string;
}

interface ProjectedNode {
  idx: number;
  projX: number;
  projY: number;
  scale: number;
  depthZ: number;
  color: string;
  radius: number;
  cluster: string;
}

export function NeuralModel3D({ staticImageSrc = "/neural-3d-model.jpg" }: { staticImageSrc?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>("hippocampus");
  const [viewMode, setViewMode] = useState<"render" | "lattice">("render");

  useEffect(() => {
    if (viewMode !== "lattice") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate 3D Neural Lattice (Hippocampus + Motor Cortex + Prefrontal Nodes)
    const nodeCount = 76;
    const radius = Math.min(width, height) * 0.36;
    const nodes: Node3D[] = [];

    const clusters: Array<"hippocampus" | "prefrontal" | "motor" | "autonomic"> = [
      "hippocampus",
      "prefrontal",
      "motor",
      "autonomic",
    ];

    const clusterColors = {
      hippocampus: "rgba(234, 88, 12, 0.95)", // Torch Flame Amber
      prefrontal: "rgba(99, 91, 255, 0.95)",  // Deep Cobalt Indigo
      motor: "rgba(16, 185, 129, 0.95)",       // Emerald Vitality
      autonomic: "rgba(245, 158, 11, 0.95)",   // Golden Solar
    };

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const hemisphereOffset = i % 2 === 0 ? 0.35 : -0.35;
      const x = radius * (Math.sin(phi) * Math.cos(theta) + hemisphereOffset * 0.45);
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = radius * Math.cos(phi) * 0.9;

      const cluster = clusters[i % clusters.length];

      nodes.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        radius: Math.random() * 2.2 + 1.8,
        color: clusterColors[cluster],
        pulsePhase: Math.random() * Math.PI * 2,
        cluster,
      });
    }

    const pulses: SignalPulse[] = [];
    const maxPulses = 16;

    const findNeighbors = (nodeIdx: number, maxDist: number) => {
      const res: number[] = [];
      const n1 = nodes[nodeIdx];
      for (let j = 0; j < nodes.length; j++) {
        if (j === nodeIdx) continue;
        const n2 = nodes[j];
        const d = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);
        if (d < maxDist) res.push(j);
      }
      return res;
    };

    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      lastMouseX = clientX;
      lastMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - lastMouseX;
      const dy = clientY - lastMouseY;
      lastMouseX = clientX;
      lastMouseY = clientY;

      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const el = canvas;
    el.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    el.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    let tick = 0;
    const focalLength = 480;

    const render = () => {
      tick += 0.016;

      if (!isDragging) {
        targetRotY += 0.0035;
      }

      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected: ProjectedNode[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const breathe = Math.sin(tick * 1.5 + n.pulsePhase) * 3.5;
        const bx = n.baseX + (n.baseX / radius) * breathe;
        const by = n.baseY + (n.baseY / radius) * breathe;
        const bz = n.baseZ + (n.baseZ / radius) * breathe;

        const x1 = bx * cosY - bz * sinY;
        const z1 = bz * cosY + bx * sinY;

        const y2 = by * cosX - z1 * sinX;
        const z2 = z1 * cosX + by * sinX;

        n.x = x1;
        n.y = y2;
        n.z = z2;

        const distance = focalLength + z2;
        const scale = focalLength / Math.max(distance, 50);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        projected.push({
          idx: i,
          projX,
          projY,
          scale,
          depthZ: z2,
          color: n.color,
          radius: Math.max(n.radius * scale, 0.8),
          cluster: n.cluster,
        });
      }

      projected.sort((a, b) => a.depthZ - b.depthZ);

      const maxDistanceThreshold = radius * 0.58;
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const p1 = projected.find((p) => p.idx === i);
        if (!p1) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist3D = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);

          if (dist3D < maxDistanceThreshold) {
            const p2 = projected.find((p) => p.idx === j);
            if (!p2) continue;

            const alphaNorm = (1 - dist3D / maxDistanceThreshold) * 0.35;
            const depthFactor = Math.min(Math.max((p1.scale + p2.scale) * 0.4, 0.1), 1);
            const finalAlpha = alphaNorm * depthFactor;

            ctx.strokeStyle = `rgba(148, 163, 184, ${finalAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.projX, p1.projY);
            ctx.lineTo(p2.projX, p2.projY);
            ctx.stroke();
          }
        }
      }

      if (pulses.length < maxPulses && Math.random() < 0.18) {
        const fromIdx = Math.floor(Math.random() * nodes.length);
        const neighbors = findNeighbors(fromIdx, maxDistanceThreshold);
        if (neighbors.length > 0) {
          const toIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
          pulses.push({
            from: fromIdx,
            to: toIdx,
            progress: 0,
            speed: Math.random() * 0.035 + 0.02,
            color: nodes[fromIdx].color,
          });
        }
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const pA = projected.find((p) => p.idx === pulse.from);
        const pB = projected.find((p) => p.idx === pulse.to);

        if (pA && pB) {
          const curX = pA.projX + (pB.projX - pA.projX) * pulse.progress;
          const curY = pA.projY + (pB.projY - pA.projY) * pulse.progress;
          const currentScale = pA.scale + (pB.scale - pA.scale) * pulse.progress;

          ctx.fillStyle = pulse.color;
          ctx.beginPath();
          ctx.arc(curX, curY, Math.max(2.8 * currentScale, 1.2), 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = pulse.color.replace("0.95", "0.25");
          ctx.beginPath();
          ctx.arc(curX, curY, Math.max(6 * currentScale, 2), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const p of projected) {
        const isHighlight = p.cluster === activeCluster;
        const radius = isHighlight ? p.radius * 1.5 : p.radius;

        const glowGrad = ctx.createRadialGradient(
          p.projX,
          p.projY,
          0,
          p.projX,
          p.projY,
          radius * 3.8
        );
        glowGrad.addColorStop(0, p.color);
        glowGrad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, radius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, Math.max(radius * 0.7, 1), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      el.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [viewMode, activeCluster]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-slate-800 bg-[#070b14] flex flex-col justify-between shadow-2xl group select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#635bff]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#ea580c]/12 rounded-full blur-3xl pointer-events-none" />

      {/* Top Clinical Header & Mode Switcher */}
      <div className="relative z-10 p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div>
            <div className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Neuro-Metabolic Model 3D
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Adult Hippocampal &amp; Cortical Mapping
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Cinematic 3D vs Interactive 3D */}
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-900/90 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode("render")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "render"
                ? "bg-white text-slate-950 font-semibold shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Cinematic 3D</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("lattice")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === "lattice"
                ? "bg-white text-slate-950 font-semibold shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Interactive 360°</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
        {viewMode === "render" ? (
          <div className="relative w-full h-full">
            <Image
              src={staticImageSrc}
              alt="Cinematic 3D Medical Model of Neural Synaptic Brain Architecture"
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              priority
              className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80 pointer-events-none" />
            
            {/* Floating Scientific Annotations */}
            <div className="absolute bottom-4 left-5 right-5 pointer-events-none flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-white font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Synaptic Sprouting &amp; Cortical Remapping</span>
              </span>
              <span className="text-emerald-400">0.10 Hz Biofeedback Stabilized</span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full cursor-grab active:cursor-grabbing">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Cluster Selector Pills */}
            <div className="absolute top-3 right-4 flex items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveCluster("hippocampus")}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  activeCluster === "hippocampus"
                    ? "bg-[#ea580c] text-white font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white"
                }`}
              >
                Hippocampus
              </button>
              <button
                type="button"
                onClick={() => setActiveCluster("motor")}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  activeCluster === "motor"
                    ? "bg-emerald-600 text-white font-bold"
                    : "bg-slate-900/80 text-slate-400 hover:text-white"
                }`}
              >
                Motor Cortex
              </button>
            </div>

            <div className="absolute bottom-4 left-6 pointer-events-none text-[10px] font-mono text-slate-500">
              CLICK &amp; DRAG TO ROTATE 360° NEURAL LATTICE
            </div>
          </div>
        )}
      </div>

      {/* Bottom Telemetry Metrics Strip */}
      <div className="relative z-10 grid grid-cols-3 border-t border-slate-800/80 bg-slate-950/70 backdrop-blur-md p-4 text-center">
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Vagal Tone</div>
          <div className="text-sm font-bold font-mono text-white mt-0.5">0.10 Hz Coherence</div>
        </div>
        <div className="border-x border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Fuel Substrate</div>
          <div className="text-sm font-bold font-mono text-[#ea580c] mt-0.5">Ketone / BDNF Flux</div>
        </div>
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Motor Circuit</div>
          <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">PWR! Recruitment</div>
        </div>
      </div>
    </div>
  );
}
