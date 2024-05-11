import pool from '../models/connections.js';

export const createUser = async (req, res) => {
  const { username, email, password, address } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'INSERT INTO tb_users (username, email, password, address) VALUES (?, ?, ?, ?)',
      [username, email, password, address]
    );
    connection.release();
    res.status(201).json({ message: 'User created successfully', userId: rows.insertId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Obter todos os usuários
export const getUsers = async () => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tb_users');
    connection.release();
    return rows;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
};

// Obter usuário por ID
export const getUserById = async (id) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tb_users WHERE id_user = ?', [id]);
    connection.release();
    return rows[0];
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    throw error;
  }
};

// Atualizar usuário por ID
export const updateUser = async (id, username, email, password, address) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE tb_users SET username = ?, email = ?, password = ?, address = ? WHERE id_user = ?',
      [username, email, password, address, id]
    );
    connection.release();
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

// Excluir usuário por ID
export const deleteUser = async (id) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM tb_users WHERE id_user = ?', [id]);
    connection.release();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};