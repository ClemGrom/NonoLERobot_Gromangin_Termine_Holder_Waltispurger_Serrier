import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

export const getPartyById = async (id) => {
    return db('parties').where('id', '=', id).first();
};

export const getUserParties = async (user_email, status) => {
    let query = db('parties').select('*').where('user_email', '=', user_email);

    if (status) {
        query = query.where('status', '=', status);
    }

    return query;
};

export const updateParty = async (id, newData) => {
    const { status, temps, score } = newData;
    console.log(status, temps, score)
    await db('parties').where('id', '=', id).update({
        status: status,
        temps: temps,
        score: score
    });

    return db('parties').where('id', '=', id).first();
}


export const createParty = async (niveau, user_email) => {
    let token = crypto.randomUUID().toString();
    const insertedPartie = await db('parties').insert({
        user_email: user_email,
        niveau: niveau,
        status: "CREATED",
    });

    return db('parties').where('id', insertedPartie[0]).first();
}
