
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import VoicePlayer from "./VoicePlayer";

interface ServiceCardProps {
  id: string;
  name: string;
  profession: string;
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  voiceUrl: string;
}

const ServiceCard = ({
  id,
  name,
  profession,
  description,
  price,
  rating,
  reviewCount,
  imageUrl,
  voiceUrl
}: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <Link to={`/service/${id}`}>
          <img
            src={imageUrl}
            alt={`${name} - ${profession}`}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="p-5">
        <Link to={`/service/${id}`} className="block">
          <h3 className="text-lg font-semibold text-taplocal-dark mb-1">{name}</h3>
        </Link>
        
        <p className="text-sm font-medium text-taplocal-teal mb-2">{profession}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium text-taplocal-dark">{rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-xs mx-2">•</span>
          <span className="text-sm text-gray-500">{reviewCount} reviews</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-lg font-semibold text-taplocal-dark">{price}</p>
          </div>
          
          <VoicePlayer audioUrl={voiceUrl} size="sm" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
