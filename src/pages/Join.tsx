
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { UserRoleSelection } from "@/components/auth/UserRoleSelection";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type AuthStep = "login" | "verify" | "role-select";

const Join = () => {
  const [authStep, setAuthStep] = useState<AuthStep>("login");
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerificationSuccess = () => {
    setAuthStep("role-select");
  };

  const handleRoleSelection = (role: "client" | "professional") => {
    // In a real app, we would store the user role in the database
    toast.success(`Signed up successfully as a ${role}!`);
    
    // Navigate to the appropriate dashboard
    setTimeout(() => {
      if (role === "professional") {
        navigate("/professional/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    }, 1000);
  };

  const handleBackClick = () => {
    if (authStep === "verify") {
      setAuthStep("login");
    } else if (authStep === "role-select") {
      setAuthStep("verify");
    }
  };

  const handleSubmit = () => {
    if (authStep === "login") {
      // In a real app we would validate input and submit to backend
      setAuthStep("verify");
      toast.info("Verification code sent!");
    } else if (authStep === "verify") {
      // In a real app we would verify the code
      if (verificationCode.length === 6) {
        toast.success("Verification successful!");
        handleVerificationSuccess();
      } else {
        toast.error("Please enter all 6 digits of the verification code");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-taplocal-purple/5 to-white dark:from-taplocal-purple/10 dark:to-background py-16 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-0 card-glass animate-scale-in">
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
          <h1 className="text-2xl font-bold font-heading bg-gradient-primary bg-clip-text text-transparent">
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
                <PhoneLoginForm onSubmit={() => handleSubmit()} />
              </TabsContent>
              
              <TabsContent value="email">
                <EmailLoginForm onSubmit={() => handleSubmit()} />
              </TabsContent>
            </Tabs>
          )}
          
          {authStep === "verify" && (
            <div className="space-y-4">
              <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                Enter the 6-digit code we sent to your {authMethod === "phone" ? "phone" : "email"}
              </p>
              <div className="flex justify-center py-4">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode} 
                  onChange={(value) => setVerificationCode(value)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={1} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={2} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={3} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={4} className="h-12 w-12 text-xl" />
                    <InputOTPSlot index={5} className="h-12 w-12 text-xl" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90" 
                onClick={() => handleSubmit()}
              >
                Verify
              </Button>
              <p className="text-center text-sm text-gray-500 dark:text-gray-300 pt-2">
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
            <div className="text-sm text-center text-gray-500 dark:text-gray-300">
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
