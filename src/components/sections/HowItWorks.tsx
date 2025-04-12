
import { Mic, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: <Mic className="w-8 h-8 text-taplocal-purple" />,
    title: "Hear Their Voice",
    description: "Listen to professionals introduce themselves in their own voice. No long bios to read—just authentic introductions."
  },
  {
    icon: <Calendar className="w-8 h-8 text-taplocal-teal" />,
    title: "Book With Confidence",
    description: "See real-time availability, clear pricing, and secure your booking in just a few taps."
  },
  {
    icon: <Shield className="w-8 h-8 text-taplocal-coral" />,
    title: "Protected Payments",
    description: "Your payment is held securely in escrow until the service is complete, protecting both you and the professional."
  }
];

const HowItWorks = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container-app">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-taplocal-dark mb-4">
            How TapLocal Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've simplified the process of finding and booking trusted local professionals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm border flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-taplocal-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-taplocal-purple/10 rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center">
          <div className="mb-6 md:mb-0 md:mr-10 flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-taplocal-purple flex items-center justify-center">
              <Mic className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold font-heading text-taplocal-dark mb-3">
              Why Voice Matters
            </h3>
            <p className="text-gray-600 mb-4">
              At TapLocal, we believe that hearing someone's voice creates trust in a way that text simply can't. 
              Our voice-first approach helps you connect with professionals on a human level before you book.
            </p>
            <p className="text-gray-600">
              For professionals, it's a chance to let your personality shine and connect with potential clients
              without the need for perfect writing skills or professional photography.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
