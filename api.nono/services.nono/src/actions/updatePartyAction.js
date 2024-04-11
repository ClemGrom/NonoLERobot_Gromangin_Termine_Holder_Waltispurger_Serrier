import { updateParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const { user_email, niveau, temps, score, capteurGlongeur, capteurGangle, capteurDlongeur, capteurDangle } = req.body;

        if (!user_email || !niveau) {
            next(400);
        }

        const updatedParty = await updateParty(user_email, niveau, temps, score, capteurGlongeur, capteurGangle, capteurDlongeur, capteurDangle);
        res.json({ message: "Partie mise à jour avec succès", updatedParty });

    } catch (error) {
        console.log(error);
        next(500);
    }
}
