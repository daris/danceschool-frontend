import type {ReactNode} from "react";
import {StoreProvider} from "./StoreProvider";

import "./styles/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainAppBar from "@/app/components/MainAppBar";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section>
            <MainAppBar />
            <main>{children}</main>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
