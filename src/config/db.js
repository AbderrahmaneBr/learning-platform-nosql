// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse :
// Créer un module séparé pour les connexions aux bases de données permet de centraliser et de réutiliser
// facilement la logique de connexion, d'assurer une gestion efficace des ressources, de simplifier les tests
// et de faciliter la maintenance du code en séparant les préoccupations.

// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :
// Pour gérer proprement la fermeture des connexions, utilisez des blocs try-with-resources ou un gestionnaire
// de ressources (comme un pool de connexions) pour garantir la fermeture automatique, même en cas d'erreur.

const { MongoClient, ServerApiVersion } = require("mongodb");
const { createClient } = require("redis");
const config = require("./env");

let mongoClient, redisClient, db;

const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PW = process.env.REDIS_PW;

async function connectMongo() {
  // Implémenter la connexion MongoDB
  mongoClient = new MongoClient(MONGODB_URI, {
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
    await redisClient.connect();
    console.log("Redis Connected!");
  }
}

async function closeMongo() {
  if (isConnected(mongoClient)) {
    await mongoClient.close();
    console.log("MongoDB Déconnecté.");
  }
}

async function closeRedis() {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
    console.log("Redis Déconnecté.");
  }
}

// Export des fonctions et clients
module.exports = {
  getMongoClient: () => mongoClient,
  getRedisClient: () => redisClient,
  connectMongo,
  connectRedis,
  closeMongo,
  closeRedis,
};
