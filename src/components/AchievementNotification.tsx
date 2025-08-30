import { useEffect, useState } from 'react';

interface AchievementNotificationProps {
  achievement: {
    title: string;
    icon: string;
  } | null;
  onHide: () => void;
}

export const AchievementNotification = ({ achievement, onHide }: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onHide, 600); // Wait for animation to complete
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onHide]);

  if (!achievement) return null;

  return (
    <div 
      className={`fixed top-6 z-50 transition-all duration-600 ease-out ${
        isVisible ? 'right-6' : 'right-[-450px]'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-7 py-5 rounded-2xl font-bold shadow-2xl flex items-center gap-4 border-2 border-yellow-300/30 backdrop-blur-sm animate-marvel-glow">
        <span className="text-3xl animate-hero-bounce">{achievement.icon}</span>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide opacity-80">
            Achievement Unlocked!
          </div>
          <div className="text-lg font-bold">
            {achievement.title}
          </div>
        </div>
      </div>
    </div>
  );
};