import { useState, useRef, useEffect } from 'react';
import { Gender, Profile } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, X, ChevronLeft, User, MapPin, Briefcase } from 'lucide-react';
import image1 from './ui/image1.jpg';
import image2 from './ui/image2.jpg';
import image3 from './ui/image3.jpg';
import image4 from './ui/image4.jpg';
import image5 from './ui/image5.jpg';
import image6 from './ui/image6.jpg';
interface SwipeInterfaceProps {
  preference: Gender;
  onReset: () => void;
}

const PROFILES: Profile[] = [
  { 
    gender: 'female', 
    img: image1,
    bio: ' I am a reserved person and do not like socializing much. I am a little picky with food, so it is hard to include me in spontaneous meals. I can seem cold and not very friendly. I am of average height and graduated from a well-known university. I am caring and dependable to my close friends and family. I behave calmly and speak softly.',
    interests: ['Travel', 'Coffee', 'Photography']
  },
  { 
    gender: 'female', 
    img: image2,
    bio: 'I have gentle manners and speak kindly. I am close to my family and graduated from a good school. I am caring and reliable. I am of average height and do not stand out easily. I am usually quiet and seem to be in my own world. I am choosy with food, so sometimes it is hard to invite me. I am a little distant and not easy to approach.',
    interests: ['Fitness', 'Food', 'Music']
  },
  { 
    gender: 'male', 
    img: image4,
    bio: 'I am wealthy and own a motorcycle. I have a good job. I am responsible and I manage my time well for both work and personal matters. I am of average height, so I am not very noticeable. I am quiet and usually do not join group activities. <br> I am not very open-minded and not friendly.',
    interests: ['Gaming', 'Dogs', 'Movies']
  },
  { 
    gender: 'male', 
    img: image5,
    bio: ' I am not tall. I am quiet and reserved, and I rarely socialize. I am financially stable, own a car, and have a good job. I am practical and reliable at work. I know how to balance my time. However, I am not easy to approach and can be somewhat snobbish.',
    interests: ['Music', 'Art', 'Concerts']
  },
  { 
    gender: 'female', 
    img: image3,
    bio: 'I am short in height and picky with food. I am family-centered and studied in a respected school. I am caring and value people. I move gently. I am quiet, not easy to approach, and sometimes I may seem a little sassy.',
    interests: ['Books', 'Movies', 'Coffee']
  },
  { 
    gender: 'male', 
    img: image6,
    bio: 'I am quiet and often seem to live in my own world. I am not friendly and sometimes come across as cold in dealing with others. I am of average height and not easily noticed. I am wealthy, have a good job, and I am responsible and organized. I know how to manage my time between work and other matters. I also own a car.',
    interests: ['Cooking', 'Food', 'Wine']
  },
];

export function SwipeInterface({ preference, onReset }: SwipeInterfaceProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [poppingButton, setPoppingButton] = useState<'pak' | 'bet' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let filtered = PROFILES;
    if (preference === 'male') {
      filtered = PROFILES.filter(p => p.gender === 'male');
    } else if (preference === 'female') {
      filtered = PROFILES.filter(p => p.gender === 'female');
    }
    setProfiles(filtered);
    setCurrentIndex(0);
  }, [preference]);

  const handleSwipe = (direction: number) => {
    if (!cardRef.current) return;

    // Trigger pop animation
    setPoppingButton(direction > 0 ? 'bet' : 'pak');

    const card = cardRef.current;
    card.style.transition = 'transform 0.3s ease-out';
    card.style.transform = `translateX(${direction > 0 ? '500px' : '-500px'}) rotate(${direction > 0 ? '25deg' : '-25deg'})`;

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDragOffset({ x: 0, y: 0 });
      setPoppingButton(null);
      if (card) {
        card.style.transition = '';
        card.style.transform = '';
      }
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

    if (Math.abs(dragOffset.x) > 150) {
      handleSwipe(dragOffset.x > 0 ? 1 : -1);
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

    if (Math.abs(dragOffset.x) > 150) {
      handleSwipe(dragOffset.x > 0 ? 1 : -1);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#800020' }}>
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#d81b60', top: '-10%', right: '-10%', filter: 'blur(80px)' }}></div>
          <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#A00028', bottom: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
        </div>

        <div className="text-center space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 animate-bounce" style={{ background: 'linear-gradient(135deg, #d81b60, #A00028)', boxShadow: '0 10px 40px rgba(216, 27, 96, 0.4)' }}>
            <Heart className="w-16 h-16 text-white fill-white" />
          </div>
          <div className="text-white text-4xl mb-4" style={{ fontWeight: 'bold', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            That's Everyone!
          </div>
          <p className="text-white/80 text-xl px-4">You've seen all available profiles.<br/>Check back later for new matches! 💫</p>
          <button
            onClick={onReset}
            className="px-10 py-4 text-white rounded-2xl transition-all hover:scale-105 inline-flex items-center gap-3 mt-6 relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #d81b60, #f06292)', fontSize: '20px', fontWeight: 'bold', boxShadow: '0 8px 20px rgba(216, 27, 96, 0.4)' }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
            <ChevronLeft className="w-6 h-6" />
            <span>Start Over</span>
          </button>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];
  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 400;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: '#800020' }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#d81b60', top: '-10%', right: '-10%', filter: 'blur(80px)' }}></div>
        <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#A00028', bottom: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
      </div>

      {/* Header */}
      <div className="p-6 flex items-center justify-between relative z-10">
        <button
          onClick={onReset}
          className="px-5 py-3 text-white transition-all hover:scale-105 inline-flex items-center gap-2 rounded-xl hover:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'bold' }}>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'linear-gradient(135deg, #d81b60, #A00028)' }}>
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-white text-xl" style={{ fontWeight: 'bold' }}>Pak or Bet</span>
        </div>
        <div className="w-24"></div>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center p-4 pb-20 relative z-10">
        <div className="relative w-4/5 max-w-md aspect-[3/4] max-h-[65vh]">
          {/* Next card (background) */}
          {currentIndex + 1 < profiles.length && (
            <div className="absolute inset-0 bg-white rounded-3xl scale-95 opacity-50" style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)' }}></div>
          )}

          {/* Current card */}
          <div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{
              transform: isDragging 
                ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`
                : 'translate(0, 0) rotate(0)',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              opacity: opacity,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              border: '6px solid #A00028'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full">
              <div className="h-3/5 overflow-hidden relative">
                <ImageWithFallback
                  src={currentProfile.img}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              </div>
              
              {/* Swipe indicators - Enhanced */}
              {dragOffset.x > 50 && (
                <div className="absolute top-12 right-12 text-white px-8 py-5 rounded-3xl transform rotate-12 shadow-2xl flex items-center gap-3 animate-pulse" style={{ background: 'linear-gradient(135deg, #4ade80, #22c55e)', border: '5px solid white' }}>
                  <Heart className="w-10 h-10 fill-white" />
                  <span className="text-3xl" style={{ fontWeight: 'bold' }}>BET!</span>
                </div>
              )}
              {dragOffset.x < -50 && (
                <div className="absolute top-12 left-12 text-white px-8 py-5 rounded-3xl transform -rotate-12 shadow-2xl flex items-center gap-3 animate-pulse" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: '5px solid white' }}>
                  <X className="w-10 h-10" strokeWidth={4} />
                  <span className="text-3xl" style={{ fontWeight: 'bold' }}>PAK!</span>
                </div>
              )}

              {/* Profile info - Enhanced */}
              <div className="p-5 bg-gradient-to-b from-white to-gray-50">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-gray-900 text-2xl" style={{ fontWeight: 'bold' }}>{currentProfile.name}</h3>
                  <span className="text-gray-600 text-xl">{currentProfile.age}</span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3 line-clamp-3 leading-relaxed">{currentProfile.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentProfile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                      style={{ fontWeight: '600' }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-gray-600 text-xs">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span style={{ fontWeight: '600' }}>{currentProfile.gender === 'male' ? 'Male' : 'Female'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span style={{ fontWeight: '600' }}>2 km away</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons - Enhanced Balloon Style */}
      <div className="fixed bottom-0 left-0 right-0 p-6 relative z-20">
        <div className="w-4/5 max-w-md mx-auto flex items-center justify-between">
          {/* PAK Button (Pass) - Balloon */}
          <button
            onClick={() => handleSwipe(-1)}
            className="relative transition-all hover:scale-110 group"
            aria-label="Pak (Pass)"
            style={{
              animation: poppingButton === 'pak' ? 'balloonPop 0.3s ease-out forwards' : 'none'
            }}
          >
            {/* Balloon */}
            <div className="w-28 h-28 rounded-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', boxShadow: '0 15px 50px rgba(239, 68, 68, 0.6), inset 0 -8px 16px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.3)' }}>
              <X className="w-12 h-12 text-white mb-1" strokeWidth={3} />
              <span className="text-white text-sm" style={{ fontWeight: 'bold' }}>PAK</span>
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all"></div>
            </div>
            {/* Balloon String */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-red-500/60 to-transparent"
              style={{
                animation: poppingButton === 'pak' ? 'balloonPop 0.3s ease-out forwards' : 'none'
              }}
            ></div>
            {/* Knot at bottom */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500/40" 
              style={{ 
                top: 'calc(100% + 28px)',
                animation: poppingButton === 'pak' ? 'balloonPop 0.3s ease-out forwards' : 'none'
              }}
            ></div>

            {/* Pop particles */}
            {poppingButton === 'pak' && (
              <>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-red-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-red-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-red-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
              </>
            )}
          </button>

          {/* BET Button (Like) - Balloon */}
          <button
            onClick={() => handleSwipe(1)}
            className="relative transition-all hover:scale-110 group"
            aria-label="Bet (Like)"
            style={{
              animation: poppingButton === 'bet' ? 'balloonPop 0.3s ease-out forwards' : 'none'
            }}
          >
            {/* Balloon */}
            <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #4ade80, #22c55e)', border: 'none', boxShadow: '0 15px 50px rgba(74, 222, 128, 0.6), inset 0 -8px 16px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.3)' }}>
              <Heart className="w-14 h-14 text-white fill-white mb-1" />
              <span className="text-white text-sm" style={{ fontWeight: 'bold' }}>BET</span>
              <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all"></div>
            </div>
            {/* Balloon String */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-green-500/60 to-transparent"
              style={{
                animation: poppingButton === 'bet' ? 'balloonPop 0.3s ease-out forwards' : 'none'
              }}
            ></div>
            {/* Knot at bottom */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-500/40" 
              style={{ 
                top: 'calc(100% + 28px)',
                animation: poppingButton === 'bet' ? 'balloonPop 0.3s ease-out forwards' : 'none'
              }}
            ></div>

            {/* Pop particles */}
            {poppingButton === 'bet' && (
              <>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-green-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-green-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-green-300 rounded-full" style={{ animation: 'balloonPop 0.4s ease-out forwards' }}></div>
              </>
            )}
          </button>
        </div>

        {/* Hint text */}
        <div className="text-center mt-12">
          <p className="text-white/70 text-sm">Swipe or tap to decide 👆</p>
        </div>
      </div>
    </div>
  );
}