import { getPartyById } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const { id } = req.params; // On récupère l'ID de la partie depuis les paramètres de la requête

        const party = await getPartyById(id); // Appel de la fonction pour récupérer la partie par son ID

        if (!party) {
            next(400);
        }

        res.json(party);
    } catch (error) {
        console.log(error);
        next(500);
    }
};
