import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";
import { useState } from "react";
import MobileHeader from "./components/MobileHeader";
import SideBar from "./components/SideBar";
import { getUser } from "~/utils/session.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "will-do" };
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const data: LoaderData = {
    user,
  };
  return data;
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const data = useLoaderData<LoaderData>();

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
          <MobileHeader user={data.user} onMenuPress={toggleMenu} />
          <SideBar user={data.user} isMobileMenuOpen={isMobileMenuOpen} />
          <div className="flex-1 p-10">
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
