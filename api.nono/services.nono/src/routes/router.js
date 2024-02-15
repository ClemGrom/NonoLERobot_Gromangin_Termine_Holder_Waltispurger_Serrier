import express from 'express';
import getEnvironnementsAction from "../actions/getEnvironnementsAction.js";

const router = express.Router();

router
    .route("/environnements")
    .get(getEnvironnementsAction)
    .all((req, res, next) => next(405));

router
    .route("/party")
    .all((req, res, next) => next(405));

export default router;