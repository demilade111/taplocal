
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface MediaPlayerProps {
  type: "audio" | "video";
  src: string;
  poster?: string;
}

const MediaPlayer = ({ type, src, poster }: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!mediaRef.current) return;
    
    if (isPlaying) {
      mediaRef.current.pause();
    } else {
      mediaRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!mediaRef.current) return;
    
    mediaRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!mediaRef.current) return;
    
    const newVolume = value[0];
    mediaRef.current.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
      mediaRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      mediaRef.current.muted = false;
    }
  };

  const handleTimeUpdate = () => {
    if (!mediaRef.current) return;
    setCurrentTime(mediaRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!mediaRef.current) return;
    setDuration(mediaRef.current.duration);
  };

  const handleSeek = (value: number[]) => {
    if (!mediaRef.current) return;
    mediaRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (!mediaRef.current) return;
    
    const media = mediaRef.current;
    
    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);
    media.addEventListener('ended', () => setIsPlaying(false));
    
    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
      media.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className={`w-full ${type === 'video' ? 'bg-black rounded-lg overflow-hidden' : 'bg-gradient-to-r from-taplocal-pastelBlue to-taplocal-pastelPink p-4 rounded-lg'}`}>
      {type === 'audio' ? (
        <>
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={src} />
          <div className="flex items-center mb-3">
            <Button 
              onClick={togglePlay} 
              size="sm" 
              variant="ghost" 
              className="text-taplocal-purple hover:bg-taplocal-purple/10 hover:text-taplocal-purple"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            <div className="ml-2">
              <span className="text-sm">{formatTime(currentTime)}</span>
              <span className="text-sm text-gray-500"> / {formatTime(duration)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={toggleMute} 
              size="sm" 
              variant="ghost" 
              className="text-taplocal-dark hover:bg-taplocal-purple/10"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </>
      ) : (
        <video 
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="w-full aspect-video"
          poster={poster}
          controls
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default MediaPlayer;
