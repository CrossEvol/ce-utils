import { type } from '@/utils/type.utils'
import winston, { format } from 'winston'

const LOG_DIR = './logs'

const { combine, timestamp, prettyPrint } = format

const simplifyLevel = (level: string) => {
        if (level.includes('debug')) {
                return 'debug'
        } else if (level.includes('info')) {
                return 'info'
        } else if (level.includes('warn')) {
                return 'warn'
        } else if (level.includes('error')) {
                return 'error'
        } else {
                return 'trace'
        }
}

const fileTransport: winston.transport = new winston.transports.File({
        dirname: LOG_DIR,
        filename: 'winston.log',
        // format: combine(simple()),
        format: winston.format.combine(
                winston.format.colorize(),
                // winston.format.simple(),
                winston.format.printf(({ level, message }) => {
                        const timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
                        return `${timestamp} [${simplifyLevel(
                                level
                        )}]: ${message}`
                })
        ),
})

const _logger = winston.createLogger({
        level: 'info',
        format: combine(
                timestamp({
                        format() {
                                return new Date().toLocaleString()
                        },
                }),
                prettyPrint()
        ),
        defaultMeta: { service: 'ce-logging' },
        transports: [
                new winston.transports.Console({
                        level: 'info',
                        format: winston.format.combine(
                                winston.format.colorize(),
                                // winston.format.simple(),
                                winston.format.printf(({ level, message }) => {
                                        const blue = '\x1b[34m'
                                        const reset = '\x1b[0m' // Reset color
                                        const timestamp = `${blue}${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}${reset}`
                                        return `${timestamp} [${level}]: ${message}`
                                })
                        ),
                }),
                //
                // - Write all logs with importance level of `error` or less to `error.log`
                // - Write all logs with importance level of `info` or less to `winston.log`
                //
                new winston.transports.File({
                        dirname: LOG_DIR,
                        filename: 'error.log',
                        level: 'error',
                }),
                fileTransport,
        ],
})

if (process.env.NODE_ENV === 'production') {
        _logger.remove(fileTransport)
}

class WinstonLogger {
        #logger: winston.Logger
        #type: (value: any) => string

        constructor(logger: winston.Logger, type: (value: any) => string) {
                this.#logger = logger
                this.#type = type
        }

        public debug(message: any): void {
                if (this.#logger.isDebugEnabled()) {
                        switch (this.#type(message)) {
                                case 'object':
                                        this.#logger.debug(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'Array':
                                        this.#logger.debug(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'string':
                                        this.#logger.debug(message)
                                        break
                                case 'null':
                                        this.#logger.debug(message)
                                        break
                                case 'number':
                                        this.#logger.debug(message)
                                        break
                                case 'boolean':
                                        this.#logger.debug(message)
                                        break
                                case 'Boolean':
                                        this.#logger.debug(message)
                                        break
                                case 'Date':
                                        this.#logger.debug(
                                                message.toLocaleString()
                                        )
                                        break
                                case 'Function':
                                        this.#logger.debug(
                                                JSON.stringify(message)
                                        )
                                        break
                                default:
                                        this.#logger.debug(
                                                JSON.stringify(message)
                                        )
                                        break
                        }
                }
        }

        public info(message: any): void {
                if (this.#logger.isInfoEnabled()) {
                        switch (this.#type(message)) {
                                case 'object':
                                        this.#logger.info(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'Array':
                                        this.#logger.info(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'string':
                                        this.#logger.info(message)
                                        break
                                case 'null':
                                        this.#logger.info(message)
                                        break
                                case 'number':
                                        this.#logger.info(message)
                                        break
                                case 'boolean':
                                        this.#logger.info(message)
                                        break
                                case 'Boolean':
                                        this.#logger.info(message)
                                        break
                                case 'Date':
                                        this.#logger.info(
                                                message.toLocaleString()
                                        )
                                        break
                                case 'Function':
                                        this.#logger.info(
                                                JSON.stringify(message)
                                        )
                                        break
                                default:
                                        this.#logger.info(
                                                JSON.stringify(message)
                                        )
                                        break
                        }
                }
        }

        public warn(message: any): void {
                if (this.#logger.isWarnEnabled()) {
                        switch (this.#type(message)) {
                                case 'object':
                                        this.#logger.warn(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'Array':
                                        this.#logger.warn(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'string':
                                        this.#logger.warn(message)
                                        break
                                case 'null':
                                        this.#logger.warn(message)
                                        break
                                case 'number':
                                        this.#logger.warn(message)
                                        break
                                case 'boolean':
                                        this.#logger.warn(message)
                                        break
                                case 'Boolean':
                                        this.#logger.warn(message)
                                        break
                                case 'Date':
                                        this.#logger.warn(
                                                message.toLocaleString()
                                        )
                                        break
                                case 'Function':
                                        this.#logger.warn(
                                                JSON.stringify(message)
                                        )
                                        break
                                default:
                                        this.#logger.warn(
                                                JSON.stringify(message)
                                        )
                                        break
                        }
                }
        }

        public error(message: any): void {
                if (this.#logger.isErrorEnabled()) {
                        switch (this.#type(message)) {
                                case 'object':
                                        this.#logger.error(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'Array':
                                        this.#logger.error(
                                                JSON.stringify(message)
                                        )
                                        break
                                case 'string':
                                        this.#logger.error(message)
                                        break
                                case 'null':
                                        this.#logger.error(message)
                                        break
                                case 'number':
                                        this.#logger.error(message)
                                        break
                                case 'boolean':
                                        this.#logger.error(message)
                                        break
                                case 'Boolean':
                                        this.#logger.error(message)
                                        break
                                case 'Date':
                                        this.#logger.error(
                                                message.toLocaleString()
                                        )
                                        break
                                case 'Function':
                                        this.#logger.error(
                                                JSON.stringify(message)
                                        )
                                        break
                                default:
                                        this.#logger.error(
                                                JSON.stringify(message)
                                        )
                                        break
                        }
                }
        }
}

const logger = new WinstonLogger(_logger, type)

export default logger
