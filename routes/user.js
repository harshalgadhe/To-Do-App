import express from "express";
import { registerUser, authenticateUser, getMyProfile, logout} from "../controller/user.js";
import {isAuthenticated} from "../middlewares/auth.js"; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/me', isAuthenticated, getMyProfile);
router.get('/logout', logout);

export default router;