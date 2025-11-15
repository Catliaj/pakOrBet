import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, X, ChevronLeft, Sparkles } from 'lucide-react';
import { GenderPreference } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  gender: 'male' | 'female';
}

interface SwipeCardsProps {
  genderPreference: GenderPreference;
  onBack: () => void;
}

const MOCK_PROFILES: Profile[] = [
  { id: 1, name: 'Sarah', age: 25, bio: 'Love hiking and coffee ☕', imageUrl: 'https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzYzMDY2NjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'female' },
  { id: 2, name: 'Mike', age: 28, bio: 'Gym enthusiast & dog lover 🐕', imageUrl: 'https://images.unsplash.com/photo-1630603384987-0fb860dd518a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NjMxMjg5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'male' },
  { id: 3, name: 'Emma', age: 24, bio: 'Artist & world traveler ✈️', imageUrl: 'https://images.unsplash.com/photo-1759873821511-05c06ce184d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NjMxNDM1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'female' },
  { id: 4, name: 'Alex', age: 27, bio: 'Chef & foodie 🍕', imageUrl: 'https://images.unsplash.com/photo-1613419441661-6a5af1751d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzYzMTY5ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'male' },
  { id: 5, name: 'Olivia', age: 26, bio: 'Bookworm & cat mom 📚', imageUrl: 'https://images.unsplash.com/photo-1545311630-51ea4a4c84de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhcHB5JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzMDc2MTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'female' },
  { id: 6, name: 'James', age: 29, bio: 'Musician & coffee addict 🎸', imageUrl: 'https://images.unsplash.com/photo-1630603384987-0fb860dd518a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwOTE0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'male' },
  { id: 7, name: 'Sophia', age: 23, bio: 'Yoga instructor & nature lover 🌿', imageUrl: 'https://images.unsplash.com/photo-1722718827199-bb595ab51a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGxpZmVzdHlsZSUyMHBob3RvfGVufDF8fHx8MTc2MzE2OTgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'female' },
  { id: 8, name: 'Daniel', age: 30, bio: 'Developer & gamer 💻', imageUrl: 'https://images.unsplash.com/photo-1622429081783-afff14ae39c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBsaWZlc3R5bGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMxNjk4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', gender: 'male' },
];

export function SwipeCards({ genderPreference, onBack }: SwipeCardsProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [animation, setAnimation] = useState<'swipe-left' | 'swipe-right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Filter profiles based on gender preference
    let filtered = MOCK_PROFILES;
    if (genderPreference === 'male') {
      filtered = MOCK_PROFILES.filter(p => p.gender === 'male');
    } else if (genderPreference === 'female') {
      filtered = MOCK_PROFILES.filter(p => p.gender === 'female');
    }
    // Shuffle profiles
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setProfiles(shuffled);
  }, [genderPreference]);

  const handleSwipeLeft = () => {
    setAnimation('swipe-left');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setAnimation(null);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleSwipeRight = () => {
    setAnimation('swipe-right');
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setAnimation(null);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Determine if swipe threshold was met
    if (Math.abs(dragOffset.x) > 100) {
      if (dragOffset.x > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.current.x;
    const deltaY = e.touches[0].clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      if (dragOffset.x > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  if (profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="text-6xl">😊</div>
          <div>
            <h2 className="text-gray-900 mb-2">That's everyone!</h2>
            <p className="text-gray-600 mb-6">Check back later for new profiles</p>
          </div>
          <Button onClick={onBack} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];
  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <span className="text-gray-900">LoveSwipe</span>
        </div>
        <div className="w-20"></div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-4 pb-32">
        <div className="relative w-full max-w-sm h-[600px]">
          {/* Next card preview */}
          {currentIndex + 1 < profiles.length && (
            <Card className="absolute inset-0 shadow-xl">
              <div className="h-full rounded-lg overflow-hidden bg-gray-200"></div>
            </Card>
          )}

          {/* Current card */}
          <Card
            ref={cardRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing shadow-2xl select-none"
            style={{
              transform: animation 
                ? animation === 'swipe-left' 
                  ? 'translateX(-150%) rotate(-30deg)'
                  : 'translateX(150%) rotate(30deg)'
                : `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
              transition: animation || !isDragging ? 'transform 0.3s ease-out' : 'none',
              opacity: animation ? 0 : opacity,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="h-full rounded-lg overflow-hidden relative">
              <ImageWithFallback
                src={currentProfile.imageUrl}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Swipe indicators */}
              {dragOffset.x > 50 && (
                <div className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg transform rotate-12 border-4 border-white">
                  <Heart className="w-8 h-8" />
                </div>
              )}
              {dragOffset.x < -50 && (
                <div className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg transform -rotate-12 border-4 border-white">
                  <X className="w-8 h-8" />
                </div>
              )}

              {/* Profile info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-white mb-1">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <p className="text-white/90">{currentProfile.bio}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-6">
        <div className="max-w-sm mx-auto flex items-center justify-center gap-6">
          {/* Nope Button (Balloon/Pop) */}
          <Button
            onClick={handleSwipeLeft}
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              {/* Balloon icon */}
              <path d="M14.5 2c-1.5 0-2.7 1.3-3.5 3.3-.8-2-2-3.3-3.5-3.3C4.9 2 3 4.7 3 8.5c0 4.5 3 7 8 10.5 5-3.5 8-6 8-10.5C19 4.7 17.1 2 14.5 2z" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <path d="M8 23h8" />
              {/* X overlay */}
              <line x1="8" y1="6" x2="16" y2="14" strokeWidth="3" />
              <line x1="16" y1="6" x2="8" y2="14" strokeWidth="3" />
            </svg>
          </Button>

          {/* Like Button */}
          <Button
            onClick={handleSwipeRight}
            size="lg"
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <Heart className="w-10 h-10 text-white fill-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}