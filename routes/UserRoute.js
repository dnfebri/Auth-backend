import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/Users.js";
import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/', verifyUser, getUsers);
router.get('/:id', verifyUser, getUserById);
router.post('/', verifyUser, createUser);
router.patch('/:id', verifyUser, updateUser);
router.delete('/', verifyUser, deleteUser);

export default router;