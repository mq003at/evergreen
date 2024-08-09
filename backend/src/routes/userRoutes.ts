import { Router, Request, Response } from "express";
import { authenticateTokenUserOrAdmin } from "../middlewares/authentication";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/isRegistered', userController.isRegistered);
router.post('/adminRegister', userController.adminRegister);
router.put('/:id', authenticateTokenUserOrAdmin, userController.update);
router.delete('/:id', authenticateTokenUserOrAdmin, userController.delete);
router.get('/test-route/:id', authenticateTokenUserOrAdmin, (req: Request, res: Response) => {
    res.send('Success');
});

export default router;