
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MapPin, Calendar, Heart, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock service data
const popularServices = [
  {
    id: 1,
    title: "House Cleaning Services",
    category: "Cleaning",
    provider: "Maria J.",
    rating: 4.9,
    reviews: 57,
    price: 25,
    location: "2 miles away",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: 2,
    title: "Garden Maintenance",
    category: "Gardening",
    provider: "John D.",
    rating: 4.7,
    reviews: 32,
    price: 30,
    location: "5 miles away",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
  },
  {
    id: 3,
    title: "Math Tutoring",
    category: "Teaching",
    provider: "Rebecca L.",
    rating: 5.0,
    reviews: 42,
    price: 40,
    location: "Virtual",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80",
  },
  {
    id: 4,
    title: "Handyman Services",
    category: "Handyman",
    provider: "Robert T.",
    rating: 4.8,
    reviews: 26,
    price: 35,
    location: "3 miles away",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  },
];

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for "${searchQuery}"`, {
      description: "Search functionality will be implemented in a future update.",
    });
  };

  const toggleFavorite = (serviceId: number) => {
    if (favorites.includes(serviceId)) {
      setFavorites(favorites.filter(id => id !== serviceId));
      toast("Removed from favorites");
    } else {
      setFavorites([...favorites, serviceId]);
      toast("Added to favorites");
    }
  };

  const bookService = (serviceTitle: string) => {
    toast.success("Booking request sent!", {
      description: `Your request for ${serviceTitle} has been sent to the provider.`,
    });
  };

  return (
    <div className="container-app max-w-7xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Find Local Services</h1>
        <p className="text-gray-600">Discover trusted professionals in your area</p>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          className="pl-10" 
          placeholder="Search for services or professionals..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="absolute right-1 top-1 bottom-1 bg-taplocal-teal hover:bg-taplocal-teal/90 text-taplocal-dark"
        >
          Search
        </Button>
      </form>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="discover" className="mt-6">
          <Card className="mb-6">
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
                  <Button 
                    key={category}
                    variant="outline"
                    className="p-4 h-auto justify-center text-center hover:bg-taplocal-purple/10 hover:text-taplocal-purple transition-colors"
                    onClick={() => toast(`Browsing ${category} services`)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Top-Rated Services Near You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="object-cover w-full h-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                      onClick={() => toggleFavorite(service.id)}
                    >
                      <Heart 
                        className={`h-5 w-5 ${favorites.includes(service.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Badge className="mb-2 bg-taplocal-teal/20 text-taplocal-teal hover:bg-taplocal-teal/30 border-none">
                          {service.category}
                        </Badge>
                        <h3 className="text-lg font-semibold">{service.title}</h3>
                        <p className="text-sm text-gray-600">by {service.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-semibold">{service.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                        </div>
                        <p className="font-bold mt-1">${service.price}/hr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => toast.info(`View more details about ${service.title}`)}>
                      View Details
                    </Button>
                    <Button 
                      className="bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90"
                      onClick={() => bookService(service.title)}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>View and manage your upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                  <div className="flex">
                    <div>
                      <p className="text-sm text-yellow-700 font-medium">
                        You don't have any bookings yet
                      </p>
                      <p className="text-sm text-yellow-600 mt-1">
                        Browse services and book your first appointment
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <Button 
                    className="w-full justify-center" 
                    variant="outline"
                    onClick={() => setActiveTab("discover")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Find Services to Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>My Favorites</CardTitle>
              <CardDescription>Services you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {popularServices
                    .filter(service => favorites.includes(service.id))
                    .map((service) => (
                      <Card key={service.id} className="overflow-hidden">
                        <div className="aspect-video w-full relative">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="object-cover w-full h-full"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                            onClick={() => toggleFavorite(service.id)}
                          >
                            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold">{service.title}</h3>
                          <p className="text-sm text-gray-600">by {service.provider}</p>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{service.rating}</span>
                            </div>
                            <p className="font-bold">${service.price}/hr</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90"
                            onClick={() => bookService(service.title)}
                          >
                            Book Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-md text-center">
                    <Heart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-4">
                      Save services you're interested in by clicking the heart icon
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("discover")}
                      className="mx-auto"
                    >
                      Discover Services
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
