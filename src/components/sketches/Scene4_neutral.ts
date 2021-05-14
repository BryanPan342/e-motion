import p5 from 'p5';
export default function sketch(p: p5): void {
    let canvas: p5.Renderer;

    const fireworks: Firework [] = [];
    var gravity: p5.Vector;

    p.setup = () => {
        canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        p.colorMode(p.HSB);
        canvas.id('p5-background');
        gravity = p.createVector(0, 0.095);
        p.stroke(255);
        p.strokeWeight(4);
        p.background(0);
    };

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight, true);
    };

    p.draw = () => {
        p.colorMode(p.RGB);
        p.background(0, 0, 0, 25);

        if (p.random(1) < 0.03) {
            fireworks.push(new Firework());
        }

        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].show();

            if (fireworks[i].done()) {
            fireworks.splice(i, 1);
            }
        }
    };

    class Firework {
        explodeSize: number;
        firework: Particle;
        exploded: boolean;
        particles: Array<Particle>;

        constructor() {
            this.explodeSize = p.random(0, 6);
            this.firework = new Particle(p.random(p.width), p.height, true);
            this.exploded = false;
            this.particles = [];
        }

        update() {
            if (!this.exploded) {
                this.firework.applyForce(gravity);
                this.firework.update();
            
                if (this.firework.vel.y >= 0) {
                    this.exploded = true;
                    this.explode();
                }
            }
          
            for (var i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
            
                if (this.particles[i].done()) {
                    this.particles.splice(i, 1);
                }
            }
        }
    
        done() {
            if (this.exploded && this.particles.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        
        show() {
            if (!this.exploded) {
                this.firework.show();
            }
        
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].show();
            }
        }

        explode () {
            for (var i = 0; i < (this.explodeSize * 15); i++) {
                var p = new Particle(
                    this.firework.pos.x,
                    this.firework.pos.y,
                    false
                );
                this.particles.push(p);
            }
        }
    }


    class Particle {
        pos: p5.Vector;
        firework: boolean;
        lifespan: number;
        acc: p5.Vector;
        ran: number;
        vel: p5.Vector;

        constructor(x: number, y: number, firework: boolean) {
            this.pos = p.createVector(x, y);
            this.firework = firework;
            this.lifespan = 255;
            this.acc = p.createVector(0, 0);
            this.ran = p.random(0, 4);
            if (this.firework) {
                this.vel = p.createVector(0, p.random(-12, -8));
            } else {
                this.vel = p5.Vector.random2D();
                this.vel.mult(p.random(2, 10));
            }
        }
        
        applyForce(force: p5.Vector) {
            this.acc.add(force);
        }

        update() {
            if (!this.firework) {
                this.vel.mult(0.9);
                this.lifespan -= 4;
            }
        
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    
        done() {
            if (this.lifespan < 0) {
                return true;
            } else {
                return false;
            }
        }
        
        show() {
            p.colorMode(p.HSB);
    
            if (!this.firework) {  // after explosion
                p.strokeWeight(2);
                p.stroke(60, 255, 255, this.lifespan); 

            } 
            else {
                p.strokeWeight(4);
                //stroke('rgba(255,255,0, 1)'); 
            }

            //let fireworkColor = "#ffd361";
            //fireworkColor.setAlpha(100);
            //stroke(fireworkColor);
            //fireworkColor.setAlpha(100);
            if (this.ran < 1)
                p.stroke('rgba(255,211,97,0.2)'); 
            else if (this.ran < 2) 
                p.stroke('rgba(255,211,97,0.4)'); 
            else if (this.ran < 3)
                p.stroke('rgba(255,211,97,0.6)'); 
            else 
                p.stroke('rgba(255,211,97,0.8)'); 

            p.point(this.pos.x, this.pos.y);
        }
    }
}
