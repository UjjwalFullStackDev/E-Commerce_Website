import express from 'express';
import { registerController, loginController, test } from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/test', requireSignIn, test);

export default router;