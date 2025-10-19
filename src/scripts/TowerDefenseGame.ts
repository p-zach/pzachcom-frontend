type Enemy = { x: number; y: number; hp: number; frameOffset: number, hasCoin: boolean, hurtTime: number, hurtAt: number };
type Coin = { x: number, y: number, timeToLive: number, madeAt: number };
type Tower = { x: number; y: number, timeFired: number };
type Projectile = { x: number; y: number, target: Enemy, hit: boolean };

const TOWER_COOLDOWN = 5000;
const TOWER_RANGE = 200;
const PROJECTILE_SPEED = 5;

class TowerDefenseGame {

}