  const points = [];
  let upperHull = [];
  let lowerHull = [];
  let hull = [];


  let leftMost;
  let currentVertex;
  let index;
  let nextVertex;

  function setup() {
    createCanvas(500, 500);
    let buffer = 20;
    for (let i = 0; i < 10; i++) {
      points.push(
        createVector(
          random(buffer, width - buffer),
          random(buffer, height - buffer)
        )
      );
    }

    points.sort((a, b) => a.x - b.x)
    leftMost = points[0]
    currentVertex = leftMost;
    nextVertex = points[2];
    upperHull.push(points[0], points[1]);
    index = 2;

    for (let i = 2; i < points.length; i++) {
      upperHull.push(points[i])

      let determinant = (
        ((points[i-1].x - points[i-2].x) * (points[i].y - points[i-2].y)) - 
        ((points[i-1].y - points[i-2].y) * (points[i].x - points[i-2].x))
      )

      while(upperHull.length > 2 && determinant > 0) {
        upperHull.splice(upperHull.length - 1, 1);
      }
  }
  lowerHull.push(points[points.length -1], points[points.length - 2])

  for (let i = points.length - 3; i >= 0; i--) {
    lowerHull.push(points[i])

    let determinant = (
      ((points[i+1].x - points[i+2].x) * (points[i].y - points[i+2].y)) - 
      ((points[i+1].y - points[i+2].y) * (points[i].x - points[i+2].x))
    )

    while(lowerHull.length > 2 && determinant < 0) {
      lowerHull.splice(lowerHull.length - 1, 1);
    }
  }

  lowerHull.splice(0, 1);
  lowerHull.splice(lowerHull.length, 1);
  hull = [...upperHull, ...lowerHull]
  }

  function draw() {
    background(0);

    stroke(255)
    strokeWeight(9)

    for (let p of points) {
      point(p.x, p.y)
    }

    stroke(0, 0, 255);
    fill(0, 0, 255, 50);
    beginShape();
    for (let p of hull) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

  }
