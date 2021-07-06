function $extendObj(_def, addons) {
    if (typeof addons !== 'undefined') {
        for (let prop in _def) {
            if (addons[prop] != undefined) {
                _def[prop] = addons[prop]
            }
        }
    }
}
export default $extendObj