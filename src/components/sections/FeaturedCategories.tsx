
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Updated categories - removed tutoring and added more trade-focused categories
const categories = [
  { id: "all", name: "All", icon: "https://api.iconify.design/lucide:grid.svg?color=%236c63ff" },
  { id: "hair", name: "Hair", icon: "https://api.iconify.design/lucide:scissors.svg?color=%236c63ff" },
  { id: "plumbing", name: "Plumbing", icon: "https://api.iconify.design/lucide:wrench.svg?color=%236c63ff" },
  { id: "cleaning", name: "Cleaning", icon: "https://api.iconify.design/lucide:sparkles.svg?color=%236c63ff" },
  { id: "electrical", name: "Electrical", icon: "https://api.iconify.design/lucide:lightbulb.svg?color=%236c63ff" },
  { id: "carpentry", name: "Carpentry", icon: "https://api.iconify.design/lucide:hammer.svg?color=%236c63ff" },
  { id: "painting", name: "Painting", icon: "https://api.iconify.design/lucide:paintbrush.svg?color=%236c63ff" },
  { id: "landscaping", name: "Landscaping", icon: "https://api.iconify.design/lucide:trees.svg?color=%236c63ff" },
  { id: "auto", name: "Auto Repair", icon: "https://api.iconify.design/lucide:car.svg?color=%236c63ff" },
  { id: "hvac", name: "HVAC", icon: "https://api.iconify.design/lucide:thermometer.svg?color=%236c63ff" },
  { id: "roofing", name: "Roofing", icon: "https://api.iconify.design/lucide:home.svg?color=%236c63ff" },
  { id: "flooring", name: "Flooring", icon: "https://api.iconify.design/lucide:layers.svg?color=%236c63ff" },
];

// Updated mock service data - replaced tutoring with additional trade services
const services = [
  {
    id: "1",
    name: "Sarah Johnson",
    profession: "Hair Stylist",
    description: "Specializing in modern cuts and color. Over 8 years of experience making clients look and feel their best.",
    price: "$45",
    rating: 4.8,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-working-on-a-woman-hair-51487-large.mp4",
    category: "hair"
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    profession: "Plumber",
    description: "Licensed plumber with 12+ years experience. Emergency repairs, installations, and maintenance services.",
    price: "$65/hr",
    rating: 4.9,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    category: "plumbing"
  },
  {
    id: "3",
    name: "James Wilson",
    profession: "Electrician",
    description: "Licensed electrician specializing in residential wiring, lighting installation, and electrical repairs.",
    price: "$75/hr",
    rating: 4.9,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-fixing-light-in-the-ceiling-47258-large.mp4",
    category: "electrical"
  },
  {
    id: "4",
    name: "David Chen",
    profession: "House Cleaner",
    description: "Thorough and efficient cleaning services. Eco-friendly products available upon request.",
    price: "$25/hr",
    rating: 4.7,
    reviewCount: 102,
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    category: "cleaning"
  },
];

const FeaturedCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="py-16 bg-gradient-cool dark:bg-gradient-to-b dark:from-background dark:to-background/90">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Popular <span className="text-taplocal-purple">Services</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our most requested categories or search for specific services
          </p>
        </div>

        {/* Featured Categories Carousel */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-taplocal-dark dark:text-gray-200 mb-6 pl-2">Popular Categories</h3>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.map((category) => (
                  <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/6 pl-2">
                    <button 
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 h-32
                        ${selectedCategory === category.id 
                          ? "bg-gradient-to-br from-taplocal-purple/20 to-taplocal-indigo/20 border-2 border-taplocal-purple shadow-md" 
                          : "bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 hover:border-taplocal-purple/50"}`}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center mb-3 rounded-full 
                        ${selectedCategory === category.id 
                          ? "bg-taplocal-purple bg-opacity-10" 
                          : "bg-taplocal-light dark:bg-gray-700"}`}>
                        <img src={category.icon} alt={category.name} className="w-6 h-6" />
                      </div>
                      <span className={`text-sm font-medium ${selectedCategory === category.id ? "text-taplocal-purple" : "dark:text-gray-200"}`}>
                        {category.name}
                      </span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Link to={`/service/${service.id}`} key={service.id}>
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline"
            size="lg" 
            className="rounded-full px-8 border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white shadow-sm"
            asChild
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
