"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { SideBar } from "@/components/sidebar";
import { AppContextProvider } from "./context";
import { SnackbarProvider } from "notistack";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      //@ts-ignore
      document.body.style.zoom = 0.99;
    });

    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();
      //@ts-ignore
      document.body.style.zoom = 0.99;
    });
    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      //@ts-ignore
      document.body.style.zoom = 1;
    });
    document.title = "OpenAI Learn";
  }, []);

  const [isOpen, setOpen] = useState(false);

  const closeSideBar = () => setOpen(false);

  return (
    <html lang="en">
      <body className={clsx(`${inter.className}`, "flex flex-col")} id="App">
        <SideBar
          isOpen={isOpen}
          onStateChange={(s: any) => setOpen(s.isOpen)}
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          close={closeSideBar}
        />
        <main id="page-wrap" className="grow p-4 h-full overflow-auto">
          <SnackbarProvider>
            <AppContextProvider>{children}</AppContextProvider>
          </SnackbarProvider>
        </main>
      </body>
    </html>
  );
}
