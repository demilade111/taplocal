
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

const weekDays = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];

const timeSlots = [
  { id: "morning", name: "Morning (8am - 12pm)" },
  { id: "afternoon", name: "Afternoon (12pm - 5pm)" },
  { id: "evening", name: "Evening (5pm - 10pm)" },
];

interface AvailabilityFormValues {
  days: Record<string, boolean>;
  slots: Record<string, boolean>;
}

const AvailabilityPage = () => {
  const form = useForm<AvailabilityFormValues>({
    defaultValues: {
      days: {
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "0": false,
        "6": false,
      },
      slots: {
        morning: true,
        afternoon: true,
        evening: false,
      },
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = (values: AvailabilityFormValues) => {
    setIsSaving(true);
    console.log("Saving availability:", values);
    
    // Mock API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Availability saved successfully!");
    }, 1000);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-taplocal-dark">Set Availability</h1>
          <p className="text-gray-600 font-light">Let clients know when you're available</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-taplocal-purple/10 shadow-md">
            <CardHeader className="bg-gradient-to-r from-taplocal-purple/5 to-transparent">
              <CardTitle className="text-taplocal-purple flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Available Days
              </CardTitle>
              <CardDescription>Select which days you're available to work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {weekDays.map((day) => (
                  <FormField
                    key={day.id}
                    control={form.control}
                    name={`days.${day.id}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <FormLabel className="font-normal">{day.name}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-taplocal-purple/10 shadow-md">
            <CardHeader className="bg-gradient-to-r from-taplocal-purple/5 to-transparent">
              <CardTitle className="text-taplocal-purple flex items-center gap-2">
                <Clock className="h-5 w-5" /> Available Time Slots
              </CardTitle>
              <CardDescription>Select the time slots when you're available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {timeSlots.map((slot) => (
                  <FormField
                    key={slot.id}
                    control={form.control}
                    name={`slots.${slot.id}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <FormLabel className="font-normal">{slot.name}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Availability"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AvailabilityPage;
