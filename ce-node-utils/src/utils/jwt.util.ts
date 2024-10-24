import { createPrivateKey, createPublicKey } from 'crypto'
import jwt, { JsonWebTokenError, JwtPayload, SignOptions } from 'jsonwebtoken'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const privateKeyPath = 'private.key'
const publicPemPath = 'public.pem'
const passphrase = 'your_passphrase' // Ensure this matches the passphrase used in generateKeyPair.ts

// Convert the private key and public certificate to KeyObjects
let privateKey, cert
try {
    privateKey = createPrivateKey({
        key: readFileSync(join(process.cwd(), privateKeyPath)),
        passphrase: passphrase, // Provide the passphrase here
    })
} catch (error) {
    console.error('Error reading private key:', error)
    throw new Error('Failed to read private key')
}

try {
    cert = createPublicKey(readFileSync(join(process.cwd(), publicPemPath)))
} catch (error) {
    console.error('Error reading public certificate:', error)
    throw new Error('Failed to read public certificate')
}

export const createJWT = (
    payload: Record<string, unknown>,
    options?: Omit<SignOptions, 'algorithm' | 'subject'>,
) => {
    const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '30 days',
        subject: 'userID',
        ...options,
    })
    return token
}

export const decodeJWT = (token: string) => {
    try {
        const jwtPayload = jwt.verify(token, cert)
        return jwtPayload
    } catch (error) {
        console.error(error)
        throw new JsonWebTokenError('Decode jwt error')
    }
}

export const getFromJWT = <T>(token: string, key: string) => {
    const jwtPayload = decodeJWT(token) as JwtPayload
    return (jwtPayload[key] as T) ?? null
}
