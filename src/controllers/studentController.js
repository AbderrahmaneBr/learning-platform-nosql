const { ObjectId } = require("mongodb");
const db = require("../config/db");
const {
  findOneById,
  insertOne,
  countDocuments,
} = require("../services/mongoService");
const { getCacheData, cacheData } = require("../services/redisService");

async function createStudent(req, res) {
  try {
    const studentData = req.body;
    const insertedData = await insertOne("students", studentData);
    res.status(201).json({
      status: "Data inserted successfully",
      data: insertedData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student", error: error.message });
  }
}

async function getStudent(req, res) {
  try {
    const studentId = req.params.id;
    const results = await findOneById("students", studentId);

    res.status(200).json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching student data", error: error.message });
  }
}

async function getStudentsStats(req, res) {
  try {
    const cachedStats = await getCacheData("studentsCount");

    if (cachedStats) {
      return res.status(200).json({ studentsCount: cachedStats });
    }

    const studentsCount = await countDocuments("students");

    await cacheData("studentsCount", studentsCount);

    res.status(200).json({ studentsCount: studentsCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students stats", error: error.message });
  }
}

// Export des contrôleurs
module.exports = {
  createStudent,
  getStudentsStats,
  getStudent,
};
