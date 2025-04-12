
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const ProfessionalDashboard = () => {
  return (
    <div className="container-app max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Dashboard</h1>
          <p className="text-gray-600">Manage your services, bookings, and payments</p>
        </div>
        <Button className="bg-taplocal-teal text-white hover:bg-taplocal-teal/90" asChild>
          <Link to="/professional/add-service">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                No upcoming appointments
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                No new messages
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                No recent transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
