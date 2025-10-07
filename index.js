import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importar todas las rutas
import tutoriasRouter from "./src/routes/tutorias.js";
import aulasRouter from "./src/routes/aulas.js";
import tutoresRouter from "./src/routes/tutores.js";
import institucionesRouter from "./src/routes/instituciones.js";
import actividadesRouter from "./src/routes/actividades.js";
import estudiantesRouter from "./src/routes/estudiantes.js";
import inscripcionesRouter from "./src/routes/inscripciones.js";
import pagosQrRouter from "./src/routes/pagosQr.js";
import asignaRouter from "./src/routes/asigna.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    mensaje: "API SkillLink funcionando 🚀",
    endpoints: {
      tutorias: "/tutorias",
      aulas: "/aulas", 
      tutores: "/tutores",
      instituciones: "/instituciones",
      actividades: "/actividades",
      estudiantes: "/estudiantes",
      inscripciones: "/inscripciones",
      pagos: "/pagos",
      asignaciones: "/asigna"
    }
  });
});

// Configurar todas las rutas
app.use("/tutorias", tutoriasRouter);
app.use("/aulas", aulasRouter);
app.use("/tutores", tutoresRouter);
app.use("/instituciones", institucionesRouter);
app.use("/actividades", actividadesRouter);
app.use("/estudiantes", estudiantesRouter);
app.use("/inscripciones", inscripcionesRouter);
app.use("/pagos", pagosQrRouter);
app.use("/asigna", asignaRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Endpoints disponibles:`);
  console.log(`   http://localhost:${PORT}/tutorias`);
  console.log(`   http://localhost:${PORT}/aulas`);
  console.log(`   http://localhost:${PORT}/tutores`);
  console.log(`   http://localhost:${PORT}/instituciones`);
  console.log(`   http://localhost:${PORT}/estudiantes`);
  console.log(`   http://localhost:${PORT}/inscripciones`);
  console.log(`   http://localhost:${PORT}/pagos`);
  console.log(`   http://localhost:${PORT}/asigna`);
});