
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Mock data
const categories = [
  { id: "all", name: "All", icon: "https://api.iconify.design/lucide:grid.svg?color=%236c63ff" },
  { id: "hair", name: "Hair", icon: "https://api.iconify.design/lucide:scissors.svg?color=%236c63ff" },
  { id: "plumbing", name: "Plumbing", icon: "https://api.iconify.design/lucide:wrench.svg?color=%236c63ff" },
  { id: "tutoring", name: "Tutoring", icon: "https://api.iconify.design/lucide:book-open.svg?color=%236c63ff" },
  { id: "cleaning", name: "Cleaning", icon: "https://api.iconify.design/lucide:sparkles.svg?color=%236c63ff" },
  { id: "electrical", name: "Electrical", icon: "https://api.iconify.design/lucide:lightbulb.svg?color=%236c63ff" },
  { id: "gardening", name: "Gardening", icon: "https://api.iconify.design/lucide:flower.svg?color=%236c63ff" },
  { id: "painting", name: "Painting", icon: "https://api.iconify.design/lucide:paintbrush.svg?color=%236c63ff" },
  { id: "fitness", name: "Fitness", icon: "https://api.iconify.design/lucide:dumbbell.svg?color=%236c63ff" },
  { id: "cooking", name: "Cooking", icon: "https://api.iconify.design/lucide:chef-hat.svg?color=%236c63ff" },
];

// Mock service data
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
    name: "Lisa Wong",
    profession: "Math Tutor",
    description: "PhD in Mathematics with 10+ years teaching experience. Specializing in high school and college level math.",
    price: "$40/hr",
    rating: 5.0,
    reviewCount: 56,
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-teacher-working-with-children-in-a-classroom-43299-large.mp4",
    category: "tutoring"
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
    <div className="py-16 bg-gradient-cool">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Popular <span className="text-taplocal-purple">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our most requested categories or search for specific services
          </p>
        </div>

        {/* Featured Categories Carousel */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-taplocal-dark mb-6 pl-2">Popular Categories</h3>
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {categories.slice(0, 8).map((category) => (
                  <CarouselItem key={category.id} className="md:basis-1/4 lg:basis-1/6 pl-2">
                    <button 
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 h-32
                        ${selectedCategory === category.id 
                          ? "bg-gradient-to-br from-taplocal-purple/20 to-taplocal-indigo/20 border-2 border-taplocal-purple shadow-md" 
                          : "bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-taplocal-purple/50"}`}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center mb-3 rounded-full 
                        ${selectedCategory === category.id 
                          ? "bg-taplocal-purple bg-opacity-10" 
                          : "bg-taplocal-light"}`}>
                        <img src={category.icon} alt={category.name} className="w-6 h-6" />
                      </div>
                      <span className={`text-sm font-medium ${selectedCategory === category.id ? "text-taplocal-purple" : ""}`}>
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
