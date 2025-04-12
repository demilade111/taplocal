
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  Calendar,
  MessageCircle,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  Heart
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
  
  const clientLinks = [
    { name: "Home", icon: <Home size={20} />, path: "/client/dashboard" },
    { name: "Bookings", icon: <Calendar size={20} />, path: "/client/bookings" },
    { name: "Messages", icon: <MessageCircle size={20} />, path: "/client/messages" },
    { name: "Favorites", icon: <Heart size={20} />, path: "/client/favorites" },
    { name: "Profile", icon: <User size={20} />, path: "/client/profile" },
  ];
  
  const professionalLinks = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/professional/dashboard" },
    { name: "Appointments", icon: <Calendar size={20} />, path: "/professional/appointments" },
    { name: "Messages", icon: <MessageCircle size={20} />, path: "/professional/messages" },
    { name: "Services", icon: <Settings size={20} />, path: "/professional/services" },
    { name: "Profile", icon: <User size={20} />, path: "/professional/profile" },
  ];
  
  const links = userType === "professional" ? professionalLinks : clientLinks;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`sidebar-toggle ${isOpen ? "left-64" : "left-0"} md:hidden`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
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
        className={`h-screen fixed top-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out w-64 ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold text-taplocal-purple">TapLocal</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="md:flex hidden"
            onClick={toggleSidebar}
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        {userType !== "none" && (
          <div className="flex flex-col flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "bg-taplocal-purple/10 text-taplocal-purple"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.icon}
                  {isOpen && <span>{link.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t">
          {userType === "none" ? (
            <div className="space-y-2">
              <Button 
                className="w-full bg-taplocal-purple hover:bg-taplocal-purple/90"
                asChild
              >
                <Link to="/join">Join TapLocal</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} className="mr-2" /> {isOpen && "Logout"}
            </Button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
