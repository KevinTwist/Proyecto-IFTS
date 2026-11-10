const sql = require('mssql');
const { dbConfig } = require('./config');

let poolPromise;

exports.conectarDB = async () => {
    if (!poolPromise) {
        poolPromise = (async () => {
            console.log("conectando a DB...");
            const inicio = Date.now();

            const pool = await sql.connect(dbConfig);

            const duracion = Date.now() - inicio;
            console.log(`¡Conexión exitosa a SQL Server en ${duracion}ms!`);

            return pool;
        })();
    }

    try {
        return await poolPromise;
    } catch (error) {
        poolPromise = undefined;
        console.log(`Error en conectarDB: ${error.message}`);
        throw error;
    }
};