import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { useState } from "react";
import MobileHeader from "./components/MobileHeader";
import SideBar from "./components/SideBar";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "Will do!" };
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <html lang="en">
      <head className="">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* credit to https://codepen.io/chris__sev/pen/RwKWXpJ for sidebar layout */}
        <div className="relative min-h-screen md:flex">
          <MobileHeader onMenuPress={toggleMenu} />
          <SideBar isMobileMenuOpen={isMobileMenuOpen} />
          <div className="flex-1 p-10 text-2xl font-bold">
            <Outlet />
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
