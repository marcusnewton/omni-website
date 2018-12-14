var boids = [];

function setup() {
  var width = document.getElementById('header').offsetWidth;
  var height = document.getElementById('header').offsetHeight;
  var cnv = createCanvas(width, height);
  cnv.parent('#header')
  setFlock();
}

function setFlock() {
  // Set number of boids proportional to canvas area
  let boidCount = width*height*0.00008
  if (boidCount > 100) {
    boidCount = 100
  }
  // Add an initial set of boids into the system
  for (var i = 0; i < boidCount; i++) {
    boids[i] = new Boid(random(width), random(height));
  }
}

function draw() {
  background(27,28,29);
  // Run all the boids
  for (var i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
}

// Boid class
// Methods for Separation, Cohesion
class Boid {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.position = createVector(x, y);
        this.maxspeed = 1; // Maximum speed
        this.maxforce = 0.05; // Maximum steering force
        this.size = random(32,40);
        this.r = this.size/2;
    }
    run(boids) {
        this.flock(boids);
        this.update();
        this.borders();
        this.render();
    }
    // Forces go into acceleration
    applyForce(force) {
        this.acceleration.add(force);
    }
    // We accumulate a new acceleration each time based on two rules
    flock(boids) {
        var sep = this.separate(boids); // Separation
        var coh = this.cohesion(boids); // Cohesion
        // Arbitrarily weight these forces
        sep.mult(2.5);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(coh);
    }
    // Method to update location
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    }
    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        return steer;
    }
    // Draw boid as a circle
    render() {
        noFill();
        strokeWeight(1);
        stroke(108,106,102);
        ellipse(this.position.x, this.position.y, this.size);
    }
    // Wraparound
    borders() {
        if (this.position.x < -this.r)
            this.position.x = width + this.r;
        if (this.position.y < -this.r)
            this.position.y = height + this.r;
        if (this.position.x > width + this.r)
            this.position.x = -this.r;
        if (this.position.y > height + this.r)
            this.position.y = -this.r;
    }
    // Separation
    // Method checks for nearby boids and steers away
    separate(boids) {
        var desiredseparation = 42.0;
        var steer = createVector(0, 0);
        var count = 0;
        // For every boid in the system, check if it's too close
        for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                var diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }
        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }
    // Cohesion
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
    cohesion(boids) {
        var neighbordist = 90;
        var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        var count = 0;
        for (var i = 0; i < boids.length; i++) {
            var d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        }
        else {
            return createVector(0, 0);
        }
    }
}

function windowResized() {
  var width = document.getElementById('header').offsetWidth;
  var height = document.getElementById('header').offsetHeight;
  resizeCanvas(width, height);
  boids = [];
  setFlock();
}
