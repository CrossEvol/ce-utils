import fs from 'fs'

export class Base64Utils {
    public static removeHead(base64Data: string) {
        return base64Data
            .replace(
                /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,/,
                ' ',
            )
            .trim()
    }

    public static toBuffer(base64Data: string) {
        return Buffer.from(this.removeHead(base64Data), 'base64')
    }

    public static toImage(path: string, buffer: Buffer) {
        fs.writeFileSync(path, buffer)
    }
}
