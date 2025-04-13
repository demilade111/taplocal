
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Play, Pause, Video, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data for intro media
  const introMedia = {
    audio: "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3",
    video: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-urban-dance-moves-4184-large.mp4"
  };

  // Handle audio playback
  const toggleAudioPlayback = () => {
    const audioPlayer = document.getElementById('intro-audio') as HTMLAudioElement;
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative bg-gradient-hero dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="container-app">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-taplocal-dark dark:text-white hero-title mb-6">
            Find and book trusted local professionals — 
            <span className="text-taplocal-purple"> by voice or video</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 hero-subtitle mb-8 max-w-2xl mx-auto">
            Discover skilled local service providers and book with confidence.
            Hear their voice or watch their intro — feel the trust.
          </p>
          
          <div className="flex justify-center items-center mb-8">
            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2 border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white dark:border-taplocal-purple/70 dark:text-taplocal-purple/90 dark:hover:bg-taplocal-purple dark:hover:text-white"
                >
                  <Play size={18} />
                  <span>See how it works</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-4xl mx-auto dark:bg-gray-900 dark:border-gray-800">
                <DrawerHeader>
                  <DrawerTitle className="dark:text-white">Experience TapLocal</DrawerTitle>
                  <DrawerDescription className="dark:text-gray-300">
                    See how TapLocal connects you with trusted local professionals
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <Tabs defaultValue="audio" className="w-full">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 dark:bg-gray-800">
                      <TabsTrigger value="audio" className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                        <Volume2 className="mr-2 h-4 w-4" />
                        Audio Introduction
                      </TabsTrigger>
                      <TabsTrigger value="video" className="dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                        <Video className="mr-2 h-4 w-4" />
                        Video Introduction
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="audio" className="flex flex-col items-center">
                      <div className="w-full max-w-lg bg-gradient-to-r from-taplocal-pastelBlue to-taplocal-pastelPink dark:from-taplocal-purple/20 dark:to-taplocal-purple/40 p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white">Welcome to TapLocal Audio Experience</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-200">Listen to our introduction and learn how professional voices create trust</p>
                        <div className="flex justify-center items-center">
                          <audio id="intro-audio" src={introMedia.audio} className="hidden" />
                          <Button 
                            onClick={toggleAudioPlayback} 
                            className="bg-taplocal-purple hover:bg-taplocal-purple/90 text-white"
                          >
                            {isPlaying ? (
                              <><Pause className="mr-2 h-4 w-4" /> Pause Audio</>
                            ) : (
                              <><Play className="mr-2 h-4 w-4" /> Play Audio</>
                            )}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="video">
                      <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-taplocal-pastelBlue to-taplocal-pastelPink dark:from-taplocal-purple/20 dark:to-taplocal-purple/40 p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4 dark:text-white">TapLocal Video Introduction</h3>
                        <p className="mb-6 text-gray-600 dark:text-gray-200">Watch how professionals showcase their services</p>
                        <div className="rounded-lg overflow-hidden">
                          <video 
                            controls 
                            className="w-full aspect-video" 
                            poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
                          >
                            <source src={introMedia.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="flex">
              <Input 
                type="text" 
                placeholder="What service do you need?"
                className="rounded-l-full py-6 pl-5 pr-4 border-r-0 focus-visible:ring-taplocal-purple dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              />
              <Button 
                className="rounded-r-full px-6 bg-gradient-primary hover:opacity-90 text-white" 
                size="lg"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Button 
              size="lg" 
              className="rounded-full px-8 bg-gradient-primary hover:opacity-90 shadow-md w-full md:w-auto text-white"
              asChild
            >
              <Link to="/services">Browse Services</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 border-taplocal-purple text-taplocal-purple hover:bg-taplocal-purple hover:text-white dark:border-taplocal-purple/70 dark:text-taplocal-purple/90 dark:hover:bg-taplocal-purple dark:hover:text-white w-full md:w-auto"
              asChild
            >
              <Link to="/join">Join TapLocal</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 rounded-full bg-taplocal-teal opacity-10"></div>
      <div className="hidden md:block absolute bottom-10 right-20 w-32 h-32 rounded-full bg-taplocal-coral opacity-10"></div>
    </div>
  );
};

export default Hero;
