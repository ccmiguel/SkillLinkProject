import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todas las instituciones
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.institucion");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener instituciones" });
  }
});

// GET - Institución por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.institucion WHERE id_institucion = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Institución no encontrada" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener institución" });
  }
});

export default router;