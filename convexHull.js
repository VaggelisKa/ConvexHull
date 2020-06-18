const points = [];


function setup() {
  createCanvas(500, 500);
  let buffer = 20;
  for (let i = 0; i < 100; i++) {
    points.push(
      createVector(
        random(buffer, width - buffer),
        random(buffer, height - buffer)
      )
    );
  }
