import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface PetState {
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
  age: number; // in minutes
  level: number;
  xp: number;
  xpToNext: number;
  evolutionStage: number;
  totalClicks: number;
  achievements: string[];
  mood: 'happy' | 'sad' | 'hungry' | 'sick' | 'sleeping' | 'normal';
  isAlive: boolean;
}

const INITIAL_STATE: PetState = {
  hunger: 80,
  happiness: 90,
  energy: 100,
  health: 100,
  age: 0,
  level: 1,
  xp: 0,
  xpToNext: 100,
  evolutionStage: 0,
  totalClicks: 0,
  achievements: [],
  mood: 'normal',
  isAlive: true
};

const EVOLUTION_TIMES = [2, 8, 20, 50, 100, 200, 300, Infinity]; // minutes to next stage

export const usePetGame = (character: 'deadpool' | 'wolverine') => {
  const [petState, setPetState] = useState<PetState>(INITIAL_STATE);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Calculate evolution progress
  const getEvolutionProgress = useCallback(() => {
    const currentStageTime = EVOLUTION_TIMES[petState.evolutionStage];
    const previousStageTime = petState.evolutionStage > 0 ? EVOLUTION_TIMES[petState.evolutionStage - 1] : 0;
    
    if (currentStageTime === Infinity) return 100;
    
    const timeInStage = petState.age - previousStageTime;
    const stageLength = currentStageTime - previousStageTime;
    
    return Math.min(100, (timeInStage / stageLength) * 100);
  }, [petState.age, petState.evolutionStage]);

  // Update mood based on stats
  const updateMood = useCallback((state: PetState): string => {
    if (state.health <= 30) return 'sick';
    if (state.energy <= 20) return 'sleeping';
    if (state.hunger <= 30) return 'hungry';
    if (state.happiness >= 80) return 'happy';
    if (state.happiness <= 30) return 'sad';
    return 'normal';
  }, []);

  // Check for achievements
  const checkAchievements = useCallback((state: PetState) => {
    const newAchievements: string[] = [];
    
    if (state.totalClicks >= 10 && !state.achievements.includes('Primeiro Clique')) {
      newAchievements.push('Primeiro Clique');
    }
    
    if (state.totalClicks >= 100 && !state.achievements.includes('Clicador Dedicado')) {
      newAchievements.push('Clicador Dedicado');
    }
    
    if (state.level >= 5 && !state.achievements.includes('Evoluindo')) {
      newAchievements.push('Evoluindo');
    }
    
    if (state.evolutionStage >= 3 && !state.achievements.includes('Adulto')) {
      newAchievements.push('Adulto');
    }
    
    if (state.age >= 60 && !state.achievements.includes('Uma Hora de Vida')) {
      newAchievements.push('Uma Hora de Vida');
    }

    return newAchievements;
  }, []);

  // Add XP and handle leveling
  const addXP = useCallback((amount: number) => {
    setPetState(prev => {
      let newXP = prev.xp + amount;
      let newLevel = prev.level;
      let newXPToNext = prev.xpToNext;
      
      while (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel++;
        newXPToNext = newLevel * 100;
        
        toast.success(`Level Up! Agora nível ${newLevel}`, {
          duration: 3000,
        });
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        xpToNext: newXPToNext
      };
    });
  }, []);

  // Game actions
  const feedPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 25),
      happiness: Math.min(100, prev.happiness + 5),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(10);
    toast.success('Pet alimentado! 🍔');
  }, [petState.isAlive, addXP]);

  const playWithPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 10),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(15);
    toast.success('Pet está se divertindo! 🎮');
  }, [petState.isAlive, addXP]);

  const healPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 30),
      happiness: Math.min(100, prev.happiness + 10),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(20);
    toast.success('Pet curado! 💊');
  }, [petState.isAlive, addXP]);

  const putPetToSleep = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 30),
      happiness: Math.min(100, prev.happiness + 5),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(8);
    toast.success('Pet está descansando! 😴');
  }, [petState.isAlive, addXP]);

  const trainPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      energy: Math.max(0, prev.energy - 15),
      happiness: Math.min(100, prev.happiness + 10),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(25);
    toast.success('Pet está treinando! 💪');
  }, [petState.isAlive, addXP]);

  const clickPet = useCallback(() => {
    if (!petState.isAlive) return;
    
    setPetState(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 2),
      totalClicks: prev.totalClicks + 1
    }));
    
    addXP(1);
  }, [petState.isAlive, addXP]);

  // Main game loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const deltaTime = (now - lastUpdate) / (1000 * 60); // Convert to minutes
      
      setPetState(prev => {
        if (!prev.isAlive) return prev;
        
        let newState = {
          ...prev,
          age: prev.age + deltaTime,
          hunger: Math.max(0, prev.hunger - deltaTime * 2),
          happiness: Math.max(0, prev.happiness - deltaTime * 1),
          energy: Math.max(0, prev.energy - deltaTime * 1.5),
        };
        
        // Health decreases if other stats are low
        if (newState.hunger <= 20 || newState.happiness <= 20) {
          newState.health = Math.max(0, newState.health - deltaTime * 2);
        }
        
        // Check evolution
        const currentStageTime = EVOLUTION_TIMES[newState.evolutionStage];
        if (newState.age >= currentStageTime && newState.evolutionStage < EVOLUTION_TIMES.length - 1) {
          newState.evolutionStage++;
          toast.success(`Evolução! Seu pet agora é ${['Bebê', 'Criança', 'Adolescente', 'Adulto', 'Veterano', 'Lendário', 'Mítico', 'Eterno'][newState.evolutionStage]}!`, {
            duration: 5000,
          });
        }
        
        // Check if pet dies
        if (newState.health <= 0) {
          newState.isAlive = false;
          toast.error('Seu pet morreu... 💔', {
            duration: 10000,
          });
        }
        
        // Update mood
        newState.mood = updateMood(newState) as any;
        
        // Check achievements
        const newAchievements = checkAchievements(newState);
        if (newAchievements.length > 0) {
          newState.achievements = [...newState.achievements, ...newAchievements];
          newAchievements.forEach(achievement => {
            toast.success(`Conquista desbloqueada: ${achievement}! 🏆`, {
              duration: 4000,
            });
          });
        }
        
        return newState;
      });
      
      setLastUpdate(now);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [lastUpdate, updateMood, checkAchievements]);

  return {
    petState,
    actions: {
      feedPet,
      playWithPet,
      healPet,
      putPetToSleep,
      trainPet,
      clickPet
    },
    utils: {
      getEvolutionProgress,
      resetPet: () => setPetState(INITIAL_STATE)
    }
  };
};