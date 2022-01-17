import { TransportMultiOptions } from "pino";

export const infoOptions:TransportMultiOptions={
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

export const warnOptions:TransportMultiOptions={
    targets: [
    {
        level:'warn',
        target:'pino-pretty',
        options: {
            destination: './logs.log',
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    },
    {
        level:'warn',
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
export const errorOptions:TransportMultiOptions={
    targets: [
    {
        level:'error',
        target:'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
            destination: './errors.log'
        }
    },    {
        level:'error',
        target:'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    }
]
}

export const fatalOptions:TransportMultiOptions={
    targets: [
   {
        level:'fatal',
        target:'pino-pretty',
        options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
        }
    }
]
}