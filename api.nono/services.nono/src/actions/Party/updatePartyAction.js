import { updatePartyStatus } from "../../services/PartiesServices.js";

export default async (req, res, next) => {
    try {
        const token = req.body.token;
        const status = req.body.status;

        console.log(token, status);

        if (!token) {
            next(400);
        } else {
            await updatePartyStatus(token, status);
            if (!token) {
                next(404);
            } else {
                res.json("Partie mise à jour avec succès");
            }
        }
    } catch (error) {
        console.log(error);
        next(500);
    }
}