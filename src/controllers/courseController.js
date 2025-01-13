// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Une route permet de définit le chemin et la méthode (GET, POST, ...) pour accéder à un ressource.
// Un contrôleur joue le rôle d'un intermédiaire entre la base de données et l'application, en définissant la logic derrière chaque opération.

// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :
// Pour avoir un code lisible et maintenable.
// Pour séparer la logique de chaque opération.
// Pour bien gérer les erreurs.

const { ObjectId } = require("mongodb");
const db = require("../config/db");
const { findOneById, insertOne } = require("../services/mongoService");
const mongoService = require("../services/mongoService");
const redisService = require("../services/redisService");

async function createCourse(req, res) {
  // Implémenter la création d'un cours
  // const results = await findOneById("courses", "678582b00dfa90184437b1c5");
  // console.log(results);
  // insertOne("courses", {
  //   title: "New course",
  //   rating: 9,
  //   price: 59.99,
  // });
}

createCourse();

async function getCourse(req, res) {}

async function getCourseStats(req, res) {}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
