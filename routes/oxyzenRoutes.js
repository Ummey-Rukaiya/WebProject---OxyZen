import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/oxyzenController.js';
import userAuth from '../middleware/userAuth.js';

const oxyzenRouter = express.Router();

oxyzenRouter.post('/register', register);
oxyzenRouter.post('/login', login);
oxyzenRouter.post('/logout', logout);
oxyzenRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
oxyzenRouter.post('/verify-account', userAuth, verifyEmail);
oxyzenRouter.get('/is-auth', userAuth, isAuthenticated);
oxyzenRouter.post('/send-reset-otp', sendResetOtp);
oxyzenRouter.post('/reset-password', resetPassword);

export default oxyzenRouter;