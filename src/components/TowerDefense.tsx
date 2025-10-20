"use client";
import { useEffect, useRef, useState } from "react";
import { TowerDefenseGame } from "@/scripts/TowerDefenseGame";

const MIN_CANVAS_HEIGHT = 400;
const GAME_START_DELAY = 20_000;

export default function TowerDefense() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<TowerDefenseGame>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const frameCountRef = useRef<number>(0);
  const mousePositionRef = useRef<React.MouseEvent | null>(null);

  // Load sprites
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
    let timeout: NodeJS.Timeout | null = null;
    const checkLoaded = () => {
      loaded++;
      if (loaded === 4) {
        // Once images are loaded, start the game after a delay
        timeout = setTimeout(() => {
          setAssetsLoaded(true);
          gameRef.current = new TowerDefenseGame(
            enemyImg,
            coinImg,
            towerImg,
            projectileImg,
            canvasRef.current!.width,
            canvasRef.current!.height
          );
        }, GAME_START_DELAY);
      }
    };
    
    enemyImg.onload = checkLoaded;
    coinImg.onload = checkLoaded;
    towerImg.onload = checkLoaded;
    projectileImg.onload = checkLoaded;

    return () => { 
      if (timeout) 
        clearTimeout(timeout);
      else 
        loaded = -1; 
    };
  }, []);

  // Resize canvas to match parent size
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
    if (gameRef.current) {
      gameRef.current.setCanvasSize(canvas.width, canvas.height);
    }
  };

  // Resize canvas on window change
  useEffect(() => {
    resizeCanvasToParent(); // initial
    window.addEventListener("resize", resizeCanvasToParent);
    return () => window.removeEventListener("resize", resizeCanvasToParent);
  }, []);

  // Hurt enemies on mouse click
  const handleClick = (e: React.MouseEvent) => {
    if (!gameRef.current) return;
    const enemy = gameRef.current.mouseOnEnemy(e);
    if (enemy) {
       gameRef.current.hurtEnemy(enemy, frameCountRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePositionRef.current = e;
  };

  // Main game update & draw loop
  useEffect(() => {
    if (!gameRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    gameRef.current.startSpawningEnemies();

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      gameRef.current!.update(frameCountRef.current);
      gameRef.current!.draw(ctx, frameCountRef.current);
      
      if (canvasRef.current && mousePositionRef.current) {
        if (gameRef.current!.mouseOnEnemy(mousePositionRef.current)) {
          canvasRef.current.style.cursor = "pointer";
        } else {
          canvasRef.current.style.cursor = "default";
        }
      }

      frameCountRef.current++;
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, [assetsLoaded]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <canvas
        ref={canvasRef}
        width={1}
        height={MIN_CANVAS_HEIGHT}
        className="disable-anti-aliasing"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
