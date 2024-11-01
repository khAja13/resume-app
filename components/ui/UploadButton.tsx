// @ts-nocheck

import { auth } from "@/auth";
import { Button } from "./button";
import { MutableRefObject } from "react";

interface UploadButtonProps {
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  loading: boolean;
}

export function UploadButton({ fileInputRef, loading, session }: React.FC<UploadButtonProps>) {
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Button size="lg" onClick={handleButtonClick} disabled={loading || !session}>
      Upload Your Resume
    </Button>
  );
};

export default UploadButton;
