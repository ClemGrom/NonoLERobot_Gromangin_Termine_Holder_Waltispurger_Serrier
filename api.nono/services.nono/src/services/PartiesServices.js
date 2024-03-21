import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

export const getParty = async (token) => {
    return db('parties').select('*').where('token', '=', token).first();
}

export const getUserParties = async (user_email, status) => {
    let query = db('parties').select('*').where('user_email', '=', user_email);

    if (status) {
        query = query.where('status', '=', status);
    }

    return query;
};

export const updatePartyStatus = async (token, nouvelEtat) => {
    await db('parties').where('token', '=', token).update({status: nouvelEtat});
}

export const createParty = async (environnement_id, user_email) => {
    let token = crypto.randomUUID().toString();
    const insertedPartie = await db('parties').insert({
        user_email: user_email,
        environnement_id: environnement_id,
        status: "CREATED",
        token: token
    });

    return db('parties').where('id', insertedPartie[0]).first();
}
