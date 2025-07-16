import pool from '../config/db.js';


export const getAllCategorias = async () => {
  const [rows] = await pool.query(`SELECT * FROM categorias`);
  return rows;
};


export const getCategoriaById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM categorias WHERE id = ?`, [id]);
  return rows[0];
};


export const insertCategoria = async (nombre) => {
  // Verificar nombre único
  const [exists] = await pool.query(`SELECT id FROM categorias WHERE nombre = ?`, [nombre]);
  if (exists.length > 0) {
    throw new Error('El nombre de la categoría ya existe');
  }

  const [result] = await pool.query(`INSERT INTO categorias (nombre) VALUES (?)`, [nombre]);
  return { id: result.insertId, nombre };
};


export const updateCategoria = async (id, nombre) => {
  // Verificar nombre único
  const [exists] = await pool.query(`SELECT id FROM categorias WHERE nombre = ? AND id <> ?`, [nombre, id]);
  if (exists.length > 0) {
    throw new Error('Ya existe otra categoría con ese nombre');
  }

  const [result] = await pool.query(`UPDATE categorias SET nombre = ? WHERE id = ?`, [nombre, id]);
  return result.affectedRows > 0;
};


export const deleteCategoria = async (id) => {
  const [count] = await pool.query(`SELECT COUNT(*) AS total FROM productos WHERE categoria_id = ?`, [id]);
  if (count[0].total > 0) {
    throw new Error('No se puede eliminar la categoría porque tiene productos asociados');
  }

  const [result] = await pool.query(`DELETE FROM categorias WHERE id = ?`, [id]);
  return result.affectedRows > 0;
};
