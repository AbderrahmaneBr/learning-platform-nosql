// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse :
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse :

const dotenv = require("dotenv");
dotenv.config();

const requiredEnvVars = [
  "MONGODB_URI",
  "MONGODB_DB_NAME",
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_PW",
];

// Validation des variables d'environnement
function validateEnv() {
  // Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  if (requiredEnvVars.some((e) => !process.env[e])) {
    throw new Error("Missing Environment variable!");
  }
}

module.exports = {
  validateEnv,
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pw: process.env.REDIS_PW,
  },
  port: process.env.PORT || 3000,
};
