class SkillCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'skill-card');

        const title = document.createElement('h3');
        title.setAttribute('class', 'skill-title');
        title.textContent = this.getAttribute('title');

        const description = document.createElement('p');
        description.textContent = this.getAttribute('description');

        const style = document.createElement('style');
        style.textContent = `
            .skill-card {
                background: #f9f9f9;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .skill-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
            }
            .skill-title {
                font-size: 1.2rem;
                color: #005A9C;
                margin-top: 0;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(description);
    }
}

customElements.define('skill-card', SkillCard);
