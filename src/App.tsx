
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import ProfessionalDashboard from "./pages/professional/Dashboard";
import ClientDashboard from "./pages/client/Dashboard";
import ClientBookings from "./pages/client/Bookings";
import ClientMessages from "./pages/client/Messages";
import ClientSettings from "./pages/client/Settings";
import AddServicePage from "./pages/professional/AddService";
import ServiceProfile from "./pages/ServiceProfile";
import ServicesPage from "./pages/professional/Services";
import AppointmentsPage from "./pages/professional/Appointments";
import WalletPage from "./pages/professional/Wallet";
import MessagesPage from "./pages/professional/Messages";
import SettingsPage from "./pages/professional/Settings";
import AvailabilityPage from "./pages/professional/Availability";
import Sidebar from "./components/layout/Sidebar";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const MainLayout = () => {
  const location = useLocation();
  
  // Add page transition animation effect
  useEffect(() => {
    // Animate the page content on route change
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
      
      const timer = setTimeout(() => {
        mainContent.classList.remove('animate-fade-in');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  // Determine if the user is logged in and what type they are
  const determineUserType = (): "client" | "professional" | "none" => {
    const path = location.pathname;
    if (path.startsWith("/client")) return "client";
    if (path.startsWith("/professional")) return "professional";
    return "none";
  };
  
  const userType = determineUserType();
  const isMainPage = location.pathname === "/" || location.pathname === "/join" || location.pathname.startsWith("/service");
  
  // Don't show the sidebar on the main landing pages
  if (isMainPage) {
    return (
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/join" element={<Join />} />
          <Route path="/service/:id" element={<ServiceProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    );
  }
  
  // Show sidebar for logged in user routes
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userType={userType} />
      <div className="flex-1 transition-all duration-300 pl-0 md:pl-0 pt-16 md:pt-6">
        <main className="container-app py-4">
          <Routes>
            {/* Professional Routes */}
            <Route path="/professional" element={<ProfessionalDashboard />} />
            <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
            <Route path="/professional/add-service" element={<AddServicePage />} />
            <Route path="/professional/services" element={<ServicesPage />} />
            <Route path="/professional/appointments" element={<AppointmentsPage />} />
            <Route path="/professional/messages" element={<MessagesPage />} />
            <Route path="/professional/wallet" element={<WalletPage />} />
            <Route path="/professional/settings" element={<SettingsPage />} />
            <Route path="/professional/availability" element={<AvailabilityPage />} />
            
            {/* Client Routes */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/bookings" element={<ClientBookings />} />
            <Route path="/client/messages" element={<ClientMessages />} />
            <Route path="/client/settings" element={<ClientSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <MainLayout />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
