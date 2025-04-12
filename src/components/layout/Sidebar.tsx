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
  Bell,
  ChevronRight,
  User,
  Sun,
  Moon
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  if (userType === "none") {
    return null;
  }
  
  const clientLinks = [
    { name: "Overview", icon: <Home size={19} />, path: "/client/dashboard" },
    { name: "Bookings", icon: <Calendar size={19} />, path: "/client/bookings" },
    { name: "Messages", icon: <MessageSquare size={19} />, path: "/client/messages" },
    { name: "Settings", icon: <Settings size={19} />, path: "/client/settings" },
  ];
  
  const professionalLinks = [
    { name: "Overview", icon: <Home size={19} />, path: "/professional/dashboard" },
    { name: "Appointments", icon: <Calendar size={19} />, path: "/professional/appointments" },
    { name: "My Services", icon: <Plus size={19} />, path: "/professional/services" },
    { name: "Wallet", icon: <Wallet size={19} />, path: "/professional/wallet" },
    { name: "Messages", icon: <MessageSquare size={19} />, path: "/professional/messages" },
    { name: "Settings", icon: <Settings size={19} />, path: "/professional/settings" },
  ];
  
  const links = userType === "professional" ? professionalLinks : clientLinks;
  
  const isLinkActive = (path: string) => {
    return location.pathname === path || 
           (path.endsWith('/dashboard') && location.pathname === `/${userType}`);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const TopNav = () => {
    return (
      <div className="fixed top-0 left-0 w-full bg-background border-b border-border z-20 py-2 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {!isOpen && (
              <button onClick={toggleSidebar} className="mr-2 p-1 hover:bg-muted rounded-md">
                <Menu size={22} className="text-taplocal-purple" />
              </button>
            )}
            <span className="font-heading text-xl font-semibold text-taplocal-purple">TapLocal</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="relative">
              <Bell size={20} className="text-foreground hover:text-taplocal-purple cursor-pointer" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-taplocal-purple text-white">2</Badge>
            </div>
            <div className="relative group">
              <Avatar className="h-8 w-8 border-2 border-taplocal-purple cursor-pointer">
                <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" alt="Profile" />
              </Avatar>
              <div className="absolute right-0 mt-2 w-48 bg-card shadow-lg rounded-md overflow-hidden border z-50 hidden group-hover:block">
                <div className="p-3 border-b border-border">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">alex@example.com</p>
                </div>
                <div className="p-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-sm font-normal mb-1"
                    onClick={() => navigate(`/${userType}/settings`)}
                  >
                    <User size={16} className="mr-2" /> Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-sm font-normal mb-1"
                    onClick={() => navigate(`/${userType}/settings`)}
                  >
                    <Settings size={16} className="mr-2" /> Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 text-sm font-normal"
                    onClick={() => navigate("/")}
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isMobile && <TopNav />}
      
      {!isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-card rounded-full p-2 shadow-md hover:bg-muted transition-colors duration-200"
          aria-label="Open sidebar"
        >
          <Menu size={20} className="text-taplocal-purple" />
        </button>
      )}
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={`h-screen fixed top-0 left-0 z-40 flex flex-col bg-card shadow-lg transition-transform duration-300 ease-in-out w-48 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } animate-slide-in`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-semibold text-taplocal-purple">TapLocal</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="flex"
            onClick={toggleSidebar}
          >
            <ChevronRight size={18} />
          </Button>
        </div>

        {userType === "client" && (
          <div className="flex flex-col items-center p-4 border-b border-border">
            <Avatar className="h-14 w-14 border-2 border-taplocal-purple mb-2">
              <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" alt="Profile" />
            </Avatar>
            <h3 className="font-medium text-foreground">Alex Johnson</h3>
            <span className="text-xs text-muted-foreground">alex@example.com</span>
          </div>
        )}
        
        <div className="flex flex-col flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {links.map((link) => (
              <div
                key={link.path}
                onClick={() => handleNavigation(link.path)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  isLinkActive(link.path)
                    ? "bg-taplocal-purple text-white"
                    : "text-gray-700 hover:bg-taplocal-purple/10 hover:text-taplocal-purple"
                }`}
              >
                <div className={`${isLinkActive(link.path) ? "text-white" : "text-taplocal-purple"}`}>
                  {link.icon}
                </div>
                <span className="font-medium text-sm">{link.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => navigate("/")}
          >
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </div>
      </aside>

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
