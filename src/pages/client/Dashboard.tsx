
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MapPin, Calendar, Heart, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ClientNavbar from "@/components/layout/ClientNavbar";

// Mock service data
const popularServices = [
  {
    id: "1",
    title: "Women's Haircut & Styling",
    category: "Hair",
    provider: "Sarah Johnson",
    rating: 4.9,
    reviews: 124,
    price: 45,
    location: "2 miles away",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  },
  {
    id: "2",
    title: "Plumbing Repair & Installation",
    category: "Plumbing",
    provider: "Michael Rodriguez",
    rating: 4.9,
    reviews: 89,
    price: 65,
    location: "5 miles away",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "3",
    title: "Math Tutoring - All Levels",
    category: "Teaching",
    provider: "Lisa Wong",
    rating: 5.0,
    reviews: 56,
    price: 40,
    location: "Virtual",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "4",
    title: "House Cleaning Services",
    category: "Cleaning",
    provider: "David Chen",
    rating: 4.7,
    reviews: 102,
    price: 25,
    location: "3 miles away",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "5",
    title: "Home Electrical Services",
    category: "Electrical",
    provider: "Robert Taylor",
    rating: 4.8,
    reviews: 74,
    price: 75,
    location: "4 miles away",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  },
  {
    id: "6",
    title: "Professional Photography",
    category: "Photography",
    provider: "Emma Wilson",
    rating: 4.9,
    reviews: 43,
    price: 150,
    location: "Virtual / In-person",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];

// Popular categories with improved icons
const popularCategories = [
  { id: "hair", name: "Hair & Beauty", icon: "scissors", color: "#6C63FF" },
  { id: "plumbing", name: "Plumbing", icon: "wrench", color: "#4ECDC4" },
  { id: "teaching", name: "Teaching", icon: "book-open", color: "#FF6B6B" },
  { id: "cleaning", name: "Cleaning", icon: "sparkles", color: "#FFD166" },
  { id: "electrical", name: "Electrical", icon: "lightbulb", color: "#06D6A0" },
  { id: "gardening", name: "Gardening", icon: "flower", color: "#118AB2" },
  { id: "photography", name: "Photography", icon: "camera", color: "#8338EC" },
  { id: "fitness", name: "Fitness", icon: "dumbbell", color: "#FB5607" }
];

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for "${searchQuery}"`, {
      description: "Search functionality will be implemented in a future update.",
    });
  };

  const toggleFavorite = (serviceId: string) => {
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

  // Filter services by category if one is selected
  const filteredServices = selectedCategory 
    ? popularServices.filter(service => service.category.toLowerCase() === selectedCategory.toLowerCase())
    : popularServices;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ClientNavbar />
      
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
                <CardDescription>Find the services you need by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {popularCategories.map((category) => (
                    <Button 
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className={`
                        p-4 h-auto justify-start text-left flex items-center
                        ${selectedCategory === category.id
                          ? "bg-taplocal-purple text-white"
                          : "hover:bg-taplocal-purple/10 hover:text-taplocal-purple"
                        }
                        transition-colors
                      `}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    >
                      <div 
                        className={`
                          w-10 h-10 mr-3 rounded-full flex items-center justify-center
                          ${selectedCategory === category.id
                            ? "bg-white/20"
                            : `bg-opacity-10`
                          }
                        `}
                        style={{ backgroundColor: selectedCategory === category.id ? undefined : `${category.color}20` }}
                      >
                        <span className="lucide-icon" style={{ color: selectedCategory === category.id ? "white" : category.color }} 
                        dangerouslySetInnerHTML={{ __html: `
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${category.icon}"><path d="${
                            category.icon === 'scissors' ? 'M6 9l6 6m-6 0l6-6' : 
                            category.icon === 'wrench' ? 'M14 3.269C14 2.568 13.432 2 12.731 2H11.27C10.568 2 10 2.568 10 3.269v0c0 .578-.396 1.074-.935 1.286-.085.034-.17.07-.253.106-.531.23-1.162.16-1.572-.249v0a1.269 1.269 0 0 0-1.794 0L4.412 5.446a1.269 1.269 0 0 0 0 1.794v0c.41.41.48 1.04.248 1.572a7.946 7.946 0 0 0-.105.253c-.212.539-.708.935-1.286.935v0c-.701 0-1.27.568-1.269 1.269v1.461c0 .701.568 1.27 1.269 1.27v0c.578 0 1.074.396 1.286.935.034.085.07.17.105.253.231.531.161 1.162-.248 1.572v0a1.269 1.269 0 0 0 0 1.794l1.034 1.034a1.269 1.269 0 0 0 1.794 0v0c.41-.41 1.04-.48 1.572-.249.083.036.168.072.253.106.539.212.935.708.935 1.286v0c0 .701.568 1.27 1.269 1.27h1.461c.701 0 1.27-.569 1.269-1.27v0c0-.578.396-1.074.935-1.287.085-.033.17-.07.253-.105.531-.23 1.162-.16 1.572.249v0a1.269 1.269 0 0 0 1.794 0l1.034-1.034a1.269 1.269 0 0 0 0-1.794v0c-.41-.41-.48-1.04-.249-1.572.036-.083.072-.168.106-.253.212-.539.708-.935 1.286-.935v0c.701 0 1.27-.569 1.27-1.27v-1.461c0-.701-.569-1.27-1.27-1.269v0c-.578 0-1.074-.396-1.286-.935a7.755 7.755 0 0 0-.106-.253c-.23-.531-.16-1.162.249-1.572v0a1.269 1.269 0 0 0 0-1.794l-1.034-1.034a1.269 1.269 0 0 0-1.794 0v0c-.41.41-1.04.48-1.572.249a7.913 7.913 0 0 0-.253-.106C14.396 4.343 14 3.847 14 3.27v0z' : 
                            category.icon === 'book-open' ? 'M12 19c-4.4 0-8-3.6-8-8V5h3v6c0 2.8 2.2 5 5 5s5-2.2 5-5V5h3v6c0 4.4-3.6 8-8 8z' : 
                            category.icon === 'sparkles' ? 'M12 3v18M9 3h6M9 21h6M3 12h18M3 9v6M21 9v6' : 
                            category.icon === 'lightbulb' ? 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5' : 
                            category.icon === 'flower' ? 'M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 12a4.5 4.5 0 1 1-4.5-4.5M12 16.5a4.5 4.5 0 1 1-4.5 4.5' : 
                            category.icon === 'camera' ? 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3zM12 17a4 4 0 1 1 0-8 4 4 0 0 1 0 8z' : 
                            category.icon === 'dumbbell' ? 'M6.5 6.5h11m-11 11h11' : ''
                          }"></path></svg>
                        `}} 
                        />
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        {selectedCategory === category.id && (
                          <Badge className="mt-1 bg-white/30 text-white border-none">Selected</Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Top-Rated Services {selectedCategory ? `in ${selectedCategory}` : "Near You"}</h2>
                {selectedCategory && (
                  <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                    Clear filter
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                      <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
                        <Badge className="bg-taplocal-teal/90 hover:bg-taplocal-teal text-taplocal-dark border-none">
                          {service.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <Link to={`/service/${service.id}`} className="hover:text-taplocal-purple">
                        <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-600">by {service.provider}</p>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-semibold">{service.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({service.reviews})</span>
                        </div>
                        <p className="font-bold">${service.price}/hr</p>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mt-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{service.location}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" asChild>
                        <Link to={`/service/${service.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <Button 
                        className="bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90"
                        onClick={() => bookService(service.title)}
                      >
                        Book
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {filteredServices.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center">
                  <p className="text-lg font-medium">No services found</p>
                  <p className="text-gray-600 mt-2">Try selecting a different category or clearing your filter.</p>
                </div>
              )}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <CardContent className="pt-4">
                            <Link to={`/service/${service.id}`} className="hover:text-taplocal-purple">
                              <h3 className="font-semibold">{service.title}</h3>
                            </Link>
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
    </div>
  );
};

export default ClientDashboard;
