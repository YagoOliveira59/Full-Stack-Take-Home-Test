import {Request, Response} from 'express';
import {UsersServices} from "./UsersServices";

export class UsersController {
    private usersServices: UsersServices;

    constructor(usersServices: UsersServices) {
        this.usersServices = usersServices;
    }

    async findAllUsers(req: Request, res: Response) {
        try {
            const query: string = req.query.q as string;
            const users = await this.usersServices.findAllUsers(query);
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
