import MD5Utils from './MD5Utils'
import {describe,it,expect} from 'vitest'

describe('MD5UtilsTests', function () {
  it('md5 Hex', () => {
    const encoded = MD5Utils.md5Hex(Buffer.from('abc123').toString())
    console.log(encoded)
    expect(encoded.length).toBeGreaterThan(10)
  })

  it('md5 Base64', () => {
    const encoded = MD5Utils.md5Base64(Buffer.from('abc123').toString())
    console.log(encoded)
    expect(encoded.length).toBeGreaterThan(10)
  })

})
