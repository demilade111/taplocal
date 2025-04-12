
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Info, MapPin, User } from "lucide-react";

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      clientName: "Jane Cooper",
      service: "Home Cleaning",
      date: "April 23, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "123 Main St, Anytown, CA",
      status: "confirmed"
    },
    {
      id: 2,
      clientName: "Robert Fox",
      service: "Garden Maintenance",
      date: "April 25, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "456 Oak Ave, Somewhere, CA",
      status: "confirmed"
    }
  ];
  
  const pastAppointments = [
    {
      id: 3,
      clientName: "Leslie Alexander",
      service: "Home Cleaning",
      date: "April 10, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "789 Pine St, Nowhere, CA",
      status: "completed"
    },
    {
      id: 4,
      clientName: "Kristin Watson",
      service: "Garden Maintenance",
      date: "April 5, 2025",
      time: "9:00 AM - 11:00 AM",
      location: "101 Elm St, Elsewhere, CA",
      status: "completed"
    }
  ];
  
  const appointmentsByStatus = {
    upcoming: upcomingAppointments,
    past: pastAppointments
  };
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Appointments</h1>
          <p className="text-gray-600">Manage your upcoming and past appointments</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-taplocal-teal text-white hover:bg-taplocal-teal/90">
          Set Availability
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        {["upcoming", "past"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {appointmentsByStatus[tabValue as keyof typeof appointmentsByStatus].length > 0 ? (
              appointmentsByStatus[tabValue as keyof typeof appointmentsByStatus].map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardHeader className={`pb-2 ${
                    appointment.status === "confirmed" 
                      ? "bg-green-50 border-b border-green-100" 
                      : "bg-gray-50 border-b border-gray-100"
                  }`}>
                    <CardTitle className="text-lg flex justify-between">
                      <span>{appointment.service}</span>
                      <span className={appointment.status === "confirmed" ? "text-green-600" : "text-gray-500"}>
                        {appointment.status === "confirmed" ? "Confirmed" : "Completed"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User size={18} className="text-gray-500" />
                          <span className="font-medium">{appointment.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-gray-500" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin size={18} className="text-gray-500 mt-1 flex-shrink-0" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {tabValue === "upcoming" && (
                            <>
                              <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-50">
                                Cancel
                              </Button>
                            </>
                          )}
                          {tabValue === "past" && (
                            <Button variant="outline" size="sm" className="border-green-500 text-green-500 hover:bg-green-50">
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Info className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No {tabValue} appointments</h3>
                    <p className="text-gray-500">
                      {tabValue === "upcoming" 
                        ? "You have no upcoming appointments scheduled" 
                        : "You have no past appointments to show"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
