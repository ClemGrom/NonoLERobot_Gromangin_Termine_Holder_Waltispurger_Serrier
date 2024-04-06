import { createParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const user_email = req.body.user_email;
        const env_id = req.body.environnement_id;

        if (!user_email || !env_id) {
            next(400);
        } else {
            const partie = await createParty(user_email, env_id);
            res.json({
                token: partie.token
            })
        }

    } catch (error) {
        console.log(error);
        next(500);
    }
}