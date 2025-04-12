
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MessageSquare,
  Plus,
  Settings,
  Wallet,
} from "lucide-react";

const ProfessionalDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container-app max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Professional Dashboard</h1>
          <p className="text-gray-600">Manage your services, bookings, and payments</p>
        </div>
        <Button className="bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90" asChild>
          <Link to="/professional/add-service">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {[
                  { id: "overview", label: "Overview", icon: Calendar },
                  { id: "bookings", label: "Bookings", icon: Calendar },
                  { id: "listings", label: "My Listings", icon: Plus },
                  { id: "wallet", label: "Wallet", icon: Wallet },
                  { id: "messages", label: "Messages", icon: MessageSquare },
                  { id: "settings", label: "Settings", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`flex items-center gap-3 px-4 py-3 text-left ${
                      activeTab === item.id
                        ? "bg-taplocal-teal/10 text-taplocal-teal border-r-4 border-taplocal-teal"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <TabsContent value="overview" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to your dashboard!</CardTitle>
                <CardDescription>
                  Complete your profile to start receiving bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Your profile is 1 step away from being complete
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Record your voice introduction</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Tell clients about yourself and your services in a 30-second voice clip
                      </p>
                      <Button variant="outline">Record Voice Intro</Button>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Set your availability</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Let clients know when you're available to provide your services
                      </p>
                      <Button variant="outline">Set Availability</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
