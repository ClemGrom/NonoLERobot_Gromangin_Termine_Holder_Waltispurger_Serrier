export default {
    client: 'mysql',
    connection: {
        host: 'nono.services.db',
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    },
};
