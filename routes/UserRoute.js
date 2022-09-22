import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/', verifyUser, adminOnly, getUsers);
router.get('/:id', verifyUser, adminOnly, getUserById);
router.post('/', verifyUser, adminOnly, createUser);
router.patch('/:id', verifyUser, adminOnly, updateUser);
router.delete('/', verifyUser, adminOnly, deleteUser);

export default router;