import express from 'express';
import getEnvironnementsAction from "../actions/Envionnement/getEnvironnementsAction.js";
import getEnvironnementByIdAction from "../actions/Envionnement/getEnvironnementsByIdAction.js";

const router = express.Router();

//get -> récupérer les données de base de tout les environnement (sélection de l'environnement à la création de la partie)
router
    .route("/environnements")
    .get(getEnvironnementsAction)
    .all((req, res, next) => next(405));

//get -> récupérer les données d'un environnement grâce à son id
//patch -> mise à jour de l'environnement (ajout d'obstacles par exemple)
router
    .route("/environnements/:id")
    .get(getEnvironnementByIdAction)
    .all((req, res, next) => next(405));

router
    .route("/party")
    .all((req, res, next) => next(405));

export default router;