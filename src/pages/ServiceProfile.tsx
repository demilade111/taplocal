
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, ChevronRight, Clock, MapPin, MessageCircle, Phone, Star, User } from "lucide-react";
import ClientNavbar from "@/components/layout/ClientNavbar";
import VoicePlayer from "@/components/VoicePlayer";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data - in a real app, you would fetch this based on the ID
const mockServiceData = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    profession: "Hair Stylist",
    description: "Specializing in modern cuts and color. Over 8 years of experience making clients look and feel their best. I began my career at the prestigious Milan Academy of Hair Design and have since worked with top salons across the country. My approach centers on understanding each client's unique style and hair type to create customized looks that enhance their natural beauty.",
    about: "Sarah is passionate about hair styling and continuous education, regularly attending workshops and training sessions to stay updated with the latest techniques and trends. Her clients appreciate her attention to detail and ability to transform their vision into reality.",
    price: "$45",
    rating: 4.8,
    reviewCount: 124,
    location: "Downtown, 5 miles away",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    category: "hair",
    availability: [
      { day: "Monday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
      { day: "Tuesday", slots: ["10:00 AM - 4:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM - 4:00 PM"] },
      { day: "Friday", slots: ["9:00 AM - 3:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM - 2:00 PM"] },
      { day: "Sunday", slots: [] }
    ],
    services: [
      { name: "Women's Haircut", price: "$45", duration: "45 mins" },
      { name: "Men's Haircut", price: "$30", duration: "30 mins" },
      { name: "Hair Coloring", price: "$85", duration: "90 mins" },
      { name: "Highlights", price: "$120", duration: "2 hours" },
      { name: "Blowout", price: "$35", duration: "30 mins" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
    ],
    reviews: [
      { id: 1, user: "Emma W.", rating: 5, date: "2 weeks ago", comment: "Sarah is amazing! She understood exactly what I wanted and executed it perfectly. Will definitely be back!" },
      { id: 2, user: "Michael T.", rating: 5, date: "1 month ago", comment: "Great experience. Professional, friendly, and skilled. My haircut looks fantastic." },
      { id: 3, user: "Sophia L.", rating: 4, date: "2 months ago", comment: "Very good stylist. Took time to understand what I wanted and gave helpful suggestions." }
    ]
  },
  "2": {
    id: "2",
    name: "Michael Rodriguez",
    profession: "Plumber",
    description: "Licensed plumber with 12+ years experience. Emergency repairs, installations, and maintenance services. I provide comprehensive plumbing solutions for residential and commercial properties. Whether you're dealing with a burst pipe, clogged drain, or need a complete bathroom renovation, I have the expertise to handle it efficiently and professionally.",
    about: "Michael is a certified master plumber with additional qualifications in modern plumbing systems and eco-friendly solutions. He prides himself on honest pricing, punctuality, and quality workmanship that stands the test of time.",
    price: "$65/hr",
    rating: 4.9,
    reviewCount: 89,
    location: "Northside, 3 miles away",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    category: "plumbing",
    availability: [
      { day: "Monday", slots: ["8:00 AM - 5:00 PM"] },
      { day: "Tuesday", slots: ["8:00 AM - 5:00 PM"] },
      { day: "Wednesday", slots: ["8:00 AM - 5:00 PM"] },
      { day: "Thursday", slots: ["8:00 AM - 5:00 PM"] },
      { day: "Friday", slots: ["8:00 AM - 5:00 PM"] },
      { day: "Saturday", slots: ["9:00 AM - 2:00 PM"] },
      { day: "Sunday", slots: [] }
    ],
    services: [
      { name: "Emergency Repair", price: "$85/hr", duration: "Varies" },
      { name: "Drain Cleaning", price: "$120", duration: "1-2 hours" },
      { name: "Faucet Installation", price: "$95", duration: "1 hour" },
      { name: "Water Heater Service", price: "$150", duration: "2 hours" },
      { name: "Pipe Repair", price: "$75/hr", duration: "Varies" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    reviews: [
      { id: 1, user: "Robert J.", rating: 5, date: "1 week ago", comment: "Michael fixed our burst pipe quickly and professionally. Fair price and excellent work." },
      { id: 2, user: "Jennifer K.", rating: 5, date: "3 weeks ago", comment: "Very knowledgeable and efficient. Solved our complex plumbing issue that two other plumbers couldn't figure out." },
      { id: 3, user: "David M.", rating: 4, date: "2 months ago", comment: "Prompt service and reasonable rates. Would recommend for any plumbing needs." }
    ]
  },
  "3": {
    id: "3",
    name: "Lisa Wong",
    profession: "Math Tutor",
    description: "PhD in Mathematics with 10+ years teaching experience. Specializing in high school and college level math. I provide personalized tutoring sessions tailored to each student's learning style and specific areas of difficulty. My goal is to build both skills and confidence in mathematics through clear explanations and guided practice.",
    about: "Lisa holds a PhD in Mathematics from MIT and has taught at both high school and university levels. She specializes in making complex mathematical concepts accessible to students of all abilities and learning styles.",
    price: "$40/hr",
    rating: 5.0,
    reviewCount: 56,
    location: "Virtual / Online",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    category: "tutoring",
    availability: [
      { day: "Monday", slots: ["3:00 PM - 8:00 PM"] },
      { day: "Tuesday", slots: ["3:00 PM - 8:00 PM"] },
      { day: "Wednesday", slots: ["3:00 PM - 8:00 PM"] },
      { day: "Thursday", slots: ["3:00 PM - 8:00 PM"] },
      { day: "Friday", slots: ["3:00 PM - 6:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM - 4:00 PM"] },
      { day: "Sunday", slots: ["12:00 PM - 4:00 PM"] }
    ],
    services: [
      { name: "High School Math", price: "$40/hr", duration: "60 mins" },
      { name: "College Math", price: "$50/hr", duration: "60 mins" },
      { name: "AP Calculus Prep", price: "$45/hr", duration: "60 mins" },
      { name: "SAT/ACT Math Prep", price: "$45/hr", duration: "60 mins" },
      { name: "Group Session (2-4)", price: "$30/person/hr", duration: "90 mins" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80",
      "https://images.unsplash.com/photo-1596496050755-c923bbb253d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80"
    ],
    reviews: [
      { id: 1, user: "Amy S.", rating: 5, date: "3 days ago", comment: "Lisa helped my daughter go from a C to an A in calculus. She explains concepts clearly and patiently." },
      { id: 2, user: "James P.", rating: 5, date: "2 weeks ago", comment: "Excellent tutor! I'm finally understanding linear algebra thanks to her teaching methods." },
      { id: 3, user: "Tyler R.", rating: 5, date: "1 month ago", comment: "The best math tutor I've ever had. She makes even the most complex topics seem manageable." }
    ]
  },
  "4": {
    id: "4",
    name: "David Chen",
    profession: "House Cleaner",
    description: "Thorough and efficient cleaning services. Eco-friendly products available upon request. I provide comprehensive house cleaning services customized to meet your specific needs. Whether you need a one-time deep clean or regular maintenance, I ensure every corner of your home shines.",
    about: "David has been in the professional cleaning industry for over 5 years and has built a reputation for attention to detail and reliability. He uses high-quality, eco-friendly cleaning products and takes pride in transforming living spaces.",
    price: "$25/hr",
    rating: 4.7,
    reviewCount: 102,
    location: "Eastside, 4 miles away",
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    category: "cleaning",
    availability: [
      { day: "Monday", slots: ["9:00 AM - 5:00 PM"] },
      { day: "Tuesday", slots: ["9:00 AM - 5:00 PM"] },
      { day: "Wednesday", slots: ["9:00 AM - 5:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM - 5:00 PM"] },
      { day: "Friday", slots: ["9:00 AM - 5:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM - 3:00 PM"] },
      { day: "Sunday", slots: [] }
    ],
    services: [
      { name: "Standard Cleaning", price: "$25/hr", duration: "Varies by size" },
      { name: "Deep Cleaning", price: "$35/hr", duration: "Varies by size" },
      { name: "Move-in/Move-out", price: "$200", duration: "4-6 hours" },
      { name: "Office Cleaning", price: "$30/hr", duration: "Varies by size" },
      { name: "Post-Construction", price: "$40/hr", duration: "Varies" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    ],
    reviews: [
      { id: 1, user: "Sarah M.", rating: 5, date: "1 week ago", comment: "David does an amazing job every time. Very thorough and my apartment has never been cleaner." },
      { id: 2, user: "Kevin L.", rating: 4, date: "1 month ago", comment: "Reliable and efficient service. Always on time and does a complete job." },
      { id: 3, user: "Michelle T.", rating: 5, date: "2 months ago", comment: "The deep clean was exceptional. Will definitely be using David's services regularly." }
    ]
  }
};

const ServiceProfile = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  
  // If id is not provided or service not found, return placeholder
  if (!id || !mockServiceData[id as keyof typeof mockServiceData]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Service not found.</p>
      </div>
    );
  }
  
  const service = mockServiceData[id as keyof typeof mockServiceData];
  
  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast.error("Please select a date, time, and service to book.");
      return;
    }
    
    toast.success("Booking request sent!", {
      description: `Your booking with ${service.name} has been requested for ${selectedDate} at ${selectedTime}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ClientNavbar />
      
      <div className="container-app py-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-6">
          <Link to="/client/dashboard" className="text-gray-500 hover:text-taplocal-purple">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to="/services" className="text-gray-500 hover:text-taplocal-purple">
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-taplocal-purple">{service.name}</span>
        </div>
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="h-64 relative">
            <img 
              src={service.imageUrl} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl font-bold mb-1">{service.name}</h1>
                <p className="text-xl opacity-90 mb-2">{service.profession}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="ml-1 font-medium">{service.rating.toFixed(1)}</span>
                    <span className="ml-1 text-sm opacity-90">({service.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{service.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-gray-500">Starting from</p>
                <p className="text-2xl font-bold text-taplocal-dark">{service.price}</p>
              </div>
              
              <div className="border-r border-gray-200 h-12" />
              
              <div>
                <VoicePlayer audioUrl={service.voiceUrl} />
                <p className="text-xs text-gray-500 mt-1">Listen to intro</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 md:flex-none">
                <MessageCircle className="mr-2 h-4 w-4" /> Message
              </Button>
              <Button className="flex-1 md:flex-none bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90">
                <Phone className="mr-2 h-4 w-4" /> Contact
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs and Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h3 className="text-lg font-semibold mb-2">About This Service</h3>
                      <p className="mb-4">{service.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-2">About {service.name.split(" ")[0]}</h3>
                      <p>{service.about}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Available Services</h3>
                    <div className="space-y-4">
                      {service.services.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-taplocal-purple/30 hover:bg-taplocal-purple/5 transition-colors">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{item.duration}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{item.price}</p>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="mt-1 text-taplocal-purple hover:text-taplocal-purple hover:bg-taplocal-purple/10"
                              onClick={() => setSelectedService(item.name)}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.gallery.map((image, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${service.name} work sample ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Client Reviews</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{service.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-gray-500">({service.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {service.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-taplocal-purple/20 rounded-full flex items-center justify-center text-taplocal-purple font-medium mr-2">
                                {review.user.charAt(0)}
                              </div>
                              <span className="font-medium">{review.user}</span>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Sidebar - Booking Panel */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Book This Service</h3>
                
                {/* Service selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Select Service</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {service.services.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name} - {item.price}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Date selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">Select a date</option>
                    {service.availability
                      .filter(day => day.slots.length > 0)
                      .map((day, index) => (
                        <option key={index} value={day.day}>
                          {day.day}
                        </option>
                      ))}
                  </select>
                </div>
                
                {/* Time slot selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Select Time</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    disabled={!selectedDate}
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select a time</option>
                    {selectedDate && 
                      service.availability
                        .find(day => day.day === selectedDate)?.slots
                        .map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}
                  </select>
                </div>
                
                <Button 
                  className="w-full bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90"
                  onClick={handleBooking}
                >
                  Book Now
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Cancellation available up to 24 hours before appointment</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Availability</h4>
                  <div className="space-y-2">
                    {service.availability
                      .filter(day => day.slots.length > 0)
                      .map((day, index) => (
                        <div key={index} className="flex">
                          <span className="w-24 font-medium">{day.day}:</span>
                          <span className="text-gray-600">{day.slots[0]}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProfile;
