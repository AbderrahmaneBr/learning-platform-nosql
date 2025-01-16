// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : Il est important de valider les variables d'environnement au démarrage pour s'assurer
// que l'application dispose des configurations correctes et éviter des erreurs ou des comportements
// imprévus pendant son exécution.

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : Si une variable requise est manquante, l'application peut
// échouer à démarrer, rencontrer des erreurs imprévues ou se comporter
// de manière incorrecte, car elle ne disposera pas des configurations
// nécessaires pour fonctionner correctement.

const dotenv = require("dotenv");
dotenv.config();

const requiredEnvVars = ["MONGODB_URI", "REDIS_HOST", "REDIS_PORT", "REDIS_PW"];

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
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pw: process.env.REDIS_PW,
  },
  port: process.env.PORT || 3000,
};
