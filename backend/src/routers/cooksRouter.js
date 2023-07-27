import { StaffCollectionName } from '../constants/constants.js';

export default async function cooksRouter(fastify) {
  fastify.get('/GetCooks', async function (request, reply) {
    const db = fastify.mongo.client.db('restaurant');

    const cooksDocument = await db
      .collection(StaffCollectionName)
      .findOne({ name: 'cooks' });

    if (!cooksDocument) {
      // If no document is found, return a 404 Not Found response
      return reply.code(404).send({ message: 'Cooks not found' });
    }
    return reply.send(cooksDocument.data);
  });
}
