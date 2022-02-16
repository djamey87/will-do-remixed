interface Props {
  onMenuPress: () => void;
}
export default function MobileHeader({ onMenuPress }: Props) {
  return (
    <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
      <a href="#" className="block p-4 text-purple font-bold font-logo">
        will-do
      </a>

      <button
        className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
        onClick={onMenuPress}
      >
        <svg
          className="h-5 w-5 stroke-purple"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
