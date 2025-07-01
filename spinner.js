import { tags } from './utils.js';

const [div, style] = tags('div', 'style');

class Spinner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadowRoot.replaceChildren(style("@import url('./spinner.css');"), div({ class: 'lds-ripple' }, div(), div(), div()));
    }
}
customElements.define('qr-spinner', Spinner);
