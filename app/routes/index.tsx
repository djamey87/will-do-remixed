import { useState } from "react";
import MainContent from "~/components/MainContent";
import MobileHeader from "~/components/MobileHeader";
import SideBar from "~/components/SideBar";

export default function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // credit to https://codepen.io/chris__sev/pen/RwKWXpJ for sidebar layout
  return (
    <div className="relative min-h-screen md:flex">
      <MobileHeader onMenuPress={toggleMenu} />

      <SideBar isMobileMenuOpen={isMobileMenuOpen} />

      <MainContent />
    </div>
  );
}
