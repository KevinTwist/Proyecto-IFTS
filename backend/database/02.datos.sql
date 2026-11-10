USE db_turnos;
GO

INSERT INTO disponibilidad (date_disponible) VALUES
    ('2026-11-10 09:00'),
    ('2026-11-10 10:30'),
    ('2026-11-11 15:00');
GO


INSERT INTO turnos (codigo, nombre, id_disponibilidad) VALUES
    (N'K7P2QX', N'Juan Pérez',     1),
    (N'M4R9TZ', N'María González', 2);
GO