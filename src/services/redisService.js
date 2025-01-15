// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// définissez des expirations pour limiter la durée des clés,
// utilisez des structures de données adaptées,
// stockez uniquement l’essentiel,
// activez la persistance si nécessaire,
// surveillez les performances avec INFO

// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :
// Utiliser des noms descriptifs
// Adopter un schéma de nommage cohérent
// Éviter les clés trop longues - Éviter les clés trop courtes
// Inclure des informations contextuelles
// Éviter les conflits de noms
// Supprimer les clés inutiles

const db = require("../config/db");

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl = 3600) {
  try {
    const redisClient = db.getRedisClient();
    if (!redisClient) {
      throw new Error("Redis client not connected");
    }

    // Using the promisified setEx directly
    await redisClient.SETEX(key, ttl, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Cache write error:", error);
    throw error;
  }
}

async function getCacheData(key) {
  try {
    const redisClient = db.getRedisClient();
    if (!redisClient) {
      throw new Error("Redis client not connected");
    }

    // Using the promisified get directly
    const data = await redisClient.GET(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Cache read error:", error);
    throw error;
  }
}

module.exports = {
  getCacheData,
  cacheData,
};
