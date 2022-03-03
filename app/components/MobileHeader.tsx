import { Link } from "react-router-dom";
import { UserDetails } from "~/utils/session.server";

interface Props {
  onMenuPress: () => void;
  user: UserDetails | null;
}
export default function MobileHeader({ onMenuPress, user }: Props) {
  return (
    <div className="bg-white text-gray-100 flex justify-between md:hidden fixed w-full">
      <button
        className="p-4 focus:outline-none focus:bg-gray-700"
        onClick={onMenuPress}
      >
        <svg
          className="h-5 w-5 stroke-purple"
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

      <Link
        to={user ? "/notes" : "/"}
        className="block p-4 text-purple font-bold font-logo"
      >
        will-do
      </Link>

      <button
        className="p-4 focus:outline-none focus:bg-gray-700 invisible"
        onClick={onMenuPress}
        // style={{ visibility: "hidden" }}
      >
        <svg
          className="h-5 w-5 stroke-purple"
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
    </div>
  );
}
