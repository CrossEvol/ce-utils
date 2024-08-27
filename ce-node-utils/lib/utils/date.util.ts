export const isDate = (obj: any) => {
  return (
    obj instanceof Date &&
    obj.constructor === Date &&
    typeof obj.getDate === 'function' &&
    Object.prototype.toString.call(obj) === '[object Date]' &&
    obj.toLocaleDateString() !== 'Invalid Date'
  )
}

export const isNotDate = (obj: any) => {
  return Boolean(isDate(obj)) === false
}


