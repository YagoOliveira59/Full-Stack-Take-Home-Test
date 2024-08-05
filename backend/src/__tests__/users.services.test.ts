import {beforeEach, describe, expect, it} from "@jest/globals";
import {UsersServices} from "../modules/users/UsersServices";
import {UserDTO} from "../modules/users/UserDto";

const mockUsers: UserDTO[] = [
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

describe('UsersServices', () => {
    let usersServices: UsersServices;

    beforeEach(() => {
        usersServices = new UsersServices();
    });

    it('inserts users', async () => {
        const result = await usersServices.setUser(mockUsers);
        expect(result).toEqual(mockUsers);

        await usersServices.deleteAllUser();
    });

    it('returns all users', async () => {
        await usersServices.setUser(mockUsers);
        const result = await usersServices.findAllUsers();
        expect(result).toEqual({
            "data": [
                {"id": 1, "name": "John Doe", "city": "New York", "country": "USA", "favorite_sport": "Basketball"},
                {"id": 2, "name": "Jane Smith", "city": "London", "country": "UK", "favorite_sport": "Football"},
                {"id": 3, "name": "Karen Lee", "city": "Tokyo", "country": "Japan", "favorite_sport": "Swimming"}
            ]
        });

        await usersServices.deleteAllUser();
    });

    it('returns empty list when no users found', async () => {
        const result = await usersServices.findAllUsers();
        expect(result).toEqual({"data": []});
    });

    it('deletes all users', async () => {
        const users = await usersServices.setUser(mockUsers);
        expect(users).toEqual(mockUsers);

        await usersServices.deleteAllUser();
        const result = await usersServices.findAllUsers();
        expect(result).toEqual({"data": []});
    });

    it('throws error when inserting invalid user data', async () => {
        const invalidUsers = [{"name": "Invalid User"}];
        await expect(usersServices.setUser(invalidUsers as UserDTO[])).rejects.toThrow();
    });
});