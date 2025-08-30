import { useState, useEffect, useRef, useCallback } from 'react';
import { particlePool } from '@/utils/particlePool';

interface MiniGameProps {
  onEnd: (score: number) => void;
  onUpdatePet?: (hunger: number, happiness: number, xp: number) => void;
  character: 'deadpool' | 'wolverine';
}

interface FoodItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export const MiniGame = ({ onEnd, onUpdatePet, character }: MiniGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const spawnRef = useRef<NodeJS.Timeout>();
  
  const foodEmojis = ['🍔', '🍕', '🌮', '🍟', '🥓', '🍳', '🥪', '🌭', '🍗', '🥨'];

  const spawnFood = useCallback(() => {
    if (!gameContainerRef.current || timeLeft <= 0) return;
    
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    const randomX = Math.random() * (containerRect.width - 50);
    
    const newFood: FoodItem = {
      id: Date.now() + Math.random(),
      emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
      x: randomX,
      y: -50
    };
    
    setFoodItems(prev => [...prev, newFood]);
    
    // Remove food after falling
    setTimeout(() => {
      setFoodItems(prev => prev.filter(food => food.id !== newFood.id));
    }, 6000);
  }, [timeLeft]);

  const catchFood = useCallback((foodId: number, x: number, y: number) => {
    setScore(prev => prev + 1);
    setFoodItems(prev => prev.filter(food => food.id !== foodId));
    
    // Create catch effect
    createCatchEffect(x, y);
    
    // Update pet stats
    onUpdatePet?.(6, 4, 2);
  }, [onUpdatePet]);

  const createCatchEffect = (x: number, y: number) => {
    if (!gameContainerRef.current) return;
    
    for (let i = 0; i < 2; i++) {
      const particle = particlePool.get();
      particle.textContent = '✨';
      particle.style.position = 'absolute';
      particle.style.fontSize = '24px';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--x', `${(Math.random() - 0.5) * 40}px`);
      particle.style.setProperty('--y', `${(Math.random() - 0.5) * 40}px`);
      particle.style.zIndex = '15';
      particle.className = 'particle animate-float';
      
      gameContainerRef.current.appendChild(particle);
      
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
    // Spawn food items
    spawnRef.current = setInterval(() => {
      if (timeLeft > 0) {
        spawnFood();
      }
    }, 600);
    
    // Game timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [spawnFood, timeLeft]);

  // End game
  useEffect(() => {
    if (timeLeft === 0) {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      
      setTimeout(() => {
        let rating = 'Try Again';
        if (score >= 20) rating = 'Amazing!';
        else if (score >= 15) rating = 'Great!';
        else if (score >= 10) rating = 'Good!';
        else if (score >= 5) rating = 'Not Bad!';
        
        onEnd(score);
      }, 1000);
    }
  }, [timeLeft, score, onEnd]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-white mb-4 animate-marvel-glow">
        🍔 Food Rain! 🍔
      </h2>
      <p className="text-xl text-white mb-2">
        {character === 'deadpool' 
          ? "Food rain! This is like that scene from Cloudy with a Chance of Meatballs!" 
          : "Time to hunt, bub! Let's catch some grub!"}
      </p>
      <p className="text-2xl font-bold text-accent mb-4">
        Score: {score} | Time: {timeLeft}s
      </p>
      
      <div 
        ref={gameContainerRef}
        className="relative w-full max-w-2xl h-96 bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-4 border-accent rounded-2xl overflow-hidden"
      >
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="absolute text-4xl cursor-pointer hover:scale-110 transition-transform z-10 animate-fall"
            style={{
              left: food.x,
              top: food.y,
            }}
            onClick={() => catchFood(food.id, food.x, food.y)}
          >
            {food.emoji}
          </div>
        ))}
      </div>
    </div>
  );
};