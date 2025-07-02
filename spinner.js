import { tags, wc } from './utils.js';

const [div, style] = tags('div', 'style');

wc('qr-spinner', () => [style("@import url('./spinner.css');"), div({ class: 'lds-ripple' }, div(), div(), div())]);
