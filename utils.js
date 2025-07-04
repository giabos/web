// helper for createElement
const tag =
    (name) =>
    (...args) => {
        const elem = document.createElement(name);
        if (args[0] instanceof Object && !(args[0] instanceof HTMLElement) && !Array.isArray(args[0])) {
            for (var k in args[0]) elem.setAttribute(k, args[0][k]);
            args.shift();
        }
        args.flat().forEach((e) => elem.appendChild(e instanceof HTMLElement ? e : document.createTextNode(`${e}`)));
        return elem;
    };
export const tags = (...names) => names.map(tag);

export const getJson = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const postJson = async (url, data, options = {}) => {
    const { headers, ...otherOptions } = options;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(data),
        ...otherOptions,
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const $ = (selector) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
        throw new Error(`No elements found for selector: ${selector}`);
    }
    return elements.length === 1 ? elements[0] : Array.from(elements);
};

// helper method to create a web-component.
// the render method passed as parameter accept a attributes object and should return the element(s) to render.
export const wc = (name, render, observedAttributes = []) =>
    customElements.define(
        name,
        class extends HTMLElement {
            static observedAttributes = observedAttributes;
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            get attrs() {
                const result = Array.from(this.attributes).reduce((c, a) => ({ ...c, [a.name]: a.value }), {});
                console.log(result);
                return result;
            }
            attributeChangedCallback(name, oldValue, newValue) {
                this.update();
            }
            connectedCallback() {
                this.update();
            }
            update() {
                const result = render(this.attrs);
                const children = Array.isArray(result) ? result : [result];
                this.shadowRoot.replaceChildren(...children);
            }
        },
    );
