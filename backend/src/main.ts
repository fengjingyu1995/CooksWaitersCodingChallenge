import Fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import cooksData from './data/cooks.json';
import waitersData from './data/waiters1.json';

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

fastify.register(fastifyMongo, {
  forceClose: true,
  url: 'mongodb://localhost:27017',
});

fastify.ready(async () => {
  // create db
  const db = fastify.mongo.client.db('restaurant');

  // drop the collection and then create a new collection so that we can load data from json files every time we restart the server.
  db.dropCollection(staffCollectionName);
  const collection = db.collection(staffCollectionName);

  // create index so that "name" can be unique
  collection.createIndex({ name: 1 }, { unique: true });

  // load data from json files
  const cooksDocument = { name: 'cooks', data: cooksData };
  const waitersDocument = { name: 'waiters', data: waitersData };

  // insert docs to db
  collection.insertMany([cooksDocument, waitersDocument]);
});

fastify.get('/GetCooks', async (request, reply) => {
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

main();
