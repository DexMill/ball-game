function setup() {
  createCanvas(800, 900);
  g = 50;
  h = 50;
  a = 750;
  d = 750;

  FACING = "DOWN";

  GAME_OVER = false;

  IS_ARROW = false;

  score = 10;

  enemyAIStart();
}

function enemyAIStart() {
  const interval = setInterval(() => {
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
      score = score - 1;

      if (score <= 0) {
        GAME_OVER = true;
        clearInterval(interval);
      }
    }
  }, 1000);
}

function draw() {
  background("white");

  textSize(32);
  fill(0, 0, 0);
  text("score: " + score, 200, 850);

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

  fill("red");

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

  if (GAME_OVER) {
    fill("white");
    square(200, 200, 400);

    textSize(32);
    fill(0, 0, 0);
    text("Game Over", 315, 400);
  }

  if (IS_ARROW) {
    fill("blue");

    if (FACING === "UP") {
      square(g - 20, h - 100, 40);
    }

    if (FACING === "DOWN") {
      square(g + 130, h - 20, 40);
    }

    if (FACING === "RIGHT") {
      square(g - 20, h - 130, 40);
    }

    if (FACING === "LEFT") {
      square(g - 20, h + 130, 40);
    }
  }
}

function keyPressed() {
  if (keyIsDown(ENTER)) {
    g = 50;
    h = 50;
    a = 750;
    d = 750;
    score = 10;
    GAME_OVER = false;
    enemyAIStart();
  }

  if (GAME_OVER) {
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
}

function createArrow() {
  IS_ARROW = true;
}
