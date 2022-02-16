export interface Props {
  isMobileMenuOpen: boolean;
}

export default function SideBar({ isMobileMenuOpen }: Props) {
  return (
    <div
      className={`sidebar bg-purple w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${
        isMobileMenuOpen ? "-translate-x-full" : ""
      }`}
    >
      <a
        href="#"
        className="text-white flex items-center space-x-2 px-4 font-logo text-2xl font-extrabold"
      >
        will-do
      </a>

      {/* <nav>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white"
          >
            Home
          </a>
        </nav> */}
    </div>
  );
}
