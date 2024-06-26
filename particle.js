class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 8;
    // Arbitrary damping to simulate friction / drag
    this.damping = 0.98;
    // For user interaction
    this.dragOffset = createVector();
    this.dragging = false;

    this.locked = false;
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }


  // Standard Euler integration
  update() {
    if (!this.locked && !this.dragging) {
      this.velocity.add(this.acceleration);
      this.velocity.mult(this.damping);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    } else {
      this.velocity.mult(0);
      this.acceleration.mult(0);
    }
  }

  // Newton's law: F = M * A
  applyForce(force) {
    const f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Draw the bob
  display() {
    stroke(255);
    strokeWeight(2);
    fill(127);
    if (this.dragging) {
      fill(200);
    }
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
  }

  handleClick(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;

  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}