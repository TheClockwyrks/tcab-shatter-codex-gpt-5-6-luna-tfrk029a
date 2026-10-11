import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as K from "./constants";
import type { RockSize } from "./constants";

export const BACKGROUND = "#070b18";
export type Screen = "title" | "howto" | "playing" | "paused" | "gameover";
export type SaucerEdge = "left" | "right";
export type FieldEdge = "top" | "bottom" | "left" | "right";
export interface ShipState {
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly angle: number;
  readonly thrusting: boolean;
  readonly invuln: number;
  readonly collision: boolean;
  readonly fireCooldown: number;
}
export interface BulletState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly life: number;
}
export interface RockState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly size: RockSize;
  readonly spin: number;
  readonly health: number;
  readonly flash: number;
}
export interface SaucerState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly mind: boolean;
  readonly gun: boolean;
  readonly travel: boolean;
  readonly weave: 1 | -1;
  readonly fireClock: number;
  readonly weaveClock: number;
  readonly age: number;
}
export interface TorpedoState {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
  readonly heading: number;
  readonly life: number;
  readonly homing: boolean;
}
export interface ShatterState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly ship: ShipState;
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly RockState[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly tickClock: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
export interface MenuRect {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}
export interface ShatterSnapshot {
  readonly version: number;
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly score: number;
  readonly lives: number;
  readonly wave: number;
  readonly waveBanner: number;
  readonly muted: boolean;
  readonly waveSpawning: boolean;
  readonly saucerSpawning: boolean;
  readonly saucerClock: number;
  readonly saucerDue: number;
  readonly nextSaucerEdge: SaucerEdge | null;
  readonly nextSaucerRow: number | null;
  readonly nextSaucerAim: number | null;
  readonly nextRockSpeed: number | null;
  readonly nextRecycleEdge: FieldEdge | null;
  readonly ship: ShipState & { readonly speed: number };
  readonly bullets: readonly BulletState[];
  readonly rocks: readonly (RockState & { readonly radius: number })[];
  readonly saucer: SaucerState | null;
  readonly enemyBullets: readonly BulletState[];
  readonly torpedoes: readonly TorpedoState[];
  readonly torpedoCharge: number;
  readonly torpedoReady: boolean;
  readonly simTime: number;
}
export interface ShatterDebugApi {
  readonly version: number;
  reset(s: DeepReadonly<ShatterState>): ShatterState;
  snapshot(s: DeepReadonly<ShatterState>): ShatterSnapshot;
  reconcile(s: DeepReadonly<ShatterState>): ShatterState;
  menuItemRect(s: DeepReadonly<ShatterState>, i: number): MenuRect | null;
  setScreen(s: DeepReadonly<ShatterState>, v: Screen): ShatterState;
  setMenuIndex(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setScore(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setLives(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWave(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWaveBanner(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setWaveSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerSpawning(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerDue(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipPosition(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipVelocity(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
  ): ShatterState;
  setShipAngle(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipInvuln(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setFireCooldown(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setShipCollision(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  addBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addEnemyBullet(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): ShatterState;
  removeEnemyBullet(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearEnemyBullets(s: DeepReadonly<ShatterState>): ShatterState;
  addRock(
    s: DeepReadonly<ShatterState>,
    size: RockSize,
    x: number,
    y: number,
  ): ShatterState;
  setRockVelocity(
    s: DeepReadonly<ShatterState>,
    id: number,
    vx: number,
    vy: number,
  ): ShatterState;
  setRockHealth(
    s: DeepReadonly<ShatterState>,
    id: number,
    hp: number,
  ): ShatterState;
  removeRock(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearRocks(s: DeepReadonly<ShatterState>): ShatterState;
  addSaucer(s: DeepReadonly<ShatterState>, x: number, y: number): ShatterState;
  setSaucerVelocity(
    s: DeepReadonly<ShatterState>,
    vx: number,
    vy: number,
  ): ShatterState;
  setSaucerWeave(s: DeepReadonly<ShatterState>, v: 1 | -1): ShatterState;
  removeSaucer(s: DeepReadonly<ShatterState>): ShatterState;
  setSaucerMind(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerGun(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setSaucerTravel(s: DeepReadonly<ShatterState>, v: boolean): ShatterState;
  setNextSaucerEdge(s: DeepReadonly<ShatterState>, v: SaucerEdge): ShatterState;
  setNextSaucerRow(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextSaucerAim(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextRockSpeed(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  setNextRecycleEdge(s: DeepReadonly<ShatterState>, v: FieldEdge): ShatterState;
  setTorpedoCharge(s: DeepReadonly<ShatterState>, v: number): ShatterState;
  addTorpedo(
    s: DeepReadonly<ShatterState>,
    x: number,
    y: number,
    h: number,
  ): ShatterState;
  setTorpedoHeading(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: number,
  ): ShatterState;
  setTorpedoHoming(
    s: DeepReadonly<ShatterState>,
    id: number,
    v: boolean,
  ): ShatterState;
  removeTorpedo(s: DeepReadonly<ShatterState>, id: number): ShatterState;
  clearTorpedoes(s: DeepReadonly<ShatterState>): ShatterState;
}
const wrap = (n: number, m: number) => ((n % m) + m) % m;
const d = (a: number, b: number, m: number) => {
  let x = a - b;
  if (x >= m / 2) x -= m;
  if (x < -m / 2) x += m;
  return x;
};
const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(d(a.x, b.x, K.FIELD_W), d(a.y, b.y, K.FIELD_H));
const finite = (n: number) => {
  if (!Number.isFinite(n)) throw Error("finite value required");
};
const rr = (s: RockSize) => K.ROCK_RADIUS[s];
const points = (s: Screen) =>
  s === "title"
    ? K.TITLE_ITEMS.length
    : s === "paused"
      ? K.PAUSE_ITEMS.length
      : s === "gameover"
        ? K.GAMEOVER_ITEMS.length
        : 0;
const initial = (): ShatterState => ({
  screen: "title",
  menuIndex: 0,
  score: 0,
  lives: K.START_LIVES,
  wave: 0,
  waveBanner: 0,
  ship: {
    x: K.SAFE_X,
    y: K.SAFE_Y,
    vx: 0,
    vy: 0,
    angle: K.FACE_UP,
    thrusting: false,
    invuln: 0,
    collision: true,
    fireCooldown: 0,
  },
  bullets: [],
  rocks: [],
  saucer: null,
  enemyBullets: [],
  torpedoes: [],
  torpedoCharge: 1,
  waveSpawning: true,
  saucerSpawning: true,
  saucerClock: 0,
  saucerDue: K.SAUCER_FIRST_DELAY,
  nextSaucerEdge: null,
  nextSaucerRow: null,
  nextSaucerAim: null,
  nextRockSpeed: null,
  nextRecycleEdge: null,
  tickClock: 0,
  nextId: 1,
  simTime: 0,
  muted: false,
});
const next = (s: ShatterState): [number, ShatterState] => [
  s.nextId,
  { ...s, nextId: s.nextId + 1 },
];
const addRock = (
  s: ShatterState,
  size: RockSize,
  x: number,
  y: number,
  vx = 0,
  vy = 0,
) => {
  const [id, t] = next(s);
  return {
    ...t,
    rocks: [
      ...t.rocks,
      {
        id,
        x: wrap(x, K.FIELD_W),
        y: wrap(y, K.FIELD_H),
        vx,
        vy,
        size,
        spin: Math.random() * 6.28,
        health: K.ROCK_HEALTH[size],
        flash: 0,
      },
    ],
  };
};
const run = (s: ShatterState): ShatterState => ({
  ...initial(),
  screen: "playing",
  wave: 1,
  nextId: s.nextId,
});
function spawn(s: ShatterState): ShatterState {
  let n = s;
  const mul = 1 + Math.min(K.WAVE_SPEED_CAP, K.WAVE_SPEED_STEP * (s.wave - 1));
  for (let i = 0; i < K.WAVE_BASE_ROCKS + s.wave; i++) {
    let x: number, y: number;
    do {
      x = Math.random() * K.FIELD_W;
      y = Math.random() * K.FIELD_H;
    } while (
      distance({ x, y }, { x: s.ship.x, y: s.ship.y }) < K.WAVE_MIN_SHIP_DIST ||
      distance({ x, y }, { x: K.STAR_X, y: K.STAR_Y }) < K.WAVE_MIN_STAR_DIST
    );
    const a = Math.random() * Math.PI * 2;
    const v =
      (s.nextRockSpeed ??
        K.ROCK_SPEED_MIN.large +
          Math.random() * (K.ROCK_SPEED_MAX.large - K.ROCK_SPEED_MIN.large)) *
      mul;
    n = addRock(n, "large", x, y, Math.cos(a) * v, Math.sin(a) * v);
  }
  return { ...n, nextRockSpeed: null };
}
function sim(s0: ShatterState, api: UpdateApi): ShatterState {
  let s = {
    ...s0,
    simTime: s0.simTime + K.TICK_DT,
    waveBanner: Math.max(0, s0.waveBanner - K.TICK_DT),
  } as ShatterState;
  if (s.screen !== "playing") return s;
  let sh = { ...s.ship };
  const up = api.input.value("up") > 0;
  sh = {
    ...sh,
    angle:
      sh.angle +
      (api.input.value("right") - api.input.value("left")) *
        K.SHIP_TURN *
        K.TICK_DT,
    thrusting: up,
    invuln: Math.max(0, sh.invuln - K.TICK_DT),
    fireCooldown: Math.max(0, sh.fireCooldown - 1),
  };
  if (up)
    sh = {
      ...sh,
      vx: sh.vx + Math.cos(sh.angle) * K.SHIP_THRUST * K.TICK_DT,
      vy: sh.vy + Math.sin(sh.angle) * K.SHIP_THRUST * K.TICK_DT,
    };
  const drag = Math.pow(0.5, K.TICK_DT / K.SHIP_DRAG_HALFLIFE);
  sh = {
    ...sh,
    vx: sh.vx * drag,
    vy: sh.vy * drag,
    x: wrap(sh.x + sh.vx * K.TICK_DT, K.FIELD_W),
    y: wrap(sh.y + sh.vy * K.TICK_DT, K.FIELD_H),
  };
  const speed = Math.hypot(sh.vx, sh.vy);
  if (speed > K.SHIP_MAX)
    sh = {
      ...sh,
      vx: (sh.vx / speed) * K.SHIP_MAX,
      vy: (sh.vy / speed) * K.SHIP_MAX,
    };
  let rocks = s.rocks.map((r) => {
    const q = distance(r, { x: K.STAR_X, y: K.STAR_Y }),
      a = K.MU / Math.max(q, K.SOFTEN) ** 2;
    return {
      ...r,
      vx: r.vx + ((K.STAR_X - r.x) / (q || 1)) * a * K.TICK_DT,
      vy: r.vy + ((K.STAR_Y - r.y) / (q || 1)) * a * K.TICK_DT,
      x: wrap(r.x + r.vx * K.TICK_DT, K.FIELD_W),
      y: wrap(r.y + r.vy * K.TICK_DT, K.FIELD_H),
      spin: r.spin + 0.3 * K.TICK_DT,
      flash: Math.max(0, r.flash - K.TICK_DT),
    };
  });
  let bullets = s.bullets
    .map((b) => {
      const q = distance(b, { x: K.STAR_X, y: K.STAR_Y }),
        a = K.MU / Math.max(q, K.SOFTEN) ** 2;
      return {
        ...b,
        vx: b.vx + ((K.STAR_X - b.x) / (q || 1)) * a * K.TICK_DT,
        vy: b.vy + ((K.STAR_Y - b.y) / (q || 1)) * a * K.TICK_DT,
        x: wrap(b.x + b.vx * K.TICK_DT, K.FIELD_W),
        y: wrap(b.y + b.vy * K.TICK_DT, K.FIELD_H),
        life: b.life - K.TICK_DT,
      };
    })
    .filter(
      (b) => b.life > 0 && distance(b, { x: K.STAR_X, y: K.STAR_Y }) > K.CORE_R,
    );
  let enemy = s.enemyBullets
    .map((b) => ({
      ...b,
      x: wrap(b.x + b.vx * K.TICK_DT, K.FIELD_W),
      y: wrap(b.y + b.vy * K.TICK_DT, K.FIELD_H),
      life: b.life - K.TICK_DT,
    }))
    .filter(
      (b) => b.life > 0 && distance(b, { x: K.STAR_X, y: K.STAR_Y }) > K.CORE_R,
    );
  let torps = s.torpedoes
    .map((t) => ({
      ...t,
      x: wrap(t.x + t.vx * K.TICK_DT, K.FIELD_W),
      y: wrap(t.y + t.vy * K.TICK_DT, K.FIELD_H),
      life: t.life - K.TICK_DT,
    }))
    .filter((t) => t.life > 0);
  let saucer = s.saucer
    ? {
        ...s.saucer,
        x: s.saucer.x + s.saucer.vx * K.TICK_DT,
        y: wrap(s.saucer.y + s.saucer.vy * K.TICK_DT, K.FIELD_H),
        age: s.saucer.age + K.TICK_DT,
        fireClock: s.saucer.fireClock - K.TICK_DT,
      }
    : null;
  let score = s.score,
    nextId = s.nextId;
  const deadR = new Set<number>(),
    deadB = new Set<number>(),
    deadT = new Set<number>();
  for (const b of bullets) {
    const r = rocks.find(
      (x) => !deadR.has(x.id) && distance(b, x) <= K.BULLET_R + rr(x.size),
    );
    if (r) {
      deadB.add(b.id);
      if (r.health <= 1) {
        deadR.add(r.id);
        score +=
          r.size === "large"
            ? K.SCORE_LARGE
            : r.size === "medium"
              ? K.SCORE_MEDIUM
              : K.SCORE_SMALL;
      } else
        rocks = rocks.map((x) =>
          x.id === r.id
            ? { ...x, health: x.health - 1, flash: K.HIT_FLASH_TIME }
            : x,
        );
    }
  }
  for (const t of torps) {
    const r = rocks.find(
      (x) => !deadR.has(x.id) && distance(t, x) <= K.TORPEDO_R + rr(x.size),
    );
    if (r) {
      deadT.add(t.id);
      deadR.add(r.id);
      score +=
        r.size === "large"
          ? K.SCORE_LARGE
          : r.size === "medium"
            ? K.SCORE_MEDIUM
            : K.SCORE_SMALL;
    }
  }
  bullets = bullets.filter((x) => !deadB.has(x.id));
  torps = torps.filter((x) => !deadT.has(x.id));
  for (const r of rocks.filter((x) => deadR.has(x.id))) {
    rocks = rocks.filter((x) => x.id !== r.id);
    const child = K.ROCK_CHILD[r.size];
    if (child)
      for (const sign of [-1, 1]) {
        const [id, t] = next({ ...s, nextId });
        nextId = t.nextId;
        rocks.push({
          id,
          x: r.x,
          y: r.y,
          vx: r.vx + sign * K.SPLIT_KICK,
          vy: r.vy - sign * K.SPLIT_KICK,
          size: child,
          spin: 0,
          health: K.ROCK_HEALTH[child],
          flash: 0,
        });
      }
    api.audio.play(K.CUES.shatter);
  }
  for (const r of rocks.filter(
    (x) => distance(x, { x: K.STAR_X, y: K.STAR_Y }) <= K.CORE_R,
  )) {
    const edge =
      s.nextRecycleEdge ??
      (["top", "bottom", "left", "right"] as FieldEdge[])[
        Math.floor(Math.random() * 4)
      ];
    const p =
      Math.random() *
      (edge === "left" || edge === "right" ? K.FIELD_H : K.FIELD_W);
    rocks = rocks.map((x) =>
      x.id !== r.id
        ? x
        : {
            ...x,
            x:
              edge === "left"
                ? rr(x.size)
                : edge === "right"
                  ? K.FIELD_W - rr(x.size)
                  : p,
            y:
              edge === "top"
                ? rr(x.size)
                : edge === "bottom"
                  ? K.FIELD_H - rr(x.size)
                  : p,
            vx: edge === "left" ? 80 : edge === "right" ? -80 : 0,
            vy: edge === "top" ? 80 : edge === "bottom" ? -80 : 0,
          },
    );
    s = { ...s, nextRecycleEdge: null };
  }
  let dead = false;
  if (
    sh.collision &&
    sh.invuln <= 0 &&
    (rocks.some((r) => distance(sh, r) <= K.SHIP_R + rr(r.size)) ||
      (saucer && distance(sh, saucer) <= K.SHIP_R + K.SAUCER_R) ||
      enemy.some((b) => distance(sh, b) <= K.SHIP_R + K.SAUCER_BULLET_R))
  )
    dead = true;
  if (dead) {
    const lives = s.lives - 1;
    if (lives <= 0)
      return {
        ...s,
        ship: sh,
        lives,
        screen: "gameover",
        menuIndex: 0,
        rocks,
        bullets,
        enemyBullets: enemy,
        torpedoes: torps,
        nextId,
      };
    sh = {
      x: K.SAFE_X,
      y: K.SAFE_Y,
      vx: 0,
      vy: 0,
      angle: K.FACE_UP,
      thrusting: false,
      invuln: K.INVULN_TIME,
      collision: true,
      fireCooldown: 0,
    };
    bullets = [];
    enemy = [];
    torps = [];
    api.audio.play(K.CUES.death);
  }
  if (s.waveSpawning && deadR.size > 0 && rocks.length === 0)
    s = { ...s, wave: s.wave + 1, waveBanner: K.WAVE_BANNER_TIME };
  if (
    s.waveSpawning &&
    s.waveBanner <= 0 &&
    s.wave > 0 &&
    rocks.length === 0 &&
    deadR.size === 0
  )
    s = spawn({ ...s, rocks });
  if (saucer && saucer.age >= K.SAUCER_LIFETIME) {
    saucer = null;
    s = {
      ...s,
      saucerClock: 0,
      saucerDue:
        K.SAUCER_GAP_MIN +
        Math.random() * (K.SAUCER_GAP_MAX - K.SAUCER_GAP_MIN),
    };
  }
  if (!saucer && s.saucerSpawning) {
    const clock = s.saucerClock + K.TICK_DT;
    if (clock >= s.saucerDue) {
      const edge = s.nextSaucerEdge ?? (Math.random() < 0.5 ? "left" : "right");
      const [id, t] = next(s);
      saucer = {
        id,
        x: edge === "left" ? -K.SAUCER_R : K.FIELD_W + K.SAUCER_R,
        y: s.nextSaucerRow ?? 80 + Math.random() * (K.FIELD_H - 160),
        vx: edge === "left" ? K.SAUCER_SPEED : -K.SAUCER_SPEED,
        vy: 0,
        mind: true,
        gun: true,
        travel: true,
        weave: Math.random() < 0.5 ? 1 : -1,
        fireClock: K.SAUCER_FIRE_INTERVAL,
        weaveClock: K.SAUCER_WEAVE_INTERVAL,
        age: 0,
      };
      s = { ...t, saucerClock: 0, nextSaucerEdge: null, nextSaucerRow: null };
      api.audio.play(K.CUES.saucer);
    } else s = { ...s, saucerClock: clock };
  }
  return {
    ...s,
    ship: sh,
    rocks,
    bullets,
    enemyBullets: enemy,
    torpedoes: torps,
    saucer,
    score,
    nextId,
    torpedoCharge: Math.min(
      1,
      s.torpedoCharge + K.TICK_DT / K.TORPEDO_RECHARGE,
    ),
  };
}
const rect = (s: Screen, i: number): MenuRect | null =>
  i >= 0 && i < points(s) ? { x: 380, y: 380 + i * 64, w: 520, h: 54 } : null;
function debug(): ShatterDebugApi {
  const a = {} as ShatterDebugApi;
  const pose =
    (f: (s: ShatterState) => ShatterState) => (s: DeepReadonly<ShatterState>) =>
      f({ ...s } as ShatterState);
  const val = (n: number) => {
    finite(n);
  };
  const entity = (xs: readonly { id: number }[], id: number) => {
    if (!xs.some((x) => x.id === id)) throw Error("unknown id");
  };
  Object.assign(a, { version: K.SHATTER_DEBUG_VERSION });
  a.reset = pose((s) => ({ ...initial(), muted: s.muted }));
  a.reconcile = pose((s) => s);
  a.menuItemRect = (s, i) => rect(s.screen, i);
  a.snapshot = (s) => ({
    version: 1,
    screen: s.screen,
    menuIndex: s.menuIndex,
    score: s.score,
    lives: s.lives,
    wave: s.wave,
    waveBanner: s.waveBanner,
    muted: s.muted,
    waveSpawning: s.waveSpawning,
    saucerSpawning: s.saucerSpawning,
    saucerClock: s.saucerClock,
    saucerDue: s.saucerDue,
    nextSaucerEdge: s.nextSaucerEdge,
    nextSaucerRow: s.nextSaucerRow,
    nextSaucerAim: s.nextSaucerAim,
    nextRockSpeed: s.nextRockSpeed,
    nextRecycleEdge: s.nextRecycleEdge,
    ship: { ...s.ship, speed: Math.hypot(s.ship.vx, s.ship.vy) },
    bullets: s.bullets,
    rocks: s.rocks.map((r) => ({ ...r, radius: rr(r.size) })),
    saucer: s.saucer,
    enemyBullets: s.enemyBullets,
    torpedoes: s.torpedoes,
    torpedoCharge: s.torpedoCharge,
    torpedoReady: s.torpedoCharge >= 1,
    simTime: s.simTime,
  });
  a.setScreen = (s, v) => ({ ...s, screen: v });
  a.setMenuIndex = (s, v) => {
    val(v);
    return { ...s, menuIndex: v };
  };
  a.setScore = (s, v) => {
    val(v);
    return { ...s, score: v };
  };
  a.setLives = (s, v) => {
    val(v);
    return { ...s, lives: v };
  };
  a.setWave = (s, v) => {
    val(v);
    return { ...s, wave: v };
  };
  a.setWaveBanner = (s, v) => {
    val(v);
    return { ...s, waveBanner: v };
  };
  a.setWaveSpawning = (s, v) => ({ ...s, waveSpawning: v });
  a.setSaucerSpawning = (s, v) => ({ ...s, saucerSpawning: v });
  a.setSaucerDue = (s, v) => {
    val(v);
    return { ...s, saucerDue: v };
  };
  a.setShipPosition = (s, x, y) => ({ ...s, ship: { ...s.ship, x, y } });
  a.setShipVelocity = (s, x, y) => ({
    ...s,
    ship: { ...s.ship, vx: x, vy: y },
  });
  a.setShipAngle = (s, v) => ({ ...s, ship: { ...s.ship, angle: v } });
  a.setShipInvuln = (s, v) => ({ ...s, ship: { ...s.ship, invuln: v } });
  a.setFireCooldown = (s, v) => ({
    ...s,
    ship: { ...s.ship, fireCooldown: v },
  });
  a.setShipCollision = (s, v) => ({ ...s, ship: { ...s.ship, collision: v } });
  const add = (
    s: ShatterState,
    x: number,
    y: number,
    vx: number,
    vy: number,
    life: number,
    kind: "b" | "e",
  ) => {
    const [id, t] = next(s);
    return {
      ...t,
      [kind === "b" ? "bullets" : "enemyBullets"]: [
        ...(kind === "b" ? t.bullets : t.enemyBullets),
        { id, x, y, vx, vy, life },
      ],
    };
  };
  a.addBullet = (s, x, y, vx, vy) =>
    add({ ...s } as ShatterState, x, y, vx, vy, K.BULLET_LIFE, "b");
  a.removeBullet = (s, i) => {
    entity(s.bullets, i);
    return { ...s, bullets: s.bullets.filter((x) => x.id !== i) };
  };
  a.clearBullets = (s) => ({ ...s, bullets: [] });
  a.addEnemyBullet = (s, x, y, vx, vy) =>
    add({ ...s } as ShatterState, x, y, vx, vy, K.SAUCER_BULLET_LIFE, "e");
  a.removeEnemyBullet = (s, i) => {
    entity(s.enemyBullets, i);
    return { ...s, enemyBullets: s.enemyBullets.filter((x) => x.id !== i) };
  };
  a.clearEnemyBullets = (s) => ({ ...s, enemyBullets: [] });
  a.addRock = (s, size, x, y) => addRock({ ...s } as ShatterState, size, x, y);
  a.setRockVelocity = (s, i, vx, vy) => {
    entity(s.rocks, i);
    return {
      ...s,
      rocks: s.rocks.map((r) => (r.id === i ? { ...r, vx, vy } : r)),
    };
  };
  a.setRockHealth = (s, i, hp) => {
    entity(s.rocks, i);
    return {
      ...s,
      rocks: s.rocks.map((r) => (r.id === i ? { ...r, health: hp } : r)),
    };
  };
  a.removeRock = (s, i) => {
    entity(s.rocks, i);
    return { ...s, rocks: s.rocks.filter((r) => r.id !== i) };
  };
  a.clearRocks = (s) => ({ ...s, rocks: [] });
  a.addSaucer = (s, x, y) => {
    const [id, t] = next({ ...s } as ShatterState);
    return {
      ...t,
      saucer: {
        id,
        x,
        y,
        vx: K.SAUCER_SPEED,
        vy: 0,
        mind: true,
        gun: true,
        travel: true,
        weave: 1,
        fireClock: K.SAUCER_FIRE_INTERVAL,
        weaveClock: K.SAUCER_WEAVE_INTERVAL,
        age: 0,
      },
    };
  };
  a.setSaucerVelocity = (s, vx, vy) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, vx, vy } } : s;
  a.setSaucerWeave = (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, weave: v } } : s;
  a.removeSaucer = (s) => ({ ...s, saucer: null });
  a.setSaucerMind = (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, mind: v } } : s;
  a.setSaucerGun = (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, gun: v } } : s;
  a.setSaucerTravel = (s, v) =>
    s.saucer ? { ...s, saucer: { ...s.saucer, travel: v } } : s;
  a.setNextSaucerEdge = (s, v) => ({ ...s, nextSaucerEdge: v });
  a.setNextSaucerRow = (s, v) => ({ ...s, nextSaucerRow: v });
  a.setNextSaucerAim = (s, v) => ({ ...s, nextSaucerAim: v });
  a.setNextRockSpeed = (s, v) => ({ ...s, nextRockSpeed: v });
  a.setNextRecycleEdge = (s, v) => ({ ...s, nextRecycleEdge: v });
  a.setTorpedoCharge = (s, v) => ({ ...s, torpedoCharge: v });
  a.addTorpedo = (s, x, y, h) => {
    const [id, t] = next({ ...s } as ShatterState);
    return {
      ...t,
      torpedoes: [
        ...t.torpedoes,
        {
          id,
          x,
          y,
          vx: Math.cos(h) * K.TORPEDO_SPEED,
          vy: Math.sin(h) * K.TORPEDO_SPEED,
          heading: h,
          life: K.TORPEDO_LIFE,
          homing: true,
        },
      ],
    };
  };
  a.setTorpedoHeading = (s, i, v) => {
    entity(s.torpedoes, i);
    return {
      ...s,
      torpedoes: s.torpedoes.map((t) =>
        t.id === i
          ? {
              ...t,
              heading: v,
              vx: Math.cos(v) * K.TORPEDO_SPEED,
              vy: Math.sin(v) * K.TORPEDO_SPEED,
            }
          : t,
      ),
    };
  };
  a.setTorpedoHoming = (s, i, v) => {
    entity(s.torpedoes, i);
    return {
      ...s,
      torpedoes: s.torpedoes.map((t) => (t.id === i ? { ...t, homing: v } : t)),
    };
  };
  a.removeTorpedo = (s, i) => {
    entity(s.torpedoes, i);
    return { ...s, torpedoes: s.torpedoes.filter((t) => t.id !== i) };
  };
  a.clearTorpedoes = (s) => ({ ...s, torpedoes: [] });
  return a;
}
function glyph(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
  a: number,
  alpha = 1,
) {
  c.save();
  c.translate(x, y);
  c.rotate(a);
  c.globalAlpha = alpha;
  c.strokeStyle = "#c3f5ff";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(18, 0);
  c.lineTo(-13, 10);
  c.lineTo(-8, 0);
  c.lineTo(-13, -10);
  c.closePath();
  c.stroke();
  c.restore();
}
function draw(c: CanvasRenderingContext2D, s: DeepReadonly<ShatterState>) {
  c.fillStyle = "#0d1630";
  c.fillRect(0, 0, K.FIELD_W, K.FIELD_H);
  for (let i = 0; i < 90; i++) {
    c.fillStyle = i % 9 === 0 ? "#8595c1" : "#283657";
    c.fillRect((i * 137) % K.FIELD_W, (i * 67) % K.FIELD_H, 2, 2);
  }
  const g = c.createRadialGradient(
    K.STAR_X,
    K.STAR_Y,
    K.CORE_R,
    K.STAR_X,
    K.STAR_Y,
    K.HALO_R * 1.5,
  );
  g.addColorStop(0, "#ffd86a88");
  g.addColorStop(1, "#26345a00");
  c.fillStyle = g;
  c.beginPath();
  c.arc(K.STAR_X, K.STAR_Y, K.HALO_R * 1.5, 0, 7);
  c.fill();
  c.fillStyle = "#ffd86a";
  c.shadowBlur = 20;
  c.shadowColor = "#ffb42b";
  c.beginPath();
  c.arc(K.STAR_X, K.STAR_Y, K.CORE_R, 0, 7);
  c.fill();
  c.shadowBlur = 0;
  for (const r of s.rocks) {
    c.save();
    c.translate(r.x, r.y);
    c.rotate(r.spin);
    c.strokeStyle = r.flash ? "#fff7ab" : "#a9b5d2";
    c.fillStyle = "#4f5c7d";
    c.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4,
        rad = rr(r.size) * (i % 2 ? 0.85 : 1);
      c.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
    }
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();
  }
  for (const b of s.bullets) {
    c.fillStyle = "#98f6ff";
    c.beginPath();
    c.arc(b.x, b.y, K.BULLET_R, 0, 7);
    c.fill();
  }
  for (const b of s.enemyBullets) {
    c.fillStyle = "#ff6b8a";
    c.beginPath();
    c.arc(b.x, b.y, K.SAUCER_BULLET_R, 0, 7);
    c.fill();
  }
  for (const t of s.torpedoes) {
    c.fillStyle = "#ffe072";
    c.beginPath();
    c.arc(t.x, t.y, K.TORPEDO_R, 0, 7);
    c.fill();
  }
  if (s.saucer) {
    c.fillStyle = "#452852";
    c.strokeStyle = "#ff86ac";
    c.beginPath();
    c.ellipse(s.saucer.x, s.saucer.y, K.SAUCER_R + 5, 9, 0, 0, 7);
    c.fill();
    c.stroke();
  }
  glyph(c, s.ship.x, s.ship.y, s.ship.angle, s.ship.invuln > 0 ? 0.45 : 1);
  c.fillStyle = "#eef5ff";
  c.font = "700 24px system-ui";
  c.fillText(String(s.score).padStart(6, "0"), 32, 40);
  if (s.screen === "playing" || s.screen === "paused") {
    for (let i = 0; i < s.lives - 1; i++)
      glyph(c, 42 + i * 30, 70, K.FACE_UP, 0.7);
    c.fillStyle = "#ffdb70";
    c.fillText("TORPEDO", 32, 108);
    c.strokeStyle = "#8897b9";
    c.strokeRect(32, 117, 130, 8);
    c.fillRect(32, 117, 130 * s.torpedoCharge, 8);
  }
  if (s.waveBanner > 0) {
    c.textAlign = "center";
    c.font = "700 46px system-ui";
    c.fillText(`WAVE ${s.wave}`, K.FIELD_W / 2, 150);
    c.textAlign = "left";
  }
  if (s.screen !== "playing" && s.screen !== "paused") {
    c.fillStyle = "#050917cc";
    c.fillRect(0, 0, K.FIELD_W, K.FIELD_H);
    c.textAlign = "center";
    c.fillStyle = "#f4f8ff";
    c.font = "800 86px system-ui";
    c.fillText(
      s.screen === "howto" ? "HOW TO PLAY" : "SHATTER",
      K.FIELD_W / 2,
      190,
    );
    c.font = "600 18px system-ui";
    c.fillStyle = "#a5b4d5";
    if (s.screen === "title") {
      c.fillText("GRAVITY WELL SHOOTER", K.FIELD_W / 2, 232);
      K.TITLE_ITEMS.forEach((x, i) =>
        c.fillText(
          `${i === s.menuIndex ? "◆ " : ""}${x}`,
          K.FIELD_W / 2,
          420 + i * 64,
        ),
      );
    } else if (s.screen === "gameover") {
      c.fillText(
        `FINAL SCORE ${s.score}  •  WAVE ${s.wave}`,
        K.FIELD_W / 2,
        260,
      );
      K.GAMEOVER_ITEMS.forEach((x, i) =>
        c.fillText(
          `${i === s.menuIndex ? "◆ " : ""}${x}`,
          K.FIELD_W / 2,
          420 + i * 64,
        ),
      );
    } else {
      [
        "Destroy every rock through its armored fragments.",
        "The star bends bullets and rocks, never the ship.",
        "SPACE gun • F guided torpedo • ARROWS/WASD fly",
        "P pause • ESC back • M mute",
      ].forEach((x, i) => c.fillText(x, K.FIELD_W / 2, 310 + i * 38));
    }
    c.textAlign = "left";
  }
  if (s.screen === "paused") {
    c.fillStyle = "#050917aa";
    c.fillRect(0, 0, K.FIELD_W, K.FIELD_H);
    c.textAlign = "center";
    c.font = "800 64px system-ui";
    c.fillText("PAUSED", K.FIELD_W / 2, 240);
    K.PAUSE_ITEMS.forEach((x, i) =>
      c.fillText(
        `${i === s.menuIndex ? "◆ " : ""}${x}`,
        K.FIELD_W / 2,
        390 + i * 64,
      ),
    );
    c.textAlign = "left";
  }
}
export const game: Game<ShatterState, ShatterDebugApi> = {
  initialize(api: InitApi<ShatterState>) {
    for (const x of K.ACTIONS) api.input.register(x, K.BINDINGS[x]);
    for (const x of Object.values(K.CUES))
      api.audio.define(x, { freq: 300, durationMs: 100 });
    const d = debug();
    api.diagnostics.register("screen", (s) => s.screen);
    api.diagnostics.register("score", (s) => s.score);
    api.diagnostics.register("lives", (s) => s.lives);
    api.diagnostics.register("wave", (s) => s.wave);
    api.diagnostics.register(
      "ship",
      (s) => `(${s.ship.x.toFixed(0)},${s.ship.y.toFixed(0)})`,
    );
    api.diagnostics.register("bullets", (s) => s.bullets.length);
    api.diagnostics.register("rocks", (s) => s.rocks.length);
    api.diagnostics.register("saucer", (s) => Boolean(s.saucer));
    api.diagnostics.register("torpedo charge", (s) => s.torpedoCharge);
    api.diagnostics.register("sim time", (s) => s.simTime);
    return [initial(), d];
  },
  update(state, api, dt) {
    let s = {
      ...state,
      tickClock: state.tickClock + dt,
      muted: api.audio.muted(),
    } as ShatterState;
    if (api.input.pressed("mute")) api.audio.setMuted(!api.audio.muted());
    if (s.screen === "playing" && api.input.pressed("pause"))
      s = { ...s, screen: "paused" };
    else if (
      s.screen === "paused" &&
      (api.input.pressed("pause") || api.input.pressed("back"))
    )
      s = { ...s, screen: "playing" };
    else if (s.screen === "howto" && api.input.pressed("confirm"))
      s = { ...s, screen: "title" };
    else if (s.screen !== "playing" && s.screen !== "paused") {
      if (api.input.pressed("back"))
        s = { ...s, screen: "title", menuIndex: 0 };
      const n = points(s.screen);
      if (n) {
        if (api.input.pressed("up"))
          s = { ...s, menuIndex: (s.menuIndex - 1 + n) % n };
        if (api.input.pressed("down"))
          s = { ...s, menuIndex: (s.menuIndex + 1) % n };
        if (api.input.pressed("confirm")) {
          if (s.menuIndex === 0) s = run(s);
          else
            s = {
              ...s,
              screen: s.screen === "title" ? "howto" : "title",
              menuIndex: 0,
            };
        }
      }
    }
    if (s.screen === "paused")
      return {
        ...s,
        tickClock: s.tickClock % K.TICK_DT,
        simTime: s.simTime + Math.floor(s.tickClock / K.TICK_DT) * K.TICK_DT,
      };
    while (s.tickClock >= K.TICK_DT) {
      s = { ...sim(s, api), tickClock: s.tickClock - K.TICK_DT };
      if (api.input.value("a") > 0 || api.input.pressed("a")) {
        if (s.ship.fireCooldown === 0 && s.bullets.length < K.MAX_BULLETS) {
          const [id, t] = next(s);
          const x = s.ship.x + Math.cos(s.ship.angle) * K.SHIP_R,
            y = s.ship.y + Math.sin(s.ship.angle) * K.SHIP_R;
          s = {
            ...t,
            bullets: [
              ...t.bullets,
              {
                id,
                x,
                y,
                vx: s.ship.vx + Math.cos(s.ship.angle) * K.MUZZLE_SPEED,
                vy: s.ship.vy + Math.sin(s.ship.angle) * K.MUZZLE_SPEED,
                life: K.BULLET_LIFE,
              },
            ],
            ship: { ...s.ship, fireCooldown: K.FIRE_INTERVAL_TICKS },
          };
          api.audio.play(K.CUES.fire);
        }
      }
      if (
        api.input.pressed("b") &&
        s.torpedoCharge >= 1 &&
        s.torpedoes.length === 0
      ) {
        const [id, t] = next(s);
        s = {
          ...t,
          torpedoCharge: 0,
          torpedoes: [
            ...t.torpedoes,
            {
              id,
              x: s.ship.x,
              y: s.ship.y,
              vx: Math.cos(s.ship.angle) * K.TORPEDO_SPEED,
              vy: Math.sin(s.ship.angle) * K.TORPEDO_SPEED,
              heading: s.ship.angle,
              life: K.TORPEDO_LIFE,
              homing: true,
            },
          ],
        };
      }
    }
    return s;
  },
  render(state, api: RenderApi) {
    draw(api.ctx, state);
  },
};
