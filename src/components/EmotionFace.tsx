import { useEffect, useState } from 'react';

interface EmotionFaceProps {
  mood: string;
  trigger?: boolean;
}

const MOOD_EMOJIS = {
  happy: '😄',
  sad: '😢',
  hungry: '🤤',
  sick: '😷',
  sleeping: '😴',
  normal: '😐',
  excited: '🤩',
  angry: '😠',
  love: '😍'
};

export const EmotionFace = ({ mood, trigger }: EmotionFaceProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState('😄');

  useEffect(() => {
    if (trigger) {
      const emoji = MOOD_EMOJIS[mood as keyof typeof MOOD_EMOJIS] || '😐';
      setCurrentEmoji(emoji);
      setIsActive(true);

      const timer = setTimeout(() => {
        setIsActive(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mood, trigger]);

  return (
    <div className={`emotion-face ${isActive ? 'active' : ''}`}>
      {currentEmoji}
    </div>
  );
};