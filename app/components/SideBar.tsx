import { Link } from "react-router-dom";
import { UserDetails } from "~/utils/session.server";

export interface Props {
  isMobileMenuOpen: boolean;
  user: UserDetails | null;
  onMenuPress: () => void;
}

export default function SideBar({
  isMobileMenuOpen = false,
  user,
  onMenuPress,
}: Props) {
  const renderAuthorisedLinks = () => (
    <nav>
      <Link
        to="notes"
        className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple"
        onClick={onMenuPress}
      >
        Notes
      </Link>

      <Link
        to="notes/new"
        className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple"
        onClick={onMenuPress}
      >
        Create
      </Link>

      <div className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple">
        <form action="/logout" method="post">
          <button type="submit" className="button">
            Logout
          </button>
        </form>
      </div>
    </nav>
  );

  const renderAnonymousLinks = () => (
    <nav>
      <Link
        to="/login"
        className="block py-2.5 px-4 rounded transition duration-200 text-white hover:bg-white hover:text-purple"
        onClick={onMenuPress}
      >
        Login / Register
      </Link>
    </nav>
  );

  return (
    <div
      className={`sidebar bg-purple w-64 space-y-6 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-xl ${
        !isMobileMenuOpen ? "-translate-x-full" : ""
      }`}
    >
      <button
        className="p-4 focus:outline-none focus:bg-gray-700"
        onClick={onMenuPress}
      >
        <svg
          className="h-5 w-5 stroke-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="px-2">
        {user ? renderAuthorisedLinks() : renderAnonymousLinks()}
      </div>
    </div>
  );
}
