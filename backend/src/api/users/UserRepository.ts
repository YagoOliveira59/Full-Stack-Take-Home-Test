import {UserDTO} from './UserDto';
import {User} from "../../entity/User";
import {AppDataSource} from "../../database/data-source";

export class UserRepository {
    private usersDB = AppDataSource.getRepository(User);

    async findAll() {
        const users = await this.usersDB.find();
        return users as UserDTO[];
    }

    async setUser(users: UserDTO[]) {
        return await this.usersDB.save(users);
    }

    async deleteAllUsers() {
        return await this.usersDB.clear();
    }
}