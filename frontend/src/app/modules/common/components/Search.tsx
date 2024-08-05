import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import useUsers from "@/hooks/useUsers";

export default function SearchComponent() {
    const {fetchUsers, setHasQuery} = useUsers();

    const [query, setQuery] = useState("");
    const [debouncedInputValue, setDebouncedInputValue] = useState("");

    const handleInputChange = (event: { target: { value: string } }) => {
        setQuery(event.target.value);
        setHasQuery(!!event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedInputValue(query), 1000);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        fetchUsers(debouncedInputValue).then();
    }, [debouncedInputValue]);

    return (
        <div className="relative flex-1 max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
                data-testid="search-input"
                type="search"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                className="w-full rounded-lg bg-background pl-8 pr-4 h-9"
            />
        </div>
    )
}