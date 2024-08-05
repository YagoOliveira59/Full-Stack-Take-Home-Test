"use client"
import {createContext, useState} from 'react';
import {UserContextProps} from "@/types/UserContext";
import {Props} from "@/types/Children";
import {User} from "@/types/User";

const UserContext = createContext<UserContextProps>({} as any);

export const UserProvider = ({children}: Props) => {
    const [users, setUsers] = useState([] as User[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasQuery, setHasQuery] = useState(false);

    const handleSetMessage = async (response: any, sucess: boolean) => {
        if (sucess) return 'File uploaded successfully'
        const parsedResponse = await response.json();
        if (parsedResponse.error === 'SQLITE_CONSTRAINT') return 'User data is invalid'
        else return parsedResponse.message
    }

    const fetchUsers = async (query: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users?q=${query}`).then((res) => res.json());
            setUsers(response.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const importUsers = async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/api/files', {
                method: 'POST',
                body: formData,
            })
            const success = response.ok;
            const message = await handleSetMessage(response, success);
            return {success, message};
        } catch (err: any) {
            return {success: false, message: 'File upload failed'};
        }
    };

    return (
        <UserContext.Provider value={
            {users, loading, error, hasQuery, fetchUsers, importUsers, setHasQuery, setUsers}
        }>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;