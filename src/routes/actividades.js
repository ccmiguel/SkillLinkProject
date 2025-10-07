import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todas las actividades
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.actividad");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
});

// GET - Actividades por tutoria
router.get("/tutoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM public.actividad WHERE id_tutoria = $1",
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener actividades" });
  }
});

// POST - Crear actividad
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, fecha_publicacion, fecha_presentacion, nota_act, id_tutoria } = req.body;
    const result = await pool.query(
      `INSERT INTO public.actividad (nombre, descripcion, fecha_publicacion, fecha_presentacion, nota_act, id_tutoria) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, descripcion, fecha_publicacion, fecha_presentacion, nota_act, id_tutoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear actividad" });
  }
});

export default router;