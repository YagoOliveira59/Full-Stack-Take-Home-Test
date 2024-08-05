import multer from 'multer'
import {Router} from 'express'
import {FilesController} from './FilesControllers'
import {FilesServices} from "./FilesServices";
import {UsersServices} from "../users/UsersServices";

const router = Router()
const upload = multer({dest: 'uploads/'})

const filesServices = new FilesServices();
const usersServices = new UsersServices();
const filesController = new FilesController(filesServices, usersServices);


router.post('/files', upload.single('file'), (req, res) => filesController.importDataFromFile(req, res));

export default router;
