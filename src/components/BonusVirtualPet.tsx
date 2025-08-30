import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PetState {
  nome: string;
  idade: number;
  fome: number;
  felicidade: number;
  energia: number;
  saude: number;
  estaVivo: boolean;
  estagio: string;
  solidao: number;
  totalCliques: number;
  recordeLaser: number;
  corAtual: string;
}

const INITIAL_PET_STATE: PetState = {
  nome: 'Meu Pet',
  idade: 0,
  fome: 80,
  felicidade: 90,
  energia: 100,
  saude: 100,
  estaVivo: true,
  estagio: 'bebê',
  solidao: 0,
  totalCliques: 0,
  recordeLaser: 0,
  corAtual: 'original'
};

interface BonusVirtualPetProps {
  onBack: () => void;
}

export const BonusVirtualPet = ({ onBack }: BonusVirtualPetProps) => {
  const [petState, setPetState] = useState<PetState>(INITIAL_PET_STATE);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'laser-game'>('home');
  const [currentMessage, setCurrentMessage] = useState('🌱 Olá... acabei de acordar... estou feliz que você está aqui! 💖');
  const [laserGame, setLaserGame] = useState({ active: false, score: 0, timeLeft: 30 });
  const [laserPosition, setLaserPosition] = useState({ x: 50, y: 50 });
  const [showEmotion, setShowEmotion] = useState('');
  const lastUpdateRef = useRef(Date.now());
  const laserTimerRef = useRef<NodeJS.Timeout>();
  const laserSpawnRef = useRef<NodeJS.Timeout>();

  const falas = {
    nascimento: [
      "🌱 Olá... acabei de acordar... estou feliz que você está aqui! 💖",
      "Sou pequeno e frágil... prometa cuidar de mim?",
      "Não sei nada sobre o mundo... mas sei que você é especial!"
    ],
    feliz: [
      "Sinto-me tão feliz quando você está aqui! 💖",
      "Obrigado por brincar comigo, você sempre me faz sorrir!",
      "Com você, me sinto seguro e amado!"
    ],
    faminto: [
      "Estou ficando com fome... 🥺 pode me dar algo gostoso?",
      "Minha barriga está roncando... preciso de comida!",
      "Comida! Comida! Por favor! 🍎"
    ],
    triste: [
      "Estava tão sozinho... senti sua falta 😢",
      "Por que ficou ausente por tanto tempo?",
      "O silêncio me deixa triste... queria você aqui!"
    ],
    doente: [
      "Não me sinto bem... pode me ajudar? 🤒",
      "Estou fraco... preciso de cuidados médicos",
      "Minha energia está acabando... estou muito doente..."
    ],
    cansado: [
      "Estou tão cansado... preciso descansar 😴",
      "Minha energia está baixa... hora de soneca",
      "Bocejo... preciso de um sono..."
    ],
    amor: [
      "Você é meu melhor amigo! Nunca quero te perder! 💕",
      "Amo estar com você tanto...",
      "Você faz meu coração digital brilhar! ✨"
    ]
  };

  const escolherFala = (categoria: keyof typeof falas) => {
    const mensagens = falas[categoria];
    return mensagens[Math.floor(Math.random() * mensagens.length)];
  };

  const falar = (mensagem: string) => {
    setCurrentMessage(mensagem);
  };

  const mostrarEmocao = (emocao: string) => {
    setShowEmotion(emocao);
    setTimeout(() => setShowEmotion(''), 2000);
  };

  const criarParticulas = (emoji: string, quantidade: number) => {
    // Simplified particle system for React
    mostrarEmocao(emoji);
  };

  // Pet actions
  const alimentarPet = () => {
    if (!petState.estaVivo) return;
    setPetState(prev => ({
      ...prev,
      fome: Math.min(100, prev.fome + 30),
      felicidade: Math.min(100, prev.felicidade + 10),
      saude: Math.min(100, prev.saude + 5)
    }));
    falar("Que delícia! Obrigado! 😋");
    criarParticulas('🍔', 3);
  };

  const brincarComPet = () => {
    if (!petState.estaVivo) return;
    if (petState.energia < 20) {
      falar("Estou cansado para brincar... 😴");
      return;
    }
    setPetState(prev => ({
      ...prev,
      felicidade: Math.min(100, prev.felicidade + 25),
      energia: Math.max(0, prev.energia - 15)
    }));
    falar("Que divertido! Adoro brincar! 😄");
    criarParticulas('💖', 5);
  };

  const curarPet = () => {
    if (!petState.estaVivo) return;
    setPetState(prev => ({
      ...prev,
      saude: Math.min(100, prev.saude + 35)
    }));
    falar("Estou me sentindo melhor! 💊");
    criarParticulas('✨', 4);
  };

  const petDormir = () => {
    if (!petState.estaVivo) return;
    setPetState(prev => ({
      ...prev,
      energia: Math.min(100, prev.energia + 50),
      saude: Math.min(100, prev.saude + 10)
    }));
    falar("Que soneca deliciosa! 😴");
    criarParticulas('💤', 3);
  };

  const cliquePet = () => {
    if (!petState.estaVivo) return;
    setPetState(prev => ({
      ...prev,
      totalCliques: prev.totalCliques + 1,
      felicidade: Math.min(100, prev.felicidade + 2),
      solidao: Math.max(0, prev.solidao - 1)
    }));
    criarParticulas('💖', 1);
  };

  const novoPet = () => {
    setPetState(INITIAL_PET_STATE);
    lastUpdateRef.current = Date.now();
    falar(escolherFala('nascimento'));
  };

  // Laser game
  const iniciarJogoLaser = () => {
    setCurrentScreen('laser-game');
    setLaserGame({ active: true, score: 0, timeLeft: 30 });
    falar("Onde está o ponto vermelho? Vou pegar! 🔴");
    
    // Start laser spawning
    const spawnLaser = () => {
      setLaserPosition({
        x: Math.random() * 85 + 5, // Keep within bounds
        y: Math.random() * 85 + 5
      });
      
      laserSpawnRef.current = setTimeout(spawnLaser, 1500);
    };
    
    // Start timer
    const startTimer = () => {
      laserTimerRef.current = setInterval(() => {
        setLaserGame(prev => {
          if (prev.timeLeft <= 1) {
            encerrarJogoLaser();
            return prev;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    };
    
    spawnLaser();
    startTimer();
  };

  const encerrarJogoLaser = () => {
    // Clear intervals
    if (laserTimerRef.current) {
      clearInterval(laserTimerRef.current);
      laserTimerRef.current = undefined;
    }
    if (laserSpawnRef.current) {
      clearTimeout(laserSpawnRef.current);
      laserSpawnRef.current = undefined;
    }
    
    const ganhoFelicidade = Math.min(30, Math.floor(laserGame.score / 10));
    const perdaEnergia = Math.min(40, Math.floor(laserGame.score / 5));
    
    setPetState(prev => ({
      ...prev,
      felicidade: Math.min(100, prev.felicidade + ganhoFelicidade),
      energia: Math.max(0, prev.energia - perdaEnergia),
      recordeLaser: Math.max(prev.recordeLaser, laserGame.score)
    }));
    
    falar(`Que divertido! Minha pontuação foi ${laserGame.score}! 🏆`);
    setLaserGame({ active: false, score: 0, timeLeft: 30 });
    setCurrentScreen('home');
  };

  const pegarLaser = () => {
    setLaserGame(prev => ({ ...prev, score: prev.score + 10 }));
    mostrarEmocao('🎯');
    
    // Move laser immediately after hit
    setLaserPosition({
      x: Math.random() * 85 + 5,
      y: Math.random() * 85 + 5
    });
    
    if ((laserGame.score + 10) % 50 === 0) {
      falar(`Consegui! Minha pontuação é ${laserGame.score + 10}! 🎯`);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (laserTimerRef.current) {
        clearInterval(laserTimerRef.current);
      }
      if (laserSpawnRef.current) {
        clearTimeout(laserSpawnRef.current);
      }
    };
  }, []);

  // Life cycle
  useEffect(() => {
    const interval = setInterval(() => {
      if (!petState.estaVivo) return;
      
      const agora = Date.now();
      const tempoDiff = agora - lastUpdateRef.current;
      const minutos = tempoDiff / (1000 * 60);
      
      setPetState(prev => {
        const newState = { ...prev };
        
        newState.fome = Math.max(0, newState.fome - (minutos * 2));
        newState.energia = Math.max(0, newState.energia - (minutos * 1.5));
        newState.felicidade = Math.max(0, newState.felicidade - (minutos * 1));
        newState.solidao += minutos * 0.5;
        
        if (newState.fome < 20 || newState.felicidade < 20) {
          newState.saude = Math.max(0, newState.saude - (minutos * 3));
        }
        
        newState.idade += minutos / 60;
        
        // Update stage
        const estagioAnterior = newState.estagio;
        if (newState.idade < 2) newState.estagio = 'bebê';
        else if (newState.idade < 8) newState.estagio = 'criança';
        else if (newState.idade < 20) newState.estagio = 'adulto';
        else newState.estagio = 'idoso';
        
        // Death conditions
        if (newState.saude <= 0 || (newState.fome <= 0 && newState.saude < 20)) {
          newState.estaVivo = false;
        }
        
        return newState;
      });
      
      lastUpdateRef.current = agora;
    }, 5000);

    return () => clearInterval(interval);
  }, [petState.estaVivo]);

  // Get pet status
  const getPetStatus = () => {
    if (petState.saude < 30) return { emotion: '🤒', status: 'Doente', class: 'sick' };
    if (petState.fome < 20) return { emotion: '🤤', status: 'Faminto', class: '' };
    if (petState.felicidade < 30) return { emotion: '😢', status: 'Triste', class: '' };
    if (petState.energia < 20) return { emotion: '😴', status: 'Cansado', class: 'tired' };
    return { emotion: '😄', status: 'Feliz', class: '' };
  };

  const petStatus = getPetStatus();

  const getProgressClass = (value: number) => {
    return value < 30 ? 'bg-red-500 animate-pulse' : 'bg-blue-500';
  };

  if (!petState.estaVivo) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">😇</div>
          <h2 className="text-white text-2xl mb-4 font-bold">Adeus...</h2>
          <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-4 max-w-md text-center mb-6 text-gray-800">
            Obrigado por cuidar de mim... Eu sempre vou me lembrar de você... 💫
          </div>
          <div className="space-x-4">
            <Button onClick={novoPet} className="bg-blue-500 hover:bg-blue-600">
              Novo Pet
            </Button>
            <Button onClick={onBack} variant="outline">
              Voltar ao Marvel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'laser-game') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl mb-4 animate-pulse">🔴 Pegue o Laser! 🔴</h2>
        <p className="mb-2">Clique no ponto vermelho para deixar seu pet feliz!</p>
        <p className="text-lg mb-2 font-bold text-green-400">
          Pontuação: {laserGame.score} | Tempo: {laserGame.timeLeft}s
        </p>
        <div className="relative w-full max-w-2xl h-96 bg-gray-900 border-2 border-red-500 rounded-lg overflow-hidden">
          <div 
            className="absolute w-6 h-6 bg-red-500 rounded-full cursor-pointer shadow-lg transition-all duration-200 hover:scale-110"
            style={{
              left: `${laserPosition.x}%`,
              top: `${laserPosition.y}%`,
              boxShadow: '0 0 20px #ef4444, 0 0 40px #ef4444',
              animation: 'pulse 1s infinite alternate'
            }}
            onClick={pegarLaser}
          />
          
          {/* Hit effect area */}
          <div className="absolute inset-0 pointer-events-none">
            {showEmotion === '🎯' && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
                🎯💥
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Button 
            onClick={encerrarJogoLaser}
            className="bg-red-600 hover:bg-red-700"
          >
            ⏹️ Parar de Jogar
          </Button>
          <div className="text-sm text-gray-400 self-center">
            🎯 Clique rápido no ponto vermelho!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-700">
        <Button onClick={onBack} variant="outline" size="sm" className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700">
          ← Voltar ao Marvel
        </Button>
        <h2 className="text-lg font-bold text-center flex-1">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse text-2xl font-extrabold tracking-wider">
            ✨ Shaula ✨
          </span>
        </h2>
        <div className="w-20"></div> {/* Spacer for symmetry */}
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Pet Display */}
        <div className="relative">
          <div className="w-full aspect-square rounded-full overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-700 to-gray-800 ring-4 ring-purple-500/50">
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgju3nFnl_Xb8LHGVy5I-Srg2QXNufW76mVYzFPnlP_l_R0lOXvY1kSBGqTBG7Vo3RbmPd27lDDYSOlE0tUxMdoPYLS6bbZhbD_V13ABD37YtLUEZ8OglXgvyXbyy22drBmnAwkvpzIkjSXirxHExoOQH8N6tIYSRxu-PoWsrYigaC8jFZIHjj7kXSHMAFC/s1600/IMG_5793.jpeg"
              alt="Pet" 
              className={`w-full h-full object-cover cursor-pointer transition-all duration-300 hover:scale-105 ${petStatus.class}`}
              onClick={cliquePet}
            />
            {showEmotion && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce pointer-events-none z-10">
                {showEmotion}
              </div>
            )}
          </div>
        </div>

        {/* Status Bars */}
        <div className="space-y-3 bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700">
          {[
            { label: '🍔 Fome', value: petState.fome, key: 'fome', color: 'from-orange-400 to-red-500' },
            { label: '😊 Felicidade', value: petState.felicidade, key: 'felicidade', color: 'from-pink-400 to-purple-500' },
            { label: '⚡ Energia', value: petState.energia, key: 'energia', color: 'from-yellow-400 to-orange-500' },
            { label: '❤️ Saúde', value: petState.saude, key: 'saude', color: 'from-green-400 to-emerald-500' }
          ].map(({ label, value, key, color }) => (
            <div key={key}>
              <p className="text-sm mb-2 text-gray-300 flex justify-between font-medium">
                <span>{label}</span>
                <span className="font-bold text-white">{value}%</span>
              </p>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full transition-all duration-500 bg-gradient-to-r ${color} ${value < 30 ? 'animate-pulse' : ''}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pet Speech */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-purple-500/50 rounded-3xl p-5 relative shadow-xl">
          <p className="text-gray-100 font-medium text-center">{currentMessage}</p>
          <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-purple-500/50" />
        </div>

        {/* Status Text */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-gray-600">
            <span className="text-2xl">{petStatus.emotion}</span>
            <span className="text-lg font-bold text-gray-100">{petStatus.status}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={alimentarPet} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
            🍔 Alimentar
          </Button>
          <Button onClick={brincarComPet} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
            🎮 Brincar
          </Button>
          <Button onClick={curarPet} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300">
            💊 Curar
          </Button>
          <Button onClick={petDormir} className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            😴 Dormir
          </Button>
        </div>

        <Button 
          onClick={iniciarJogoLaser} 
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-3"
        >
          🔴 Jogo Laser
        </Button>

        {/* Stats Display */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700">
          <h3 className="text-lg font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">📊 Estatísticas</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="font-bold text-blue-400">{Math.floor(petState.idade)}h</div>
              <div className="text-gray-300">Idade</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="font-bold text-purple-400 capitalize">{petState.estagio}</div>
              <div className="text-gray-300">Estágio</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="font-bold text-green-400">{petState.totalCliques}</div>
              <div className="text-gray-300">Cliques</div>
            </div>
            <div className="text-center p-3 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="font-bold text-orange-400">{petState.recordeLaser}</div>
              <div className="text-gray-300">Recorde</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};