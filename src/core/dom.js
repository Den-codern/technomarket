export function $(el) {
    return document.querySelector(el)
}

export function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

export function removeClass(el, className) {
    el.classList.remove(className)
}
export function hasClass(el, className) {
     el.classList.contains(className)
}

