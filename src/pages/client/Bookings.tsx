
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Check, CalendarClock, MapPin, Clock, Star, MessageCircle } from "lucide-react";
import { ServiceRating } from "@/components/ServiceRating";
import { cn } from "@/lib/utils";

// Mock booking data
const upcomingBookings = [
  {
    id: "b1",
    serviceName: "Women's Haircut & Styling",
    providerName: "Sarah Johnson",
    providerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    date: "April 20, 2025",
    time: "2:30 PM",
    location: "123 Salon Street",
    status: "confirmed",
    price: 45
  },
  {
    id: "b2",
    serviceName: "Plumbing Repair",
    providerName: "Michael Rodriguez",
    providerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    date: "April 22, 2025",
    time: "10:00 AM",
    location: "Your Home",
    status: "pending",
    price: 65
  }
];

const pastBookings = [
  {
    id: "b3",
    serviceName: "Math Tutoring Session",
    providerName: "Lisa Wong",
    providerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    date: "April 10, 2025",
    time: "4:00 PM",
    location: "Virtual Meeting",
    status: "completed",
    price: 40,
    rated: false
  },
  {
    id: "b4",
    serviceName: "House Cleaning",
    providerName: "David Chen",
    providerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    date: "April 5, 2025",
    time: "11:00 AM",
    location: "Your Home",
    status: "completed",
    price: 80,
    rated: true,
    rating: 5
  }
];

const ClientBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleRateService = (booking: any) => {
    setSelectedBooking(booking);
    setRatingDialogOpen(true);
  };

  const handleCancelBooking = (bookingId: string) => {
    toast.error("Booking cancelled", {
      description: "Your booking has been cancelled and you will receive a refund shortly.",
    });
  };
  
  const handleReschedule = (bookingId: string) => {
    toast.info("Reschedule requested", {
      description: "We've sent a reschedule request to the provider.",
    });
  };
  
  const handleMessageProvider = (providerName: string) => {
    toast.info(`Message to ${providerName}`, {
      description: "You can now chat with the provider directly.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 text-white">
            <Check size={12} className="mr-1" /> Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20">
            Pending
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            Completed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container-app max-w-6xl pb-20 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming and past bookings</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6 space-y-6">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className={cn(
                  "overflow-hidden border-border transition-all duration-300 hover:shadow-md",
                  "animate-fade-in"
                )}
              >
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-6 md:border-r border-border">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <img 
                            src={booking.providerImage} 
                            alt={booking.providerName} 
                          />
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-foreground">{booking.providerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        {getStatusBadge(booking.status)}
                        
                        <div className="flex items-center mt-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between mb-4">
                            <h3 className="font-medium text-xl text-foreground">{booking.serviceName}</h3>
                            <p className="font-bold text-foreground">${booking.price}</p>
                          </div>
                          
                          {booking.status === 'confirmed' && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 mb-6">
                              <p className="text-sm text-green-800 dark:text-green-300">
                                <span className="font-medium">Ready to go!</span> Your booking is confirmed for {booking.date} at {booking.time}. Please arrive 10 minutes early.
                              </p>
                            </div>
                          )}
                          
                          {booking.status === 'pending' && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 mb-6">
                              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                <span className="font-medium">Almost there!</span> We're waiting for the provider to confirm your booking. You'll receive a notification once it's confirmed.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReschedule(booking.id)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple/10"
                            onClick={() => handleMessageProvider(booking.providerName)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-muted/50 rounded-lg border border-border p-8 text-center">
              <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No upcoming bookings</h3>
              <p className="text-muted-foreground mb-4">When you book services, they'll appear here</p>
              <Button onClick={() => window.location.href = '/client/dashboard'}>
                Find Services
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-6 space-y-6">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className={cn(
                  "overflow-hidden border-border transition-all duration-300 hover:shadow-md",
                  "animate-fade-in"
                )}
              >
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-1/3 p-6 md:border-r border-border">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <img 
                            src={booking.providerImage} 
                            alt={booking.providerName} 
                          />
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-foreground">{booking.providerName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.serviceName}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        {getStatusBadge(booking.status)}
                        
                        <div className="flex items-center mt-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.date}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.time}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        
                        {booking.rated && (
                          <div className="flex items-center mt-2">
                            <span className="text-sm mr-2">Your rating:</span>
                            <div className="flex items-center">
                              {[...Array(booking.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between mb-4">
                            <h3 className="font-medium text-xl text-foreground">{booking.serviceName}</h3>
                            <p className="font-bold text-foreground">${booking.price}</p>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-6">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                              <span className="font-medium">Service completed</span> on {booking.date}. Thank you for using our platform!
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {!booking.rated ? (
                            <Button 
                              className="bg-taplocal-purple hover:bg-taplocal-purple/90"
                              onClick={() => handleRateService(booking)}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Rate Service
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() => handleRateService(booking)}
                            >
                              Edit Review
                            </Button>
                          )}
                          <Button 
                            variant="outline"
                            onClick={() => handleMessageProvider(booking.providerName)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => window.location.href = '/client/dashboard'}
                          >
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="bg-muted/50 rounded-lg border border-border p-8 text-center">
              <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No past bookings</h3>
              <p className="text-muted-foreground mb-4">Your booking history will appear here once you've used our services</p>
              <Button onClick={() => window.location.href = '/client/dashboard'}>
                Find Services
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Rating Dialog */}
      {selectedBooking && (
        <ServiceRating
          open={ratingDialogOpen}
          onOpenChange={setRatingDialogOpen}
          serviceId={selectedBooking.id}
          serviceName={selectedBooking.serviceName}
          providerName={selectedBooking.providerName}
          providerImage={selectedBooking.providerImage}
        />
      )}
    </div>
  );
};

export default ClientBookings;
