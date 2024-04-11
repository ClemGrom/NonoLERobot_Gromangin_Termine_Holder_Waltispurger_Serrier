import { getParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const { user_email, niveau } = req.query;

        if (!user_email || !niveau) {
            return res.status(400).json({ message: "Les paramètres user_email et niveau sont requis" });
        }

        const party = await getParty(user_email, niveau);

        if (!party) {
            return res.status(404).json({ message: "La partie n'a pas été trouvée" });
        }

        res.json(party);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

