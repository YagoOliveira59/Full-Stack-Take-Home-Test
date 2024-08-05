import { Request, Response } from 'express';
import { FilesServices } from './FilesServices';
import { UsersServices } from '../users/UsersServices';

export class FilesController {
    private readonly filesServices: FilesServices;
    private readonly usersServices: UsersServices;


    constructor(filesServices: FilesServices, usersServices: UsersServices) {
        this.filesServices = filesServices;
        this.usersServices = usersServices
    }

    async importDataFromFile(req: Request, res: Response) {
        try {
            if (req.file) {
                const users = await this.filesServices.importUsers(req.file.path);
                await this.usersServices.setUser(users);
                res.status(200).send('File uploaded successfully.');
            } else {
                res.status(400).send({
                    message: 'No file uploaded'
                });
            }
        } catch (err: any) {
            res.status(500).send({
                message: err.message,
                error: err.name
            });
        }
    }
}