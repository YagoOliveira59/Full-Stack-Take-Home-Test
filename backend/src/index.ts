import express, {Response} from 'express';
import userRoutes from './modules/users/UsersRoutes';
import filesRoutes from './modules/files/FilesRoutes';
import cors from 'cors';

import "reflect-metadata"
import {AppDataSource} from "./database/data-source";

const app = express();
app.use(cors());
const port = 3000;

AppDataSource.initialize()
    .then(() => {
        console.log(`In memory Db initialized`);
    })
    .catch((error: Error) => console.error(error))

app.get('/', (res: Response) => {
    res.send('Full Stack TypeScript App');
});

app.use('/api', userRoutes);
app.use('/api', filesRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});