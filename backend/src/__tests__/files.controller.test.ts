import {FilesController} from '../modules/files/FilesControllers';
import {FilesServices} from '../modules/files/FilesServices';
import {UsersServices} from '../modules/users/UsersServices';
import {describe, expect, it, beforeEach} from '@jest/globals';
import httpMocks from 'node-mocks-http';


describe('FilesController', () => {
    let filesController: FilesController;
    let filesServices: FilesServices;
    let usersServices: UsersServices;

    beforeEach(() => {
        filesServices = new FilesServices();
        usersServices = new UsersServices();
        filesController = new FilesController(filesServices, usersServices);
    });

    it('imports data from a file and saves it to the database', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/upload',
            file: {
                path: 'files/users.csv',
                originalname: 'users.csv',
                mimetype: 'text/csv',
            },
        });
        const res = httpMocks.createResponse();

        await filesController.importDataFromFile(req, res);
        const data = res._getData();

        expect(res.statusCode).toBe(200);
        expect(data).toEqual('File uploaded successfully.');
    })

    it('returns an error when no file is uploaded', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/upload',
        });
        const res = httpMocks.createResponse();

        await filesController.importDataFromFile(req, res);
        const data = res._getData();

        expect(res.statusCode).toBe(400);
        expect(data).toEqual({ message: 'No file uploaded' });
    })

    it('returns an error when the file is empty', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/upload',
            file: {
                path: 'files/users_empty.csv',
                originalname: 'users_empty.csv',
                mimetype: 'text/csv',
            },
        });

        const res = httpMocks.createResponse();

        await filesController.importDataFromFile(req, res);
        const data = res._getData();

        expect(res.statusCode).toBe(500);
        expect(data).toEqual({"error": "PARSE_ERROR", "message": "File is empty or failed to read the file"})
    })

})