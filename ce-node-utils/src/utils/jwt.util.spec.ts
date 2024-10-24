import { createPrivateKey, createPublicKey, KeyObject } from 'crypto'
import { readFileSync } from 'fs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { join } from 'path'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createJWT, decodeJWT, getFromJWT } from './jwt.util'

vi.unmock('node:fs')
vi.unmock('node:fs/promises')

let privateKey: KeyObject
let cert: KeyObject

beforeAll(() => {
    // Load keys for signing and verifying JWT
    const privateKeyPath = 'private.key'
    const publicPemPath = 'public.pem'

    // Convert the private key and public certificate to KeyObjects
    privateKey = createPrivateKey({
        key: readFileSync(join(process.cwd(), privateKeyPath)),
        passphrase: 'your_passphrase',
    })
    cert = createPublicKey(readFileSync(join(process.cwd(), publicPemPath)))
})

describe('JWT Utility Functions', () => {
    describe('createJWT', () => {
        it('should create a valid JWT token', () => {
            const payload = { userId: '12345' }
            const token = createJWT(payload)
            const decoded = jwt.verify(token, cert) as JwtPayload

            expect(decoded.userId).toBe(payload.userId)
            expect(decoded).toHaveProperty('sub', 'userID')
        })
    })

    describe('decodeJWT', () => {
        it('should decode a valid token', () => {
            const payload = { userId: '12345' }
            const token = jwt.sign(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn: '30 days',
                subject: 'userID',
            })
            const decoded = decodeJWT(token) as JwtPayload

            expect(decoded.userId).toBe(payload.userId)
            expect(decoded).toHaveProperty('sub', 'userID')
        })

        it('should throw an error for an invalid token', () => {
            const invalidToken = 'invalid.token.here'

            expect(() => decodeJWT(invalidToken)).toThrowError(
                'Decode jwt error',
            )
        })
    })

    describe('getFromJWT', () => {
        it('should return the value for a given key', () => {
            const payload = { userId: '12345', role: 'admin' }
            const token = jwt.sign(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn: '30 days',
                subject: 'userID',
            })
            const userId = getFromJWT(token, 'userId')
            const role = getFromJWT(token, 'role')

            expect(userId).toBe('12345')
            expect(role).toBe('admin')
        })

        it('should return null if the key does not exist', () => {
            const payload = { userId: '12345' }
            const token = jwt.sign(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn: '30 days',
                subject: 'userID',
            })
            const nonExistentKey = getFromJWT(token, 'nonExistentKey')

            expect(nonExistentKey).toBeNull()
        })
    })
})
