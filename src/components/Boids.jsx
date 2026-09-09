// Bird Swarm motion graphic taken from 
// https://www.grabmotion.dev/effects/bird-swarm
// under the MIT license.

"use client";

import { useEffect, useRef } from "react";

export default function BirdSwarm({
  style = null,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, active: false };

    const config = {
      count: 101,
      birdColor: "#6a728222",
      highlightColor: "#99a1af22",
      birdStyle: "dart",
      layout: "field",
      size: 1,
      speed: 0.9,
      mouseRadius: 170,
      mouseForce: 0.42,
      // separation: 0.09,
      // alignment: 0.04,
      // cohesion: 0.02
      separation: 0.29,
      alignment: 0.01,
      cohesion: 0.01
    };
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const birds = [];
    let width = 0;
    let height = 0;
    let tick = 0;
    let frame = 0;

    function clusterPoint(index) {
      if (config.layout === "diagonal") {
        const progress = config.count <= 1 ? 0 : index / (config.count - 1);
        const wave = Math.sin(progress * Math.PI * 2.1) * 0.08;
        return {
          x: width * (0.2 + progress * 0.62 + (Math.random() - 0.5) * 0.18),
          y: height * (0.18 + progress * 0.48 + wave + (Math.random() - 0.5) * 0.18)
        };
      }

      if (config.layout === "main") {
        const isStray = index % 5 === 0;
        return {
          x: width * (isStray ? 0.72 + (Math.random() - 0.5) * 0.32 : 0.42 + (Math.random() - 0.5) * 0.28),
          y: height * (isStray ? 0.28 + (Math.random() - 0.5) * 0.34 : 0.3 + (Math.random() - 0.5) * 0.2)
        };
      }

      if (config.layout === "s-curve") {
        const progress = config.count <= 1 ? 0 : index / (config.count - 1);
        const curve = Math.sin(progress * Math.PI * 2 - Math.PI / 2);
        return {
          x: width * (0.18 + progress * 0.68 + (Math.random() - 0.5) * 0.14),
          y: height * (0.5 + curve * 0.24 + (Math.random() - 0.5) * 0.16)
        };
      }

      if (config.layout === "field") {
        return {
          x: width * (0.08 + Math.random() * 0.84),
          y: height * (0.08 + Math.random() * 0.84)
        };
      }

      const groups = [
        { x: 0.18, y: 0.82, sx: 0.18, sy: 0.2 },
        { x: 0.36, y: 0.14, sx: 0.22, sy: 0.16 },
        { x: 0.86, y: 0.36, sx: 0.16, sy: 0.22 },
        { x: 0.9, y: 0.86, sx: 0.2, sy: 0.18 }
      ];
      const group = groups[index % groups.length];
      return {
        x: width * (group.x + (Math.random() - 0.5) * group.sx),
        y: height * (group.y + (Math.random() - 0.5) * group.sy)
      };
    }

    function resetBirds() {
      birds.length = 0;
      for (let index = 0; index < config.count; index++) {
        const point = clusterPoint(index);
        const angle = Math.random() * Math.PI * 2;
        const baseSpeed = 0.55 + Math.random() * 0.55;
        birds.push({
          x: point.x,
          y: point.y,
          vx: Math.cos(angle) * baseSpeed,
          vy: Math.sin(angle) * baseSpeed,
          size: (7.2 + Math.random() * 1.8) * config.size,
          phase: Math.random() * Math.PI * 2,
          // homeX: point.x,
          // homeY: point.y
        });
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      
      if (birds.length === 0) {
        resetBirds();
      }
    }

    function drawDartBird(bird, flap) {
      ctx.beginPath();
      ctx.moveTo(bird.size * 1.35, 0);
      ctx.lineTo(-bird.size * 0.78, -bird.size * 0.62 - flap);
      ctx.lineTo(-bird.size * 0.22, 0);
      ctx.lineTo(-bird.size * 0.78, bird.size * 0.62 + flap);
      ctx.closePath();
      ctx.fillStyle = config.birdColor;
      ctx.fill();
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.moveTo(bird.size * 1.35, 0);
      ctx.lineTo(-bird.size * 0.22, 0);
      ctx.lineTo(-bird.size * 0.62, -bird.size * 0.4 - flap * 0.35);
      ctx.closePath();
      ctx.fillStyle = config.highlightColor;
      ctx.fill();
    }

    function drawGullBird(bird, flap) {
      ctx.fillStyle = config.birdColor;
      ctx.beginPath();
      ctx.moveTo(bird.size * 0.95, 0);
      ctx.bezierCurveTo(bird.size * 0.25, -bird.size * 0.18, -bird.size * 0.55, -bird.size * 0.86 - flap, -bird.size * 1.22, -bird.size * 0.36 - flap);
      ctx.lineTo(-bird.size * 0.1, bird.size * 0.03);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bird.size * 0.95, 0);
      ctx.bezierCurveTo(bird.size * 0.18, bird.size * 0.22, -bird.size * 0.48, bird.size * 0.82 + flap, -bird.size * 1.18, bird.size * 0.32 + flap);
      ctx.lineTo(-bird.size * 0.12, -bird.size * 0.02);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.34;
      ctx.beginPath();
      ctx.ellipse(0, 0, bird.size * 0.42, bird.size * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = config.highlightColor;
      ctx.fill();
    }

    function drawSparrowBird(bird, flap) {
      ctx.fillStyle = config.birdColor;
      ctx.beginPath();
      ctx.ellipse(bird.size * 0.04, 0, bird.size * 0.62, bird.size * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bird.size * 0.62, -bird.size * 0.08, bird.size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(bird.size * 0.82, -bird.size * 0.08);
      ctx.lineTo(bird.size * 1.14, 0);
      ctx.lineTo(bird.size * 0.82, bird.size * 0.08);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-bird.size * 0.58, 0);
      ctx.lineTo(-bird.size * 1.04, -bird.size * 0.28);
      ctx.lineTo(-bird.size * 0.9, 0);
      ctx.lineTo(-bird.size * 1.04, bird.size * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.34;
      ctx.beginPath();
      ctx.moveTo(bird.size * 0.12, -bird.size * 0.04);
      ctx.lineTo(-bird.size * 0.44, -bird.size * 0.42 - flap);
      ctx.lineTo(-bird.size * 0.26, bird.size * 0.18);
      ctx.closePath();
      ctx.fillStyle = config.highlightColor;
      ctx.fill();
    }

    function drawBird(bird) {
      const angle = Math.atan2(bird.vy, bird.vx);
      const flap = Math.sin(tick * 0.09 + bird.phase) * bird.size * 0.05;
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(angle);
      ctx.globalAlpha = 0.88;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(143, 156, 255, 0.22)";
      if (config.birdStyle === "gull") {
        drawGullBird(bird, flap);
      } else if (config.birdStyle === "sparrow") {
        drawSparrowBird(bird, flap);
      } else {
        drawDartBird(bird, flap);
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function draw() {
      // Inherit background color
      function getBackgroundColor(element) {
        let current = element;

        while (current) {
          const color = window.getComputedStyle(current).backgroundColor;
          if (color !== "rgba(0, 0, 0, 0)") {
            return color;
          }
          current = current.parentElement;
        }

        return "transparent";
      }

      const bgColor = getBackgroundColor(canvas);

      tick += 1;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      const mouseVx = mouse.x - mouse.px;
      const mouseVy = mouse.y - mouse.py;

      for (let i = 0; i < birds.length; i++) {
        const bird = birds[i];
        let nearby = 0;
        let avgVx = 0;
        let avgVy = 0;
        let avgX = 0;
        let avgY = 0;
        let pushX = 0;
        let pushY = 0;

        for (let j = 0; j < birds.length; j++) {
          if (i === j) continue;
          const other = birds[j];
          const dx = other.x - bird.x;
          const dy = other.y - bird.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 72) {
            nearby += 1;
            avgVx += other.vx;
            avgVy += other.vy;
            avgX += other.x;
            avgY += other.y;
          }
          if (distance > 0.01 && distance < 34) {
            const strength = (34 - distance) / 34;
            pushX -= (dx / distance) * strength;
            pushY -= (dy / distance) * strength;
          }
        }

        if (nearby > 0) {
          avgVx /= nearby;
          avgVy /= nearby;
          avgX /= nearby;
          avgY /= nearby;
          bird.vx += (avgVx - bird.vx) * config.alignment;
          bird.vy += (avgVy - bird.vy) * config.alignment;
          bird.vx += (avgX - bird.x) * config.cohesion * 0.01;
          bird.vy += (avgY - bird.y) * config.cohesion * 0.01;
        }

        bird.vx += pushX * config.separation;
        bird.vy += pushY * config.separation;
        // bird.vx += (bird.homeX - bird.x) * 0.00018;
        // bird.vy += (bird.homeY - bird.y) * 0.00018;
        // bird.homeX += Math.sin(tick * 0.002 + bird.phase) * 0.018;
        // bird.homeY += Math.cos(tick * 0.0024 + bird.phase) * 0.018;

        if (mouse.active) {
          const dx = bird.x - mouse.x;
          const dy = bird.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0.01 && distance < config.mouseRadius) {
            const p = (config.mouseRadius - distance) / config.mouseRadius;
            const eased = p * p * (3 - 2 * p);
            bird.vx += (dx / distance) * eased * config.mouseForce;
            bird.vy += (dy / distance) * eased * config.mouseForce;
            bird.vx += mouseVx * eased * 0.018;
            bird.vy += mouseVy * eased * 0.018;
          }
        }

        bird.vx += Math.sin(tick * 0.014 + bird.phase) * 0.004;
        bird.vy += Math.cos(tick * 0.012 + bird.phase) * 0.004;
        bird.vx *= 0.972;
        bird.vy *= 0.972;

        const maxSpeed = 2.35 * config.speed;
        const currentSpeed = Math.hypot(bird.vx, bird.vy);
        if (currentSpeed > maxSpeed) {
          bird.vx = (bird.vx / currentSpeed) * maxSpeed;
          bird.vy = (bird.vy / currentSpeed) * maxSpeed;
        }

        const minSpeed = 0.32 * config.speed;
        if (currentSpeed < minSpeed) {
          const angle = Math.atan2(bird.vy, bird.vx) || bird.phase;
          bird.vx += Math.cos(angle) * 0.018;
          bird.vy += Math.sin(angle) * 0.018;
        }

        bird.x += bird.vx * config.speed;
        bird.y += bird.vy * config.speed;
        if (bird.x < -30) bird.x = width + 30;
        if (bird.x > width + 30) bird.x = -30;
        if (bird.y < -30) bird.y = height + 30;
        if (bird.y > height + 30) bird.y = -30;
        drawBird(bird);
      }

      mouse.px = mouse.x;
      mouse.py = mouse.y;
      frame = requestAnimationFrame(draw);
    }

    function move(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (!mouse.active) {
        mouse.px = x;
        mouse.py = y;
      }
      mouse.x = x;
      mouse.y = y;
      mouse.active = true;
    }

    function leave() {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.px = -9999;
      mouse.py = -9999;
      mouse.active = false;
    }
    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <canvas
    ref={canvasRef} 
    style={style ?? { display: "block", width: "100%", height: "100%" }} 
    className={className}
  />;
}