import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todas las inscripciones
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, e.nombre as estudiante_nombre, t.nombre_tutoria 
      FROM public.inscripcion i
      JOIN public.estudiante e ON i.id_estudiante = e.id_estudiante
      JOIN public.tutoria t ON i.id_tutoria = t.id_tutoria
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inscripciones" });
  }
});

// GET - Inscripciones por estudiante
router.get("/estudiante/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT i.*, t.nombre_tutoria, t.sigla 
       FROM public.inscripcion i
       JOIN public.tutoria t ON i.id_tutoria = t.id_tutoria
       WHERE i.id_estudiante = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inscripciones" });
  }
});

// POST - Crear inscripción
router.post("/", async (req, res) => {
  try {
    const { fecha_inscripcion, estado_inscripcion, cupo_asignado, id_estudiante, id_tutoria } = req.body;
    const result = await pool.query(
      `INSERT INTO public.inscripcion (fecha_inscripcion, estado_inscripcion, cupo_asignado, id_estudiante, id_tutoria) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [fecha_inscripcion, estado_inscripcion, cupo_asignado, id_estudiante, id_tutoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear inscripción" });
  }
});

export default router;