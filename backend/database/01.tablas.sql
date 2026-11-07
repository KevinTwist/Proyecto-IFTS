USE db_turnos;
GO


DROP TABLE IF EXISTS turnos;
DROP TABLE IF EXISTS disponibilidad;
GO

CREATE TABLE disponibilidad(
    id_disponibilidad INT IDENTITY(1,1) PRIMARY KEY,
    date_disponible   DATETIME2 NOT NULL
    /*persona_disponible osea algun nombre del especialista algo si quisieramos armarlo asi*/
);
GO

CREATE TABLE turnos (
    turno_id          INT IDENTITY(1,1) NOT NULL,
    codigo            NVARCHAR(10)  NOT NULL UNIQUE,
    nombre            NVARCHAR(20)  NOT NULL,
    id_disponibilidad INT           NOT NULL UNIQUE, 
    created_at        DATETIME2     NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT PK_turnos PRIMARY KEY (turno_id, codigo),
    CONSTRAINT FK_turnos_disponibilidad FOREIGN KEY (id_disponibilidad) REFERENCES disponibilidad(id_disponibilidad)
);
GO