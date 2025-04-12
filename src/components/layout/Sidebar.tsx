
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  MessageSquare,
  Menu,
  Plus,
  Settings,
  Wallet,
  X,
  LogOut
} from "lucide-react";

type SidebarProps = {
  userType: "client" | "professional" | "none";
};

const Sidebar = ({ userType }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        setIsMobile(true);
      } else {
        setIsOpen(true);
        setIsMobile(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  // If we're on the main page, don't show the sidebar
  if (userType === "none") {
    return null;
  }
  
  const clientLinks = [
    { name: "Overview", icon: <Home size={20} />, path: "/client/dashboard" },
    { name: "Bookings", icon: <Calendar size={20} />, path: "/client/bookings" },
    { name: "Messages", icon: <MessageSquare size={20} />, path: "/client/messages" },
    { name: "Settings", icon: <Settings size={20} />, path: "/client/settings" },
  ];
  
  const professionalLinks = [
    { name: "Overview", icon: <Home size={20} />, path: "/professional/dashboard" },
    { name: "Appointments", icon: <Calendar size={20} />, path: "/professional/appointments" },
    { name: "My Services", icon: <Plus size={20} />, path: "/professional/services" },
    { name: "Wallet", icon: <Wallet size={20} />, path: "/professional/wallet" },
    { name: "Messages", icon: <MessageSquare size={20} />, path: "/professional/messages" },
    { name: "Settings", icon: <Settings size={20} />, path: "/professional/settings" },
  ];
  
  const links = userType === "professional" ? professionalLinks : clientLinks;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md md:hidden`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar Overlay for Mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`h-screen fixed top-0 left-0 z-40 flex flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold text-taplocal-teal">TapLocal</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="md:flex hidden"
            onClick={toggleSidebar}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-taplocal-teal/15 text-taplocal-teal"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={isMobile ? () => setIsOpen(false) : undefined}
              >
                {link.icon}
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
