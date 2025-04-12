
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, Edit2, Eye, Plus, Trash2 } from "lucide-react";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  // Mock data for services
  const activeServices = [
    {
      id: 1,
      title: "Home Cleaning",
      description: "Professional house cleaning services for all home sizes.",
      price: "$75/hr",
      duration: "2-4 hours",
      category: "Cleaning",
      status: "active",
      visibility: "public",
      bookings: 12
    },
    {
      id: 2,
      title: "Garden Maintenance",
      description: "Regular garden maintenance including mowing, trimming and weeding.",
      price: "$60/hr",
      duration: "1-3 hours",
      category: "Gardening",
      status: "active",
      visibility: "public",
      bookings: 8
    }
  ];
  
  const draftServices = [
    {
      id: 3,
      title: "Furniture Assembly",
      description: "Expert assembly of all types of furniture for your home.",
      price: "$50/hr",
      duration: "1-2 hours",
      category: "Handyman",
      status: "draft",
      visibility: "private",
      bookings: 0
    }
  ];
  
  const servicesByStatus = {
    active: activeServices,
    draft: draftServices
  };
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">My Services</h1>
          <p className="text-gray-600">Create and manage your service listings</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-taplocal-teal text-white hover:bg-taplocal-teal/90" asChild>
          <Link to="/professional/add-service">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        
        {["active", "draft"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6">
            {servicesByStatus[tabValue as keyof typeof servicesByStatus].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesByStatus[tabValue as keyof typeof servicesByStatus].map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={service.status === "active" ? "bg-green-500" : "bg-amber-500"}>
                          {service.status === "active" ? "Active" : "Draft"}
                        </Badge>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <CardTitle className="mt-2">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="font-medium">{service.price}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      {service.status === "active" && (
                        <div className="mt-3 text-sm text-gray-500">
                          {service.bookings} bookings received
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2 border-t">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <div className="bg-gray-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {tabValue === "active" ? (
                      <Eye className="h-6 w-6 text-gray-500" />
                    ) : (
                      <Edit2 className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium mb-1">No {tabValue} services</h3>
                  <p className="text-gray-500 mb-4">
                    {tabValue === "active" 
                      ? "You don't have any active services yet" 
                      : "You don't have any draft services"}
                  </p>
                  <Button className="bg-taplocal-teal text-white hover:bg-taplocal-teal/90" asChild>
                    <Link to="/professional/add-service">
                      <Plus className="mr-2 h-4 w-4" />
                      Create a Service
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ServicesPage;
