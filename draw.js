let Sword_Facing;

const WINNING_SCORE = 10;

const SWORD_COOLDOWN = 1000;

let SWORD_ENABLED = true;

let hasEnemyAIStarted = false;

// Possible options: START, GAME
let SCREEN = "START";

function setup() {
  createCanvas(1000, 1000);

  //player spawn
  g = 50;
  h = 50;

  // \/ is where the coords for the enemy spawn is
  a = 750;
  d = 750;

  IS_ARROW = false;
  ARROW_FACING = "UP";
  arrowX = g;
  arrowY = h;

  IsSword = false;
  Sword_Facing = "up";
  SwordX = 50;
  SwordY = 50;

  FACING = "DOWN";

  GAME_OVER = false;

  ENEMY_FILL = "red";

  score = 0;
  lives = 10;

  if (!hasEnemyAIStarted) {
    hasEnemyAIStarted = true;
    enemyAIStart();
  }
}

function enemyAIStart() {
  const interval = setInterval(() => {
    if (score == WINNING_SCORE) {
      clearInterval(interval);
      return;
    }

    if (SCREEN != "GAME") {
      return;
    }

    if (a > g) {
      a = a - 100;
    }

    if (a < g) {
      a = a + 100;
    }

    if (d > h) {
      d = d - 100;
    }

    if (d < h) {
      d = d + 100;
    }

    if (a === g && d === h) {
      lives = lives - 1;

      if (lives <= 0) {
        GAME_OVER = true;
        clearInterval(interval);
      }
    }
  }, 500);
}

function arrowAIStart() {
  const interval = setInterval(() => {
    if (ARROW_FACING === "UP") {
      arrowY = arrowY - 10;
    }

    if (ARROW_FACING === "DOWN") {
      arrowY = arrowY + 10;
    }

    if (ARROW_FACING === "RIGHT") {
      arrowX = arrowX + 10;
    }

    if (ARROW_FACING === "LEFT") {
      arrowX = arrowX - 10;
    }

    if (arrowX >= 801) {
      IS_ARROW = false;
      clearInterval(interval);
    }

    if (arrowX <= 1) {
      IS_ARROW = false;
      clearInterval(interval);
    }

    if (arrowY <= 1) {
      IS_ARROW = false;
      clearInterval(interval);
    }

    if (arrowY >= 801) {
      IS_ARROW = false;
      clearInterval(interval);
    }

    if (Math.abs(arrowX - a) < 50 && Math.abs(arrowY - d) < 50) {
      const [newA, newD] = randomCoords();
      a = newA;
      d = newD;
      score = score + 1;
      IS_ARROW = false;
      clearInterval(interval);
    }
  }, 20);
}

function draw() {
  background("white");

  if (SCREEN == "START") {
    fill("lightGray");
    square(0, 0, 800);

    fill("White");
    square(200, 200, 400);

    textSize(32);
    fill(0, 0, 0);
    text("Press S to start", 290, 400);

    textSize(32);
    fill(0, 0, 0);
    text("Press Q to for settings", 250, 450);

    return;
  }

  if (SCREEN == "SETTINGS") {
    fill("darkGrey");
    square(0, 0, 800);

    textSize(32);
    fill(255, 255, 255);
    text("Movement: Arrow keys look then they move", 0, 300);

    textSize(32);
    fill(255, 255, 255);
    text("Combat: b does sword sword has a 1 sec cooldown", 0, 400);

    textSize(32);
    fill(255, 255, 255);
    text(",spacebar does arrows", 0, 440);

    textSize(32);
    fill(255, 255, 255);
    text("misc: ctrl gose to start, other keys will be on the button", 0, 540);

    return;
  }

  textSize(32);
  fill(0, 0, 0);
  text("score: " + score + " / " + WINNING_SCORE, 600, 850);

  fill(250, 0, 50);
  text("lives: " + lives, 60, 850);

  fill("green");
  square(0, 0, 800);

  fill("white");

  let i = 0;
  let x = 0;
  let y = 0;
  while (i++ < 9) {
    line(x, 0, x, 800);
    x = x + 100;

    line(0, y, 800, y);
    y = y + 100;
  }

  circle(g, h, 90);

  if (FACING === "DOWN") {
    fill("black");
    circle(g, h + 30, 10);
  }
  if (FACING === "UP") {
    fill("black");
    circle(g, h - 30, 10);
  }
  if (FACING === "RIGHT") {
    fill("black");
    circle(g + 30, h, 10);
  }
  if (FACING === "LEFT") {
    fill("black");
    circle(g - 30, h, 10);
  }

  fill(ENEMY_FILL);

  circle(a, d, 90);

  if (h >= 801) {
    h = 750;
  }

  if (h <= 1) {
    h = 50;
  }

  if (g <= 1) {
    g = 50;
  }

  if (g >= 801) {
    g = 750;
  }

  if (score == WINNING_SCORE) {
    fill("White");
    square(200, 200, 400);

    textSize(32);
    fill(0, 0, 0);
    text("Victory", 350, 400);
  }

  if (GAME_OVER) {
    fill("White");
    square(200, 200, 400);

    textSize(32);
    fill(0, 0, 0);
    text("Game Over", 315, 400);
  }

  if (IS_ARROW) {
    fill("blue");
    square(arrowX, arrowY, 40);
  }

  if (IsSword === true) {
    fill("black");
    square(SwordX, SwordY, 50);
  }
}

function keyPressed() {
  if ((GAME_OVER || score == WINNING_SCORE) && keyIsDown(ENTER)) {
    g = 50;
    h = 50;
    a = 750;
    d = 750;
    lives = 10;
    score = 0;
    GAME_OVER = false;
    enemyAIStart();
  }

  if (GAME_OVER || score == WINNING_SCORE) {
    return;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (FACING !== "RIGHT") {
      FACING = "RIGHT";
      return;
    }
    g = g + 100;
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (FACING !== "LEFT") {
      FACING = "LEFT";
      return;
    }
    g = g - 100;
  }
  if (keyIsDown(UP_ARROW)) {
    if (FACING !== "UP") {
      FACING = "UP";
      return;
    }
    h = h - 100;
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (FACING !== "DOWN") {
      FACING = "DOWN";
      return;
    }
    h = h + 100;
  }

  if (keyIsDown(32)) {
    createArrow();
  }

  if (keyIsDown(66)) {
    swordAttack();
  }

  if (SCREEN == "START" && keyIsDown(83)) {
    SCREEN = "GAME";
  }

  if (keyIsDown(17)) {
    SCREEN = "START";
    setup();
  }

  if (SCREEN == "START" && keyIsDown(81)) {
    SCREEN = "SETTINGS";
  }
}

function createArrow() {
  if (IS_ARROW) {
    return;
  }

  IS_ARROW = true;
  ARROW_FACING = FACING;

  if (FACING === "UP") {
    arrowX = g - 20;
    arrowY = h - 90;
  }

  if (FACING === "DOWN") {
    arrowX = g - 20;
    arrowY = h + 50;
  }

  if (FACING === "RIGHT") {
    arrowX = g + 50;
    arrowY = h - 20;
  }

  if (FACING === "LEFT") {
    arrowX = g - 90;
    arrowY = h - 20;
  }

  arrowAIStart();
}

function swordAttack() {
  if (!SWORD_ENABLED) {
    return;
  }

  SWORD_ENABLED = false;

  setTimeout(() => {
    SWORD_ENABLED = true;
  }, SWORD_COOLDOWN);

  IsSword = true;

  Sword_Facing = FACING;
  if (Sword_Facing === "UP") {
    SwordX = g - 75;
    SwordY = h - 100;
  }

  if (Sword_Facing === "DOWN") {
    SwordX = g - 75;
    SwordY = h + 50;
  }

  if (Sword_Facing === "RIGHT") {
    SwordX = g + 50;
    SwordY = h - 75;
  }

  if (Sword_Facing === "LEFT") {
    SwordX = g - 100;
    SwordY = h - 75;
  }

  let i = 0;

  const interval = setInterval(() => {
    if (i++ > 10) {
      i = 0;
      IsSword = false;
      clearInterval(interval);
    }

    if (Sword_Facing === "UP") {
      SwordX = SwordX + 10;
    }

    if (Sword_Facing === "DOWN") {
      SwordX = SwordX + 10;
    }

    if (Sword_Facing === "RIGHT") {
      SwordY = SwordY + 10;
    }

    if (Sword_Facing === "LEFT") {
      SwordY = SwordY + 10;
    }

    if (Math.abs(SwordX - a) < 100 && Math.abs(SwordY - d) < 100) {
      const [newA, newD] = randomCoords();
      a = newA;
      d = newD;
      score = score + 1;
      IsSword = false;
      clearInterval(interval);
    }

    if (SwordX >= 801) {
      IsSword = false;
      clearInterval(interval);
    }

    if (SwordX <= 1) {
      IsSword = false;
      clearInterval(interval);
    }

    if (SwordY <= 1) {
      IsSword = false;
      clearInterval(interval);
    }

    if (SwordY >= 801) {
      IsSword = false;
      clearInterval(interval);
    }
  }, 30);
}

function randomCoords() {
  const x = Math.ceil(Math.random() * 7) * 100 + 50;
  const y = Math.ceil(Math.random() * 7) * 100 + 50;
  return [x, y];
}
