  const points = [];
  let upperHull = [];
  let lowerHull = [];
  let hull = [];


  let leftMost;
  let currentVertex;
  let index;
  let nextVertex;

  function setup() {
    createCanvas(1000, 1000);
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
    nextVertex = points[1];
    upperHull.push(points[0], points[1]);
    index = 2;
  }

  function draw() {
    background(0);

    stroke(255)
    strokeWeight(9)

    for (let p of points) {
      point(p.x, p.y)
    }

    stroke(0, 255, 0);
    strokeWeight(25)
    point(leftMost.x, leftMost.y);

    stroke(200, 0, 255);
    strokeWeight(32)
    point(currentVertex.x, currentVertex.y);

    stroke(0, 255, 0);
    strokeWeight(2);
    line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)


    // implementing cross product //
    for (let i = 3; i < points.length; i++) {
      do {
        console.log(i)
        upperHull.push(points[i])
        let checking = points[i];

        stroke(255)
        line(currentVertex.x, currentVertex.y, checking.x, checking.y)

        const a = p5.Vector.sub(nextVertex, currentVertex);
        const b = p5.Vector.sub(checking, currentVertex);
        const cross = a.cross(b);
        if (cross < 0) {
          nextVertex = checking
        }
      }
      while(upperHull.length > 2 && cross < 0) {
        upperHull.splice(i-1, 1);
      }
    }
    lowerHull.push(points[points.length], points[points.length - 1])

    for (let i = points.length - 2; i < 1; i--) {
      lowerHull.push(points[i])
      const c = p5.Vector.sub(nextVertex, currentVertex);
      const d = p5.Vector.sub(points[i], currentVertex);
      const cross = c.cross(d);
      while(lowerHull.length < 2 && cross < 0) {
        upperHull.splice(i-1, 1);
      }
    }

    lowerHull.splice(0, 1);
    lowerHull.splice(lowerHull.length - 1);
    hull = [...upperHull, ...lowerHull]
  }
