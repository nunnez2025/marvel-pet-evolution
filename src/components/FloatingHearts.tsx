import { useEffect, useState } from 'react';

interface FloatingHeartsProps {
  isActive: boolean;
  onAnimationComplete?: () => void;
}

export const FloatingHearts = ({ isActive, onAnimationComplete }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<Array<{ id: number; emoji: string; delay: number }>>([]);

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      return;
    }

    const heartEmojis = ['💖', '💕', '💗'];
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      delay: i * 150
    }));

    setHearts(newHearts);

    // Clean up after animation
    const cleanup = setTimeout(() => {
      setHearts([]);
      onAnimationComplete?.();
    }, 3500);

    return () => clearTimeout(cleanup);
  }, [isActive, onAnimationComplete]);

  if (hearts.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {hearts.map((heart, index) => {
        // Position hearts around the pet in a circle pattern, avoiding the center
        const angle = (index * 120) + Math.random() * 60; // Spread hearts around
        const radius = 40 + Math.random() * 15; // Distance from center
        const x = 50 + radius * Math.cos(angle * Math.PI / 180);
        const y = 50 + radius * Math.sin(angle * Math.PI / 180);
        
        return (
          <div
            key={heart.id}
            className="absolute text-3xl animate-float"
            style={{
              left: `${Math.max(5, Math.min(95, x))}%`,
              top: `${Math.max(5, Math.min(95, y))}%`,
              animationDelay: `${heart.delay}ms`,
              animationDuration: '3.5s',
              animationFillMode: 'forwards'
            }}
          >
            {heart.emoji}
          </div>
        );
      })}
    </div>
  );
};