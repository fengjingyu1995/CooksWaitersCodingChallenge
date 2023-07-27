import { StaffCollectionName } from '../constants/constants.js';

export default async function waitersRouter(fastify) {
  fastify.get('/GetWaiters', async (request, reply) => {
    const db = fastify.mongo.client.db('restaurant');
    const waitersDocument = await db
      .collection(StaffCollectionName)
      .findOne({ name: 'waiters' });

    if (!waitersDocument) {
      // If no document is found, return a 404 Not Found response
      return reply.code(404).send({ message: 'waiters not found' });
    }
    return reply.send(waitersDocument.data);
  });
}
