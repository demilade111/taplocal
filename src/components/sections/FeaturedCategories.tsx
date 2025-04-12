
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Main category groups with their subcategories
const categoryGroups = [
  {
    id: "home-services",
    name: "Home Services",
    description: "Find trusted professionals for your home",
    icon: "https://api.iconify.design/lucide:home.svg?color=%236c63ff",
    color: "#6c63ff",
    categories: [
      { id: "handyman", name: "Handyman", icon: "https://api.iconify.design/lucide:hammer.svg?color=%236c63ff" },
      { id: "cleaning", name: "Cleaning", icon: "https://api.iconify.design/lucide:sparkles.svg?color=%236c63ff" },
      { id: "plumbing", name: "Plumbing", icon: "https://api.iconify.design/lucide:wrench.svg?color=%236c63ff" },
      { id: "electrical", name: "Electrical", icon: "https://api.iconify.design/lucide:lightbulb.svg?color=%236c63ff" },
      { id: "carpentry", name: "Carpentry", icon: "https://api.iconify.design/lucide:hammer.svg?color=%236c63ff" },
      { id: "furniture", name: "Furniture Assembly", icon: "https://api.iconify.design/lucide:sofa.svg?color=%236c63ff" },
    ]
  },
  {
    id: "education",
    name: "Education & Tutoring",
    description: "Connect with qualified educators and tutors",
    icon: "https://api.iconify.design/lucide:book-open.svg?color=%23FF6B6B",
    color: "#FF6B6B",
    categories: [
      { id: "math", name: "Math Tutoring", icon: "https://api.iconify.design/lucide:calculator.svg?color=%23FF6B6B" },
      { id: "language", name: "Language", icon: "https://api.iconify.design/lucide:languages.svg?color=%23FF6B6B" },
      { id: "science", name: "Science", icon: "https://api.iconify.design/lucide:flask-round.svg?color=%23FF6B6B" },
      { id: "music", name: "Music Lessons", icon: "https://api.iconify.design/lucide:music.svg?color=%23FF6B6B" },
    ]
  },
  {
    id: "beauty",
    name: "Beauty & Grooming",
    description: "Book experienced stylists and beauty professionals",
    icon: "https://api.iconify.design/lucide:scissors.svg?color=%2306D6A0",
    color: "#06D6A0",
    categories: [
      { id: "hair", name: "Hair Styling", icon: "https://api.iconify.design/lucide:scissors.svg?color=%2306D6A0" },
      { id: "barber", name: "Barber", icon: "https://api.iconify.design/lucide:scissors.svg?color=%2306D6A0" },
      { id: "makeup", name: "Makeup", icon: "https://api.iconify.design/lucide:paintbrush.svg?color=%2306D6A0" },
      { id: "nails", name: "Nail Care", icon: "https://api.iconify.design/lucide:align-horizontal-distribute-start.svg?color=%2306D6A0" },
    ]
  },
  {
    id: "trades",
    name: "Skilled Trades",
    description: "Professional contractors for specialized work",
    icon: "https://api.iconify.design/lucide:wrench.svg?color=%238338EC",
    color: "#8338EC",
    categories: [
      { id: "hvac", name: "HVAC", icon: "https://api.iconify.design/lucide:thermometer.svg?color=%238338EC" },
      { id: "roofing", name: "Roofing", icon: "https://api.iconify.design/lucide:home.svg?color=%238338EC" },
      { id: "painting", name: "Painting", icon: "https://api.iconify.design/lucide:paintbrush.svg?color=%238338EC" },
      { id: "flooring", name: "Flooring", icon: "https://api.iconify.design/lucide:layers.svg?color=%238338EC" },
      { id: "landscaping", name: "Landscaping", icon: "https://api.iconify.design/lucide:trees.svg?color=%238338EC" },
    ]
  }
];

// Updated service data from the original component
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
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedGroup(null); // Reset group selection when choosing a specific category
  };

  const handleGroupSelect = (groupId: string) => {
    setSelectedGroup(groupId === selectedGroup ? null : groupId);
    setSelectedCategory("all"); // Reset category when selecting a group
  };

  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="py-16 bg-gradient-cool dark:bg-gradient-to-b dark:from-background dark:to-background/90">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Popular <span className="text-taplocal-purple">Categories</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find trusted local professionals for all your service needs
          </p>
        </div>

        {/* Main Category Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {categoryGroups.map((group) => (
            <Card 
              key={group.id} 
              className={`overflow-hidden hover:shadow-lg transition-all border-2 cursor-pointer ${
                selectedGroup === group.id 
                  ? "border-[" + group.color + "] shadow-md" 
                  : "border-transparent"
              }`}
              onClick={() => handleGroupSelect(group.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${group.color}20` }}
                  >
                    <img src={group.icon} alt={group.name} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{group.name}</h3>
                    {selectedGroup === group.id && (
                      <Badge className="bg-[#9b87f5] text-white">Selected</Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm">
                  {group.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{group.categories.length} services</span>
                  <ChevronRight 
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      selectedGroup === group.id ? "rotate-90" : "rotate-0"
                    }`} 
                  />
                </div>

                {/* Subcategories - visible when group is selected */}
                {selectedGroup === group.id && (
                  <div className="mt-4 grid grid-cols-2 gap-2 animate-fade-in">
                    {group.categories.map(category => (
                      <Button
                        key={category.id}
                        variant="outline"
                        size="sm"
                        className="justify-start text-sm h-auto py-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategorySelect(category.id);
                        }}
                      >
                        <img src={category.icon} alt={category.name} className="w-4 h-4 mr-2" />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Services */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-taplocal-dark dark:text-gray-200">
              {selectedCategory !== "all" 
                ? `Top Services in ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                : "Featured Services"}
            </h3>
            
            {selectedCategory !== "all" && (
              <Button 
                variant="ghost" 
                onClick={() => setSelectedCategory("all")}
                className="text-taplocal-purple"
              >
                View All Services
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <Link to={`/service/${service.id}`} key={service.id}>
                <ServiceCard {...service} />
              </Link>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No services available in this category yet.</p>
            </div>
          )}
          
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
    </div>
  );
};

export default FeaturedCategories;
