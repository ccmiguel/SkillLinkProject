import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET - Todos los pagos QR
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, i.id_estudiante, e.nombre as estudiante_nombre
      FROM public.pago_qr p
      JOIN public.inscripcion i ON p.id_inscripcion = i.id_inscripcion
      JOIN public.estudiante e ON i.id_estudiante = e.id_estudiante
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos QR" });
  }
});

// POST - Crear pago QR
router.post("/", async (req, res) => {
  try {
    const { monto, fecha_de_pago, codigo_qr, id_inscripcion } = req.body;
    const result = await pool.query(
      `INSERT INTO public.pago_qr (monto, fecha_de_pago, codigo_qr, id_inscripcion) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [monto, fecha_de_pago, codigo_qr, id_inscripcion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear pago QR" });
  }
});

export default router;