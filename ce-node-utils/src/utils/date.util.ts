export const isDate = (obj: unknown) => {
    return (
        obj instanceof Date &&
        obj.constructor === Date &&
        typeof obj.getDate === 'function' &&
        Object.prototype.toString.call(obj) === '[object Date]' &&
        obj.toLocaleDateString() !== 'Invalid Date'
    )
}

export const isNotDate = (obj: unknown) => {
    return Boolean(isDate(obj)) === false
}
