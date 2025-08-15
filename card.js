import { tags, wc } from './utils.js';

const [article, footer, h4, p, img, slot, div, style] = tags('article', 'footer', 'h4', 'p', 'img', 'slot', 'div', 'style');

wc('qr-card', (attrs) => [
	style("@import url('./card.css');"),
    article({ class: 'card' }, img({ src: attrs.imgurl }), footer({style: 'color: ' + attrs.color || "black"}, div(h4(attrs.title), slot()), p(attrs.description))),
]);
