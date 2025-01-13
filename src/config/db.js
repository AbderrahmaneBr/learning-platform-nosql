// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :

const { MongoClient, ServerApiVersion } = require("mongodb");
const { createClient } = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PW = process.env.REDIS_PW;

async function connectMongo() {
  // Implémenter la connexion MongoDB
  mongoClient = new MongoClient(MONGODB_URI + MONGODB_DB_NAME, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  // Error Handling
  mongoClient.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  // Initializing connection
  if (mongoClient) {
    await mongoClient.connect();
    console.log("MongoDB Connected!");
  }
}

async function connectRedis() {
  // Implémenter la connexion Redis
  redisClient = createClient({
    username: "default",
    password: REDIS_PW,
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  });

  // Error Handling
  redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  // Initializing connection
  if (!redisClient.isOpen) {
    redisClient.connect();
    console.log("Redis Connected!");
  }
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
};
