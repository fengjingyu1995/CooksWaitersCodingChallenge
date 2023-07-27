import { StaffCollectionName } from '../constants/constants.js';
// import json files
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const cooksData = require('../data/cooks.json');
const waitersData = require('../data/waiters1.json');

export default async function loadDataToDb(client) {
  const db = client.db('restaurant');
  // drop the collection if exist and then create a new collection so that we can load data from json files every time we restart the server.
  if (db.collection(StaffCollectionName)) {
    await db.dropCollection(StaffCollectionName);
  }

  const collection = db.collection(StaffCollectionName);
  // create index so that "name" can be unique
  collection.createIndex({ name: 1 }, { unique: true });
  // load data from json files
  const cooksDocument = { name: 'cooks', data: cooksData };
  const waitersDocument = { name: 'waiters', data: waitersData };
  // insert docs to db
  collection.insertMany([cooksDocument, waitersDocument]);
}
