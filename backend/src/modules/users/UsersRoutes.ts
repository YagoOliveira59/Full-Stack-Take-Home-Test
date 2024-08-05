import {Router} from 'express'
import {UsersController} from './UsersControllers'
import {UsersServices} from "./UsersServices";

const router = Router();
const usersServices = new UsersServices();
const usersController = new UsersController(usersServices);

router.get('/users', (req, res) => usersController.findAllUsers(req, res));

export default router;