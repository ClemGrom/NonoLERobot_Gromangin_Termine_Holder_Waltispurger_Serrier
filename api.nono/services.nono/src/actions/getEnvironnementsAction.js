import { getEnvironnements } from "../services/EnvironnementsServices.js";

export default async (req, res, next) => {
    try {
        const env = await getEnvironnements();

        if(!env) {
            next(500);
        } else {
            res.json(env);
        }
    } catch (error) {
        console.log(error);
        next(500);
    }
};