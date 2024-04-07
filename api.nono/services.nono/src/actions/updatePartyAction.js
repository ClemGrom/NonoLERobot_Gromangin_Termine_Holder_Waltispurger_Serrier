import { updateParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const { id, status, temps, score } = req.body;

        if (!id) {
            next(400);
        }

        const updatedParty = await updateParty(id, { status, temps, score });
        res.json({ message: "Partie mise à jour avec succès", updatedParty });

    } catch (error) {
        console.log(error);
        next(500);
    }
}
