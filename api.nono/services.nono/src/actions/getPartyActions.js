import { getParty } from "../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const token = req.body.token;

        if(!token){
            next(400);
        } else {
            const party = await getParty(token);
            if(!party) {
                next(404);
            } else {
                res.json(party);
            }
        }
    } catch (error) {
        console.log(error);
        next(500);
    }
};