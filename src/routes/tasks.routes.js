import { Router } from "express";
import { autgRequire } from "../middlewares/validateToken.js";
import { getTask, getTasks, createTasks, deleteTasks, updateTasks } from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validatorMiddleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/tasks', autgRequire, getTasks)
router.get('/tasks/:id', autgRequire, getTask)
router.post('/tasks', autgRequire, validateSchema(createTaskSchema), createTasks)
router.delete('/tasks/:id', autgRequire, deleteTasks)
router.put('/tasks/:id', autgRequire, updateTasks)

export default router