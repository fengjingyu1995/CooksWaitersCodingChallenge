import Fastify from 'fastify';
import fastifyMongo from '@fastify/mongodb';
import cooksData from './data/cooks.json';
import waitersData from './data/waiters1.json';

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
  db.dropCollection('staff');
  const collection = db.collection('staff');

  // load data from json files
  const cooksDocument = { name: 'cooks', data: cooksData };
  const waitersDocument = { name: 'waiters', data: waitersData };

  // insert docs to db
  collection.insertMany([cooksDocument, waitersDocument]);
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
