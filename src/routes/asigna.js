import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todas las asignaciones
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, t.nombre_tutoria, au.lugar, au.tipo_aula
      FROM public.asigna a
      JOIN public.tutoria t ON a.id_tutoria = t.id_tutoria
      JOIN public.aula au ON a.id_aula = au.id_aula
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener asignaciones" });
  }
});

// GET - Asignaciones por tutoria
router.get("/tutoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT a.*, au.lugar, au.tipo_aula
       FROM public.asigna a
       JOIN public.aula au ON a.id_aula = au.id_aula
       WHERE a.id_tutoria = $1`,
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener asignaciones" });
  }
});

// POST - Crear asignación
router.post("/", async (req, res) => {
  try {
    const { id_aula, id_tutoria, hora_inicio, hora_fin, dia } = req.body;
    const result = await pool.query(
      `INSERT INTO public.asigna (id_aula, id_tutoria, hora_inicio, hora_fin, dia) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_aula, id_tutoria, hora_inicio, hora_fin, dia]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear asignación" });
  }
});

export default router;