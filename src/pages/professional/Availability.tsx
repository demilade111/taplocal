
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  Sun,
  Sunrise,
  Sunset,
  Moon, 
  Check,
  X,
  Clipboard,
  Save,
  Copy,
  CalendarCheck
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Time slot options
const timeSlots = {
  morning: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  afternoon: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  evening: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"]
};

const daysOfWeek = [
  { id: "monday", label: "Monday", shortLabel: "Mon" },
  { id: "tuesday", label: "Tuesday", shortLabel: "Tue" },
  { id: "wednesday", label: "Wednesday", shortLabel: "Wed" },
  { id: "thursday", label: "Thursday", shortLabel: "Thu" },
  { id: "friday", label: "Friday", shortLabel: "Fri" },
  { id: "saturday", label: "Saturday", shortLabel: "Sat" },
  { id: "sunday", label: "Sunday", shortLabel: "Sun" },
];

const AvailabilityPage = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDays, setSelectedDays] = useState<string[]>(["monday", "tuesday", "wednesday", "thursday", "friday"]);
  const [availability, setAvailability] = useState({
    monday: { morning: true, afternoon: true, evening: false },
    tuesday: { morning: true, afternoon: true, evening: false },
    wednesday: { morning: true, afternoon: true, evening: false },
    thursday: { morning: true, afternoon: true, evening: false },
    friday: { morning: true, afternoon: false, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  });
  const [customTimeSlots, setCustomTimeSlots] = useState<{[key: string]: string[]}>({});
  const [autoAcceptBookings, setAutoAcceptBookings] = useState(true);
  const [allowInstantBooking, setAllowInstantBooking] = useState(true);
  const [bufferTime, setBufferTime] = useState(15); // minutes between appointments
  const [isSaving, setIsSaving] = useState(false);

  // Toggle day selection
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Toggle time period availability
  const toggleAvailability = (day: string, period: 'morning' | 'afternoon' | 'evening') => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day as keyof typeof availability],
        [period]: !availability[day as keyof typeof availability][period]
      }
    });
  };

  const handleSaveAvailability = () => {
    setIsSaving(true);
    
    // Mock API call delay
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Availability settings saved successfully", {
        description: "Your schedule has been updated.",
      });
    }, 1000);
  };

  const handleCopySchedule = (fromDay: string) => {
    const dayAvailability = availability[fromDay as keyof typeof availability];
    
    // Create a new availability object with the selected day's schedule applied to all selected days
    const newAvailability = { ...availability };
    selectedDays.forEach(day => {
      if (day !== fromDay) {
        newAvailability[day as keyof typeof availability] = { ...dayAvailability };
      }
    });
    
    setAvailability(newAvailability);
    toast.success("Schedule copied", {
      description: `Applied ${fromDay}'s schedule to all selected days.`,
    });
  };

  return (
    <div className="container-app max-w-6xl pb-20 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Availability Settings</h1>
        <p className="text-muted-foreground">Configure your working hours and booking preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-scale-in">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Clock className="h-4 w-4 mr-2" />
            Booking Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-6 space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Select Working Days</CardTitle>
              <CardDescription>
                Choose the days you're available for appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.id}
                    variant={selectedDays.includes(day.id) ? "default" : "outline"}
                    className={cn(
                      "flex flex-col h-auto py-3 animate-fade-in",
                      selectedDays.includes(day.id) 
                        ? "bg-taplocal-purple text-white" 
                        : "hover:bg-taplocal-purple/10 hover:text-taplocal-purple"
                    )}
                    onClick={() => toggleDay(day.id)}
                  >
                    <span className="text-sm font-medium">{day.shortLabel}</span>
                    {selectedDays.includes(day.id) && (
                      <Check className="h-4 w-4 mt-1" />
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Set Time Periods</CardTitle>
              <CardDescription>Configure when you're available on each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedDays.map((day) => (
                  <div key={day} className="border border-border rounded-lg p-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium capitalize">{day}</h3>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="hidden sm:flex"
                          onClick={() => handleCopySchedule(day)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy to Selected Days
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={cn(
                        "p-4 rounded-lg border transition-all",
                        availability[day as keyof typeof availability].morning
                          ? "border-taplocal-purple bg-taplocal-purple/5"
                          : "border-border bg-card"
                      )}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Sunrise className={cn(
                              "h-5 w-5 mr-2",
                              availability[day as keyof typeof availability].morning
                                ? "text-taplocal-purple"
                                : "text-muted-foreground"
                            )} />
                            <h4 className="font-medium">Morning</h4>
                          </div>
                          <Switch
                            checked={availability[day as keyof typeof availability].morning}
                            onCheckedChange={() => toggleAvailability(day, 'morning')}
                          />
                        </div>
                        
                        {availability[day as keyof typeof availability].morning && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {timeSlots.morning.map((time) => (
                              <Badge key={time} className="text-xs py-1 px-2 bg-taplocal-purple/20 text-taplocal-purple border-none">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className={cn(
                        "p-4 rounded-lg border transition-all",
                        availability[day as keyof typeof availability].afternoon
                          ? "border-taplocal-purple bg-taplocal-purple/5"
                          : "border-border bg-card"
                      )}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Sun className={cn(
                              "h-5 w-5 mr-2",
                              availability[day as keyof typeof availability].afternoon
                                ? "text-taplocal-purple"
                                : "text-muted-foreground"
                            )} />
                            <h4 className="font-medium">Afternoon</h4>
                          </div>
                          <Switch
                            checked={availability[day as keyof typeof availability].afternoon}
                            onCheckedChange={() => toggleAvailability(day, 'afternoon')}
                          />
                        </div>
                        
                        {availability[day as keyof typeof availability].afternoon && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {timeSlots.afternoon.map((time) => (
                              <Badge key={time} className="text-xs py-1 px-2 bg-taplocal-purple/20 text-taplocal-purple border-none">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className={cn(
                        "p-4 rounded-lg border transition-all",
                        availability[day as keyof typeof availability].evening
                          ? "border-taplocal-purple bg-taplocal-purple/5"
                          : "border-border bg-card"
                      )}>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Sunset className={cn(
                              "h-5 w-5 mr-2",
                              availability[day as keyof typeof availability].evening
                                ? "text-taplocal-purple"
                                : "text-muted-foreground"
                            )} />
                            <h4 className="font-medium">Evening</h4>
                          </div>
                          <Switch
                            checked={availability[day as keyof typeof availability].evening}
                            onCheckedChange={() => toggleAvailability(day, 'evening')}
                          />
                        </div>
                        
                        {availability[day as keyof typeof availability].evening && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {timeSlots.evening.map((time) => (
                              <Badge key={time} className="text-xs py-1 px-2 bg-taplocal-purple/20 text-taplocal-purple border-none">
                                {time}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {selectedDays.length === 0 && (
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">No working days selected</h3>
                    <p className="text-muted-foreground mb-4">
                      Select the days you're available from the options above
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 border-t border-border pt-5">
              <Button variant="outline">
                Clear All
              </Button>
              <Button 
                className="bg-taplocal-purple hover:bg-taplocal-purple/90" 
                onClick={handleSaveAvailability}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Clipboard className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Preferences</CardTitle>
              <CardDescription>
                Configure how clients can book your services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-accept">Auto-accept bookings</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically confirm bookings without manual approval
                  </p>
                </div>
                <Switch
                  id="auto-accept"
                  checked={autoAcceptBookings}
                  onCheckedChange={setAutoAcceptBookings}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="instant-booking">Allow instant booking</Label>
                  <p className="text-sm text-muted-foreground">
                    Let clients book your services without prior messaging
                  </p>
                </div>
                <Switch
                  id="instant-booking"
                  checked={allowInstantBooking}
                  onCheckedChange={setAllowInstantBooking}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="buffer-time">Buffer time between appointments</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add extra time between appointments for preparation
                </p>
                <div className="flex space-x-2">
                  {[0, 15, 30, 45, 60].map((minutes) => (
                    <Button
                      key={minutes}
                      type="button"
                      variant={bufferTime === minutes ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        bufferTime === minutes && "bg-taplocal-purple hover:bg-taplocal-purple/90"
                      )}
                      onClick={() => setBufferTime(minutes)}
                    >
                      {minutes} min
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h4 className="font-medium flex items-center mb-2">
                  <CalendarCheck className="h-4 w-4 mr-2 text-taplocal-purple" />
                  Your availability summary
                </h4>
                <p className="text-sm text-muted-foreground">
                  You're available on {selectedDays.length} days per week, with{' '}
                  {Object.values(availability).reduce((total, dayAvail) => {
                    return total + 
                      (dayAvail.morning ? timeSlots.morning.length : 0) + 
                      (dayAvail.afternoon ? timeSlots.afternoon.length : 0) + 
                      (dayAvail.evening ? timeSlots.evening.length : 0);
                  }, 0)} total time slots.
                  {bufferTime > 0 && ` You have a ${bufferTime}-minute buffer between appointments.`}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 border-t border-border pt-5">
              <Button variant="outline">
                Reset to Default
              </Button>
              <Button 
                className="bg-taplocal-purple hover:bg-taplocal-purple/90"
                onClick={handleSaveAvailability}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Clipboard className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AvailabilityPage;

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <div className={cn("inline-block rounded-full text-center", className)}>
      {children}
    </div>
  );
}
