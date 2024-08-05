import React from "react";
import SearchComponent from "@/app/modules/common/components/Search";
import UploadComponent from "@/app/modules/common/components/Upload";

export default function HeaderComponent() {
    return (
        <header className="bg-background border-b shadow-sm">
            <div className="container flex items-center justify-between h-16 px-4 md:px-6">
                <SearchComponent />
                <UploadComponent />
            </div>
        </header>
    )
}