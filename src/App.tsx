import { useState } from 'react';
import { GenderSelection } from './components/GenderSelection';
import { SwipeInterface } from './components/SwipeInterface';

export type Gender = 'male' | 'female' | 'all';

export interface Profile {
  name: string;
  gender: 'male' | 'female';
  img: string;
  age: number;
  bio: string;
  interests: string[];
}

export default function App() {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

  const handleReset = () => {
    setSelectedGender(null);
  };

  return (
    <div className="min-h-screen">
      {!selectedGender ? (
        <GenderSelection onSelect={handleGenderSelect} />
      ) : (
        <SwipeInterface preference={selectedGender} onReset={handleReset} />
      )}
    </div>
  );
}