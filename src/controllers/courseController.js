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
const {
  findOneById,
  insertOne,
  countDocuments,
} = require("../services/mongoService");
const { getCacheData, cacheData } = require("../services/redisService");

async function createCourse(req, res) {
  try {
    const courseData = req.body;
    const insertedData = await insertOne("courses", courseData);
    res.status(201).json({
      status: "Data inserted successfully",
      data: insertedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const results = await findOneById("courses", courseId);

    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course data", error: error.message });
  }
}

async function getCourseStats(req, res) {
  try {
    const cachedStats = await getCacheData("coursesCount");

    if (cachedStats) {
      return res.status(200).json({ coursesCount: cachedStats });
    }

    const coursesCount = await countDocuments("courses");

    await cacheData("coursesCount", coursesCount);

    res.status(200).json({ coursesCount: coursesCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses stats", error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getCourse,
  getCourseStats,
};
