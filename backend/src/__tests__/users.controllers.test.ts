import {UsersController} from "../api/users/UsersControllers";
import {UsersServices} from '../api/users/UsersServices';
import {describe, expect, it, beforeEach} from '@jest/globals';
import httpMocks from 'node-mocks-http';

const mockUsers = [
    {
        "name": "John Doe",
        "city": "New York",
        "country": "USA",
        "favorite_sport": "Basketball"
    },
    {
        "name": "Jane Smith",
        "city": "London",
        "country": "UK",
        "favorite_sport": "Football"
    },
    {
        "name": "Karen Lee",
        "city": "Tokyo",
        "country": "Japan",
        "favorite_sport": "Swimming"
    }
];


describe('UsersController', () => {
    let usersController: UsersController;
    let usersServices: UsersServices;

    beforeEach(() => {
        usersServices = new UsersServices();
        usersController = new UsersController(usersServices);
    });

    it('return response with data key', async () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/users',
            query: {q: ''},
        });
        const res = httpMocks.createResponse();

        await usersController.findAllUsers(req, res);
        const data = res._getJSONData();

        expect(res.statusCode).toBe(200);
        expect(data).toEqual({"data": []});
    })


    it('return all users', async () => {
        await usersServices.setUser(mockUsers);
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/users',
            query: {q: ''},
        });
        const res = httpMocks.createResponse();

        await usersController.findAllUsers(req, res);
        const data = res._getJSONData();

        expect(res.statusCode).toBe(200);
        expect(data).toEqual({
            "data": [
                {"id": 1, "name": "John Doe", "city": "New York", "country": "USA", "favorite_sport": "Basketball"},
                {"id": 2, "name": "Jane Smith", "city": "London", "country": "UK", "favorite_sport": "Football"},
                {"id": 3, "name": "Karen Lee", "city": "Tokyo", "country": "Japan", "favorite_sport": "Swimming"}
            ]
        });

        await usersServices.deleteAllUser();
    })


    it('return all users with query match', async () => {
        await usersServices.setUser(mockUsers);
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/users',
            query: {q: 'Ja'},
        });
        const res = httpMocks.createResponse();

        await usersController.findAllUsers(req, res);
        const data = res._getJSONData();

        expect(res.statusCode).toBe(200);
        expect(data).toEqual({
            "data": [
                {"id": 2, "name": "Jane Smith", "city": "London", "country": "UK", "favorite_sport": "Football"},
                {"id": 3, "name": "Karen Lee", "city": "Tokyo", "country": "Japan", "favorite_sport": "Swimming"}
            ]
        });

        await usersServices.deleteAllUser();
    })

})