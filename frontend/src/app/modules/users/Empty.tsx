export default function EmptyComponent({ hasQuery }: { hasQuery: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-background rounded-lg shadow-sm max-w-md">
            <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold">No users found</h3>
                {
                    hasQuery ? (
                        <p className="text-muted-foreground">We couldn't find any users matching your search criteria.</p>
                    ) : (
                        <div>
                            <p className="text-muted-foreground">There are no users available at the moment.</p>
                            <p className="text-muted-foreground">Please send a CSV file to import new users </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}