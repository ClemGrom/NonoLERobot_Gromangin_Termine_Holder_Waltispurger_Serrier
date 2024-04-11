import { getUserParties } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const user_email = req.body.user_email;

        if (!user_email) {
            next(400);
        } else {
            const parties = await getUserParties(user_email); // Passez le statut à la fonction de service
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
