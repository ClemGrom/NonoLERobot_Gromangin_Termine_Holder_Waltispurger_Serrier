import { getParty } from "../../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const token = parseInt(req.body.token);

        if(!token){
            next(400);
        } else {
            const env = await getParty(token);

            if(!env) {
                next(404);
            } else {
                res.json(env);
            }
        }
    } catch (error) {
        console.log(error);
        next(500);
    }
};