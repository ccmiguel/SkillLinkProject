import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todos los estudiantes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.estudiante");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiantes" });
  }
});

// GET - Estudiante por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.estudiante WHERE id_estudiante = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estudiante" });
  }
});

// POST - Crear estudiante
router.post("/", async (req, res) => {
  try {
    const { nombre, paterno, materno, celular, email, carrera, univer_institu } = req.body;
    const result = await pool.query(
      `INSERT INTO public.estudiante (nombre, paterno, materno, celular, email, carrera, univer_institu) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, paterno, materno, celular, email, carrera, univer_institu]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear estudiante" });
  }
});

export default router;