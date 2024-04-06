import { getUserParties } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const user_email = req.body.user_email;
        const status = req.query.status; // Récupérer le statut depuis les paramètres de requête

        console.log(user_email, status);

        if (!user_email) {
            next(400);
        } else {
            const parties = await getUserParties(user_email, status); // Passez le statut à la fonction de service
            if (!user_email) {
                next(404);
            } else {
                res.json(parties);
            }
        }
    } catch (error) {
        console.log(error);
        next(500);
    }
};
