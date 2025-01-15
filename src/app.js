// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require("express");
const config = require("./config/env");
const db = require("./config/db");

const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

async function startServer() {
  try {
    // Vérifier les variables d'env
    config.validateEnv();
    // Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // Configurer les middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Monter routes
    app.use("/api/courses", courseRoutes);
    app.use("/api/students", studentRoutes);

    // Lancer le serveur
    const port = config.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on("SIGTERM", async () => {
  // Implémenter la fermeture propre des connexions
  db.closeMongo();
  db.closeRedis();
});

startServer();
