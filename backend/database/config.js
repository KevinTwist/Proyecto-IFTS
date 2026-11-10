const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const variablesRequeridas = ['DB_SERVER', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'];
const variablesFaltantes = variablesRequeridas.filter((nombre) => !process.env[nombre]);

if (variablesFaltantes.length > 0) {
    throw new Error(
        `Faltan variables de entorno: ${variablesFaltantes.join(', ')}. Revisá backend/.env (podés basarte en backend/.env.example).`
    );
}

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = { dbConfig };