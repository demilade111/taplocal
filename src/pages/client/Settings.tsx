
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Camera, Bell, Shield, CreditCard, UserCog, Globe, Lock, LogOut } from "lucide-react";

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileForm, setProfileForm] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 91234"
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    bookingReminders: true,
    messageNotifications: true,
    promotions: false
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleNotificationSave = () => {
    toast.success("Notification preferences updated");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully");
  };

  const handleAvatarChange = () => {
    toast.info("Avatar upload functionality will be implemented soon");
  };

  return (
    <div className="container-app max-w-4xl pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-left ${activeTab === "profile" ? "bg-taplocal-purple/10 text-taplocal-purple" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <UserCog className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-left ${activeTab === "notifications" ? "bg-taplocal-purple/10 text-taplocal-purple" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-left ${activeTab === "security" ? "bg-taplocal-purple/10 text-taplocal-purple" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="mr-2 h-5 w-5" />
            Security
          </Button>
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-left ${activeTab === "payment" ? "bg-taplocal-purple/10 text-taplocal-purple" : ""}`}
            onClick={() => setActiveTab("payment")}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            Payment Methods
          </Button>
          <Separator className="my-4" />
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center md:flex-row md:items-start mb-6">
                  <div className="relative mb-4 md:mb-0 md:mr-6">
                    <Avatar className="h-24 w-24 border-2 border-taplocal-purple">
                      <img 
                        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" 
                        alt="Profile"
                      />
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 rounded-full bg-taplocal-purple text-white hover:bg-taplocal-purple/90 h-8 w-8"
                      onClick={handleAvatarChange}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Alex Johnson</h3>
                    <p className="text-sm text-gray-500">Member since April 2025</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="bg-taplocal-purple/10 text-taplocal-purple border-taplocal-purple">
                        Verified Account
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        5 Bookings
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profileForm.firstName} 
                        onChange={(e) => setProfileForm({...profileForm, firstName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profileForm.lastName} 
                        onChange={(e) => setProfileForm({...profileForm, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileForm.email} 
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={profileForm.phone} 
                      onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={profileForm.address} 
                      onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>English (US)</span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-normal">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={notificationSettings.email} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="font-normal">Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications on your browser</p>
                        </div>
                        <Switch 
                          id="push-notifications" 
                          checked={notificationSettings.push} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-notifications" className="font-normal">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive text notifications (may incur charges)</p>
                        </div>
                        <Switch 
                          id="sms-notifications" 
                          checked={notificationSettings.sms} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sms: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Notification Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="booking-reminders" className="font-normal">Booking Reminders</Label>
                          <p className="text-sm text-gray-500">Get reminders about upcoming appointments</p>
                        </div>
                        <Switch 
                          id="booking-reminders" 
                          checked={notificationSettings.bookingReminders} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, bookingReminders: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="message-notifications" className="font-normal">New Messages</Label>
                          <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                        </div>
                        <Switch 
                          id="message-notifications" 
                          checked={notificationSettings.messageNotifications} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, messageNotifications: checked})}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="promotion-notifications" className="font-normal">Promotions</Label>
                          <p className="text-sm text-gray-500">Receive updates about deals and promotions</p>
                        </div>
                        <Switch 
                          id="promotion-notifications" 
                          checked={notificationSettings.promotions} 
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, promotions: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90"
                    onClick={handleNotificationSave}
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button type="submit" className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90">
                    Update Password
                  </Button>
                </form>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Enhance your account security by enabling 2FA</p>
                      <p className="text-sm text-gray-500 mt-1">
                        You'll be asked for an additional code when signing in
                      </p>
                    </div>
                    <Button variant="outline" className="border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple/10">
                      <Lock className="mr-2 h-4 w-4" />
                      Enable
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium text-red-600 mb-4">Delete Account</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium mb-1">No payment methods yet</h3>
                    <p className="text-gray-500 mb-4">Add a payment method to easily pay for services</p>
                    <Button className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
