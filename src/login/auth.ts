import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin'
import jwt from 'jsonwebtoken'
import { config } from "../common/config";

const opensUrls = ['/login', '/doc']

export const authPlugin = fp(async (fastify: FastifyInstance) => {

  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.url === '/'
      || opensUrls.some(url => request.url.startsWith(url))) return
    if (request.headers.authorization) {
      const token = request.headers.authorization.replace(/Bearer /, '')
      const secretKey = config.JWT_SECRET_KEY
      try {
        await jwt.verify(token, secretKey)
        return
      } catch (error) {
        reply.status(401).send('Unauthorized')
      }
    }
    reply.status(401).send('Unauthorized')
  });
});

