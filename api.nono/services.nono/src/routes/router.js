import express from 'express';
import getUserPartiesAction from "../actions/getUsersPartiesAction.js";
import updatePartyAction from "../actions/updatePartyAction.js";
import createPartyAction from "../actions/createPartyAction.js";
import getPartyByNiveauAction from "../actions/getPartyByNiveauAction.js"; // Import de l'action correspondante

const router = express.Router();

router
    .route("/parties/create")
    .post(createPartyAction)
    .all((req, res, next) => next(405));

router
    .route("/parties/update")
    .patch(updatePartyAction)
    .all((req, res, next) => next(405));

// Route pour récupérer une partie par son ID
router
    .route("/party")
    .get(getPartyByNiveauAction)
    .all((req, res, next) => next(405));

//filtre dispo sur le status
router
    .route("/profile/parties")
    .post(getUserPartiesAction) //permet de lister les parties créer par le joueur
    .all((req, res, next) => next(405));

export default router;