const sql = require('mssql');
const { dbConfig } = require('./config');

exports.conectarDB = async () => {
    try {
        console.log("conectando a DB...");
        const inicio = Date.now();

        const pool = await sql.connect(dbConfig);

        const duracion = Date.now() - inicio;
        console.log(`¡Conexión exitosa a SQL Server en ${duracion}ms!`);

        return pool;

    } catch (error) {
        console.log(`Error en getSQLConnection: ${error}`);
        throw error;
    }
};