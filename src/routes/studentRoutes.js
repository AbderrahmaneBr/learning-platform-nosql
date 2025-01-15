const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes pour les cours
router.post("/", studentController.createStudent);
router.get("/stats", studentController.getStudentsStats);
router.get("/student/:id", studentController.getStudent);

module.exports = router;
