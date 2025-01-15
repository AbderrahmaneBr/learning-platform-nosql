// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse :
// Pour améliorer la maintenance et la structure du cade.
// on obtient un code plus lisible, plus facile à maintenir et à faire évoluer.
// Cette approche facilite également le travail en équipe en permettant à différents
// développeurs de travailler sur des fonctionnalités distinctes sans conflits.
// De plus, cette organisation modulaire simplifie les tests, la gestion des erreurs et la documentation,
// tout en respectant le principe de séparation des responsabilités. Les routes peuvent ainsi être
// facilement réutilisées et modifiées sans affecter le reste de l'application.

// Question : Comment organiser les routes de manière cohérente ?
// Réponse:
// Nommage clair et consistant
// Regroupement logique des routes liées
// Séparation des routes publiques et protégées
// Utilisation de préfixes pour les versions d'API
// Documentation des endpoints importants

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes pour les cours
router.post("/", courseController.createCourse);
router.get("/stats", courseController.getCourseStats);
router.get("/course/:id", courseController.getCourse); // Corriger /:id car lorsqu'on se dirige vers /stats, la route /:id traite stats comme une id, alors il faut ajouter une sous-route

module.exports = router;
