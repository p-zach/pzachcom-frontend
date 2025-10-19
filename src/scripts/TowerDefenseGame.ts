// Game types
type Enemy = { x: number; y: number; hp: number; frameOffset: number, hasCoin: boolean, hurtTime: number, hurtAt: number };
type Coin = { x: number, y: number, timeToLive: number, madeAt: number };
type Tower = { x: number; y: number, timeFired: number };
type Projectile = { x: number; y: number, target: Enemy, hit: boolean };

//#region Constants

// Game mechanic constants
const ENEMY_START_HP = 3;
const ENEMY_SPAWN_PERIOD = 2000;
const TOWER_COOLDOWN = 5000;
const TOWER_RANGE = 200;
const PROJECTILE_SPEED = 5;

// Drawing & bounds constants
const ENEMY_SIZE = 32;
const COIN_SIZE = 64;
const TOWER_SIZE = 64;
const PROJECTILE_SIZE = 32;

// Animation constants
const ENEMY_ANIM_FRAMES = 4;
const ENEMY_ANIMS_COUNT = 4;
const ENEMY_ANIM_SPEED = 8;
const ENEMY_HURT_ANIM_LENGTH = 3;
const ENEMY_HURT_ANIM_UPDATE_FREQ = 10;
const COIN_ANIM_FRAMES = 4;
const COIN_ANIMS_COUNT = 2;
const COIN_TIME_TO_LIVE = 4;
const COIN_TIME_TO_LIVE_UPDATE_FREQ = 3;

//#endregion

export class TowerDefenseGame {
    enemySprite: HTMLImageElement;
    coinSprite: HTMLImageElement;
    towerSprite: HTMLImageElement;
    projectileSprite: HTMLImageElement;

    towers: Tower[] = [];
    enemies: Enemy[] = [];
    coins: Coin[] = [];
    projectiles: Projectile[] = [];

    canvasWidth: number;
    canvasHeight: number;

    constructor(
        enemySprite: HTMLImageElement, 
        coinSprite: HTMLImageElement, 
        towerSprite: HTMLImageElement, 
        projectileSprite: HTMLImageElement,
        canvasWidth: number,
        canvasHeight: number) 
    {
        this.enemySprite = enemySprite;
        this.coinSprite = coinSprite;
        this.towerSprite = towerSprite;
        this.projectileSprite = projectileSprite;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    //#region Public methods

    /**
     * Update canvas width and height values.
     * @param width The new canvas width.
     * @param height The new canvas height.
     */
    public setCanvasSize(width: number, height: number): void {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    /**
     * Start spawning enemies at a constant interval.
     * @returns The NodeJS.Timeout controlling the interval.
     */
    public startSpawningEnemies(): NodeJS.Timeout {
        return setInterval(() => {
            this.spawnEnemy();
        }, ENEMY_SPAWN_PERIOD);
    }

    /**
     * Gets the enemy under the mouse.
     * @param e The mouse event.
     * @returns The enemy that the mouse is hovering over, or null if the mouse
     * is not hovering over an enemy.
     */
    public mouseOnEnemy(e: React.MouseEvent): Enemy | null {
        // Calculate mouse click coords in canvas frame
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            if (this.enemyContainsPoint(enemy, x, y))
                return enemy;
        }
        return null;
    }

    /**
     * Damages an enemy by 1 HP.
     * @param enemy The enemy to hurt.
     * @param frameCount The current frame count of the game.
     */
    public hurtEnemy(enemy: Enemy, frameCount: number): void {
        enemy.hp -= 1;
        enemy.hurtTime = ENEMY_HURT_ANIM_LENGTH;
        enemy.hurtAt = frameCount - 1;
        // Drop a coin if the enemy was carrying one and died
        if (enemy.hp == 0 && enemy.hasCoin) {
            this.coins.push({ 
                x: enemy.x,
                y: enemy.y,
                timeToLive: COIN_TIME_TO_LIVE,
                madeAt: frameCount - 1,
            })
        }
    }

    /**
     * Updates the entities in the game.
     * @param frameCount The current frame count of the game.
     */
    public update(frameCount: number) {
        // Update enemies
        this.enemies.forEach((e) => {
            e.x += e.hasCoin ? 1 : -1;
            // Give a coin to the enemy if it reached the left side of the game
            if (e.x < -COIN_SIZE) {
                e.hasCoin = true;
            }
            // Update enemy's hurt animation every tenth frame
            if (e.hurtTime > 0) {
                e.hurtTime -= (frameCount - e.hurtAt) % ENEMY_HURT_ANIM_UPDATE_FREQ == 0 ? 1 : 0;
            }
        });
        // Remove enemies that are dead or out of bounds
        this.enemies = this.enemies.filter(
            (e) => e.x <= this.canvasWidth && e.hp > 0
        );

        // Update coins
        this.coins.forEach((c) => {
            // Decrease time to live every third frame
            c.timeToLive -= (frameCount - c.madeAt) % COIN_TIME_TO_LIVE_UPDATE_FREQ == 0 ? 1 : 0;
            if (c.timeToLive == 0) {
                // If the coin disappeared, it's time to add a tower where it dropped
                this.towers.push({
                    x: c.x,
                    y: c.y,
                    timeFired: Date.now()
                });
                // Sort towers by Y axis so lower ones show in front
                this.towers.sort((a, b) => a.y - b.y);
            }
        });
        // Remove dead coins
        this.coins = this.coins.filter(
            (c) => c.timeToLive > 0
        );

        // Update towers
        this.towers.forEach((t) => {
            if (t.timeFired + TOWER_COOLDOWN < Date.now()) {
                // Fire a projectile at the closest enemy
                for (const e of this.enemies) {
                    const dx = t.x - (e.x + ENEMY_SIZE / 2);
                    const dy = (t.y + TOWER_SIZE / 2) - (e.y + ENEMY_SIZE / 2);
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < TOWER_RANGE) {
                        this.projectiles.push({
                            x: t.x,
                            y: t.y - TOWER_SIZE / 4,
                            target: e,
                            hit: false,
                        });
                        t.timeFired = Date.now();
                        break;
                    }
                }
            }
        });

        // Update projectiles
        this.projectiles.forEach((p) => {
            // Home in on target enemy
            const dx = (p.target.x + ENEMY_SIZE / 2) - (p.x + PROJECTILE_SIZE / 2);
            const dy = (p.target.y + ENEMY_SIZE / 2) - (p.y + PROJECTILE_SIZE / 2);
            const d = Math.sqrt(dx * dx + dy * dy);
            p.x += dx / d * PROJECTILE_SPEED;
            p.y += dy / d * PROJECTILE_SPEED;
            // Hurt enemy if it hit
            if (this.enemyContainsPoint(p.target, p.x + PROJECTILE_SIZE / 2, p.y + PROJECTILE_SIZE / 2)) {
                this.hurtEnemy(p.target, frameCount);
                p.hit = true;
            } 
        });
        // Remove projectiles that hit
        this.projectiles = this.projectiles.filter(
            (p) => !p.hit
        );
    }

    /**
     * Draw game sprites to a canvas.
     * @param ctx The canvas rendering context to draw the sprites to.
     * @param frameCount The current frame count of the game.
     */
    public draw(ctx: CanvasRenderingContext2D, frameCount: number) {
        // Draw towers
        this.towers.forEach((t) => {
            ctx.drawImage(
                this.towerSprite,
                t.x - TOWER_SIZE / 4,
                t.y - TOWER_SIZE / 2,
                TOWER_SIZE,
                TOWER_SIZE
            );
        });

        // Draw enemies
        this.enemies.forEach((e) => {
            const frameIndex = (Math.floor(frameCount / ENEMY_ANIM_SPEED) + e.frameOffset) % ENEMY_ANIM_FRAMES;
            const frameWidth = this.enemySprite.width / ENEMY_ANIM_FRAMES;
            const frameHeight = this.enemySprite.height / ENEMY_ANIMS_COUNT;

            if (e.hasCoin) {
                const coinWidth = this.coinSprite.width / COIN_ANIM_FRAMES;
                const coinHeight = this.coinSprite.height / COIN_ANIMS_COUNT;

                ctx.drawImage(
                    this.coinSprite,
                    (frameIndex % 2) * coinWidth,
                    0,
                    coinWidth,
                    coinHeight,
                    e.x - (COIN_SIZE / 2 - ENEMY_SIZE / 2),
                    e.y - COIN_SIZE / 2,
                    COIN_SIZE,
                    COIN_SIZE
                );
            }

            // Save canvas context before possible scaling
            ctx.save();
            // Draw enemy walking left if it doesn't have a coin
            if (!e.hasCoin) {
                ctx.scale(-1, 1);
            }
            ctx.drawImage(
                this.enemySprite,
                frameIndex * frameWidth,
                e.hasCoin ? frameHeight : 0,
                frameWidth,
                frameHeight,
                e.hasCoin ? e.x : -e.x - frameWidth,
                e.y,
                ENEMY_SIZE,
                ENEMY_SIZE
            );
            // Draw enemy hurt animation (red highlight) on hurt timer
            if (e.hurtTime % 2 == 1) {
                ctx.drawImage(
                    this.enemySprite,
                    frameIndex * frameWidth,
                    (e.hasCoin ? frameHeight : 0) + 2 * frameHeight,
                    frameWidth,
                    frameHeight,
                    e.hasCoin ? e.x : -e.x - frameWidth,
                    e.y,
                    ENEMY_SIZE,
                    ENEMY_SIZE
                );
            }
            // Restore canvas context to before possible scaling
            ctx.restore();
        });

        this.coins.forEach((c) => {
            const coinWidth = this.coinSprite.width / COIN_ANIM_FRAMES;
            const coinHeight = this.coinSprite.height / COIN_ANIMS_COUNT;

            ctx.drawImage(
                this.coinSprite,
                (COIN_TIME_TO_LIVE - c.timeToLive) * coinWidth,
                coinHeight,
                coinWidth,
                coinHeight,
                c.x - (COIN_SIZE / 2 - ENEMY_SIZE / 2),
                c.y - COIN_SIZE / 2,
                COIN_SIZE,
                COIN_SIZE
            );
        });

        this.projectiles.forEach((p) => {
            ctx.drawImage(
                this.projectileSprite,
                p.x,
                p.y,
                PROJECTILE_SIZE,
                PROJECTILE_SIZE
            );
        });
    }

    //#endregion

    //#region Private methods

    /**
     * Checks whether a point is within an enemy's bounds.
     * @param enemy The enemy to check.
     * @param x The X coordinate of the point.
     * @param y The Y coordinate of the point
     * @returns True if the point is within the enemy's bounds, false otherwise.
     */
    private enemyContainsPoint(enemy: Enemy, x: number, y: number): boolean {
        if (y >= enemy.y && y <= enemy.y + ENEMY_SIZE) {
            if (enemy.hasCoin && x >= enemy.x && x <= enemy.x + ENEMY_SIZE) {
                return true;
            } else if (!enemy.hasCoin && x >= enemy.x - ENEMY_SIZE / 2 && x <= enemy.x + ENEMY_SIZE / 2) {
                return true;
            }
        }
        return false;
    }

    /**
     * Spawn an enemy at a random Y value on the right side of the game.
     */
    private spawnEnemy(): void {
        this.enemies.push({
            x: this.canvasWidth,
            // Make sure enemy fits fully in canvas Y bounds
            y: Math.round((this.canvasHeight - ENEMY_SIZE * 2) * Math.random()) + ENEMY_SIZE,
            hp: ENEMY_START_HP,
            frameOffset: Math.round(Math.random() * ENEMY_ANIM_FRAMES),
            hasCoin: false,
            hurtTime: 0,
            hurtAt: 0,
        });
    }

    //#endregion
}