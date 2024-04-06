import express from 'express';
import getEnvironnementsAction from "../actions/Envionnement/getEnvironnementsAction.js";
import getEnvironnementByIdAction from "../actions/Envionnement/getEnvironnementsByIdAction.js";
import getPartyActions from "../actions/getPartyActions.js";
import getUserPartiesAction from "../actions/getUsersPartiesAction.js";
import updatePartyAction from "../actions/updatePartyAction.js";
import createPartyAction from "../actions/createPartyAction.js";

const router = express.Router();

router
    .route("/parties")
    //.get(getPartyActions) //lister toutes les parties ->a rétirer
    //.post(createPartyAction) //créer une partie //TODO à modifier create partie
    //.patch(updatePartyAction) //TODO à modifier update partie
    .all((req, res, next) => next(405));

//filtre dispo sur le status
router
    .route("/profile/parties")
    .get(getUserPartiesAction) //permet de lister les parties créer par le joueur
    .all((req, res, next) => next(405));


export default router;