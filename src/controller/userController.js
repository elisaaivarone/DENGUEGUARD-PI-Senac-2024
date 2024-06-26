import pool from '../models/connections.js';

//Criar usuario
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

//Realizar login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tb_users WHERE email = ? AND password = ?', [email, password]);
    connection.release();
    if (rows.length > 0) {
      res.json({ message: 'Login successful', username: rows[0].username });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Obter todos os usuários
export const getUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tb_users');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Obter usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tb_users WHERE id_user = ?', [id]);
    connection.release();
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao obter usuário por ID:', error);
    res.status(500).json({ message: 'Error fetching user by ID' });
  }
};

// Atualizar usuário por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, address } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE tb_users SET username = ?, email = ?, password = ?, address = ? WHERE id_user = ?',
      [username, email, password, address, id]
    );
    connection.release();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Excluir usuário por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM tb_users WHERE id_user = ?', [id]);
    connection.release();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Função para obter o perfil do usuário pelo ID
export const getUserProfile = async (req, res) => {
  const userId = req.params.id; 
  try {
      const user = await pool.findByPk(userId); 
      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      return res.status(200).json(user);
  } catch (error) {
      console.error('Erro ao obter perfil do usuário:', error);
      return res.status(500).json({ message: 'Erro ao obter perfil do usuário' });
  }
};