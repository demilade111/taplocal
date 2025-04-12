
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock conversation data
const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    lastMessage: "Your appointment is confirmed for April 15th at 2:30 PM",
    time: "2h ago",
    unread: 2,
    online: true
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    lastMessage: "I'll be arriving at your home at 10 AM tomorrow",
    time: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    lastMessage: "Thanks for your review! Hope to see you again soon.",
    time: "2 days ago",
    unread: 0,
    online: true
  },
  {
    id: "4",
    name: "Lisa Wong",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    lastMessage: "Let me know if you need any help with the math problems!",
    time: "1 week ago",
    unread: 0,
    online: false
  }
];

// Mock messages for the selected conversation
const messageHistory = [
  {
    id: "m1",
    senderId: "user",
    text: "Hi Sarah, I'd like to book a haircut appointment.",
    time: "Apr 10, 10:30 AM"
  },
  {
    id: "m2",
    senderId: "1",
    text: "Hello! I'd be happy to help you with that. What day works best for you?",
    time: "Apr 10, 10:35 AM"
  },
  {
    id: "m3",
    senderId: "user",
    text: "I was thinking April 15th in the afternoon if you have availability?",
    time: "Apr 10, 10:40 AM"
  },
  {
    id: "m4",
    senderId: "1",
    text: "Let me check my schedule... Yes, I have an opening at 2:30 PM on April 15th. Would that work for you?",
    time: "Apr 10, 10:45 AM"
  },
  {
    id: "m5",
    senderId: "user",
    text: "That sounds perfect! I'll take that slot.",
    time: "Apr 10, 10:50 AM"
  },
  {
    id: "m6",
    senderId: "1",
    text: "Great! I've reserved that time for you. Your appointment is confirmed for April 15th at 2:30 PM. Looking forward to seeing you!",
    time: "Apr 10, 10:55 AM",
    isLastMessage: true
  }
];

const ClientMessages = () => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real app, you would send this message to your backend
    console.log("Sending message:", newMessage);
    
    // Clear the input
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(
    convo => convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-app max-w-6xl pb-20 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Chat with your service providers</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row h-[calc(100vh-200px)]">
          {/* Conversation List */}
          <div className="w-full md:w-1/3 border-r">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  placeholder="Search conversations" 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                  <TabsTrigger value="online" className="text-xs">Online</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-100px)]">
              {filteredConversations.length > 0 ? (
                filteredConversations
                  .filter(convo => {
                    if (activeTab === "unread") return convo.unread > 0;
                    if (activeTab === "online") return convo.online;
                    return true;
                  })
                  .map(convo => (
                    <div 
                      key={convo.id}
                      className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation.id === convo.id ? 'bg-taplocal-purple/5' : ''
                      }`}
                      onClick={() => setSelectedConversation(convo)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <img src={convo.avatar} alt={convo.name} />
                        </Avatar>
                        {convo.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-gray-900 truncate">{convo.name}</h3>
                          <span className="text-xs text-gray-500">{convo.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
                      </div>
                      {convo.unread > 0 && (
                        <Badge className="ml-2 bg-taplocal-purple">{convo.unread}</Badge>
                      )}
                    </div>
                  ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </div>
          
          {/* Conversation Detail */}
          <div className="w-full md:w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-taplocal-purple">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-taplocal-purple">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messageHistory.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.senderId !== 'user' && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <img src={selectedConversation.avatar} alt={selectedConversation.name} />
                        </Avatar>
                      )}
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === 'user' 
                            ? 'bg-taplocal-purple text-white' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p 
                          className={`text-xs mt-1 ${
                            message.senderId === 'user' ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSendMessage} className="p-3 border-t flex items-center">
                  <Button variant="ghost" size="icon" type="button">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="mx-2"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon" className="bg-taplocal-purple text-white hover:bg-taplocal-purple/90">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientMessages;
