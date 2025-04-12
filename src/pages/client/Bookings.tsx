
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";

// Mock booking data
const upcomingBookings = [
  {
    id: "1",
    serviceName: "Women's Haircut & Styling",
    providerName: "Sarah Johnson",
    providerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    date: "April 15, 2025",
    time: "2:30 PM",
    location: "Beauty Salon, 123 Main St",
    status: "confirmed"
  },
  {
    id: "2",
    serviceName: "Plumbing Repair",
    providerName: "Michael Rodriguez",
    providerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    date: "April 20, 2025",
    time: "10:00 AM",
    location: "Your Home",
    status: "pending"
  }
];

const pastBookings = [
  {
    id: "3",
    serviceName: "House Cleaning",
    providerName: "Emily Chen",
    providerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    date: "March 28, 2025",
    time: "1:00 PM",
    location: "Your Home",
    status: "completed",
    reviewed: true
  },
  {
    id: "4",
    serviceName: "Math Tutoring",
    providerName: "Lisa Wong",
    providerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    date: "March 15, 2025",
    time: "4:00 PM",
    location: "Virtual Meeting",
    status: "completed",
    reviewed: false
  }
];

const ClientBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const cancelBooking = (bookingId: string, serviceName: string) => {
    toast.info(`Cancellation request sent for "${serviceName}"`, {
      description: "The service provider will be notified of your cancellation.",
    });
  };

  const rescheduleBooking = (bookingId: string) => {
    toast.info("Reschedule request initiated", {
      description: "Please choose a new date and time that works for you.",
    });
  };

  const leaveReview = (bookingId: string, serviceName: string) => {
    toast.info(`Leave a review for "${serviceName}"`, {
      description: "Share your experience to help others in the community.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <Badge className="bg-green-500 text-white">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pending</Badge>;
      case "completed":
        return <Badge className="bg-taplocal-purple text-white">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container-app max-w-4xl pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-gray-900">My Bookings</h1>
        <p className="text-gray-600">Manage your upcoming and past appointments</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="upcoming" className="font-medium">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="font-medium">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <img src={booking.providerAvatar} alt={booking.providerName} />
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{booking.serviceName}</h3>
                            <p className="text-sm text-gray-600">by {booking.providerName}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button variant="outline" className="bg-white hover:bg-gray-50" onClick={() => rescheduleBooking(booking.id)}>
                          Reschedule
                        </Button>
                        <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => cancelBooking(booking.id, booking.serviceName)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-taplocal-purple/5 p-6 flex flex-col justify-center items-center md:w-48">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-taplocal-purple">{booking.date.split(',')[0].split(' ')[1]}</div>
                        <div className="text-sm text-gray-600">{booking.date.split(',')[0].split(' ')[0]}</div>
                      </div>
                      <Button className="w-full bg-taplocal-purple text-white hover:bg-taplocal-purple/90">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No upcoming bookings</h3>
              <p className="mt-2 text-gray-500">When you book services, they will appear here</p>
              <Button className="mt-4 bg-taplocal-purple text-white hover:bg-taplocal-purple/90" onClick={() => window.location.href = "/client/dashboard"}>
                Find Services
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6 space-y-6">
          {pastBookings.length > 0 ? (
            pastBookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <img src={booking.providerAvatar} alt={booking.providerName} />
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{booking.serviceName}</h3>
                            <p className="text-sm text-gray-600">by {booking.providerName}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <Calendar size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Clock size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={16} className="mr-2 text-taplocal-purple" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button 
                          className={`${booking.reviewed ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-taplocal-purple text-white hover:bg-taplocal-purple/90'}`}
                          disabled={booking.reviewed}
                          onClick={() => leaveReview(booking.id, booking.serviceName)}
                        >
                          {booking.reviewed ? 'Reviewed' : 'Leave Review'}
                        </Button>
                        <Button variant="outline" className="bg-white hover:bg-gray-50">
                          Book Again
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-6 flex flex-col justify-center items-center md:w-48">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-gray-500">{booking.date.split(',')[0].split(' ')[1]}</div>
                        <div className="text-sm text-gray-600">{booking.date.split(',')[0].split(' ')[0]}</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No past bookings</h3>
              <p className="mt-2 text-gray-500">Your booking history will appear here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientBookings;
