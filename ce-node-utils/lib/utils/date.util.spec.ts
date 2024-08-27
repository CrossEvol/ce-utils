import { isDate, isNotDate } from './date.util'
import {describe,it,expect} from 'vitest'

describe('dateUtilTests', () => {
  it('should isDate', () => {
    const date = new Date()
    const notDate = new Date('I am not date or time or dateTime')
    expect(isDate(date)).toBeTruthy()
    expect(isDate(notDate)).toBeFalsy()
    expect(isNotDate(date)).toBeFalsy()
    expect(isNotDate(notDate)).toBeTruthy()
  })


})
