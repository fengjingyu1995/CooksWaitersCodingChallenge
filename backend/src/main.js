import Fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';

// import json files
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const cooksData = require('./data/cooks.json');
const waitersData = require('./data/waiters1.json');

const staffCollectionName = 'staff';

const fastify = Fastify({
  logger: {
    transport: {
      // TODO: check env to only use 'pino-pretty' in non-prod env.
      // should not use it in production
      target: 'pino-pretty',
    },
  },
});

fastify
  .register(fastifyMongo, {
    forceClose: true,
    // using 'mongodb://localhost:27017' won't work properly
    url: 'mongodb://127.0.0.1:27017',
  })
  // log error in case something goes wrong
  .after((err) => {
    console.log('after fastifyMongo');
    if (err) {
      fastify.log.error('Error during mongodb plugin registration:');
      fastify.log.error(err);
    }
  });

fastify.ready(async function () {
  // create db
  if (!fastify.mongo) {
    fastify.log.error('mongodb is not available');
    process.exit(1);
  }
  const db = fastify.mongo.client.db('restaurant');
  // drop the collection if exist and then create a new collection so that we can load data from json files every time we restart the server.
  if (db.collection(staffCollectionName)) {
    await db.dropCollection(staffCollectionName);
  }

  const collection = db.collection(staffCollectionName);
  // create index so that "name" can be unique
  collection.createIndex({ name: 1 }, { unique: true });
  // load data from json files
  const cooksDocument = { name: 'cooks', data: cooksData };
  const waitersDocument = { name: 'waiters', data: waitersData };
  // insert docs to db
  collection.insertMany([cooksDocument, waitersDocument]);
});

fastify.get('/GetCooks', async function (request, reply) {
  const db = fastify.mongo.client.db('restaurant');

  const cooksDocument = await db
    .collection(staffCollectionName)
    .findOne({ name: 'cooks' });

  if (!cooksDocument) {
    // If no document is found, return a 404 Not Found response
    return reply.code(404).send({ message: 'Cooks not found' });
  }
  return reply.send(cooksDocument.data);
});

fastify.get('/GetWaiters', async (request, reply) => {
  const db = fastify.mongo.client.db('restaurant');
  const waitersDocument = await db
    .collection(staffCollectionName)
    .findOne({ name: 'waiters' });

  if (!waitersDocument) {
    // If no document is found, return a 404 Not Found response
    return reply.code(404).send({ message: 'waiters not found' });
  }
  return reply.send(waitersDocument.data);
});

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
