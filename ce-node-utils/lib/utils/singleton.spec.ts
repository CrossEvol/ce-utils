import { isEqual } from 'lodash-es'
import { Singleton } from './singleton'
import { describe, it, expect } from 'vitest'

describe('SingletonTests', () => {
        it('should singleton', () => {
                const instance1 = Singleton.getInstance()
                const instance2 = Singleton.getInstance()
                instance1.list.push('a')
                instance1.obj = { a: '1', b: '2' }
                expect(isEqual(instance1, instance2)).toBeTruthy()
                expect(isEqual(instance1.list, instance2.list)).toBeTruthy()
                expect(isEqual(instance1.obj, instance2.obj)).toBeTruthy()
        })
})
