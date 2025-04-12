
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Send } from "lucide-react";

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState<string | null>("1");
  
  // Mock data for contacts and messages
  const contacts = [
    {
      id: "1",
      name: "Jane Cooper",
      avatar: "/placeholder.svg",
      lastMessage: "Hi there! When are you coming for the cleaning service?",
      lastMessageTime: "2:30 PM",
      unread: 2
    },
    {
      id: "2",
      name: "Robert Fox",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for the service yesterday.",
      lastMessageTime: "Yesterday",
      unread: 0
    },
    {
      id: "3",
      name: "Leslie Alexander",
      avatar: "/placeholder.svg",
      lastMessage: "I'd like to reschedule my appointment.",
      lastMessageTime: "Apr 10",
      unread: 0
    }
  ];
  
  const messageHistory = {
    "1": [
      { id: 1, sender: "Jane Cooper", text: "Hi there! Is tomorrow's appointment still on?", time: "2:25 PM" },
      { id: 2, sender: "me", text: "Yes, I'll be there at 2 PM as scheduled.", time: "2:27 PM" },
      { id: 3, sender: "Jane Cooper", text: "Great! Do I need to prepare anything?", time: "2:28 PM" },
      { id: 4, sender: "Jane Cooper", text: "Hi there! When are you coming for the cleaning service?", time: "2:30 PM" }
    ],
    "2": [
      { id: 1, sender: "me", text: "How was the garden maintenance service?", time: "Yesterday, 3:15 PM" },
      { id: 2, sender: "Robert Fox", text: "It was excellent! Thank you so much.", time: "Yesterday, 4:20 PM" },
      { id: 3, sender: "me", text: "Great to hear! Please let me know if you need any follow-up service.", time: "Yesterday, 5:05 PM" },
      { id: 4, sender: "Robert Fox", text: "Thanks for the service yesterday.", time: "Yesterday, 6:30 PM" }
    ],
    "3": [
      { id: 1, sender: "Leslie Alexander", text: "Hello, I need to change my appointment time.", time: "Apr 10, 10:15 AM" },
      { id: 2, sender: "me", text: "Sure, what time would work better for you?", time: "Apr 10, 10:30 AM" },
      { id: 3, sender: "Leslie Alexander", text: "I'd like to reschedule my appointment.", time: "Apr 10, 11:45 AM" }
    ]
  };
  
  const selectedMessages = selectedContact ? messageHistory[selectedContact as keyof typeof messageHistory] : [];
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold font-heading text-taplocal-dark mb-2">Messages</h1>
      <p className="text-gray-600 mb-6">Chat with your clients</p>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden min-h-[calc(100vh-220px)]">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Contacts sidebar */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages"
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="h-[calc(600px-56px-65px)]">
                <TabsContent value="all" className="m-0">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedContact === contact.id ? "bg-taplocal-purple/5" : ""
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {contact.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-taplocal-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {contact.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                        </div>
                        <p className={`text-sm truncate ${contact.unread > 0 ? "font-medium text-taplocal-purple" : "text-gray-500"}`}>
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="unread" className="m-0">
                  {contacts.filter(c => c.unread > 0).map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-4 border-b cursor-pointer hover:bg-gray-50 ${
                        selectedContact === contact.id ? "bg-taplocal-purple/5" : ""
                      }`}
                      onClick={() => setSelectedContact(contact.id)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 bg-taplocal-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unread}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate">{contact.name}</h3>
                          <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                        </div>
                        <p className="text-sm truncate font-medium text-taplocal-purple">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))}
                  {contacts.filter(c => c.unread > 0).length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">No unread messages</p>
                    </div>
                  )}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={contacts.find(c => c.id === selectedContact)?.avatar}
                        alt={contacts.find(c => c.id === selectedContact)?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">
                      {contacts.find(c => c.id === selectedContact)?.name}
                    </h3>
                  </div>
                </div>
                
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.sender === "me" 
                            ? "bg-taplocal-purple text-white rounded-br-none" 
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}>
                          <p>{message.text}</p>
                          <div className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-white/70" : "text-gray-500"
                          }`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button size="icon" className="bg-taplocal-purple hover:bg-taplocal-purple/90">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1 text-taplocal-purple">Select a conversation</h3>
                  <p className="text-gray-500">Choose a contact to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
