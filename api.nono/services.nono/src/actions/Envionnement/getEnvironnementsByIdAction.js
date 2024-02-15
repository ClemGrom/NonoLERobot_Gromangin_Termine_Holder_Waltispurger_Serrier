import { getEnvironnementById } from "../../services/EnvironnementsServices.js";

export default async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if(!id){
            next(400);
        } else {
            const env = await getEnvironnementById(id);

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