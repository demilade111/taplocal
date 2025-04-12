
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const [availableDays, setAvailableDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });
  
  const handleDayToggle = (day: keyof typeof availableDays) => {
    setAvailableDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold font-heading text-taplocal-dark mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your account and preferences</p>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile details and how you appear to clients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell clients about yourself and your expertise..."
                      className="min-h-[150px]"
                      defaultValue="Professional service provider with over 5 years of experience in home cleaning and organization. I take pride in my attention to detail and commitment to customer satisfaction."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src="/placeholder.svg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline">Upload New Photo</Button>
                    <p className="text-xs text-gray-500">Recommended: Square JPG or PNG, at least 300x300px</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Voice Introduction</Label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">
                    Record a 30-second introduction for potential clients
                  </p>
                  <Button>Record Voice Intro</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-taplocal-teal hover:bg-taplocal-teal/90">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Availability Tab */}
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
              <CardDescription>
                Set your working hours and service area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Working Days</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(availableDays).map(([day, isAvailable]) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch
                        id={day}
                        checked={isAvailable}
                        onCheckedChange={() => handleDayToggle(day as keyof typeof availableDays)}
                      />
                      <Label htmlFor={day} className="capitalize">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Working Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select defaultValue="09:00">
                      <SelectTrigger id="startTime">
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                            {hour.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Select defaultValue="17:00">
                      <SelectTrigger id="endTime">
                        <SelectValue placeholder="Select end time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                          <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                            {hour.toString().padStart(2, '0')}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Service Area</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Select defaultValue="10">
                        <SelectTrigger id="serviceRadius">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((radius) => (
                            <SelectItem key={radius} value={radius.toString()}>
                              {radius} miles
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="col-span-2">
                        <Input id="zipCode" placeholder="Enter your ZIP code" defaultValue="94105" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 h-[200px] rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map view will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-taplocal-teal hover:bg-taplocal-teal/90">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "email-bookings", label: "New booking requests" },
                    { id: "email-messages", label: "New messages from clients" },
                    { id: "email-reminders", label: "Appointment reminders" },
                    { id: "email-payments", label: "Payment notifications" },
                    { id: "email-promotions", label: "Promotions and updates" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id !== "email-promotions"} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "push-bookings", label: "New booking requests" },
                    { id: "push-messages", label: "New messages from clients" },
                    { id: "push-reminders", label: "Appointment reminders" },
                    { id: "push-payments", label: "Payment notifications" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: "sms-bookings", label: "New booking requests" },
                    { id: "sms-reminders", label: "Appointment reminders" }
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <Label htmlFor={item.id} className="cursor-pointer">{item.label}</Label>
                      <Switch id={item.id} defaultChecked={item.id === "sms-reminders"} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-taplocal-teal hover:bg-taplocal-teal/90">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account security and data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button className="bg-taplocal-teal hover:bg-taplocal-teal/90">Update Password</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                <div className="space-y-4">
                  {[
                    { name: "Google", connected: true },
                    { name: "Facebook", connected: false },
                    { name: "Apple", connected: false }
                  ].map((account) => (
                    <div key={account.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-gray-500">
                          {account.connected ? "Connected" : "Not connected"}
                        </p>
                      </div>
                      <Button variant="outline">
                        {account.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Account Actions</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium">Export Your Data</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Download a copy of your personal data
                    </p>
                    <Button variant="outline">Export Data</Button>
                  </div>
                  
                  <div className="p-4 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-600">Deactivate Account</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Temporarily disable your account
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Deactivate Account
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-600">Delete Account</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Permanently delete your account and all your data
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
