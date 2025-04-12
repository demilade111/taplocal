
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import ProfessionalDashboard from "./pages/professional/Dashboard";
import ClientDashboard from "./pages/client/Dashboard";
import AddServicePage from "./pages/professional/AddService";
import ServiceProfile from "./pages/ServiceProfile";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/join" element={<Join />} />
            <Route path="/professional/dashboard" element={<ProfessionalDashboard />} />
            <Route path="/professional/add-service" element={<AddServicePage />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/service/:id" element={<ServiceProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
