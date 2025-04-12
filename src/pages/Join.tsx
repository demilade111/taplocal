
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { UserRoleSelection } from "@/components/auth/UserRoleSelection";
import { ArrowLeft } from "lucide-react";

type AuthStep = "login" | "verify" | "role-select";

const Join = () => {
  const [authStep, setAuthStep] = useState<AuthStep>("login");
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const navigate = useNavigate();

  const handleVerificationSuccess = () => {
    setAuthStep("role-select");
  };

  const handleRoleSelection = (role: "client" | "professional") => {
    // In a real app, we would store the user role in the database
    // For now, we'll just navigate to the appropriate dashboard
    if (role === "professional") {
      navigate("/professional/dashboard");
    } else {
      navigate("/client/dashboard");
    }
  };

  const handleBackClick = () => {
    if (authStep === "verify") {
      setAuthStep("login");
    } else if (authStep === "role-select") {
      setAuthStep("verify");
    }
  };

  return (
    <div className="container-app max-w-md mx-auto py-16">
      <Card className="w-full shadow-md">
        <CardHeader className="text-center relative">
          {authStep !== "login" && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-4" 
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h1 className="text-2xl font-bold font-heading text-taplocal-dark">
            {authStep === "login" && "Join TapLocal"}
            {authStep === "verify" && "Verify Your Identity"}
            {authStep === "role-select" && "I am a..."}
          </h1>
          <CardDescription>
            {authStep === "login" && "Create an account or sign in to continue"}
            {authStep === "verify" && `We've sent a verification code to your ${authMethod}`}
            {authStep === "role-select" && "Choose how you want to use TapLocal"}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {authStep === "login" && (
            <Tabs defaultValue="phone" onValueChange={(v) => setAuthMethod(v as "phone" | "email")}>
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone">
                <PhoneLoginForm onSubmit={() => setAuthStep("verify")} />
              </TabsContent>
              
              <TabsContent value="email">
                <EmailLoginForm onSubmit={() => setAuthStep("verify")} />
              </TabsContent>
            </Tabs>
          )}
          
          {authStep === "verify" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-500">
                Enter the 6-digit code we sent to your {authMethod === "phone" ? "phone" : "email"}
              </p>
              <div className="flex justify-center py-4">
                <input 
                  type="text" 
                  inputMode="numeric" 
                  maxLength={6} 
                  pattern="[0-9]*"
                  className="text-center text-2xl tracking-widest w-48 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-taplocal-purple focus:border-transparent"
                  placeholder="------"
                />
              </div>
              <Button 
                className="w-full bg-taplocal-purple hover:bg-taplocal-purple/90" 
                onClick={handleVerificationSuccess}
              >
                Verify
              </Button>
              <p className="text-center text-sm text-gray-500 pt-2">
                Didn't receive a code? <button className="text-taplocal-purple hover:underline">Resend</button>
              </p>
            </div>
          )}
          
          {authStep === "role-select" && (
            <UserRoleSelection onSelectRole={handleRoleSelection} />
          )}
        </CardContent>
        
        {authStep === "login" && (
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              By continuing, you agree to TapLocal's{" "}
              <a href="/terms" className="text-taplocal-purple hover:underline">Terms of Service</a> and{" "}
              <a href="/privacy" className="text-taplocal-purple hover:underline">Privacy Policy</a>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Join;
