import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onFeed: () => void;
  onPlay: () => void;
  onHeal: () => void;
  onSleep: () => void;
  onTrain: () => void;
  onHome: () => void;
  isActive: boolean;
}

export const useKeyboardShortcuts = ({
  onFeed,
  onPlay,
  onHeal,
  onSleep,
  onTrain,
  onHome,
  isActive
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;

      // Don't interfere with browser shortcuts
      if (e.ctrlKey || e.metaKey) return;

      switch (e.key.toLowerCase()) {
        case 'f':
          e.preventDefault();
          onFeed();
          break;
        case 'p':
          e.preventDefault();
          onPlay();
          break;
        case 'h':
          e.preventDefault();
          onHeal();
          break;
        case 's':
          e.preventDefault();
          onSleep();
          break;
        case 't':
          e.preventDefault();
          onTrain();
          break;
        case 'escape':
          e.preventDefault();
          onHome();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFeed, onPlay, onHeal, onSleep, onTrain, onHome, isActive]);
};