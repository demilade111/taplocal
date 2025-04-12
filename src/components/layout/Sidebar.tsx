
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  LogOut,
  Bell
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type SidebarProps = {
  userType: "client" | "professional" | "none";
};

const Sidebar = ({ userType }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
        // Don't force isOpen to true on resize for larger screens
        // This allows the sidebar to stay closed if user closed it
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
  
  const isLinkActive = (path: string) => {
    // Check if the current location path starts with the link path
    return location.pathname === path || 
           // Special case for Overview/Dashboard to handle index routes
           (path.endsWith('/dashboard') && location.pathname === `/${userType}`);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Create a client top navigation bar component
  const ClientTopNav = () => {
    return (
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-20 py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {!isOpen && (
              <button onClick={toggleSidebar} className="mr-2">
                <Menu size={24} className="text-taplocal-purple" />
              </button>
            )}
            <span className="font-heading text-xl font-bold text-taplocal-purple">TapLocal</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell size={20} className="text-gray-600" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-taplocal-purple text-white">2</Badge>
            </div>
            <Avatar className="h-8 w-8 border-2 border-taplocal-purple">
              <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" alt="Profile" />
            </Avatar>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      {userType === "client" && isMobile && <ClientTopNav />}
      
      {/* Desktop Toggle Button - Only shown when sidebar is closed */}
      {!isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-label="Open sidebar"
        >
          <Menu size={20} className="text-taplocal-purple" />
        </button>
      )}
      
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
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold text-taplocal-purple">TapLocal</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="flex"
            onClick={toggleSidebar}
          >
            <X size={18} />
          </Button>
        </div>

        {userType === "client" && (
          <div className="flex flex-col items-center p-4 border-b">
            <Avatar className="h-16 w-16 border-2 border-taplocal-purple mb-2">
              <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" alt="Profile" />
            </Avatar>
            <h3 className="font-medium text-gray-800">Alex Johnson</h3>
            <span className="text-sm text-gray-500">alex@example.com</span>
          </div>
        )}
        
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {links.map((link) => (
              <div
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${
                  isLinkActive(link.path)
                    ? "bg-taplocal-purple text-white"
                    : "text-gray-700 hover:bg-taplocal-purple/10 hover:text-taplocal-purple"
                }`}
              >
                <div className={`${isLinkActive(link.path) ? "text-white" : "text-taplocal-purple"}`}>
                  {link.icon}
                </div>
                <span className="font-medium">{link.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => navigate("/")}
          >
            <LogOut size={18} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

      {/* Client Mobile Bottom Navigation */}
      {userType === "client" && isMobile && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t z-20 p-1">
          <div className="flex justify-around items-center">
            {clientLinks.map((link) => (
              <Button
                key={link.path}
                variant="ghost"
                className={`flex flex-col items-center py-1 px-2 rounded-lg ${
                  isLinkActive(link.path)
                    ? "bg-taplocal-purple/10 text-taplocal-purple"
                    : "text-gray-600"
                }`}
                onClick={() => navigate(link.path)}
              >
                <div className={isLinkActive(link.path) ? "text-taplocal-purple" : "text-gray-600"}>
                  {link.icon}
                </div>
                <span className="text-xs mt-1">{link.name}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
