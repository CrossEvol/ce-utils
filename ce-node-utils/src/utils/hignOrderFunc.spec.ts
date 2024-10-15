import { describe, it } from 'vitest'
describe('HignOrderFunc', () => {
        it('Print params before , print result after', () => {
                const log =
                        <T, U>(f: (x: T) => U) =>
                        async (x: T) => {
                                console.log('params:', x)
                                const result = await f(x)
                                console.log('result:', result)
                                return result
                        }

                const func = async (num: number) => `☆${num}☆`

                const loggedFunc = log(func)

                loggedFunc(123)
        })
})
