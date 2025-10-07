import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todos los tutores
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.tutor");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tutores" });
  }
});

// GET - Tutor por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.tutor WHERE id_tutor = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tutor no encontrado" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tutor" });
  }
});

// POST - Crear tutor
router.post("/", async (req, res) => {
  try {
    const { nombre, apellido_paterno, apellido_materno, celular, email, especialidad, nivel_academico } = req.body;
    const result = await pool.query(
      `INSERT INTO public.tutor (nombre, apellido_paterno, apellido_materno, celular, email, especialidad, nivel_academico) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, apellido_paterno, apellido_materno, celular, email, especialidad, nivel_academico]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear tutor" });
  }
});

export default router;