
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");

  return (
    <div className="container-app max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Find Local Services</h1>
        <p className="text-gray-600">Discover trusted professionals in your area</p>
      </div>

      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          className="pl-10" 
          placeholder="Search for services or professionals..." 
        />
      </div>

      <Tabs defaultValue="discover" className="mb-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Hair & Beauty", 
                "Home Repair",
                "Tutoring",
                "House Cleaning",
                "Electrical Work",
                "Plumbing",
                "Gardening",
                "Personal Training"
              ].map((category) => (
                <div 
                  key={category}
                  className="p-4 bg-gray-50 rounded-lg text-center cursor-pointer hover:bg-taplocal-purple/10 hover:text-taplocal-purple transition-colors"
                >
                  {category}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended for you</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">
              As you use TapLocal, we'll show personalized recommendations here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientDashboard;
