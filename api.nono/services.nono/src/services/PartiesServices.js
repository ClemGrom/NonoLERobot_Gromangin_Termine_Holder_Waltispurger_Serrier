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
    const { status, temps, score, capteurGlongeur, capteurGangle, capteurDlongeur, capteurDangle } = newData;
    await db('parties').where('id', '=', id).update({
        status: status,
        temps: temps,
        score: score,
        capteurGlongeur: capteurGlongeur,
        capteurGangle: capteurGangle,
        capteurDlongeur: capteurDlongeur,
        capteurDangle: capteurDangle
    });

    return db('parties').where('id', '=', id).first();
}



export const createParty = async (niveau, user_email) => {
    const defaultCapteurLengthValue = 100;
    const defaultCapteurAngleValue = 90;
    const insertedPartie = await db('parties').insert({
        user_email: user_email,
        niveau: niveau,
        status: "CREATED",
        capteurGlongeur: defaultCapteurLengthValue,
        capteurGangle: defaultCapteurAngleValue,
        capteurDlongeur: defaultCapteurLengthValue,
        capteurDangle: defaultCapteurAngleValue
    });

    return db('parties').where('id', insertedPartie[0]).first();
}
