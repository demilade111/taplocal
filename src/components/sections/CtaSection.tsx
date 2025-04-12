
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <div className="py-16 bg-taplocal-purple/10">
      <div className="container-app">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-taplocal-dark mb-6">
            Ready to join the TapLocal community?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Whether you're looking for services or offering your skills, TapLocal makes the connection simple, human, and trustworthy.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-taplocal-dark mb-3">
                Looking for a service?
              </h3>
              <p className="text-gray-600 mb-6">
                Find trusted local professionals and book services with confidence.
              </p>
              <Button 
                size="lg" 
                className="w-full rounded-full bg-taplocal-purple hover:bg-taplocal-purple/90"
                asChild
              >
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-taplocal-dark mb-3">
                Offer your services?
              </h3>
              <p className="text-gray-600 mb-6">
                Create your profile, record your voice intro, and start getting clients.
              </p>
              <Button 
                size="lg" 
                className="w-full rounded-full bg-taplocal-teal text-taplocal-dark hover:bg-taplocal-teal/90"
                asChild
              >
                <Link to="/join">Join as Professional</Link>
              </Button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            Join thousands of satisfied clients and professionals on TapLocal
          </p>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
