import { Gender } from '../App';
import { Heart, Users, User } from 'lucide-react';

interface GenderSelectionProps {
  onSelect: (gender: Gender) => void;
}

export function GenderSelection({ onSelect }: GenderSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#800020' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#d81b60', top: '-10%', right: '-10%', filter: 'blur(80px)' }}></div>
        <div className="absolute w-96 h-96 rounded-full opacity-10" style={{ background: '#A00028', bottom: '-10%', left: '-10%', filter: 'blur(80px)' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 animate-pulse" style={{ background: 'linear-gradient(135deg, #d81b60, #A00028)', boxShadow: '0 10px 40px rgba(216, 27, 96, 0.4)' }}>
            <Heart className="w-12 h-12 text-white fill-white" />
          </div>
          <h1 className="text-white text-6xl mb-4 tracking-tight" style={{ fontWeight: 'bold', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            Pak or Bet
          </h1>
          <p className="text-white/90 text-xl" style={{ fontWeight: '500' }}>Who will you choose?</p>
        </div>

        <div className="space-y-5 w-4/5 mx-auto max-w-sm">
          <button
            onClick={() => onSelect('female')}
            className="w-full text-white py-6 rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-4 relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, #d81b60, #f06292)',
              fontSize: '22px',
              fontWeight: 'bold',
              border: 'none',
              boxShadow: '0 8px 20px rgba(216, 27, 96, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
            <span className="text-4xl">👩</span>
            <span className="relative z-10">Girls Only</span>
          </button>

          <button
            onClick={() => onSelect('male')}
            className="w-full text-white py-6 rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-4 relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, #A00028, #d81b60)',
              fontSize: '22px',
              fontWeight: 'bold',
              border: 'none',
              boxShadow: '0 8px 20px rgba(160, 0, 40, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
            <span className="text-4xl">👨</span>
            <span className="relative z-10">Boys Only</span>
          </button>

          <button
            onClick={() => onSelect('all')}
            className="w-full text-white py-6 rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-4 relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, #7B001C, #A00028)',
              fontSize: '22px',
              fontWeight: 'bold',
              border: 'none',
              boxShadow: '0 8px 20px rgba(123, 0, 28, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
            <Users className="w-7 h-7" />
            <span className="relative z-10">Everyone</span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">Swipe left to pass, swipe right to match 💕</p>
        </div>
      </div>
    </div>
  );
}