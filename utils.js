

// helper for createElement     
const tag = name => (...args) => {
  const elem = document.createElement(name);
  if (args[0] instanceof Object && !(args[0] instanceof HTMLElement) && !Array.isArray(args[0])) {
  	for (var k in args[0]) elem.setAttribute(k, args[0][k]);
    args.shift();
  }
  args.flat().forEach(e => elem.appendChild(e instanceof HTMLElement ? e : document.createTextNode(`${e}`)));  
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
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: JSON.stringify(data),
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
