// authorRoutes.ts

import { Router } from 'express';
import { AuthorController } from '../controllers/authorController'; 

const router = Router();
const authorController = new AuthorController();

router.post('/', (req, res, next) => authorController.create(req, res, next));
router.get('/', (req, res, next) => authorController.getAll(req, res, next)); 
router.get('/:id', (req, res, next) => authorController.findById(req, res, next));
router.put('/:id', (req, res, next) => authorController.updateById(req, res, next));
router.delete('/:id', (req, res, next) => authorController.deleteById(req, res, next));

export default router;
