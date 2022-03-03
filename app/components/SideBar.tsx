import { Link } from "react-router-dom";
import { UserDetails } from "~/utils/session.server";

export interface Props {
  isMobileMenuOpen: boolean;
  user: UserDetails | null;
}

export default function SideBar({ isMobileMenuOpen = false, user }: Props) {
  const renderAuthorisedLinks = () => (
    <>
      <Link
        to="/notes"
        className="text-white flex items-center space-x-2 px-4 font-logo text-2xl font-extrabold"
      >
        will-do
      </Link>

      <nav>
        <Link
          to="notes/new"
          className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple"
        >
          Create
        </Link>

        {/* TODO: style as with the nav items */}
        <div className="user-info">
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </div>
      </nav>
    </>
  );

  const renderAnonymousLinks = () => (
    <>
      <Link
        to="/"
        className="text-white flex items-center space-x-2 px-4 font-logo text-2xl font-extrabold"
      >
        will-do
      </Link>

      <nav>
        <Link
          to="/login"
          className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple"
        >
          Login
        </Link>
      </nav>
    </>
  );

  return (
    <div
      className={`sidebar bg-purple w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl ${
        !isMobileMenuOpen ? "-translate-x-full" : ""
      }`}
    >
      {user ? renderAuthorisedLinks() : renderAnonymousLinks()}
    </div>
  );
}
