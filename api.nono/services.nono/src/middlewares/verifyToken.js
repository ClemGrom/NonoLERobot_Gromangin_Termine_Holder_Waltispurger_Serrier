// middlewares/verifyToken.js

import axios from 'axios';

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token manquant. Authentification non autorisée.' });
    }

    try {
        const response = await axios.post('http://localhost:2082/api/users/validate', {
            token: token,
        });

        if (response.data.valid) {
            next();
        } else {
            return res.status(401).json({ message: 'Token invalide. Authentification non autorisée.' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide. Authentification non autorisée.' });
    }
};

export default verifyToken;
