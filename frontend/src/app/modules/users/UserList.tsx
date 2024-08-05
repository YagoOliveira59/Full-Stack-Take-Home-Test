import {Card, CardContent} from "@/components/ui/card"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"

import {UsersDTO} from "./UsersDTO";

export default function UserList({users}: { users: UsersDTO[] }) {
    return (
        users.map((user, index) => (
            <Card key={index} data-testid="info-card">
                <CardContent className="flex flex-col items-start justify-start p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex items-start h-full ">
                            <Avatar>
                                <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="grid gap-0.5">
                            <div className="font-semibold">{user.name}</div>
                            <div
                                className="text-sm text-muted-foreground">{user.city}, {user.country}</div>
                            <Separator className="my-1"/>

                            <div className="text-sm text-muted-foreground">Favorite
                                Sport: {user.favorite_sport}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))
    );
}