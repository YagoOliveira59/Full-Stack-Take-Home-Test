export default function Loading() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="flex justify-center">
                    <div className="h-12 w-12 animate-spin text-primary" />
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loading...</h1>
                <p className="mt-4 text-muted-foreground">Please wait while we load the page for you.</p>
            </div>
        </div>
    )
}