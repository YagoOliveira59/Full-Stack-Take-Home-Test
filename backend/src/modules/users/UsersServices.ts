import {UserDTO} from './UserDto';
import {UserRepository} from "./UserRepository";


export class UsersServices {
    private users: UserDTO[] = []
    userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async findAllUsers(query?: string) {
        this.users = await this.userRepo.findAll();
        if (!query) return { data: this.users };

        const queryLowerCase = query.toLowerCase();
        return {
            data: this.users.filter(user =>
                Object.keys(user).some(key =>
                    typeof user[key as keyof UserDTO] === 'string' &&
                    user[key as keyof UserDTO].toLowerCase().includes(queryLowerCase)
                )
            )
        };
    }

    async setUser(users: UserDTO[]) {
        return await this.userRepo.setUser(users);
    }

    async deleteAllUser() {
        return await this.userRepo.deleteAllUsers();
    }
}