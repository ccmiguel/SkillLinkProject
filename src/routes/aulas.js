import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todas las aulas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.aula");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener aulas:", error.message);
    res.status(500).json({ error: "Error al obtener aulas" });
  }
});

// GET - Aula por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM public.aula WHERE id_aula = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Aula no encontrada" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener aula" });
  }
});

// POST - Crear aula
router.post("/", async (req, res) => {
  try {
    const { tipo_aula, lugar, capacidad } = req.body;
    const result = await pool.query(
      "INSERT INTO public.aula (tipo_aula, lugar, capacidad) VALUES ($1, $2, $3) RETURNING *",
      [tipo_aula, lugar, capacidad]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear aula" });
  }
});

// PUT - Actualizar aula
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_aula, lugar, capacidad } = req.body;
    const result = await pool.query(
      "UPDATE public.aula SET tipo_aula=$1, lugar=$2, capacidad=$3 WHERE id_aula=$4 RETURNING *",
      [tipo_aula, lugar, capacidad, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Aula no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar aula" });
  }
});

// DELETE - Eliminar aula
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM public.aula WHERE id_aula = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Aula no encontrada" });
    }

    res.json({ mensaje: "Aula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar aula" });
  }
});

export default router;