"use client";

import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavLink } from "@/components/navlink";
import { useSwipeable } from "react-swipeable";
import { SideBar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Twigo Learn",
//   description: "Card Learning App",
// };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
      document.body.style.zoom = 0.99;
    });

    document.addEventListener("gesturechange", function (e) {
      e.preventDefault();

      document.body.style.zoom = 0.99;
    });
    document.addEventListener("gestureend", function (e) {
      e.preventDefault();
      document.body.style.zoom = 1;
    });
  }, []);

  const [isOpen, setOpen] = useState(false);
  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedRight: () => setOpen(true),
  });

  const closeSideBar = () => setOpen(false);

  return (
    <html lang="en">
      <body
        className={clsx(
          `${inter.className}`,
          "h-screen w-screen flex flex-col"
        )}
        id="App"
      >
        <div
          {...handlers}
          style={{
            float: "left",
            position: "fixed",
            width: "8%",
            height: "100%",
          }}
        />
        <SideBar
          isOpen={isOpen}
          onStateChange={(s: any) => setOpen(s.isOpen)}
          pageWrapId={"page-wrap"}
          outerContainerId={"App"}
          close={closeSideBar}
        />
        <main id="page-wrap" className="grow p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
