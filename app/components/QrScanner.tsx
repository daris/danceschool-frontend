"use client";

import React from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import type {IDetectedBarcode} from "@yudiel/react-qr-scanner/dist/types";
import {Button, CircularProgress, Typography, Snackbar, SnackbarCloseReason, Box} from "@mui/material";
import {scanQrCode} from "@/lib/features/courses/courseAPI";
import {QrCodeRequest} from "@/lib/features/courses/types";
import {useRouter} from "next/navigation";

export default function QrScanner() {
  const [value, setValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [snackbarData, setSnackbarData] = React.useState<{isOpen: boolean, message?: string}>({isOpen: false, message: ''});

  const router = useRouter();

  const handleQrCodeScan = async (qrCodeRequest: QrCodeRequest) => {
    setLoading(true);
    try {
      const qrCodeResponse = await scanQrCode(qrCodeRequest);
      setSnackbarData({isOpen: true, message: qrCodeResponse.message});
    } catch (error: any) {
      setSnackbarData({isOpen: true, message: error.response.data.message});
      setLoading(false);
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

    const qrData: QrCodeRequest = JSON.parse(code.rawValue);

    await handleQrCodeScan(qrData);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarData({isOpen: false});
  };


  return (
    <>
      <Box sx={{display: 'flex'}}>
        {loading && <CircularProgress />}

        <Button onClick={() => handleQrCodeScan({id: '72067907-bdaa-4312-ab3b-e470cbf64e30', type: 'LESSON'})}>Example lesson</Button>
        <Button onClick={() => handleQrCodeScan({id: 'bf765b87-743e-4af3-8e69-24dea917fe3d', type: 'PASS'})}>Example pass</Button>
      </Box>

      <Scanner styles={{container: {maxHeight: 'calc(100vh - 68px)'}}}
        onScan={handleScan}
        onError={(error) => console.error(error)}
      />

      <Typography>
        {value}
      </Typography>

      <Snackbar
        open={snackbarData.isOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarData.message}
      />

    </>
  );
}