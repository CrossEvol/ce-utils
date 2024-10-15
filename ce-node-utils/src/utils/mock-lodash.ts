export const _omit = (obj: Record<string, any>, keys: string[]) => {
  const ret = {} as Record<string, any>
  const keySet = new Set(keys)

  const keysToCopy = Object.keys(obj).filter((key) => !keySet.has(key))
  for (const key of keysToCopy) {
    ret[key] = obj[key]
  }
  return ret
}

export const _cloneDeep = <T>(source: T): T => {
  if (source === null) {
    return source
  }

  if (typeof source !== 'object') {
    return source
  }

  if (Array.isArray(source)) {
    return source.map((item) => _cloneDeep(item)) as unknown as T
  }

  const target: Record<string, any> = {}

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = _cloneDeep(source[key])
    }
  }

  return target as T
}

type Identifier = string | number

export const _uniqBySet = (array: Identifier[]) => {
  return [...new Set(array)]
}

export const _uniqByIncludes = (array: Identifier[]) => {
  let res: Identifier[] = []
  for (let i = 0; i < array.length; i++) {
    if (!res.includes(array[i])) {
      res.push(array[i])
    }
  }
  return res
}

export const _uniqByIndexOf = (array: Identifier[]) => {
  let res = []
  for (let i = 0; i < array.length; i++) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i])
    }
  }
  return res
}

export const _isEqual = (a: unknown, b: unknown) => {
  // 同一对象引用,快速返回true
  if (a === b) return true

  // a 和 b 类型不同则返回 false
  if (typeof a != 'object' || typeof b != 'object') return false

  // 其中一个是 null,则判定不同
  if (a === null || b === null) return false

  // 判断数组
  if (Array.isArray(a) && Array.isArray(b)) {
    // 数组长度不同则返回false
    if (a.length !== b.length) return false

    // 循环递归判断数组每一项
    for (let i = 0; i < a.length; i++) {
      if (!_isEqual(a[i], b[i])) return false
    }
    return true
  }

  // 判断对象
  let keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false

  for (let key of keys) {
    if (
      !_isEqual((a as Record<string, any>)[key], (b as Record<string, any>)[key])
    )
      return false
  }

  return true
}
