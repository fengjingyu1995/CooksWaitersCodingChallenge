import Fastify, { FastifyInstance } from 'fastify';
import fastifyMongo from '@fastify/mongodb';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

async function dbConnector(fastify: FastifyInstance) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://localhost:27017',
  });

  fastify.log.info('Connected to database');
}

fastify.register(dbConnector);

fastify.get('/', async () => {
  return { message: 'hello' };
});

async function main() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

main();
