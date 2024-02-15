import express from 'express';

const router = express.Router();

router
    .route("/environnements")
    .all((req, res, next) => next(405));

router
    .route("/party")
    .all((req, res, next) => next(405));

export default router;