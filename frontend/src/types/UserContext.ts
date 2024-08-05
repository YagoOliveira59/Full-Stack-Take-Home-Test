import {ResponseProps} from "./Response";
import {User} from "./User";

export interface UserContextProps {
    users: User[],
    loading: boolean,
    error: string | null,
    hasQuery: boolean,
    fetchUsers: (query: string) => Promise<void>,
    importUsers: (file: any) => Promise<ResponseProps>,
    setHasQuery: (hasQuery: boolean) => void,
    setUsers: (users: User[]) => void
}