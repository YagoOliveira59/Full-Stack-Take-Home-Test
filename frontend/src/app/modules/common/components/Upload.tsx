import useUsers from "@/hooks/useUsers";
import {useToast} from "@/components/ui/use-toast";

import Button from "@mui/material/Button";
import React from "react";
import {styled} from "@mui/material/styles";

export default function UploadComponent() {
    const {toast} = useToast()
    const {importUsers, fetchUsers} = useUsers();

    async function handleValidFile(file: any) {
        if (file.type !== 'text/csv') {
            toast({
                title: 'Error',
                description: 'Invalid file type. Please upload a CSV file',
                variant: "destructive",
            });
            return null;
        }
        return file;
    }

    async function handleUploadFile(file: any) {
        const response = await importUsers(file);
        if (response.success) {
            toast({
                title: 'Success',
                description: response.message,
            });
            await fetchUsers("");
        } else toast({
            title: 'Error on file upload',
            description: response.message,
            variant: "destructive",
        });
    }

    async function handleInputFile(event: React.ChangeEvent<HTMLInputElement> | any) {
        const file = event.target.files[0];
        const validFile = await handleValidFile(file);
        if (validFile) await handleUploadFile(validFile);
    }

    const VisuallyHiddenInput = styled('input')({
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" x2="12" y1="3" y2="15"/>
            </svg>
        );
    }

    return (
        <Button
            component="label"
            variant="contained"
            size="medium"
            tabIndex={-1}
            className="h-9 rounded-lg text-white font-medium text-sm px-3"
            startIcon={<UploadIcon className="w-4 h-4 mr-2"/>}
        >
            Upload
            <VisuallyHiddenInput type="file" accept=".csv" onChange={handleInputFile}/>
        </Button>
    )
}