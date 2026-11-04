require('dotenv').config();

const dbConfing = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433, //parseInt para asegurar que Node.js reciba un número y no un texto, con 1433 como valor de respaldo (fallback).
    options: {
        encrypt: false,
        trueServerCertificate: true,
        trustedConection: true
    }
};
module.exports = {dbConfing}