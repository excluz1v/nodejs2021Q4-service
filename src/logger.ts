import pino,  { Logger, TransportMultiOptions } from "pino"
import { config } from "./common/config"
import { errorOptions, fatalOptions, infoOptions, warnOptions } from "./TransportOptions"

const level= config.LOGGING_LEVEL
const levelTranslate: {[key: string]:TransportMultiOptions} = {
    '0':infoOptions,
    '1':warnOptions,
    '2':errorOptions,
    '3':fatalOptions
  }

const transport= pino.transport(levelTranslate[level])

export const logger:Logger= pino(transport)