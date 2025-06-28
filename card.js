import {tags} from './utils.js';

const [article, footer, h4, p, img, slot, div, style] = tags('article', 'footer', 'h4', 'p', 'img', 'slot', 'div', 'style');



const styles = `
	
 article.card {
	display: flex;
	flex-direction: column;
	/*max-width: 200px;*/
	background-color: white;
	box-shadow: 4px 4px 5px 1px rgba(125,121,121,0.75);
	-webkit-box-shadow: 4px 4px 5px 1px rgba(125,121,121,0.75);
	-moz-box-shadow: 4px 4px 5px 1px rgba(125,121,121,0.75);
}

article.card img {
	flex: 0 0 300px;
	height: 100%;
	object-fit: cover;
}

article.card footer {
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 5px 10px;
}

article.card div {
	display: flex;
	justify-content: space-between;
}

article.card h4,p {
	margin: 0;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

article.card h4 {
	font-weith: 600;
}

article.car p {
	font-size: 10px;
}


`;



class Card extends HTMLElement {
	constructor () {
		super();
		this.attachShadow({ mode: "open" });
	}
	static get observedAttributes() {
        return ['imgUrl', 'title', 'description'];
    }
    connectedCallback() {
    	const imgUrl = this.getAttribute('imgUrl');
    	const title = this.getAttribute('title');
    	const description = this.getAttribute('description');
    	this.shadowRoot.replaceChildren(style(styles), article({'class': 'card'}, img({src:imgUrl}), footer(div(h4(title), slot()), p(description))));
    }
}
customElements.define('qr-card', Card);

