import axios from "axios";

const directusURL = 'http://directus:8055/graphql';

export const getEnvironnements = async () => {
    const query = `
    query Environnements {
        Environnement {
            id
            nom
        }
    }
`;

    try {
        const response = await axios({
            method: "post",
            url: directusURL,
            data: {
                query: query
            },
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Erreur Axios :", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const getEnvironnementById = async (id) => {
    const query = `
    query Environnements_by_id {
        Environnement_by_id(id: ${id}) {
            id
            nom
            robot_id {
                Robot_id {
                    id
                    nom
                    type
                    batterie
                    posX
                    posY
                    createDate
                }
            }
            obstacle_id {
                Obstacles_id {
                    id
                    obstacleType
                    posX
                    posY
                }
            }
            Configuration_id {
                id
                size
                densiteObst
            }
        }
    }
`;

    try {
        const response = await axios({
            method: "post",
            url: directusURL,
            data: {
                query: query
            },
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur Axios :", error.response ? error.response.data : error.message);
        throw error;
    }
}