
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoicePlayerProps {
  audioUrl: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const VoicePlayer = ({ audioUrl, size = "md", className }: VoicePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      cancelAnimationFrame(animationRef.current as number);
    });

    return () => {
      audio.pause();
      audio.src = "";
      audio.remove();
      cancelAnimationFrame(animationRef.current as number);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audio.pause();
      cancelAnimationFrame(animationRef.current as number);
    }
    setIsPlaying(!isPlaying);
  };

  const whilePlaying = () => {
    if (audioRef.current && progressBarRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Size classes mapping
  const sizeClasses = {
    sm: {
      button: "h-8 w-8",
      container: "h-8",
      text: "text-xs",
    },
    md: {
      button: "h-10 w-10",
      container: "h-10",
      text: "text-sm",
    },
    lg: {
      button: "h-12 w-12",
      container: "h-12",
      text: "text-base",
    },
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const isPulsing = isPlaying;

  return (
    <div 
      className={cn(
        "flex items-center space-x-3 bg-white rounded-full shadow-sm border px-2", 
        sizeClasses[size].container,
        className
      )}
    >
      <button 
        onClick={togglePlayPause}
        className={cn(
          "flex items-center justify-center rounded-full bg-taplocal-purple text-white",
          sizeClasses[size].button,
          { "animate-pulse-slow": isPulsing }
        )}
        aria-label={isPlaying ? "Pause voice" : "Play voice"} 
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      
      <div className="flex-1 h-full flex items-center">
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-taplocal-teal rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className={cn("text-gray-500 min-w-[40px]", sizeClasses[size].text)}>
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default VoicePlayer;
