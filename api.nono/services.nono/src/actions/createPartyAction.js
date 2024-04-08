import { createParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const { niveau, user_email } = req.body;

        if (!niveau || !user_email) {
            return res.status(400).json({ message: "Niveau et email utilisateur sont requis." });
        }

        const party = await createParty(niveau, user_email); // Appelez votre fonction de service pour créer la partie
        res.status(201).json(party); // Répondre avec la partie créée
    } catch (error) {
        console.log(error);
        next(500);
    }
};
