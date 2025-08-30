import { useEffect, useState, useRef } from 'react';

interface AdvancedPetDisplayProps {
  character: 'deadpool' | 'wolverine';
  mood: 'happy' | 'sad' | 'hungry' | 'sick' | 'sleeping' | 'normal';
  evolutionStage: number;
  age: number;
  onClick: () => void;
}

const EVOLUTION_STAGES = [
  { name: "Bebê", size: 0.6, eyeSize: 1.4 },
  { name: "Criança", size: 0.75, eyeSize: 1.2 },
  { name: "Adolescente", size: 0.9, eyeSize: 1.0 },
  { name: "Adulto", size: 1.0, eyeSize: 0.9 },
  { name: "Veterano", size: 0.95, eyeSize: 0.85 },
  { name: "Lendário", size: 0.85, eyeSize: 0.8 },
  { name: "Mítico", size: 0.75, eyeSize: 0.75 },
  { name: "Eterno", size: 0.7, eyeSize: 0.7 }
];

export const AdvancedPetDisplay = ({ 
  character, 
  mood, 
  evolutionStage, 
  age, 
  onClick 
}: AdvancedPetDisplayProps) => {
  const [showEvolutionEffect, setShowEvolutionEffect] = useState(false);
  const [prevEvolutionStage, setPrevEvolutionStage] = useState(evolutionStage);
  const petRef = useRef<HTMLDivElement>(null);

  const currentStage = EVOLUTION_STAGES[evolutionStage] || EVOLUTION_STAGES[0];
  const { size, eyeSize } = currentStage;

  // Eye tracking system
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!petRef.current) return;

      const pupils = petRef.current.querySelectorAll('.pupil');
      const petRect = petRef.current.getBoundingClientRect();

      pupils.forEach(pupil => {
        const pupilRect = pupil.getBoundingClientRect();
        const pupilCenterX = pupilRect.left + pupilRect.width / 2;
        const pupilCenterY = pupilRect.top + pupilRect.height / 2;

        const angle = Math.atan2(e.clientY - pupilCenterY, e.clientX - pupilCenterX);
        const distance = Math.min(4, Math.hypot(e.clientX - pupilCenterX, e.clientY - pupilCenterY) / 30);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        const currentCx = parseFloat(pupil.getAttribute('cx') || '0');
        const currentCy = parseFloat(pupil.getAttribute('cy') || '0');
        
        pupil.setAttribute('cx', (currentCx + x).toString());
        pupil.setAttribute('cy', (currentCy + y).toString());

        // Reset after movement
        setTimeout(() => {
          pupil.setAttribute('cx', currentCx.toString());
          pupil.setAttribute('cy', currentCy.toString());
        }, 100);
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Evolution effect
  useEffect(() => {
    if (evolutionStage !== prevEvolutionStage) {
      setShowEvolutionEffect(true);
      setPrevEvolutionStage(evolutionStage);
      
      setTimeout(() => {
        setShowEvolutionEffect(false);
      }, 2000);
    }
  }, [evolutionStage, prevEvolutionStage]);

  const getPetClasses = () => {
    const baseClasses = "transition-all duration-500 cursor-pointer select-none gpu-accelerated";
    
    if (showEvolutionEffect) {
      return `${baseClasses} animate-energy-pulse`;
    }
    
    switch (mood) {
      case 'happy':
        return `${baseClasses} pet-happy animate-hero-bounce`;
      case 'sad':
        return `${baseClasses} pet-sad`;
      case 'sick':
        return `${baseClasses} pet-sick`;
      case 'sleeping':
        return `${baseClasses} pet-sleeping`;
      default:
        return `${baseClasses} animate-float hover:scale-110`;
    }
  };

  const renderDeadpoolSVG = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="deadpool-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#ff4444" />
          <stop offset="50%" stopColor="#cc0000" />
          <stop offset="100%" stopColor="#990000" />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
        {evolutionStage >= 7 && (
          <filter id="ethereal">
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"/>
          </filter>
        )}
      </defs>
      
      {/* Main head */}
      <circle 
        cx="150" 
        cy="120" 
        r={80 * size} 
        fill="url(#deadpool-gradient)" 
        filter="url(#shadow)"
      />
      
      {/* Mask pattern */}
      <ellipse 
        cx="120" 
        cy="100" 
        rx={25 * size} 
        ry={35 * size} 
        fill="#1a1a1a" 
        transform="rotate(-10 120 100)" 
      />
      <ellipse 
        cx="180" 
        cy="100" 
        rx={25 * size} 
        ry={35 * size} 
        fill="#1a1a1a" 
        transform="rotate(10 180 100)" 
      />
      
      {/* Eyes */}
      <ellipse cx="130" cy="105" rx={12 * eyeSize} ry={16 * eyeSize} fill="white" />
      <ellipse cx="170" cy="105" rx={12 * eyeSize} ry={16 * eyeSize} fill="white" />
      
      {/* Pupils */}
      <circle className="pupil" cx="130" cy="105" r={6 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="105" r={6 * eyeSize} fill="black" />
      
      {/* Mouth */}
      <path 
        d="M 130 140 Q 150 155 170 140" 
        stroke="#1a1a1a" 
        strokeWidth={3 * size} 
        fill="none" 
        strokeLinecap="round" 
      />
      
      {/* Body (grows with evolution) */}
      {evolutionStage >= 1 && (
        <ellipse 
          cx="150" 
          cy="220" 
          rx={50 * size} 
          ry={60 * size} 
          fill="url(#deadpool-gradient)" 
          filter="url(#shadow)" 
        />
      )}
      
      {/* Swords (appear in adult stage) */}
      {evolutionStage >= 3 && (
        <>
          <g transform="translate(150,250) rotate(45)">
            <rect x="-2" y="-30" width="4" height="60" fill="#c0c0c0" />
            <circle cx="0" cy="-35" r="8" fill="#ffd700" />
          </g>
          <g transform="translate(150,250) rotate(-45)">
            <rect x="-2" y="-30" width="4" height="60" fill="#c0c0c0" />
            <circle cx="0" cy="-35" r="8" fill="#ffd700" />
          </g>
        </>
      )}
      
      {/* Gray hairs for older stages */}
      {evolutionStage >= 5 && (
        <g opacity="0.7">
          <circle cx={110 * size + 150} cy={90 * size + 120} r="2" fill="#cccccc" />
          <circle cx={190 * size + 150} cy={95 * size + 120} r="1.5" fill="#cccccc" />
          <circle cx={105 * size + 150} cy={85 * size + 120} r="1" fill="#cccccc" />
        </g>
      )}
      
      {/* Special effects for final stage */}
      {evolutionStage >= 7 && (
        <g opacity="0.6">
          <circle 
            cx="150" 
            cy="120" 
            r={100 * size} 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          >
            <animate 
              attributeName="r" 
              values={`${80 * size};${120 * size};${80 * size}`} 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </circle>
          <text 
            x="150" 
            y="60" 
            textAnchor="middle" 
            fill="rgba(255,255,255,0.8)" 
            fontSize="20"
          >
            ✨
          </text>
        </g>
      )}
      
      {/* Evolution glow effect */}
      {showEvolutionEffect && (
        <circle 
          cx="150" 
          cy="120" 
          r={120 * size} 
          fill="none" 
          stroke="rgba(255,255,255,0.8)" 
          strokeWidth="3"
          opacity="0.8"
        >
          <animate attributeName="r" values={`${80 * size};${150 * size}`} dur="2s" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" />
        </circle>
      )}
    </svg>
  );

  const renderWolverineSVG = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="wolverine-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#ffdd00" />
          <stop offset="50%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#cc9900" />
        </radialGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
        {evolutionStage >= 7 && (
          <filter id="ethereal">
            <feGaussianBlur stdDeviation="1" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0"/>
          </filter>
        )}
      </defs>
      
      {/* Main head */}
      <circle 
        cx="150" 
        cy="120" 
        r={80 * size} 
        fill="url(#wolverine-gradient)" 
        filter="url(#shadow)"
      />
      
      {/* Mask */}
      <path 
        d="M 80 80 L 220 80 L 210 120 L 200 160 L 180 180 L 120 180 L 100 160 L 90 120 Z" 
        fill="#1a1a1a" 
      />
      
      {/* Eyes */}
      <path d="M 115 95 L 145 95 L 150 105 L 145 115 L 115 115 L 110 105 Z" fill="white" />
      <path d="M 155 95 L 185 95 L 190 105 L 185 115 L 155 115 L 150 105 Z" fill="white" />
      
      {/* Pupils */}
      <circle className="pupil" cx="130" cy="105" r={8 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="105" r={8 * eyeSize} fill="black" />
      
      {/* Body (grows with evolution) */}
      {evolutionStage >= 1 && (
        <ellipse 
          cx="150" 
          cy="220" 
          rx={55 * size} 
          ry={65 * size} 
          fill="url(#wolverine-gradient)" 
          filter="url(#shadow)" 
        />
      )}
      
      {/* Claws (appear in adult stage) */}
      {evolutionStage >= 3 && (
        <>
          <g transform="translate(100,250)">
            <rect x="-1" y="-25" width="2" height="50" fill="#c0c0c0" />
            <rect x="4" y="-25" width="2" height="50" fill="#c0c0c0" />
            <rect x="9" y="-25" width="2" height="50" fill="#c0c0c0" />
          </g>
          <g transform="translate(200,250)">
            <rect x="-1" y="-25" width="2" height="50" fill="#c0c0c0" />
            <rect x="-6" y="-25" width="2" height="50" fill="#c0c0c0" />
            <rect x="-11" y="-25" width="2" height="50" fill="#c0c0c0" />
          </g>
        </>
      )}
      
      {/* Gray hairs for older stages */}
      {evolutionStage >= 5 && (
        <g opacity="0.7">
          <circle cx={110 * size + 150} cy={90 * size + 120} r="2" fill="#cccccc" />
          <circle cx={190 * size + 150} cy={95 * size + 120} r="1.5" fill="#cccccc" />
          <circle cx={105 * size + 150} cy={85 * size + 120} r="1" fill="#cccccc" />
        </g>
      )}
      
      {/* Special effects for final stage */}
      {evolutionStage >= 7 && (
        <g opacity="0.6">
          <circle 
            cx="150" 
            cy="120" 
            r={100 * size} 
            fill="none" 
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="2"
          >
            <animate 
              attributeName="r" 
              values={`${80 * size};${120 * size};${80 * size}`} 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </circle>
          <text 
            x="150" 
            y="60" 
            textAnchor="middle" 
            fill="rgba(255,255,255,0.8)" 
            fontSize="20"
          >
            🌟
          </text>
        </g>
      )}
      
      {/* Evolution glow effect */}
      {showEvolutionEffect && (
        <circle 
          cx="150" 
          cy="120" 
          r={120 * size} 
          fill="none" 
          stroke="rgba(255,220,0,0.8)" 
          strokeWidth="3"
          opacity="0.8"
        >
          <animate attributeName="r" values={`${80 * size};${150 * size}`} dur="2s" />
          <animate attributeName="opacity" values="0.8;0" dur="2s" />
        </circle>
      )}
    </svg>
  );

  return (
    <div className="relative">
      {/* Pet Container */}
      <div 
        ref={petRef}
        className={`w-64 h-64 mx-auto rounded-full flex items-center justify-center relative overflow-hidden ${
          character === 'deadpool' ? 'gradient-deadpool shadow-deadpool' : 'gradient-wolverine shadow-wolverine'
        } ${getPetClasses()}`}
        onClick={onClick}
      >
        {character === 'deadpool' ? renderDeadpoolSVG() : renderWolverineSVG()}
        
        {/* Stage Name */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold">
          {currentStage.name}
        </div>
        
        {/* Age Display */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
          {Math.floor(age)}h
        </div>
      </div>
      
      {/* Evolution Sparkles */}
      {showEvolutionEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${30 + Math.floor(i / 4) * 40}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
};