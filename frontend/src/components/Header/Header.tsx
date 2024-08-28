import Logo from "../../assets/img/main-logo-green.svg";
import {
  MoonIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

interface HeaderProps {
  setIsDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ setIsDarkMode }) => {
  return (
    <header className="flex sticky top-0 w-dvw h-[85px] z-50 bg-bgHeader text-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo Section */}
        <div className="header logo-area flex items-center">
          <img src={Logo} alt="Logo" className="mr-3 h-10" />
          <span className="text-2xl font-bold text-accent">
            Evergreen Library
          </span>
        </div>

        {/* Header Functions */}
        <div className="header fuctional-area flex gap-x-10 items-center">
          {/* Dark Mode Toggle */}
          <div
            className="function-dark-mode flex flex-col cursor-pointer items-center row-auto"
            onClick={setIsDarkMode}
          >
            <span className="h-6 w-6">
              <MoonIcon />
            </span>
            <span className="text-sm text-primary">Dark Mode</span>
          </div>

          {/* Account */}
          <div className="function-account flex flex-col cursor-pointer items-center">
            <span className="h-6 w-6">
              <UserIcon />
            </span>
            <span className="text-primary">Account</span>
          </div>

          {/* Search */}
          <div className="function-search flex flex-col cursor-pointer items-center">
            <span className="h-6 w-6">
              <MagnifyingGlassIcon />
            </span>
            <span className="text-primary">Search</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
