import {
    capitalize,
    chunk,
    cloneDeep,
    difference,
    differenceBy,
    differenceWith,
    flow,
    flowRight,
    isEmpty,
    isEqual,
    isNull,
    isNumber,
    isUndefined,
    merge,
    omit,
    omitBy,
    pick,
    sum,
    uniq,
    uniqBy,
    uniqWith,
} from 'lodash-es'
import { describe, expect, it } from 'vitest'
import {
    _cloneDeep,
    _isEqual,
    _omit,
    _uniqByIncludes,
    _uniqByIndexOf,
    _uniqBySet,
} from './mock-lodash'

describe('OmitTest', () => {
    it('native', () => {
        const name = 'Will Riker'
        const rank = 'Commander'
        const age = 29

        const obj = {
            name,
            rank,
            age,
        }
        // Looks tricky, but the idea is that you're calling an anonymous arrow
        // function that uses the spread operator to get all properties _other than_
        // `rank` and `age`.
        const newObj: { [key: string]: unknown } = (({ rank, age, ...rest }) =>
            rest)(obj)

        expect(isEqual(newObj, obj)).toBeFalsy()
        expect(newObj.name).toBe(name)
        expect(newObj.rank).toBeUndefined()
        expect(newObj.age).toBeUndefined()
    })

    it('_omit', () => {
        const name = 'Will Riker'
        const rank = 'Commander'
        const age = 29

        const obj = {
            name,
            rank,
            age,
        }
        // Looks tricky, but the idea is that you're calling an anonymous arrow
        // function that uses the spread operator to get all properties _other than_
        // `rank` and `age`.
        const newObj = _omit(obj, ['rank', 'age'])

        expect(isEqual(newObj, obj)).toBeFalsy()
        expect(newObj.name).toBe(name)
        expect(newObj.rank).toBeUndefined()
        expect(newObj.age).toBeUndefined()
    })

    it('omit', () => {
        const name = 'Will Riker'
        const rank = 'Commander'
        const age = 29

        const obj = {
            name,
            rank,
            age,
        }
        // Looks tricky, but the idea is that you're calling an anonymous arrow
        // function that uses the spread operator to get all properties _other than_
        // `rank` and `age`.
        const newObj = omit(obj, ['rank', 'age']) as Record<string, unknown>

        expect(isEqual(newObj, obj)).toBeFalsy()
        expect(newObj.name).toBe(name)
        expect(newObj.rank).toBeUndefined()
        expect(newObj.age).toBeUndefined()
    })

    it('omitBy', () => {
        const nonNum = '2'
        const object = { a: 1, b: nonNum, c: 3 }

        const newObj = omitBy(object, isNumber)

        expect(newObj.a).toBeUndefined()
        expect(newObj.b).toBe(nonNum)
        expect(newObj.c).toBeUndefined()
    })
})

describe('CloneDeepTest', () => {
    it('cloneDeep', () => {
        const origin = [{ a: 1, b: 2 }]
        const copy = cloneDeep(origin)
        expect(isEqual(copy, origin)).toBeTruthy()
    })

    it('_cloneDeep', () => {
        const source = {
            name: 'John',
            age: 20,
            data: {
                job: 'Programmer',
            },
        }

        const copy = _cloneDeep(source)
        expect(isEqual(source, copy)).toBeTruthy()
    })
})

describe('CapitalizeTest', () => {
    it('capitalize word', () => {
        const str = 'hello'
        const capitalizeStr = 'Hello'
        expect(capitalize(str)).toBe(capitalizeStr)
    })

    it('capitalize phrase', () => {
        const str = 'hello world'
        const capitalizeStr = 'Hello World'
        expect(
            str
                .split(' ')
                .map((i) => capitalize(i))
                .join(' '),
        ).toBe(capitalizeStr)
    })
})

describe('IsNull', () => {
    it('null', () => {
        const obj = null
        expect(isNull(obj)).toBeTruthy()
        expect(isEmpty(obj)).toBeTruthy()
        expect(isUndefined(obj)).toBeFalsy()
    })

    it('empty', () => {
        const arr: unknown[] = []
        const obj = {}
        expect(isEmpty(arr)).toBeTruthy()
        expect(isEmpty(obj)).toBeTruthy()
    })
})

describe('RemoveNullOfObject', () => {
    it('omitBy', () => {
        const obj = { a: null, b: 'Hello', c: 3, d: undefined }

        const result = omitBy(obj, (v) => v === null)

        expect(result.a).toBeUndefined()
        expect(result.b).toBe('Hello')
        expect(result.c).toBe(3)
        expect(result.d).toBeUndefined()
    })
})

describe('DifferenceTest', () => {
    it('difference', () => {
        const array = [1, 2, 3, 4, 5]
        const values = [1, 2, 3]
        const differenceList = [4, 5]
        expect(isEqual(difference(array, values), differenceList)).toBeTruthy()
    })

    it('differenceBy with array', () => {
        const array = [1.1, 1.2, 2.1, 2.2, 3.3, 4, 5]
        const values = [1.4, 2.3, 3.2]
        const differenceList = [4, 5]
        expect(
            isEqual(differenceBy(array, values, Math.floor), differenceList),
        ).toBeTruthy()
    })

    it('DifferenceWith', () => {
        const obj1 = { x: 1, y: 2 }
        const obj2 = { x: 2, y: 1 }
        const array = [obj1, obj2]
        const values = [obj2]
        expect(
            isEqual(differenceWith(array, values, isEqual), [obj1]),
        ).toBeTruthy()
    })
})

describe('UniqTest', () => {
    it('uniq', () => {
        const array = [1, 2, 3, 4, 5, 5, 6, 7, 7]
        const uniqueArray = [1, 2, 3, 4, 5, 6, 7]
        const result = uniq(array)
        expect(isEqual(uniqueArray, result)).toBeTruthy()
    })

    it('uniqBy', () => {
        const array = [
            { name: 'Badger' },
            { name: 'Badger' },
            { name: 'Badger' },
            { name: 'Mushroom' },
            { name: 'Mushroom' },
        ]
        const uniqueArray = [{ name: 'Badger' }, { name: 'Mushroom' }]
        const result = uniqBy(array, (obj) => obj.name)
        expect(isEqual(result, uniqueArray)).toBeTruthy()
    })

    it('uniqWith', () => {
        const array = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
        ]
        const uniqueArray = [
            { x: 1, y: 2 },
            { x: 2, y: 1 },
        ]
        const result = uniqWith(array, isEqual)
        expect(isEqual(uniqueArray, result)).toBeTruthy()
    })

    it('_uniqBySet', () => {
        const array = [1, 2, 3, 4, 5, 5, 6, 7, 7]
        const uniqueArray = [1, 2, 3, 4, 5, 6, 7]
        const result = _uniqBySet(array)
        expect(isEqual(uniqueArray, result)).toBeTruthy()
    })

    it('_uniqByIncludes', () => {
        const array = [1, 2, 3, 4, 5, 5, 6, 7, 7]
        const uniqueArray = [1, 2, 3, 4, 5, 6, 7]
        const result = _uniqByIncludes(array)
        expect(isEqual(uniqueArray, result)).toBeTruthy()
    })

    it('_uniqByIndexOf', () => {
        const array = [1, 2, 3, 4, 5, 5, 6, 7, 7]
        const uniqueArray = [1, 2, 3, 4, 5, 6, 7]
        const result = _uniqByIndexOf(array)
        expect(isEqual(uniqueArray, result)).toBeTruthy()
    })
})

describe('IsEqualTest', () => {
    it('is  objects equal', () => {
        const obj1 = {
            name: 'Will Riker',
            date: new Date('2020/06/01'),
            rank: 'Commander',
            age: 29,
        }
        const obj2 = {
            name: 'Will Riker',
            date: new Date('2020/06/01'),
            rank: 'Commander',
            age: 29,
        }
        const obj3 = {
            name: '',
            date: new Date('NAN'),
            rank: '',
            age: 29,
        }
        expect(isEqual(obj1, obj2)).toBeTruthy()
        expect(isEqual(obj1, obj3)).toBeFalsy()
        expect(isEqual(obj2, obj3)).toBeFalsy()
    })

    it('is instances equal', () => {
        const obj1 = { name: 'Will Riker', rank: 'Commander' }
        class Character {}
        const obj2 = new Character()
        const obj3 = new Character()
        Object.assign(obj2, { name: 'Will Riker', rank: 'Commander' })
        Object.assign(obj3, { name: 'Will Riker', rank: 'Commander' })
        expect(isEqual(obj1, obj2)).toBeFalsy()
        expect(isEqual(obj2, obj3)).toBeTruthy()
    })

    it('_isEqual', () => {
        const obj1 = {
            name: 'Will Riker',
            date: new Date('2020/06/01'),
            rank: 'Commander',
            age: 29,
        }
        const obj2 = {
            name: 'Will Riker',
            date: new Date('2020/06/01'),
            rank: 'Commander',
            age: 29,
        }
        const obj3 = {
            name: '',
            date: new Date('NAN'),
            rank: '',
            age: 29,
        }
        expect(_isEqual(obj1, obj2)).toBeTruthy()
        expect(_isEqual(obj1, obj3)).toBeFalsy()
        expect(_isEqual(obj2, obj3)).toBeFalsy()
    })
})

describe('PickTest', () => {
    it('pick', () => {
        const name = 'Will Riker'
        const rank = 'Commander'
        const age = 29

        const obj = {
            name,
            rank,
            age,
        }
        const picked: Record<string, unknown> = pick(obj, ['name', 'rank'])

        expect(isEqual(obj, picked)).toBeFalsy()
        expect(picked.name).toBe(name)
        expect(picked.rank).toBe(rank)
        expect(picked.age).toBeUndefined()
    })

    it('pick by path', () => {
        const first = 'Will'
        const last = 'Riker'
        const rank = 'Commander'

        const obj = {
            name: {
                first,
                last,
            },
            rank,
            age: 29,
        }
        const picked = pick(obj, [
            'name.last',
            'rank',
            'this.is.not.in.the.object',
        ])
        expect(isEqual(picked, obj)).toBeFalsy()
        expect(picked.name?.first).toBeUndefined()
        expect(picked.name?.last).toBe(last)
        expect(picked.rank).toBe(rank)
        expect(picked.age).toBeUndefined()
    })
})

describe('MergeTest', () => {
    it('merge', () => {
        const destination = {
            firstName: 'Will',
            lastName: 'Riker',
            rank: 'Commander',
        }

        // Since `source.rank` is undefined, `merge()` won't overwrite `destination.rank`.
        merge(destination, { firstName: 'Thomas', rank: undefined })
        expect(destination.firstName).toBe('Thomas')
        expect(destination.rank).toBe('Commander')
    })
})

describe('SumTest', () => {
    it('sum', () => {
        const numbers = [10, 20, 30, 40, 50]
        const sumResult = sum(numbers)
        expect(sumResult).toBe(150)
    })
})

describe('ChunkTest', () => {
    it('chunk ', () => {
        const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
        const newArray = chunk(array, 2)
        const targetArray = [['a', 'b'], ['c', 'd'], ['e', 'f'], ['g']]
        expect(newArray.length).toBe(4)
        expect(isEqual(newArray, targetArray)).toBeTruthy()
    })
})

describe('FlowTest', () => {
    function addFive(num: number) {
        return num + 5
    }

    function timesTwo(num: number) {
        return num * 2
    }

    it('flow', () => {
        const addFiveAndTimesTwo = flow([addFive, timesTwo])

        expect(addFiveAndTimesTwo(3)).toBe(16)
    })

    it('flowRight', () => {
        const addFiveAndTimesTwoReverse = flowRight([addFive, timesTwo])

        expect(addFiveAndTimesTwoReverse(3)).toBe(11)
    })
})
