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

// --- Web Component: Area Converter ---
class AreaConverter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.pyeongToM2 = 3.305785;
        this.m2ToPyeong = 0.3025;
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                }
                .converter-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 32px;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                    border: 1px solid rgba(0,0,0,0.03);
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                label {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: oklch(45% 0.02 260);
                    display: flex;
                    justify-content: space-between;
                }
                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                input {
                    width: 100%;
                    padding: 1.2rem;
                    border-radius: 16px;
                    border: 2px solid oklch(0% 0 0 / 0.05);
                    font-size: 1.5rem;
                    font-weight: 700;
                    font-family: 'Pretendard', sans-serif;
                    background: oklch(99% 0 0);
                    transition: all 0.3s ease;
                    color: oklch(25% 0.05 260);
                }
                input:focus {
                    outline: none;
                    border-color: oklch(75% 0.15 80);
                    background: white;
                    box-shadow: 0 0 0 4px oklch(75% 0.15 80 / 0.1);
                }
                .unit {
                    position: absolute;
                    right: 1.2rem;
                    font-weight: 700;
                    color: oklch(45% 0.02 260);
                    pointer-events: none;
                }
                .quick-actions {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                .quick-btn {
                    padding: 0.6rem;
                    border-radius: 10px;
                    border: 1px solid oklch(0% 0 0 / 0.05);
                    background: white;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: oklch(45% 0.02 260);
                }
                .quick-btn:hover {
                    background: oklch(75% 0.15 80 / 0.1);
                    border-color: oklch(75% 0.15 80);
                    color: oklch(25% 0.05 260);
                }
                .info-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: oklch(98% 0 0);
                    border-radius: 16px;
                    font-size: 0.85rem;
                    color: oklch(45% 0.02 260);
                    line-height: 1.5;
                }
                .copy-btn {
                    background: none;
                    border: none;
                    color: oklch(75% 0.15 80);
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 0.8rem;
                    padding: 0;
                    text-decoration: underline;
                }
            </style>
            <div class="converter-card">
                <div class="input-group">
                    <label>평수 (Pyeong)</label>
                    <div class="input-wrapper">
                        <input type="number" id="pyeong" placeholder="0" step="any">
                        <span class="unit">평</span>
                    </div>
                    <div class="quick-actions">
                        <button class="quick-btn" data-val="18">18평</button>
                        <button class="quick-btn" data-val="24">24평</button>
                        <button class="quick-btn" data-val="32">32평</button>
                        <button class="quick-btn" data-val="45">45평</button>
                    </div>
                </div>

                <div style="text-align: center; color: oklch(75% 0.15 80); font-weight: 800; font-size: 1.2rem;">⇄</div>

                <div class="input-group">
                    <label>제곱미터 (m²)</label>
                    <div class="input-wrapper">
                        <input type="number" id="m2" placeholder="0" step="any">
                        <span class="unit">m²</span>
                    </div>
                    <div class="quick-actions">
                        <button class="quick-btn" data-m2="59">59㎡</button>
                        <button class="quick-btn" data-m2="84">84㎡</button>
                        <button class="quick-btn" data-m2="114">114㎡</button>
                        <button class="quick-btn" data-m2="135">135㎡</button>
                    </div>
                </div>

                <div class="info-box">
                    • 1평 ≈ 3.3058m²<br>
                    • 1m² ≈ 0.3025평<br>
                    • 한국 아파트 기준: 84㎡는 약 25.4평 (실제 분양 면적과 다를 수 있습니다.)
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const pyeongInput = this.shadowRoot.getElementById('pyeong');
        const m2Input = this.shadowRoot.getElementById('m2');
        const quickBtns = this.shadowRoot.querySelectorAll('.quick-btn');

        pyeongInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
                m2Input.value = (val * this.pyeongToM2).toFixed(2);
            } else {
                m2Input.value = '';
            }
        });

        m2Input.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
                pyeongInput.value = (val * this.m2ToPyeong).toFixed(2);
            } else {
                pyeongInput.value = '';
            }
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.val) {
                    pyeongInput.value = btn.dataset.val;
                    pyeongInput.dispatchEvent(new Event('input'));
                } else if (btn.dataset.m2) {
                    m2Input.value = btn.dataset.m2;
                    m2Input.dispatchEvent(new Event('input'));
                }
            });
        });
    }
}

customElements.define('area-converter', AreaConverter);

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

// --- Lotto Generator Logic ---
function initLotto() {
    const lottoBtn = document.getElementById('lotto-btn');
    const ballContainer = document.getElementById('lotto-ball-container');
    if (!lottoBtn || !ballContainer) return;

    function generateLotto() {
        ballContainer.innerHTML = ''; // Clear previous balls
        let numbers = [];
        while(numbers.length < 6) {
            let num = Math.floor(Math.random() * 45) + 1;
            if(!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        numbers.sort((a, b) => a - b);

        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = 'number-ball';
            ball.innerText = num;
            ball.style.animationDelay = `${index * 0.1}s`;

            if (num <= 10) ball.classList.add('ball-1');
            else if (num <= 20) ball.classList.add('ball-11');
            else if (num <= 30) ball.classList.add('ball-21');
            else if (num <= 40) ball.classList.add('ball-31');
            else ball.classList.add('ball-41');

            ballContainer.appendChild(ball);
        });
    }

    lottoBtn.addEventListener('click', generateLotto);
    generateLotto(); // Initial generation
}

// --- Scroll Spy & Active Nav ---
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    new HeroBackground();
    initScrollAnimations();
    initForm();
    initLotto();
    initScrollSpy();
...
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
