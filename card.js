import {tags} from './utils.js';

const [article, footer, h4, p, img, slot, div, style] 
	= tags('article', 'footer', 'h4', 'p', 'img', 'slot', 'div', 'style');

class Card extends HTMLElement {
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
	}
	/*static get observedAttributes() {
        return ['imgUrl', 'title', 'description'];
    }*/
    #attr (name) {
    	return this.getAttribute(name);
    }
    connectedCallback() {
    	this.shadowRoot.replaceChildren(
    		style("@import url('./card.css');"), 
    		article({'class': 'card'}, 
    			img({src:this.#attr('imgUrl')}), 
    			footer(div(h4(this.#attr('title')), slot()), p(this.#attr('description')))
    		)
    	);
    }
}
customElements.define('qr-card', Card);

