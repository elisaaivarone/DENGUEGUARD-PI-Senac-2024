import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser, getUserProfile } from '../controller/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser); 
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/profile/:id', getUserProfile);

export default router;