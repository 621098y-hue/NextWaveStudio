import * as THREE from 'three';

// --- Three.js Hero Background ---
class HeroBackground {
    constructor() {
        this.container = document.getElementById('three-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        // Add abstract geometric shapes
        this.geometry = new THREE.IcosahedronGeometry(1, 1);
        this.material = new THREE.MeshPhongMaterial({
            color: 0xdeb887, // Gold-ish
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        this.shapes = [];
        for (let i = 0; i < 20; i++) {
            const mesh = new THREE.Mesh(this.geometry, this.material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.scale.setScalar(Math.random() * 0.5 + 0.5);
            this.scene.add(mesh);
            this.shapes.push(mesh);
        }

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 2);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));

        this.camera.position.z = 5;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.shapes.forEach((shape, i) => {
            shape.rotation.x += 0.002;
            shape.rotation.y += 0.003;
            shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });

        this.renderer.render(this.scene, this.camera);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
}

// --- Web Component: Service Card ---
class ServiceCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const icon = this.getAttribute('icon') || 'store';
        const title = this.getAttribute('title') || 'Service Title';
        const description = this.getAttribute('description') || 'Service description goes here.';

        // Map icons to simple SVG shapes or Lucide-like paths
        const icons = {
            store: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>`,
            calculator: `<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="18"></line><path d="M16 10h.01"></path><path d="M12 10h.01"></path><path d="M8 10h.01"></path><path d="M12 14h.01"></path><path d="M8 14h.01"></path><path d="M12 18h.01"></path><path d="M8 18h.01"></path>`,
            map: `<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>`
        };

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    border: 1px solid rgba(0,0,0,0.03);
                }
                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    border-color: oklch(75% 0.15 80 / 0.3);
                }
                .icon-wrapper {
                    width: 50px;
                    height: 50px;
                    background: oklch(75% 0.15 80 / 0.1);
                    color: oklch(75% 0.15 80);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.5rem;
                }
                svg {
                    width: 24px;
                    height: 24px;
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                h3 {
                    margin: 0;
                    font-size: 1.5rem;
                    color: oklch(25% 0.05 260);
                }
                p {
                    margin: 0;
                    color: oklch(45% 0.02 260);
                    line-height: 1.6;
                }
            </style>
            <div class="card">
                <div class="icon-wrapper">
                    <svg viewBox="0 0 24 24">${icons[icon] || icons.store}</svg>
                </div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
    }
}

customElements.define('service-card', ServiceCard);

// --- Scroll Animations ---
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > .container, .about-image, .about-text').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Add styles for the observed elements dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// --- Form Handling ---
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.textContent = '보내는 중...';

        // Simulate API call
        setTimeout(() => {
            alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다!');
            form.reset();
            btn.disabled = false;
            btn.textContent = originalText;
        }, 1500);
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    new HeroBackground();
    initScrollAnimations();
    initForm();

    // Smooth header appearance on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
