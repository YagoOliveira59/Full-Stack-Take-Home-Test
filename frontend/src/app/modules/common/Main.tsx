"use client";

import {useEffect} from "react";

import useUsers from '@/hooks/useUsers';

import Loading from "@/app/modules/common/Loading"
import ErrorPage from "@/app/modules/common/Error";

import UserList from "../users/UserList";
import EmptyComponent from "../users/Empty";
import HeaderComponent from "./components/Header";

export function Main() {
    const {users, loading, error, hasQuery, fetchUsers} = useUsers()

    useEffect(() => {
        fetchUsers("").then();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <ErrorPage message={error}/>;
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent />
            <main className="flex-1 bg-muted/40 py-8 md:py-12">
                {users && users.length ? (
                    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <UserList users={users}/>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full w-full">
                        <EmptyComponent hasQuery={hasQuery}/>
                    </div>
                )}
            </main>
            <footer className="w-full text-center text-xs text-muted-foreground">Powered by Yago Oliveira</footer>
        </div>
    )
}