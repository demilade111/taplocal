
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-taplocal-purple/5 to-white pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-app">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-taplocal-dark mb-6">
            Find and book trusted local professionals — 
            <span className="text-taplocal-purple"> by voice</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover skilled local service providers and book with confidence.
            No lengthy descriptions—hear their voice, feel the trust.
          </p>
          
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="flex">
              <Input 
                type="text" 
                placeholder="What service do you need?"
                className="rounded-l-full py-6 pl-5 pr-4 border-r-0 focus-visible:ring-taplocal-purple"
              />
              <Button 
                className="rounded-r-full px-6 bg-taplocal-purple hover:bg-taplocal-purple/90" 
                size="lg"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Button 
              size="lg" 
              className="rounded-full px-8 bg-taplocal-purple hover:bg-taplocal-purple/90 w-full md:w-auto"
              asChild
            >
              <Link to="/services">Browse Services</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white w-full md:w-auto"
              asChild
            >
              <Link to="/join">Join TapLocal</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 rounded-full bg-taplocal-teal opacity-10"></div>
      <div className="hidden md:block absolute bottom-10 right-20 w-32 h-32 rounded-full bg-taplocal-coral opacity-10"></div>
    </div>
  );
};

export default Hero;
