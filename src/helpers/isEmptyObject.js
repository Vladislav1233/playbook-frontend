export function isEmptyObject(obj) {
    for (let key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true
};