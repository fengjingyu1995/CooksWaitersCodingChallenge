import Fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import cors from '@fastify/cors';
import cooksRouter from './routers/cooksRouter.js';
import waitersRouter from './routers/waitersRouter.js';
import loadDataToDb from './database/loadDataToDb.js';

const fastify = Fastify({
  logger: {
    transport: {
      // TODO: check env to only use 'pino-pretty' in non-prod env.
      // should not use it in production
      target: 'pino-pretty',
    },
  },
});

fastify.register(cors);

fastify
  .register(fastifyMongo, {
    forceClose: true,
    // using 'mongodb://localhost:27017' won't work properly
    url: 'mongodb://127.0.0.1:27017',
  })
  // log error in case something goes wrong
  .after((err) => {
    if (err) {
      fastify.log.error('Error during mongodb plugin registration:');
      fastify.log.error(err);
    }
  });

fastify.ready(async function () {
  // create db
  const mongo = fastify.mongo;
  if (!mongo) {
    fastify.log.error('mongodb is not available');
    process.exit(1);
  }
  await loadDataToDb(mongo.client);
});

fastify.register(cooksRouter);
fastify.register(waitersRouter);

async function main() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Handle process termination (SIGINT and SIGTERM) and close the Fastify server before exiting.
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close();

    process.exit(0);
  });
});

main();
