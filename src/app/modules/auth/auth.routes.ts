import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
    '/register',
    validateRequest(AuthValidation.register as any),
    AuthController.registerUser
);

router.post(
    '/login',
    validateRequest(AuthValidation.login as any),
    AuthController.loginUser
);

export const AuthRoutes = router;
