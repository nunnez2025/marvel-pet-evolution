import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { particlePool } from '@/utils/particlePool';

interface LaserGameProps {
  onEnd: (score: number) => void;
  onUpdatePet?: (happiness: number, energy: number, xp: number) => void;
}

export const LaserGame = ({ onEnd, onUpdatePet }: LaserGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [difficulty, setDifficulty] = useState(1);
  const [laserPosition, setLaserPosition] = useState({ x: 0, y: 0 });
  const [laserVisible, setLaserVisible] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const timerRef = useRef<NodeJS.Timeout>();
  
  const spawnLaser = useCallback(() => {
    if (!gameAreaRef.current || timeLeft <= 0) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const maxX = rect.width - 32;
    const maxY = rect.height - 32;
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    setLaserPosition({ x, y });
    setLaserVisible(true);
    
    const timeout = Math.max(800, 2500 - (difficulty * 200));
    
    timeoutRef.current = setTimeout(() => {
      setLaserVisible(false);
      setTimeout(() => {
        if (timeLeft > 0) {
          if (score > 0 && score % 5 === 0) {
            setDifficulty(Math.min(5, Math.floor(score / 5) + 1));
          }
          spawnLaser();
        }
      }, 300);
    }, timeout);
  }, [timeLeft, difficulty, score]);

  const hitLaser = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!laserVisible) return;
    
    setScore(prev => prev + 1);
    setLaserVisible(false);
    
    // Create hit effect
    createHitEffect(laserPosition.x, laserPosition.y);
    
    // Update pet stats
    onUpdatePet?.(4, -2, 3);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setTimeout(() => {
      if (timeLeft > 0) spawnLaser();
    }, 200);
  }, [laserVisible, laserPosition, timeLeft, onUpdatePet, spawnLaser]);

  const createHitEffect = (x: number, y: number) => {
    if (!gameAreaRef.current) return;
    
    for (let i = 0; i < 3; i++) {
      const particle = particlePool.get();
      particle.textContent = '💥';
      particle.style.position = 'absolute';
      particle.style.fontSize = '20px';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--x', `${(Math.random() - 0.5) * 60}px`);
      particle.style.setProperty('--y', `${(Math.random() - 0.5) * 60}px`);
      particle.style.zIndex = '20';
      particle.className = 'particle animate-float';
      
      gameAreaRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        particlePool.release(particle);
      }, 2000);
    }
  };

  // Start game
  useEffect(() => {
    spawnLaser();
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [spawnLaser]);

  // End game when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      
      setTimeout(() => {
        let rating = 'Beginner';
        if (score >= 50) rating = 'Expert';
        else if (score >= 30) rating = 'Advanced';
        else if (score >= 15) rating = 'Intermediate';
        
        onEnd(score);
      }, 1000);
    }
  }, [timeLeft, score, onEnd]);

  return (
    <div className="min-h-screen gradient-marvel flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-white mb-6 animate-marvel-glow">
        🔴 Caçe o Laser! 🔴
      </h2>
      <p className="text-xl text-white mb-3">Clique no ponto vermelho!</p>
      <p className="text-2xl font-bold text-wolverine-yellow mb-8">
        Score: {score} | Time: {timeLeft}s | Difficulty: {difficulty}x
      </p>
      
      <div 
        ref={gameAreaRef}
        className="relative w-full max-w-2xl h-96 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-deadpool-red rounded-2xl overflow-hidden shadow-2xl"
      >
        {laserVisible && (
          <div
            className="absolute w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 rounded-full cursor-pointer animate-energy-pulse shadow-deadpool"
            style={{
              left: laserPosition.x,
              top: laserPosition.y,
              boxShadow: '0 0 40px #ff0000, 0 0 80px #ff0000, inset 0 2px 4px rgba(255, 255, 255, 0.3)'
            }}
            onClick={hitLaser}
          />
        )}
      </div>
      
      <Button 
        onClick={() => onEnd(score)} 
        className="mt-8 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      >
        Parar de Jogar
      </Button>
    </div>
  );
};