"use client";
import { useEffect, useRef, useState } from "react";

type Enemy = { x: number; y: number; hp: number; frameOffset: number, hasCoin: boolean, hurtTime: number, hurtAt: number };
type Coin = { x: number, y: number, timeToLive: number, madeAt: number };
type Tower = { x: number; y: number, timeFired: number };
type Projectile = { x: number; y: number, target: Enemy, hit: boolean };

const MIN_CANVAS_HEIGHT = 400;

const TOWER_COOLDOWN = 5000;
const TOWER_RANGE = 200;
const PROJECTILE_SPEED = 5;

export default function TowerDefenseGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const towersRef = useRef<Tower[]>([]);
  const enemiesRef = useRef<Enemy[]>([]);
  const coinsRef = useRef<Coin[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);

  const enemySprite = useRef<HTMLImageElement | null>(null);
  const coinSprite = useRef<HTMLImageElement | null>(null);
  const towerSprite = useRef<HTMLImageElement | null>(null);
  const projectileSprite = useRef<HTMLImageElement | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const frameCount = useRef<number>(0);
  const mousePosition = useRef<React.MouseEvent | null>(null);

  // Function to resize canvas to match parent size
  const resizeCanvasToParent = () => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();

    // Handle high-DPI (retina) displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = false;
    }
  };

  useEffect(() => {
    resizeCanvasToParent(); // initial
    window.addEventListener("resize", resizeCanvasToParent);
    return () => window.removeEventListener("resize", resizeCanvasToParent);
  }, []);

  // Load sprite images once
  useEffect(() => {
    const enemyImg = new Image();
    const coinImg = new Image();
    const towerImg = new Image();
    const projectileImg = new Image();

    enemyImg.src = "/goblin_spritesheet.png";
    coinImg.src = "/coin_spritesheet.png";
    towerImg.src = "/tower.png";
    projectileImg.src = "/projectile.png";

    let loaded = 0;
    const checkLoaded = () => {
      loaded++;
      if (loaded === 4) setAssetsLoaded(true);
    };

    enemyImg.onload = checkLoaded;
    coinImg.onload = checkLoaded;
    towerImg.onload = checkLoaded;
    projectileImg.onload = checkLoaded;

    enemySprite.current = enemyImg;
    coinSprite.current = coinImg;
    towerSprite.current = towerImg;
    projectileSprite.current = projectileImg;
  }, []);

  function enemyContainsPoint(enemy: Enemy, x: number, y: number): boolean {
    if (y >= enemy.y && y <= enemy.y + 32) {
      if (enemy.hasCoin && x >= enemy.x && x <= enemy.x + 32) {
        return true;
      } else if (!enemy.hasCoin && x >= enemy.x - 16 && x <= enemy.x + 16) {
        return true;
      }
    }
    return false;
  }

  function mouseOnEnemy(e: React.MouseEvent): Enemy | null {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
      const enemy = enemiesRef.current[i];
      if (enemyContainsPoint(enemy, x, y))
        return enemy;
    }
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    const enemy = mouseOnEnemy(e);
    if (enemy) {
       hurtEnemy(enemy);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.current = e;
  };

  function hurtEnemy(enemy: Enemy): void {
    enemy.hp -= 1;
    enemy.hurtTime = 3;
    enemy.hurtAt = frameCount.current - 1;
    if (enemy.hp == 0 && enemy.hasCoin) {
      coinsRef.current.push({ 
        x: enemy.x,
        y: enemy.y,
        timeToLive: 4,
        madeAt: frameCount.current - 1,
      })
    }
  }

  useEffect(() => {
    if (!assetsLoaded) return; // wait for sprites

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    const enemyImg = enemySprite.current!;
    const coinImg = coinSprite.current!;
    const towerImg = towerSprite.current!;
    const projectileImg = projectileSprite.current!;

    // Spawn enemies every 2 seconds
    const interval = setInterval(() => {
      enemiesRef.current.push({
        x: canvas.width,
        y: Math.round((canvas.height - 64) * Math.random()) + 32,
        hp: 3,
        frameOffset: Math.round(Math.random() * 4),
        hasCoin: false,
        hurtTime: 0,
        hurtAt: 0,
      });
    }, 2000);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update
      enemiesRef.current.forEach((e) => {
        e.x += e.hasCoin ? 1 : -1;
        if (e.x < -64) {
          e.hasCoin = true;
        }
        if (e.hurtTime > 0) {
          e.hurtTime -= (frameCount.current - e.hurtAt) % 10 == 0 ? 1 : 0;
        }
      });
      enemiesRef.current = enemiesRef.current.filter(
        (e) => e.x <= canvas.width && e.hp > 0
      );
      coinsRef.current.forEach((c) => {
        c.timeToLive -= (frameCount.current - c.madeAt) % 3 == 0 ? 1 : 0;
        if (c.timeToLive == 0) {
          towersRef.current.push({
            x: c.x,
            y: c.y,
            timeFired: Date.now() + TOWER_COOLDOWN
          });
          towersRef.current.sort((a, b) => a.y - b.y)
        }
      });
      coinsRef.current = coinsRef.current.filter(
        (c) => c.timeToLive > 0
      );
      towersRef.current.forEach((t) => {
        if (t.timeFired + TOWER_COOLDOWN < Date.now()) {
          for (const e of enemiesRef.current) {
            const dx = t.x - (e.x + 16);
            const dy = (t.y + 32) - (e.y + 16);
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < TOWER_RANGE) {
              projectilesRef.current.push({
                x: t.x,
                y: t.y - 16,
                target: e,
                hit: false,
              });
              t.timeFired = Date.now();
              break;
            }
          }
        }
      });
      projectilesRef.current.forEach((p) => {
        const dx =  (p.target.x + 16) - (p.x + 16);
        const dy =  (p.target.y + 16) - (p.y + 16);
        const d = Math.sqrt(dx * dx + dy * dy);
        p.x += dx / d * PROJECTILE_SPEED;
        p.y += dy / d * PROJECTILE_SPEED;
        if (enemyContainsPoint(p.target, p.x + 16, p.y + 16)) {
          hurtEnemy(p.target);
          p.hit = true;
        } 
      });
      projectilesRef.current = projectilesRef.current.filter(
        (p) => !p.hit
      );

      // Draw towers
      towersRef.current.forEach((t) => {
        ctx.drawImage(
          towerImg,
          t.x - 16,
          t.y - 32,
          64,
          64
        );
      });

      // Draw enemies (animated)
      enemiesRef.current.forEach((e) => {
        const frameIndex = (Math.floor(frameCount.current / 8) + e.frameOffset) % 4;
        const frameWidth = enemyImg.width / 4; // 4 frames per animation
        const frameHeight = enemyImg.height / 4; // 4 animations

        if (e.hasCoin) {
          const coinWidth = coinImg.width / 4; // 4 frames of coin
          const coinHeight = coinImg.height / 2; // 2 animations

          ctx.drawImage(
            coinImg,
            (frameIndex % 2) * coinWidth,
            0,
            coinWidth,
            coinHeight,
            e.x - 16,
            e.y - 32,
            64,
            64
          )
        }

        ctx.save();

        if (!e.hasCoin) {
          ctx.scale(-1, 1);
        }

        ctx.drawImage(
          enemyImg,
          frameIndex * frameWidth,
          e.hasCoin ? frameHeight : 0,
          frameWidth,
          frameHeight,
          e.hasCoin ? e.x : -e.x - frameWidth,
          e.y,
          32,
          32
        );
        if (e.hurtTime % 2 == 1) {
          ctx.drawImage(
            enemyImg,
            frameIndex * frameWidth,
            (e.hasCoin ? frameHeight : 0) + 2 * frameHeight,
            frameWidth,
            frameHeight,
            e.hasCoin ? e.x : -e.x - frameWidth,
            e.y,
            32,
            32
          );
        }

        ctx.restore();
      });

      coinsRef.current.forEach((c) => {
        const coinWidth = coinImg.width / 4; // 4 frames of coin
        const coinHeight = coinImg.height / 2; // 2 animations

        ctx.drawImage(
          coinImg,
          (4 - c.timeToLive) * coinWidth,
          coinHeight,
          coinWidth,
          coinHeight,
          c.x - 16,
          c.y - 32,
          64,
          64
        )
      });

      projectilesRef.current.forEach((p) => {
        ctx.drawImage(
          projectileImg,
          p.x - 16,
          p.y - 16,
          32,
          32
        )
      });

      if (canvasRef.current && mousePosition.current) {
        if (mouseOnEnemy(mousePosition.current)) {
          canvasRef.current.style.cursor = "pointer";
        } else {
          canvasRef.current.style.cursor = "default";
        }
      }

      frameCount.current++;
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
    return () => clearInterval(interval);
  }, [assetsLoaded]);

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={1}
        height={MIN_CANVAS_HEIGHT}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="disable-anti-aliasing"
      />
      <div className="absolute top-4 text-white text-center">
        <h1 className="text-2xl font-bold mb-1">ASDF</h1>
        <p className="text-sm opacity-80"></p>
      </div>
    </div>
  );
}
