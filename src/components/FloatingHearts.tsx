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
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-4xl animate-float"
          style={{
            left: `${45 + Math.random() * 10}%`,
            top: `${45 + Math.random() * 10}%`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '3.5s',
            animationFillMode: 'forwards'
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};