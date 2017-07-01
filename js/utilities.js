export function delayResponse(value) {
    return new Promise(resolve => setTimeout(() => resolve(value), 0));
}

export function parseElementsOptions(elements) {
    // TODO: also support string as component selector
    // and use string properties as selectors to get elements
    if (elements instanceof HTMLElement) {
        elements = { component: elements };
    } else {
        elements = elements || {};
    }
    return elements;
}
