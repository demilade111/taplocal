
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoicePlayer from "@/components/VoicePlayer";

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Emily Thompson",
    location: "Chicago, IL",
    text: "I found an amazing hairstylist through TapLocal. Being able to hear her voice first made me feel comfortable booking with her. The escrow payment feature also gave me peace of mind.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    type: "client"
  },
  {
    id: 2,
    name: "Marcus Jones",
    location: "Atlanta, GA",
    text: "As a personal trainer, TapLocal has been game-changing for my business. The voice intro lets potential clients get a feel for my coaching style before we meet. I've gotten 15 new regular clients in just 2 months!",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3",
    type: "professional"
  },
  {
    id: 3,
    name: "Sophia Garcia",
    location: "Miami, FL",
    text: "I've tried other service platforms before, but TapLocal's voice feature makes all the difference. I hired a tutor for my son, and hearing his approach to teaching in his own voice helped me make the right choice.",
    rating: 4,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    voiceUrl: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    type: "client"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div className="py-16 bg-white">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-taplocal-dark mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from clients and professionals in the TapLocal community
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-xl shadow-sm border p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img 
                    src={currentTestimonial.imageUrl} 
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-taplocal-dark mb-1">
                  {currentTestimonial.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{currentTestimonial.location}</p>
                
                <div className="flex items-center mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <div className="badge mb-4 py-1 px-3 rounded-full bg-taplocal-purple/10 text-taplocal-purple text-xs font-medium">
                  {currentTestimonial.type === "client" ? "Client" : "Professional"}
                </div>
                
                <VoicePlayer audioUrl={currentTestimonial.voiceUrl} size="md" />
              </div>
              
              <div className="md:w-2/3">
                <blockquote>
                  <p className="text-lg text-gray-700 italic">
                    "{currentTestimonial.text}"
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPrev}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-taplocal-purple" : "w-2.5 bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNext}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
