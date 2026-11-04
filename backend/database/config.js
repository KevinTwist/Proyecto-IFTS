require('dotenv').config();

const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true
    }
};
module.exports = { dbConfig }