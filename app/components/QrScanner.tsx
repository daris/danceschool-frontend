"use client";

import React from "react";
import {Scanner} from "@yudiel/react-qr-scanner";
import type {IDetectedBarcode} from "@yudiel/react-qr-scanner/dist/types";
import {Typography} from "@mui/material";


export default function QrScanner() {
  const [value, setValue] = React.useState<string>('');

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    console.log('Detected codes:', detectedCodes);
    // detectedCodes is an array of IDetectedBarcode objects
    detectedCodes.forEach(code => {
      setValue(code.rawValue);
      console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
    });
  };

  return (
    <>
      <Scanner styles={{container: {maxHeight: 'calc(100vh - 68px)'}}}
        onScan={handleScan}
        onError={(error) => console.error(error)}
      />

      <Typography>
        {value}
      </Typography>
    </>
  );
}