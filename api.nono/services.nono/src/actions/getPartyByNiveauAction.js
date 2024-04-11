import { getParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const user_email = req.body.user_email;
        const niveau = req.body.niveau;

        const party = await getParty(user_email, niveau); // Appel de la fonction pour récupérer la partie par son ID

        if (!party) {
            next(400);
        }

        res.json(party);
    } catch (error) {
        console.log(error);
        next(500);
    }
};
