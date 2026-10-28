# 📅 Sistema de Gestión de Turnos (Gestión Turnos)

Proyecto académico desarrollado para las materias **Desarrollo de Sistemas Web – BackEnd** y **Desarrollo de Sistemas Web – FrontEnd** del **IFTS**.

## 🚀 Descripción del Proyecto
Sistema web simplificado de gestión de turnos de uso general, diseñado para adaptarse a múltiples ámbitos (salud, estética, asesorías, servicios, etc.). Su componente principal es un **calendario interactivo** que permite a cualquier usuario reservar un turno de forma rápida, **sin necesidad de registrarse ni iniciar sesión**.

---

## 🏗️ Arquitectura del BackEnd (Patrón por Capas)
El backend está desarrollado en **Node.js** con **Express** siguiendo una arquitectura modular y desacoplada para separar responsabilidades:

1. **Routes (`/routes`):** Define los endpoints de la API REST y direcciona las peticiones HTTP hacia el controlador correspondiente.
2. **Controllers (`/controllers`):** Gestionan la lógica de transporte HTTP (reciben la request, validan datos básicos de entrada, llaman al servicio y devuelven la respuesta HTTP con el código de estado adecuado).
3. **Services (`/services`):** Contienen la **lógica de negocio** pura de la aplicación (validación de disponibilidad de horarios, reglas para modificar o cancelar turnos).
4. **Repositories (`/repositories`):** Capa de acceso a datos que interactúa directamente con las consultas o modelos de persistencia.
5. **Contenedor (`/contenedor` o gestor de persistencia):** Encapsula la conexión y la lógica de comunicación con la base de datos (**SQL Server**), centralizando las operaciones de persistencia.

---

## 🛠️ Tecnologías Utilizadas

* **FrontEnd:** Angular, Ionic UI Components, TypeScript.
* **BackEnd:** Node.js, Express, JavaScript.
* **Base de Datos:** SQL Server.
* **Control de Versiones:** Git & GitHub.

---

## 📁 Estructura del Proyecto

gestion-turnos/
├── BackEnd/
│   ├── routes/          # Endpoints de la API
│   ├── controllers/     # Controladores HTTP
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos
│   ├── contenedor/      # Manejador de persistencia / Conexión a BD
│   ├── index.js         # Punto de entrada del servidor Express
│   ├── .env             # Variables de entorno
│   └── package.json     # Dependencias del backend
├── FrontEnd/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Vistas y componentes visuales
│   │   │   ├── services/   # Comunicación HTTP con el Backend
│   │   │   └── models/     # Interfaces y modelos de datos
│   └── package.json     # Dependencias del frontend
├── .gitignore
└── README.md

---

### 💡 Ideas para completar y pulir el README o el proyecto
Si quieres dejar el proyecto impecable para la entrega, te sugiero sumar estos detalles que suelen valorar mucho en los profesorados técnicos:

1. **Documentación de Endpoints (API Reference):** Agregar una pequeña tabla en el README especificando las rutas principales del BackEnd (método, ruta, descripción y ejemplo de body). Por ejemplo:
   * `GET /api/turnos` -> Obtiene los turnos y horarios disponibles.
   * `POST /api/turnos` -> Reserva un nuevo turno.
2. **Manejo de Errores Middleware:** Asegurarte de tener un middleware centralizado en Express para capturar errores y devolver respuestas limpias en formato JSON con códigos HTTP correctos (`400`, `404`, `500`), y mencionarlo brevemente en la sección de arquitectura.
3. **Variables de entorno (`.env.example`):** Subir un archivo `.env.example` al repositorio para que cualquier evaluador sepa exactamente qué variables de configuración (`DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_DATABASE`, `PORT`) necesita configurar sin adivinar.

---

⚙️ Funcionalidad y CRUD de Turnos
Create (Reservar): Elegir un día en el calendario, seleccionar un horario disponible, completar los datos básicos del usuario y confirmar.
Read (Consultar): Visualizar el calendario con los turnos existentes y los horarios disponibles en tiempo real.
Update (Modificar): Cambiar la fecha, el horario o el tipo de servicio de un turno ya reservado.
Delete (Cancelar): Cancelar o dar de baja un turno previamente reservado para liberar el espacio en el calendario.