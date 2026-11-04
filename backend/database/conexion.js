const sql = require('mssql');
const { dbConfig } = require("./config");

exports.conectarDB = async () => {
    try {
        console.info(`Intentando conectar a la base de datos: ${process.env.DB_DATABASE}..`)
        const inicio = Date.now();
        let pool = await sql.connect(dbConfig);
        const duracion = Date.now() - inicio;

        console.log(`¡Conexión exitosa a SQL Server en ${duracion}ms!`);
        return pool;
    } catch (error) {
        console.log(`Error al intentar conectar a SQL Server: ${error.message}`)
    }
}