import express from 'express';
import getUserPartiesAction from "../actions/getUsersPartiesAction.js";
import updatePartyAction from "../actions/updatePartyAction.js";
import createPartyAction from "../actions/createPartyAction.js";
import getPartyByIdAction from "../actions/getPartyByIdAction.js"; // Import de l'action correspondante

const router = express.Router();

router
    .route("/parties")
    .post(createPartyAction)
    .patch(updatePartyAction)
    .all((req, res, next) => next(405));

// Route pour récupérer une partie par son ID
router
    .route("/parties/:id")
    .get(getPartyByIdAction)
    .all((req, res, next) => next(405));

//filtre dispo sur le status
router
    .route("/profile/parties")
    .get(getUserPartiesAction) //permet de lister les parties créer par le joueur
    .all((req, res, next) => next(405));

export default router;