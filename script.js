import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const myProjects = [
    {
        "number": "01",
        "title": "Where is my Location",
        "link": "https://playlist9.netlify.app/",
        "date": "2025-09",
        "description": "Instantly checks your current location using Geolocation API.",
        "tags": ["geolocation", "javascript", "frontend", "API", "webapp"]
    },
    {
        "number": "02",
        "title": "TweetShirt",
        "link": "https://tweetshirt7-hk.netlify.app/",
        "date": "2025-10",
        "description": "Turns your tweet into a fun T-shirt-style design.",
        "tags": ["design", "twitter", "creative", "javascript", "fun"]
    },
    {
        "number": "03",
        "title": "Custom Note",
        "link": "https://notetoself-hknu.netlify.app/",
        "date": "2025-10",
        "description": "A simple note app that saves instantly in your browser.",
        "tags": ["note", "localstorage", "productivity", "vanillajs", "webapp"]
    },
    {
        "number": "04",
        "title": "JavaScript Quiz",
        "link": "https://javascript-quiz-hknu.netlify.app/",
        "date": "2025-10",
        "description": "Test your JavaScript skills with quick quizzes.",
        "tags": ["quiz", "javascript", "frontend", "learning", "webapp"]
    },
    {
        "number": "05",
        "title": "Infinite Cat Slideshow",
        "link": "https://hknu-cat.netlify.app/",
        "date": "2025-11",
        "description": "Endless slideshow of cute cat photos.",
        "tags": ["cats", "slideshow", "fun", "frontend", "UX"]
    },
    {
        "number": "06",
        "title": "How Many People in Subway",
        "link": "https://hknu-subway.netlify.app/",
        "date": "2025-11",
        "description": "Visualizes real-time subway crowd levels.",
        "tags": ["subway", "data", "visualization", "API", "webapp"]
    },
    {
        "number": "07",
        "title": "Find Weather",
        "link": "https://weather-app-hknu.netlify.app/",
        "date": "2025-11",
        "description": "Shows real-time weather data for any region.",
        "tags": ["weather", "API", "frontend", "UI", "webapp"]
    },
    {
        "number": "08",
        "title": "Find Seoul Event",
        "link": "https://seoul-cultural-event-noti-hknu.netlify.app/",
        "date": "2025-11,12",
        "description": "Quickly browse cultural events happening in Seoul.",
        "tags": ["seoul", "event", "culture", "API", "frontend"]
    },
    {
        "number": "09",
        "title": "When Did Seoul Public Libraries Open?",
        "link": "https://seoul-library-search-mashup-hknu-ls.netlify.app/",
        "date": "2025-12",
        "description": "Check library opening dates on an interactive map.",
        "tags": ["library", "map", "mashup", "data", "openAPI"]
    },
    {
        "number": "10",
        "title": "Real-time Sky News",
        "link": "https://air-pollution5-hknu.netlify.app/",
        "date": "2025-12",
        "description": "Provides live air quality and fine-dust data.",
        "tags": ["environment", "airquality", "pm10", "API", "webapp"]
    },
    {
        "number": "11",
        "title": "Soundboard",
        "link": "https://soundboard-hknu.netlify.app/",
        "date": "2025-12",
        "description": "Play fun sound effects with a single click.",
        "tags": ["sound", "audio", "javascript", "interaction", "fun"]
    }
];

function renderProjects() {
    const container = document.getElementById('project-container');
    let htmlString = '';
    myProjects.forEach(item => {
        const tagsHtml = item.tags.map(tag => `<span class="hash-tag scramble-target">#${tag}</span>`).join('');
        htmlString += `
            <div class="row timeline-row reveal align-items-baseline">
                <div class="col-md-3 year-col scramble-target mb-2 mb-md-0">${item.date}</div>
                <div class="col-md-9 content-col">
                    <h3 class="project-title scramble-target">${item.number}. ${item.title}</h3>
                    <a href="${item.link}" target="_blank" class="project-desc-link">
                        <span class="scramble-target">${item.description}</span>
                        <span style="font-size: 0.8em; margin-left:5px;">↗</span>
                    </a>
                    <div class="project-tags mt-2">${tagsHtml}</div>
                </div>
            </div>
        `;
    });
    container.innerHTML = htmlString;
}
renderProjects();

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 60);
            const end = start + Math.floor(Math.random() * 60);
            this.queue.push({
                from,
                to,
                start,
                end
            });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {
                from,
                to,
                start,
                end,
                char
            } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const scrambleTargets = entry.target.querySelectorAll('.scramble-target');
            scrambleTargets.forEach(el => {
                if (!el.classList.contains('done')) {
                    const fx = new TextScramble(el);
                    fx.setText(el.innerText);
                    el.classList.add('done');
                }
            });
            if (entry.target.classList.contains('scramble-target') && !entry.target.classList.contains('done')) {
                const fx = new TextScramble(entry.target);
                fx.setText(entry.target.innerText);
                entry.target.classList.add('done');
            }
        }
    });
}, {
    threshold: 0.1
});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const iconContainer = document.getElementById('icon-speaker');
const soundOnPath = "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
const soundOffPath = "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z";

function updateIcon(isPlay) {
    iconContainer.innerHTML = `<path d="${isPlay ? soundOnPath : soundOffPath}"/>`;
}

window.addEventListener('load', () => {
    audio.volume = 0.5;
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            updateIcon(true);
        }).catch(error => {
            console.log("Autoplay prevented by browser.");
            updateIcon(false);
        });
    }
});

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        updateIcon(true);
    } else {
        audio.pause();
        updateIcon(false);
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.3) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

const networkCanvas = document.getElementById('network-canvas');
const ctx = networkCanvas.getContext('2d');
let width, height, particles = [];
const mouse = {
    x: null,
    y: null,
    radius: 150
};

function initNetwork() {
    width = networkCanvas.width = window.innerWidth;
    height = networkCanvas.height = window.innerHeight;
    particles = [];
    const numberOfParticles = (width * height) / 6000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1.5;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const dx = (Math.random() - 0.5) * 0.8;
        const dy = (Math.random() - 0.5) * 0.8;
        particles.push({
            x,
            y,
            dx,
            dy,
            size,
            baseX: x,
            baseY: y
        });
    }
}

function animateNetwork() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
        if (mouse.x != null) {
            let dx = mouse.x - p.x;
            let dy = mouse.y - p.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                p.x -= Math.cos(angle) * force * 3;
                p.y -= Math.sin(angle) * force * 3;
            }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 - distance/150 * 0.5})`;
                ctx.lineWidth = 0.8;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateNetwork);
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});
window.addEventListener('resize', initNetwork);
initNetwork();
animateNetwork();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.FogExp2(0x050505, 0.015);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 40);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('vhs-canvas').appendChild(renderer.domElement);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(10, 20, 20);
scene.add(dirLight);
const mainGroup = new THREE.Group();
mainGroup.rotation.z = Math.PI / 4;
mainGroup.rotation.x = -Math.PI / 12;
scene.add(mainGroup);
const stripes = [];
const colors = [0xFFFF00, 0xFF8C00, 0xFF0000, 0xFF00FF, 0x0000FF, 0x00FF00];
const stripeWidth = 90;
const stripeHeight = 1.5;
const stripeDepth = 0.5;
colors.forEach((color, index) => {
    const material = new THREE.MeshPhongMaterial({
        color: color,
        shininess: 100,
        emissive: color,
        emissiveIntensity: 0.8
    });
    const geometry = new THREE.BoxGeometry(stripeWidth, stripeHeight, stripeDepth);
    const mesh = new THREE.Mesh(geometry, material);
    const yPos = (index - (colors.length - 1) / 2) * stripeHeight;
    mesh.position.set(-160, yPos * -1, 0);
    mesh.userData = {
        finalX: 0,
        speed: 0.07,
        delay: index * 15,
        active: false
    };
    stripes.push(mesh);
    mainGroup.add(mesh);
});
let textMesh;
const loader = new FontLoader();
loader.load('https://unpkg.com/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json', function(font) {
    document.getElementById('loading').style.display = 'none';
    const textGeo = new TextGeometry('My Web Portfolio', {
        font: font,
        size: 2.2,
        height: 0.4,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelSegments: 3
    });
    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    const centerY = -0.5 * (textGeo.boundingBox.max.y - textGeo.boundingBox.min.y);
    const textMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.3
    });
    textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.position.set(centerOffset, centerY, 2);
    textMesh.scale.set(0, 0, 0);
    mainGroup.add(textMesh);
});
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.autoRotate = false;
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;
let frameCount = 0;

function animate() {
    requestAnimationFrame(animate);
    frameCount++;
    stripes.forEach(stripe => {
        if (frameCount > stripe.userData.delay) stripe.userData.active = true;
        if (stripe.userData.active) stripe.position.x += (stripe.userData.finalX - stripe.position.x) * stripe.userData.speed;
    });
    if (textMesh && frameCount > 140) {
        const scaleSpeed = 0.06;
        if (textMesh.scale.x < 1) {
            textMesh.scale.x += (1 - textMesh.scale.x) * scaleSpeed;
            textMesh.scale.y += (1 - textMesh.scale.y) * scaleSpeed;
            textMesh.scale.z += (1 - textMesh.scale.z) * scaleSpeed;
        }
    }
    controls.update();
    renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();