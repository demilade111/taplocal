
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Camera, KeyRound, Bell, Shield, CreditCard, Trash, Globe, Moon, Sun } from "lucide-react";

const ClientSettings = () => {
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [address, setAddress] = useState("123 Main St, San Francisco, CA 94105");
  
  const [notifyBookings, setNotifyBookings] = useState(true);
  const [notifyMessages, setNotifyMessages] = useState(true);
  const [notifyPromotions, setNotifyPromotions] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");

  const saveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const changePassword = () => {
    toast.success("Password reset email sent!");
  };

  const deleteAccount = () => {
    toast("Are you sure you want to delete your account?", {
      action: {
        label: "Yes, delete account",
        onClick: () => toast.error("Account scheduled for deletion"),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Account deletion cancelled"),
      },
    });
  };

  return (
    <div className="container-app max-w-4xl pb-20 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4 mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <img 
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" 
                        alt="Profile" 
                      />
                    </Avatar>
                    <Button 
                      size="icon"
                      className="absolute bottom-0 right-0 bg-taplocal-purple text-white rounded-full"
                    >
                      <Camera size={16} />
                    </Button>
                  </div>
                  <p className="font-medium text-lg">{fullName}</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                    />
                  </div>
                  
                  <Button 
                    className="bg-taplocal-purple hover:bg-taplocal-purple/90 mt-2 w-full md:w-auto md:self-end"
                    onClick={saveProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and security options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium mb-1">Password</h3>
                    <p className="text-sm text-gray-500">Reset your account password</p>
                  </div>
                  <Button 
                    variant="outline"
                    className="flex gap-2"
                    onClick={changePassword}
                  >
                    <KeyRound size={16} />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose when and how to be notified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Booking Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your bookings
                    </p>
                  </div>
                  <Switch checked={notifyBookings} onCheckedChange={setNotifyBookings} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive new messages
                    </p>
                  </div>
                  <Switch checked={notifyMessages} onCheckedChange={setNotifyMessages} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Promotions & Offers</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive deals and promotional offers
                    </p>
                  </div>
                  <Switch checked={notifyPromotions} onCheckedChange={setNotifyPromotions} />
                </div>
                
                <Button className="bg-taplocal-purple hover:bg-taplocal-purple/90 mt-4">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your data and privacy options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-taplocal-purple" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Data Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Control what information is visible to service providers.
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Visibility
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-taplocal-purple" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Payment Information</h3>
                    <p className="text-sm text-muted-foreground">
                      View and manage your saved payment methods.
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Payments
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-destructive/10">
                    <Trash className="h-5 w-5 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all data.
                    </p>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={deleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode for a better experience at night
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className={`h-4 w-4 ${!darkMode ? "text-taplocal-purple" : "text-gray-400"}`} />
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                    <Moon className={`h-4 w-4 ${darkMode ? "text-taplocal-purple" : "text-gray-400"}`} />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Language</Label>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-taplocal-purple" />
                      <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                        className="p-2 rounded-md border border-gray-200"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-taplocal-purple hover:bg-taplocal-purple/90 mt-4">
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSettings;
