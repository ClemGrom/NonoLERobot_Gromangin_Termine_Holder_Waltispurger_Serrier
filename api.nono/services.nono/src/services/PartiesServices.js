import knex from "knex";
import knexConfig from '../configs/db.config.js'

const db = knex(knexConfig);

export const getParty = async (user_email, niveau) => {
    return db('parties').where({'user_email': user_email, 'niveau': niveau}).first();
};

export const getUserParties = async (user_email) => {
    return db('parties').select('*').where('user_email', '=', user_email);
};

export const updateParty = async (user_email, niveau, temps, score, capteurGlongeur, capteurGangle, capteurDlongeur, capteurDangle) => {
    await db('parties').where({ 'user_email': user_email, 'niveau': niveau }).update({
        temps: temps,
        score: score,
        capteurGlongeur: capteurGlongeur,
        capteurGangle: capteurGangle,
        capteurDlongeur: capteurDlongeur,
        capteurDangle: capteurDangle
    });

    return db('parties').where({ 'user_email': user_email, 'niveau': niveau }).first();
}




export const createParty = async (niveau, user_email) => {
    const defaultCapteurLengthValue = 100;
    const defaultCapteurAngleValue = 90;
    const insertedPartie = await db('parties').insert({
        user_email: user_email,
        niveau: niveau,
        capteurGlongeur: defaultCapteurLengthValue,
        capteurGangle: defaultCapteurAngleValue,
        capteurDlongeur: defaultCapteurLengthValue,
        capteurDangle: defaultCapteurAngleValue
    });

    return db('parties').where('id', insertedPartie[0]).first();
}
