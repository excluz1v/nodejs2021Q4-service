import pino,  { Logger, TransportMultiOptions } from "pino"

const transportOptions:TransportMultiOptions={
    targets: [
    {
        level:'info',
        target:'pino-pretty',
        options: {
            destination: './logs.log',
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    },
    {
        level:'info',
        target:'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    },
    {
        level:'error',
        target:'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            destination: './errors.log'
        }
    }
]
}

const transport= pino.transport(transportOptions)

export const logger:Logger= pino(transport)