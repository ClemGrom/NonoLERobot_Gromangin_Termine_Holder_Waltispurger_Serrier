import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

class PartiesServices {
    async updatePartyStatus(partyId, nouvelEtat){
        await db('parties').where('id', '=', partyId).update({status: nouvelEtat});
    }

    async getParty(id) {
         await db('parties').select('*').where('id', '=', id).first();
    }

    async createParty(envrionnement_id, user_email){
        let token = crypto.randomUUID().toString();
        const insertedPartie = await db('parties').insert({
            user_email: user_email,
            environnement_id: environnement_id,
            status: "CREATED",
            token: token
        });

        return await db('parties').where('id', insertedPartie[0]).first();
    }

}

export default PartiesServices;