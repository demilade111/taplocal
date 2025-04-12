
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4">
      <div className="container-app flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-heading font-bold text-taplocal-purple">TapLocal</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/services" className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple transition-colors">
            Browse Services
          </Link>
          <Link to="/how-it-works" className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple transition-colors">
            About Us
          </Link>
          <Button variant="outline" asChild className="dark:text-gray-200 dark:border-gray-700">
            <Link to="/join">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/join">Join TapLocal</Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="text-taplocal-dark dark:text-gray-200 p-2"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
          <div className="container-app py-4 flex flex-col space-y-4">
            <Link
              to="/services"
              className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple py-2 transition-colors"
              onClick={toggleMenu}
            >
              Browse Services
            </Link>
            <Link
              to="/how-it-works"
              className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple py-2 transition-colors"
              onClick={toggleMenu}
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-taplocal-dark dark:text-gray-200 hover:text-taplocal-purple py-2 transition-colors"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" asChild className="dark:text-gray-200 dark:border-gray-700">
                <Link to="/join" onClick={toggleMenu}>
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/join" onClick={toggleMenu}>
                  Join TapLocal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
