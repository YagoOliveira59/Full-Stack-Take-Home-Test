import {Button} from "@/components/ui/button"


export default function ErrorPage({ message }: { message: string }) {

    const refreshPage = () => {
        window.location.reload()
    }

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Oops, something went wrong!
                </h1>
                <p className="mt-4 text-muted-foreground">
                    We're sorry, but an unexpected error has occurred. Please try again.
                </p>
                <p className="mt-2 text-muted-foreground">
                    Error message: {message}
                </p>
                <div className="mt-6">
                    <Button onClick={refreshPage} size="sm">
                        Try again
                    </Button>
                </div>
            </div>
        </div>
    )
}