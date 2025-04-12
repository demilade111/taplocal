
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Star,
  MessageSquare,
  Share2,
  ThumbsUp,
  Clock,
  Video,
  Mic,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VoicePlayer from "@/components/VoicePlayer";
import MediaPlayer from "@/components/MediaPlayer";
import { toast } from "sonner";

// Mock service details
const serviceData = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    profession: "Hair Stylist",
    description: "Specializing in modern cuts and color. Over 8 years of experience making clients look and feel their best. I work with all hair types and textures, and I'm particularly passionate about color correction and balayage techniques.",
    price: "$45",
    rating: 4.8,
    reviewCount: 124,
    location: "Downtown, New York",
    distance: "1.2 miles away",
    availability: [
      { day: "Monday", slots: ["10:00 AM", "1:00 PM", "3:30 PM"] },
      { day: "Wednesday", slots: ["9:00 AM", "11:30 AM", "4:00 PM"] },
      { day: "Friday", slots: ["10:00 AM", "2:00 PM", "5:30 PM"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-working-on-a-woman-hair-51487-large.mp4",
    category: "hair",
    gallery: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    ],
    reviews: [
      {
        id: "r1",
        user: "Emily W.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Sarah is amazing! She understood exactly what I wanted and gave me the best haircut I've had in years.",
        userImage: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: "r2",
        user: "Michael T.",
        rating: 4,
        date: "1 month ago",
        comment: "Great service, very professional. The color was slightly different than what I expected but still looked great.",
        userImage: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: "r3",
        user: "Jennifer K.",
        rating: 5,
        date: "2 months ago",
        comment: "I've been going to Sarah for over a year now and she never disappoints. Highly recommend her balayage!",
        userImage: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Michael Rodriguez",
    profession: "Plumber",
    description: "Licensed plumber with 12+ years experience. Emergency repairs, installations, and maintenance services for residential and commercial properties. I specialize in leak detection, pipe replacement, and fixture installation.",
    price: "$65/hr",
    rating: 4.9,
    reviewCount: 89,
    location: "Brownsville, Brooklyn",
    distance: "2.8 miles away",
    availability: [
      { day: "Monday", slots: ["8:00 AM", "12:00 PM", "4:00 PM"] },
      { day: "Tuesday", slots: ["8:00 AM", "1:00 PM", "5:00 PM"] },
      { day: "Thursday", slots: ["9:00 AM", "2:00 PM", "6:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "3:00 PM"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-plumber-working-on-a-bathroom-sink-10699-large.mp4",
    category: "plumbing",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1649&q=80",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      "https://images.unsplash.com/photo-1461175270797-94de55c9234e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80",
    ],
    reviews: [
      {
        id: "r1",
        user: "Robert J.",
        rating: 5,
        date: "1 week ago",
        comment: "Michael responded quickly to my emergency call and fixed our burst pipe efficiently. Fair pricing and great work!",
        userImage: "https://randomuser.me/api/portraits/men/52.jpg",
      },
      {
        id: "r2",
        user: "Sarah M.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Very knowledgeable and professional. Installed our new water heater perfectly and even helped us understand how to maintain it.",
        userImage: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      {
        id: "r3",
        user: "David L.",
        rating: 4,
        date: "1 month ago",
        comment: "Good service, arrived on time and completed the work as quoted. Would use again for future plumbing needs.",
        userImage: "https://randomuser.me/api/portraits/men/18.jpg",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Lisa Wong",
    profession: "Math Tutor",
    description: "PhD in Mathematics with 10+ years teaching experience. Specializing in high school and college level math, including calculus, algebra, statistics, and geometry. I tailor my teaching methods to each student's learning style.",
    price: "$40/hr",
    rating: 5.0,
    reviewCount: 56,
    location: "Upper East Side, Manhattan",
    distance: "0.8 miles away",
    availability: [
      { day: "Tuesday", slots: ["3:00 PM", "4:30 PM", "6:00 PM"] },
      { day: "Wednesday", slots: ["3:00 PM", "4:30 PM", "6:00 PM"] },
      { day: "Thursday", slots: ["3:00 PM", "4:30 PM", "6:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "11:30 AM", "1:00 PM"] },
      { day: "Sunday", slots: ["2:00 PM", "3:30 PM", "5:00 PM"] },
    ],
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-teacher-working-with-children-in-a-classroom-43299-large.mp4",
    category: "tutoring",
    gallery: [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1622&q=80",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    ],
    reviews: [
      {
        id: "r1",
        user: "Jason P.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Lisa helped my daughter raise her calculus grade from a C to an A. She explains concepts so clearly and is very patient.",
        userImage: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        id: "r2",
        user: "Michelle K.",
        rating: 5,
        date: "1 month ago",
        comment: "I was struggling with statistics for my psychology course and Lisa made it all make sense. Highly recommend!",
        userImage: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      {
        id: "r3",
        user: "Brandon T.",
        rating: 5,
        date: "6 weeks ago",
        comment: "Lisa is an excellent tutor. She helped me prepare for my college entrance exams and I got into my top choice school!",
        userImage: "https://randomuser.me/api/portraits/men/63.jpg",
      },
    ],
  },
};

const ServiceProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [mediaType, setMediaType] = useState<"audio" | "video">("video");
  
  // Find the service based on the ID
  const service = serviceData[id as keyof typeof serviceData];

  const handleBooking = () => {
    if (!selectedDay || !selectedTime) {
      toast.error("Please select a day and time for your appointment");
      return;
    }
    
    toast.success(`Booking confirmed with ${service.name} on ${selectedDay} at ${selectedTime}`);
  };

  const handleContactProvider = () => {
    toast.success(`Message sent to ${service.name}! They will respond shortly.`);
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
          <p className="mb-6">The service you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-taplocal-light to-white">
      <Navbar />
      
      <main className="flex-1 container-app py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 card-glass">
          {/* Hero Section */}
          <div className="relative h-64 md:h-96 bg-gradient-to-r from-taplocal-purple/20 to-taplocal-indigo/20">
            <img 
              src={service.imageUrl} 
              alt={service.name} 
              className="w-full h-full object-cover opacity-90"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="container-app py-6 text-white">
                <div className="flex flex-wrap items-end justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading drop-shadow-sm">{service.name}</h1>
                    <p className="text-lg md:text-xl drop-shadow-sm">{service.profession}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-2">
                    <span className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              {/* Left Column */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-8">
                    {/* Service Introduction */}
                    <div className="bg-gradient-cool p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <h2 className="text-xl font-bold font-heading mb-2 md:mb-0">About this service</h2>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant={mediaType === "video" ? "default" : "outline"} 
                            onClick={() => setMediaType("video")}
                            disabled={!service.videoUrl}
                            className="rounded-full"
                          >
                            <Video size={16} className="mr-1" /> Video
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant={mediaType === "audio" ? "default" : "outline"} 
                            onClick={() => setMediaType("audio")}
                            className="rounded-full"
                          >
                            <Mic size={16} className="mr-1" /> Audio
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                          {mediaType === "audio" ? (
                            <MediaPlayer type="audio" src={service.voiceUrl} />
                          ) : service.videoUrl ? (
                            <MediaPlayer 
                              type="video" 
                              src={service.videoUrl} 
                              poster={service.imageUrl} 
                            />
                          ) : (
                            <div className="bg-gray-100 rounded-lg p-4 text-center">
                              <p>No video introduction available</p>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setMediaType("audio")}
                                className="mt-2"
                              >
                                Listen to audio instead
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="md:w-1/2">
                          <p className="text-gray-700">{service.description}</p>
                          
                          <div className="flex flex-col mt-4 space-y-2">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-taplocal-purple mr-2" />
                              <span>{service.location}</span>
                              <span className="ml-2 text-sm text-gray-500">({service.distance})</span>
                            </div>
                            
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="ml-1 font-medium">{service.rating.toFixed(1)}</span>
                              <span className="ml-1 text-sm opacity-90">({service.reviewCount} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="gallery">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.gallery && service.gallery.map((image, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${service.name} work sample ${index + 1}`} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      ))}
                      {service.videoUrl && (
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <video 
                            controls 
                            poster={service.imageUrl} 
                            className="w-full h-full object-cover"
                          >
                            <source src={service.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      {service.reviews && service.reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={review.userImage} />
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{review.user}</p>
                                  <div className="flex items-center mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star 
                                        key={i}
                                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                      />
                                    ))}
                                    <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                                  </div>
                                </div>
                                
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Helpful
                                </Button>
                              </div>
                              
                              <p className="mt-2 text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Right Column - Booking */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white to-taplocal-purple/5 p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Book an Appointment</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select a day</label>
                    <div className="grid grid-cols-2 gap-2">
                      {service.availability.map(avail => (
                        <Button
                          key={avail.day}
                          variant={selectedDay === avail.day ? "default" : "outline"}
                          size="sm"
                          className={`justify-start ${selectedDay === avail.day ? "bg-taplocal-purple" : ""}`}
                          onClick={() => setSelectedDay(avail.day)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {avail.day}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDay && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select a time</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {service.availability
                          .find(avail => avail.day === selectedDay)?.slots
                          .map(time => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              className={`justify-start ${selectedTime === time ? "bg-taplocal-purple" : ""}`}
                              onClick={() => setSelectedTime(time)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </Button>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-95"
                    onClick={handleBooking}
                  >
                    Book Now
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Contact {service.name}</h3>
                  <div className="space-y-3">
                    <textarea
                      placeholder={`Message for ${service.name}...`}
                      className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-taplocal-purple focus:border-transparent"
                    ></textarea>
                    <Button
                      variant="outline"
                      className="w-full border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white"
                      onClick={handleContactProvider}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share this service
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceProfile;
