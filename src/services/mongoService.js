// Question: Pourquoi créer des services séparés ?
// Réponse:

const { ObjectId } = require("mongodb");
const db = require("../config/db");

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // Implémenter une fonction générique de recherche par ID
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }
  const results = await db
    .getMongoClient()
    .db("db_platform")
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  return results;
}

async function findMany(collection, query) {
  const results = await db
    .getMongoClient()
    .db("db_platform")
    .collection(collection)
    .findOne({ _id: new ObjectId(id) });

  return results;
}

async function insertOne(collection, data) {
  const results = await db
    .getMongoClient()
    .db("db_platform")
    .collection(collection)
    .insertOne(JSON.stringify(data));

  return results;
}

async function countDocuments(collection) {
  const results = await db
    .getMongoClient()
    .db("db_platform")
    .collection(collection)
    .countDocuments();
  return results;
}

// Export des services
module.exports = {
  findOneById,
  insertOne,
  countDocuments,
};
