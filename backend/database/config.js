require('dotenv').config();

const dbConfig = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    server: process.env.SERVER_NAME,
    database: process.env.NAME_DB,
    port: Number(process.env.PORT_DB),
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = { dbConfig };