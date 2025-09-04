// 90s Cyberpunk Animation Designer - Interactive JavaScript

// Global animation states
let animations = {
    bouncingBall: { running: false, speed: 5 },
    matrixRain: { running: false, speed: 10 },
    geometric: { running: false, size: 50 },
    particles: { count: 200 }
};

// Animation 1: Bouncing Ball Matrix
class BouncingBall {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.balls = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.createBalls();
        this.animate();
    }

    createBalls() {
        this.balls = [];
        for (let i = 0; i < 5; i++) {
            this.balls.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * animations.bouncingBall.speed,
                vy: (Math.random() - 0.5) * animations.bouncingBall.speed,
                radius: 15 + Math.random() * 10,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        if (!animations.bouncingBall.running) {
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Update and draw balls
        this.balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Bounce off walls
            if (ball.x <= ball.radius || ball.x >= this.canvas.width - ball.radius) {
                ball.vx = -ball.vx;
            }
            if (ball.y <= ball.radius || ball.y >= this.canvas.height - ball.radius) {
                ball.vy = -ball.vy;
            }

            // Draw ball with glow effect
            this.ctx.save();
            this.ctx.shadowColor = ball.color;
            this.ctx.shadowBlur = 20;
            this.ctx.fillStyle = ball.color;
            this.ctx.beginPath();
            this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x < this.canvas.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    updateSpeed(speed) {
        this.balls.forEach(ball => {
            ball.vx = (ball.vx / Math.abs(ball.vx)) * speed;
            ball.vy = (ball.vy / Math.abs(ball.vy)) * speed;
        });
    }
}

// Animation 2: Matrix Rain
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.animationId = null;
        this.init();
    }

    init() {
        this.createDrops();
        this.animate();
    }

    createDrops() {
        this.drops = [];
        const columns = Math.floor(this.canvas.width / 20);
        for (let i = 0; i < columns; i++) {
            this.drops.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * animations.matrixRain.speed + 1,
                chars: this.generateCharString()
            });
        }
    }

    generateCharString() {
        let str = '';
        for (let i = 0; i < 20; i++) {
            str += this.chars[Math.floor(Math.random() * this.chars.length)];
        }
        return str;
    }

    animate() {
        if (!animations.matrixRain.running) {
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drops.forEach(drop => {
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height) {
                drop.y = 0;
                drop.chars = this.generateCharString();
            }

            // Draw characters with gradient effect
            for (let i = 0; i < drop.chars.length; i++) {
                const alpha = 1 - (i / drop.chars.length);
                this.ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
                this.ctx.font = '16px monospace';
                this.ctx.fillText(drop.chars[i], drop.x, drop.y - (i * 20));
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateSpeed(speed) {
        this.drops.forEach(drop => {
            drop.speed = Math.random() * speed + 1;
        });
    }
}

// Animation 3: Neon Text
class NeonText {
    constructor() {
        this.texts = [
            'CYBER DREAMS',
            'NEON FUTURE',
            'DIGITAL REALM',
            'MATRIX CODE',
            'SYNTHWAVE',
            'RETRO WAVE',
            'CYBERPUNK',
            'NEON NIGHTS'
        ];
        this.currentIndex = 0;
    }

    changeText() {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        const neonDisplay = document.getElementById('neon-display');
        neonDisplay.textContent = this.texts[this.currentIndex];
        
        // Add flash effect
        neonDisplay.style.animation = 'none';
        setTimeout(() => {
            neonDisplay.style.animation = 'neonFlicker 2s ease-in-out infinite alternate';
        }, 10);
    }

    updateColor(color) {
        const neonDisplay = document.getElementById('neon-display');
        neonDisplay.style.color = color;
        neonDisplay.style.textShadow = `
            0 0 5px ${color},
            0 0 10px ${color},
            0 0 15px ${color},
            0 0 20px ${color}
        `;
    }
}

// Animation 4: Geometric Shapes
class GeometricShapes {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shapes = [];
        this.animationId = null;
        this.time = 0;
        this.init();
    }

    init() {
        this.createShapes();
        this.animate();
    }

    createShapes() {
        this.shapes = [];
        for (let i = 0; i < 8; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: animations.geometric.size,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                color: this.getRandomColor(),
                type: Math.floor(Math.random() * 3) // 0: triangle, 1: square, 2: hexagon
            });
        }
    }

    getRandomColor() {
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#00ff80'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        if (!animations.geometric.running) {
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.02;

        this.shapes.forEach((shape, index) => {
            shape.rotation += shape.rotationSpeed;
            
            // Pulsing effect
            const pulse = Math.sin(this.time + index) * 0.3 + 1;
            const currentSize = shape.size * pulse;

            this.ctx.save();
            this.ctx.translate(shape.x, shape.y);
            this.ctx.rotate(shape.rotation);
            this.ctx.shadowColor = shape.color;
            this.ctx.shadowBlur = 15;
            this.ctx.strokeStyle = shape.color;
            this.ctx.lineWidth = 3;
            this.ctx.fillStyle = shape.color + '20';

            this.drawShape(shape.type, currentSize);
            this.ctx.restore();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawShape(type, size) {
        this.ctx.beginPath();
        
        switch (type) {
            case 0: // Triangle
                this.ctx.moveTo(0, -size);
                this.ctx.lineTo(-size * 0.866, size * 0.5);
                this.ctx.lineTo(size * 0.866, size * 0.5);
                this.ctx.closePath();
                break;
            case 1: // Square
                this.ctx.rect(-size/2, -size/2, size, size);
                break;
            case 2: // Hexagon
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * size;
                    const y = Math.sin(angle) * size;
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                break;
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    updateSize(size) {
        this.shapes.forEach(shape => {
            shape.size = size;
        });
    }
}

// Animation 5: Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.animate();
    }

    createExplosion(x, y) {
        const particleCount = animations.particles.count;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 5 + 2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#00ff80', '#ff8000'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;

            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle with glow
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateParticleCount(count) {
        animations.particles.count = count;
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animation instances
    const ballCanvas = document.getElementById('ball-canvas');
    const matrixCanvas = document.getElementById('matrix-canvas');
    const geoCanvas = document.getElementById('geo-canvas');
    const particleCanvas = document.getElementById('particle-canvas');

    const bouncingBall = new BouncingBall(ballCanvas);
    const matrixRain = new MatrixRain(matrixCanvas);
    const neonText = new NeonText();
    const geometricShapes = new GeometricShapes(geoCanvas);
    const particleSystem = new ParticleSystem(particleCanvas);

    // Make instances globally accessible
    window.bouncingBall = bouncingBall;
    window.matrixRain = matrixRain;
    window.neonText = neonText;
    window.geometricShapes = geometricShapes;
    window.particleSystem = particleSystem;
});

// Control functions
function toggleBouncingBall() {
    animations.bouncingBall.running = !animations.bouncingBall.running;
    const btn = event.target;
    btn.textContent = animations.bouncingBall.running ? 'Stop Animation' : 'Start Animation';
}

function updateBallSpeed(speed) {
    animations.bouncingBall.speed = parseInt(speed);
    if (window.bouncingBall) {
        window.bouncingBall.updateSpeed(speed);
    }
}

function toggleMatrixRain() {
    animations.matrixRain.running = !animations.matrixRain.running;
    const btn = event.target;
    btn.textContent = animations.matrixRain.running ? 'Stop Rain' : 'Start Rain';
}

function updateRainSpeed(speed) {
    animations.matrixRain.speed = parseInt(speed);
    if (window.matrixRain) {
        window.matrixRain.updateSpeed(speed);
    }
}

function changeNeonText() {
    if (window.neonText) {
        window.neonText.changeText();
    }
}

function updateNeonColor(color) {
    if (window.neonText) {
        window.neonText.updateColor(color);
    }
}

function toggleGeometric() {
    animations.geometric.running = !animations.geometric.running;
    const btn = event.target;
    btn.textContent = animations.geometric.running ? 'Stop Shapes' : 'Start Shapes';
}

function updateGeoSize(size) {
    animations.geometric.size = parseInt(size);
    if (window.geometricShapes) {
        window.geometricShapes.updateSize(size);
    }
}

function explodeParticles() {
    if (window.particleSystem) {
        const canvas = document.getElementById('particle-canvas');
        const rect = canvas.getBoundingClientRect();
        const x = rect.width / 2;
        const y = rect.height / 2;
        window.particleSystem.createExplosion(x, y);
    }
}

function updateParticleCount(count) {
    animations.particles.count = parseInt(count);
    if (window.particleSystem) {
        window.particleSystem.updateParticleCount(count);
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some extra 90s flair - random glitch effects
function addGlitchEffect() {
    const elements = document.querySelectorAll('.section-title, .hero-title');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = `
                2px 0 0 #ff00ff,
                -2px 0 0 #00ffff,
                0 0 20px #ff00ff
            `;
            this.style.transform = 'skew(2deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = '';
            this.style.transform = '';
        });
    });
}

// Initialize glitch effects
document.addEventListener('DOMContentLoaded', addGlitchEffect);