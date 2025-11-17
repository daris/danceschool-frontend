"use client";

import React from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import type {IDetectedBarcode} from "@yudiel/react-qr-scanner/dist/types";
import {Button, CircularProgress, Typography, Snackbar} from "@mui/material";
import {scanQrCode} from "@/lib/features/courses/courseAPI";
import {QrCodeRequest} from "@/lib/features/courses/types";
import {useRouter} from "next/navigation";


export default function QrScanner() {
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [snackbarData, setSnackbarData] = React.useState<{isOpen: boolean, message: string}>({isOpen: false, message: ''});

  const router = useRouter();

  const handleQrCodeScan = async (id: string) => {
    setLoading(true);
    try {
      await scanQrCode({id: id} as QrCodeRequest);
      setSnackbarData({isOpen: true, message: `Zarejestrowano wejście na zajęcia: ${id}`});
    } catch (error: any) {
      setSnackbarData({isOpen: true, message: error.response.data.message});
      return;
    }
    setLoading(false);
    // router.push('/');
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    console.log('Detected codes:', detectedCodes);
    const code = detectedCodes.pop();
    if (!code) {
      return;
    }

    setValue(code.rawValue);
    console.log(`Format: ${code.format}, Value: ${code.rawValue}`);

    await handleQrCodeScan(code.rawValue);
  };

  return (
    <>
      {loading && <CircularProgress />}

      <Button onClick={() => handleQrCodeScan('bf765b87-743e-4af3-8e69-24dea917fe3d')}>Test</Button>

      <Scanner styles={{container: {maxHeight: 'calc(100vh - 68px)'}}}
        onScan={handleScan}
        onError={(error) => console.error(error)}
      />

      <Typography>
        {value}
      </Typography>

      <Snackbar
        open={snackbarData.isOpen}
        autoHideDuration={6}
        message={snackbarData.message}
      />

    </>
  );
}