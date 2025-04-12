import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Menu, 
  X, 
  Search, 
  MessageCircle, 
  Calendar, 
  Home,
  User,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-3 sticky top-0 z-50">
      <div className="container-app flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold text-taplocal-purple">TapLocal</span>
          </Link>
          
          <div className="hidden md:flex relative ml-8 w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-taplocal-purple/20"
              placeholder="Search services..."
            />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Link 
            to="/client/dashboard" 
            className={`px-3 py-2 text-sm rounded-md ${
              location.pathname === "/client/dashboard" 
                ? "text-taplocal-purple bg-taplocal-purple/10" 
                : "text-gray-600 hover:text-taplocal-purple"
            }`}
          >
            <span className="flex items-center space-x-1">
              <Home size={16} />
              <span>Home</span>
            </span>
          </Link>
          
          <Link 
            to="/bookings" 
            className={`px-3 py-2 text-sm rounded-md ${
              location.pathname === "/bookings" 
                ? "text-taplocal-purple bg-taplocal-purple/10" 
                : "text-gray-600 hover:text-taplocal-purple"
            }`}
          >
            <span className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Bookings</span>
            </span>
          </Link>
          
          <Link 
            to="/messages" 
            className={`px-3 py-2 text-sm rounded-md ${
              location.pathname === "/messages" 
                ? "text-taplocal-purple bg-taplocal-purple/10" 
                : "text-gray-600 hover:text-taplocal-purple"
            }`}
          >
            <span className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>Messages</span>
            </span>
          </Link>
          
          <button className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-taplocal-coral text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 ml-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/client/profile" className="cursor-pointer flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/client/bookings" className="cursor-pointer flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Bookings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer flex items-center text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-taplocal-coral text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>
          
          <button
            className="text-taplocal-dark p-1"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container-app py-4 flex flex-col space-y-4">
            <div className="relative mb-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-200 text-sm"
                placeholder="Search services..."
              />
            </div>
            
            <Link
              to="/client/dashboard"
              className="flex items-center space-x-2 text-taplocal-dark hover:text-taplocal-purple py-2"
              onClick={toggleMenu}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link
              to="/bookings"
              className="flex items-center space-x-2 text-taplocal-dark hover:text-taplocal-purple py-2"
              onClick={toggleMenu}
            >
              <Calendar size={18} />
              <span>Bookings</span>
            </Link>
            
            <Link
              to="/messages"
              className="flex items-center space-x-2 text-taplocal-dark hover:text-taplocal-purple py-2"
              onClick={toggleMenu}
            >
              <MessageCircle size={18} />
              <span>Messages</span>
            </Link>
            
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link to="/client/profile">View Profile</Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-500 border-red-500 hover:bg-red-50">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ClientNavbar;
