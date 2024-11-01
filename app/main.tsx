// @ts-nocheck
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/ui/UploadButton";
import Header from "@/components/header";
import { worker } from "@/lib/workerInit";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Main({ session }) {
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: any) => {
        const file = event.target.files[0];
        fileInputRef.current.value = "";

        if (file) {
            setLoading(true);

            try {
                worker(file.name, file).then(async data => {
                    setLoading(false);
                    toast("Successfully uploaded...");
                }).catch((error) => {
                    setLoading(false);
                    toast("Couldn't upload file...");
                    console.error("Upload failed:", error);
                })
            } catch (error) {
                setLoading(false);
                toast("Couldn't upload file...");
                console.error("Upload failed:", error);
            }
        }
    };

    return (
        <>
            {loading ? (
                <div className="w-full flex justify-center items-center">
                    <ClipLoader />
                </div>
            ) : (
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <UploadButton fileInputRef={fileInputRef} loading={loading} session={session} />
                    </CardContent>
                </Card>
            )}
            <ToastContainer />
        </>
    );
}
