
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const ProfessionalDashboard = () => {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Dashboard</h1>
          <p className="text-gray-600">Manage your services, bookings, and payments</p>
        </div>
        <Button className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90" asChild>
          <Link to="/professional/add-service">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-taplocal-purple/10 shadow-md">
          <CardHeader className="bg-gradient-to-r from-taplocal-purple/5 to-transparent">
            <CardTitle className="text-taplocal-purple">Welcome to your dashboard!</CardTitle>
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
                <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-semibold mb-2 text-taplocal-purple">Record your voice introduction</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Tell clients about yourself and your services in a 30-second voice clip
                  </p>
                  <Button variant="outline" className="border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white">Record Voice Intro</Button>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <h3 className="font-semibold mb-2 text-taplocal-purple">Set your availability</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Let clients know when you're available to provide your services
                  </p>
                  <Button variant="outline" className="border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white">Set Availability</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-taplocal-purple/10 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-taplocal-purple">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                No upcoming appointments
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-taplocal-purple/10 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-taplocal-purple">Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-6 text-gray-500">
                No new messages
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-taplocal-purple/10 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-taplocal-purple">Recent Earnings</CardTitle>
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
