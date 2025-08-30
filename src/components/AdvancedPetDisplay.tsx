import { useEffect, useState, useRef } from 'react';

interface AdvancedPetDisplayProps {
  character: 'deadpool' | 'wolverine';
  mood: 'happy' | 'sad' | 'hungry' | 'sick' | 'sleeping' | 'normal';
  evolutionStage: number;
  age: number;
  onClick: () => void;
}

const EVOLUTION_STAGES = [
  { name: "Ovo", size: 0.5, eyeSize: 0, isEgg: true },
  { name: "Bebê", size: 0.6, eyeSize: 1.4 },
  { name: "Criança", size: 0.75, eyeSize: 1.2 },
  { name: "Adolescente", size: 0.9, eyeSize: 1.0 },
  { name: "Adulto", size: 1.0, eyeSize: 0.9 },
  { name: "Veterano", size: 1.1, eyeSize: 0.85 },
  { name: "Lendário", size: 1.2, eyeSize: 0.8 },
  { name: "Mítico", size: 1.3, eyeSize: 0.75 },
  { name: "Eterno", size: 1.4, eyeSize: 0.7, isEternal: true }
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

  // Render functions for each evolution stage
  const renderEgg = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="egg-gradient" cx="0.3" cy="0.2">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={character === 'deadpool' ? '#ffeeee' : '#ffffcc'} />
          <stop offset="80%" stopColor={character === 'deadpool' ? '#ffdddd' : '#fff899'} />
          <stop offset="100%" stopColor={character === 'deadpool' ? '#ffcccc' : '#fff566'} />
        </radialGradient>
        <radialGradient id="egg-spots" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor={character === 'deadpool' ? '#ff9999' : '#ffcc00'} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="egg-shadow">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.4"/>
        </filter>
        {age > 0.5 && (
          <filter id="hatching-crack">
            <feTurbulence baseFrequency="0.9" numOctaves="1" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          </filter>
        )}
      </defs>
      
      {/* Nest base */}
      <ellipse cx="150" cy="240" rx="80" ry="20" fill="#8B4513" opacity="0.6" />
      <ellipse cx="150" cy="235" rx="75" ry="15" fill="#A0522D" opacity="0.8" />
      
      {/* Main egg shape */}
      <ellipse 
        cx="150" 
        cy="170" 
        rx={60 * size} 
        ry={80 * size} 
        fill="url(#egg-gradient)" 
        filter="url(#egg-shadow)"
      />
      
      {/* Egg spots/pattern */}
      <circle cx="130" cy="150" r="8" fill="url(#egg-spots)" opacity="0.3" />
      <circle cx="170" cy="140" r="6" fill="url(#egg-spots)" opacity="0.3" />
      <circle cx="145" cy="180" r="5" fill="url(#egg-spots)" opacity="0.3" />
      <circle cx="165" cy="190" r="7" fill="url(#egg-spots)" opacity="0.3" />
      
      {/* Cracks (appear when close to hatching) */}
      {age > 0.8 && (
        <>
          <path d="M 130 120 Q 140 130 135 145 Q 145 150 140 160" 
                stroke="#666666" strokeWidth="2" fill="none" opacity="0.8" />
          <path d="M 170 130 Q 165 140 170 155 Q 160 165 165 175" 
                stroke="#666666" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M 150 100 L 148 115 Q 152 120 150 130" 
                stroke="#666666" strokeWidth="1" fill="none" opacity="0.4" />
        </>
      )}
      
      {/* Pulsing glow when about to hatch */}
      {age > 1.5 && (
        <ellipse 
          cx="150" 
          cy="170" 
          rx={65 * size} 
          ry={85 * size} 
          fill="none" 
          stroke={character === 'deadpool' ? '#ff6666' : '#ffdd00'} 
          strokeWidth="2"
          opacity="0.7"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-width" values="1;3;1" dur="1.5s" repeatCount="indefinite" />
        </ellipse>
      )}
      
      {/* Sparkles around egg */}
      <text x="100" y="120" fontSize="16" fill="#ffdd44" opacity="0.8">✨</text>
      <text x="200" y="140" fontSize="14" fill="#ffdd44" opacity="0.6">✨</text>
      <text x="120" y="240" fontSize="12" fill="#ffdd44" opacity="0.7">✨</text>
      <text x="180" y="220" fontSize="18" fill="#ffdd44" opacity="0.5">✨</text>
    </svg>
  );

  const renderBaby = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="baby-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor={character === 'deadpool' ? '#ff7777' : '#ffee77'} />
          <stop offset="50%" stopColor={character === 'deadpool' ? '#ff4444' : '#ffdd44'} />
          <stop offset="100%" stopColor={character === 'deadpool' ? '#cc0000' : '#cc9900'} />
        </radialGradient>
        <filter id="baby-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Baby head - larger and rounder */}
      <circle 
        cx="150" 
        cy="130" 
        r={65 * size} 
        fill="url(#baby-gradient)" 
        filter="url(#baby-shadow)"
      />
      
      {/* Baby cheeks */}
      <circle cx="120" cy="140" r={15 * size} fill="rgba(255,192,203,0.6)" />
      <circle cx="180" cy="140" r={15 * size} fill="rgba(255,192,203,0.6)" />
      
      {/* Simple mask pattern for babies */}
      {character === 'deadpool' ? (
        <>
          <ellipse cx="130" cy="115" rx={18 * size} ry={25 * size} fill="#2a2a2a" />
          <ellipse cx="170" cy="115" rx={18 * size} ry={25 * size} fill="#2a2a2a" />
        </>
      ) : (
        <>
          <path d="M 110 100 L 140 100 L 145 115 L 140 130 L 110 130 L 105 115 Z" fill="#2a2a2a" />
          <path d="M 155 100 L 185 100 L 190 115 L 185 130 L 155 130 L 150 115 Z" fill="#2a2a2a" />
        </>
      )}
      
      {/* Large baby eyes */}
      <circle cx="130" cy="120" r={15 * eyeSize} fill="white" />
      <circle cx="170" cy="120" r={15 * eyeSize} fill="white" />
      
      {/* Big pupils for baby look */}
      <circle className="pupil" cx="130" cy="120" r={8 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="120" r={8 * eyeSize} fill="black" />
      
      {/* Eye shine */}
      <circle cx="133" cy="117" r={3 * eyeSize} fill="white" opacity="0.8" />
      <circle cx="173" cy="117" r={3 * eyeSize} fill="white" opacity="0.8" />
      
      {/* Small baby body */}
      <ellipse 
        cx="150" 
        cy="220" 
        rx={35 * size} 
        ry={45 * size} 
        fill="url(#baby-gradient)" 
        filter="url(#baby-shadow)" 
      />
      
      {/* Baby arms */}
      <circle cx="115" cy="200" r={12 * size} fill="url(#baby-gradient)" />
      <circle cx="185" cy="200" r={12 * size} fill="url(#baby-gradient)" />
      
      {/* Happy baby mouth */}
      <path 
        d="M 140 145 Q 150 155 160 145" 
        stroke="#2a2a2a" 
        strokeWidth={2 * size} 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );

  const renderChild = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="child-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor={character === 'deadpool' ? '#ff5555' : '#ffcc55'} />
          <stop offset="50%" stopColor={character === 'deadpool' ? '#ee3333' : '#ffbb33'} />
          <stop offset="100%" stopColor={character === 'deadpool' ? '#bb0000' : '#bb7700'} />
        </radialGradient>
        <filter id="child-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Child head */}
      <circle 
        cx="150" 
        cy="120" 
        r={70 * size} 
        fill="url(#child-gradient)" 
        filter="url(#child-shadow)"
      />
      
      {/* More defined mask */}
      {character === 'deadpool' ? (
        <>
          <ellipse cx="125" cy="105" rx={20 * size} ry={30 * size} fill="#1a1a1a" transform="rotate(-5 125 105)" />
          <ellipse cx="175" cy="105" rx={20 * size} ry={30 * size} fill="#1a1a1a" transform="rotate(5 175 105)" />
        </>
      ) : (
        <>
          <path d="M 100 90 L 145 90 L 150 110 L 145 130 L 100 130 L 95 110 Z" fill="#1a1a1a" />
          <path d="M 155 90 L 200 90 L 205 110 L 200 130 L 155 130 L 150 110 Z" fill="#1a1a1a" />
        </>
      )}
      
      {/* Eyes */}
      <ellipse cx="130" cy="110" rx={13 * eyeSize} ry={16 * eyeSize} fill="white" />
      <ellipse cx="170" cy="110" rx={13 * eyeSize} ry={16 * eyeSize} fill="white" />
      
      {/* Pupils */}
      <circle className="pupil" cx="130" cy="110" r={7 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="110" r={7 * eyeSize} fill="black" />
      
      {/* Body */}
      <ellipse 
        cx="150" 
        cy="215" 
        rx={45 * size} 
        ry={55 * size} 
        fill="url(#child-gradient)" 
        filter="url(#child-shadow)" 
      />
      
      {/* Arms */}
      <ellipse cx="110" cy="190" rx={8 * size} ry={25 * size} fill="url(#child-gradient)" />
      <ellipse cx="190" cy="190" rx={8 * size} ry={25 * size} fill="url(#child-gradient)" />
      
      {/* Legs start to show */}
      <ellipse cx="135" cy="260" rx={6 * size} ry={20 * size} fill="url(#child-gradient)" />
      <ellipse cx="165" cy="260" rx={6 * size} ry={20 * size} fill="url(#child-gradient)" />
      
      {/* Mouth */}
      <path 
        d="M 135 135 Q 150 145 165 135" 
        stroke="#1a1a1a" 
        strokeWidth={2.5 * size} 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );

  const getPetClasses = () => {
    const baseClasses = "transition-all duration-500 cursor-pointer select-none gpu-accelerated";
    
    if (currentStage.isEgg) {
      return `${baseClasses} animate-hero-bounce`;
    }
    
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

  const renderTeen = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="teen-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor={character === 'deadpool' ? '#ff4444' : '#ffaa44'} />
          <stop offset="50%" stopColor={character === 'deadpool' ? '#dd2222' : '#ff9922'} />
          <stop offset="100%" stopColor={character === 'deadpool' ? '#990000' : '#995500'} />
        </radialGradient>
        <filter id="teen-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Teen head - more proportioned */}
      <circle 
        cx="150" 
        cy="115" 
        r={75 * size} 
        fill="url(#teen-gradient)" 
        filter="url(#teen-shadow)"
      />
      
      {/* Developed mask */}
      {character === 'deadpool' ? (
        <>
          <ellipse cx="120" cy="100" rx={22 * size} ry={32 * size} fill="#1a1a1a" transform="rotate(-8 120 100)" />
          <ellipse cx="180" cy="100" rx={22 * size} ry={32 * size} fill="#1a1a1a" transform="rotate(8 180 100)" />
        </>
      ) : (
        <>
          <path d="M 85 85 L 145 85 L 150 105 L 145 125 L 85 125 L 80 105 Z" fill="#1a1a1a" />
          <path d="M 155 85 L 215 85 L 220 105 L 215 125 L 155 125 L 150 105 Z" fill="#1a1a1a" />
        </>
      )}
      
      {/* Eyes */}
      <ellipse cx="130" cy="105" rx={12 * eyeSize} ry={15 * eyeSize} fill="white" />
      <ellipse cx="170" cy="105" rx={12 * eyeSize} ry={15 * eyeSize} fill="white" />
      
      {/* Pupils */}
      <circle className="pupil" cx="130" cy="105" r={6 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="105" r={6 * eyeSize} fill="black" />
      
      {/* More mature body */}
      <ellipse 
        cx="150" 
        cy="210" 
        rx={50 * size} 
        ry={60 * size} 
        fill="url(#teen-gradient)" 
        filter="url(#teen-shadow)" 
      />
      
      {/* Arms */}
      <ellipse cx="105" cy="185" rx={10 * size} ry={30 * size} fill="url(#teen-gradient)" />
      <ellipse cx="195" cy="185" rx={10 * size} ry={30 * size} fill="url(#teen-gradient)" />
      
      {/* Legs */}
      <ellipse cx="130" cy="265" rx={8 * size} ry={25 * size} fill="url(#teen-gradient)" />
      <ellipse cx="170" cy="265" rx={8 * size} ry={25 * size} fill="url(#teen-gradient)" />
      
      {/* Mouth */}
      <path 
        d="M 130 130 Q 150 140 170 130" 
        stroke="#1a1a1a" 
        strokeWidth={2.5 * size} 
        fill="none" 
        strokeLinecap="round" 
      />
      
      {/* First weapon hints */}
      {character === 'deadpool' && (
        <circle cx="200" cy="185" r={3 * size} fill="#666666" opacity="0.7" />
      )}
      
      {character === 'wolverine' && (
        <rect x="103" y="180" width="1" height="8" fill="#888888" opacity="0.7" />
      )}
    </svg>
  );

  const renderAdult = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 300 300" 
      className="gpu-accelerated"
      style={{ transform: `scale(${size})` }}
    >
      <defs>
        <radialGradient id="adult-gradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor={character === 'deadpool' ? '#ff3333' : '#ff9933'} />
          <stop offset="50%" stopColor={character === 'deadpool' ? '#cc1111' : '#ee7711'} />
          <stop offset="100%" stopColor={character === 'deadpool' ? '#880000' : '#884400'} />
        </radialGradient>
        <linearGradient id="weapon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6e6e6" />
          <stop offset="50%" stopColor="#cccccc" />
          <stop offset="100%" stopColor="#999999" />
        </linearGradient>
        <filter id="adult-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Adult head */}
      <circle 
        cx="150" 
        cy="110" 
        r={78 * size} 
        fill="url(#adult-gradient)" 
        filter="url(#adult-shadow)"
      />
      
      {/* Full mask */}
      {character === 'deadpool' ? (
        <>
          <ellipse cx="120" cy="95" rx={24 * size} ry={34 * size} fill="#0d0d0d" transform="rotate(-10 120 95)" />
          <ellipse cx="180" cy="95" rx={24 * size} ry={34 * size} fill="#0d0d0d" transform="rotate(10 180 95)" />
          {/* Mask stitching */}
          <path d="M 95 75 Q 105 80 95 85" stroke="#666" strokeWidth="1" fill="none" />
          <path d="M 205 75 Q 195 80 205 85" stroke="#666" strokeWidth="1" fill="none" />
        </>
      ) : (
        <>
          <path d="M 75 80 L 145 80 L 150 100 L 145 120 L 75 120 L 70 100 Z" fill="#0d0d0d" />
          <path d="M 155 80 L 225 80 L 230 100 L 225 120 L 155 120 L 150 100 Z" fill="#0d0d0d" />
          {/* Mask details */}
          <circle cx="85" cy="90" r="2" fill="#444" />
          <circle cx="215" cy="90" r="2" fill="#444" />
        </>
      )}
      
      {/* Eyes */}
      <ellipse cx="130" cy="100" rx={11 * eyeSize} ry={14 * eyeSize} fill="white" />
      <ellipse cx="170" cy="100" rx={11 * eyeSize} ry={14 * eyeSize} fill="white" />
      
      {/* Pupils */}
      <circle className="pupil" cx="130" cy="100" r={5.5 * eyeSize} fill="black" />
      <circle className="pupil" cx="170" cy="100" r={5.5 * eyeSize} fill="black" />
      
      {/* Adult body */}
      <ellipse 
        cx="150" 
        cy="205" 
        rx={55 * size} 
        ry={65 * size} 
        fill="url(#adult-gradient)" 
        filter="url(#adult-shadow)" 
      />
      
      {/* Arms */}
      <ellipse cx="100" cy="180" rx={12 * size} ry={35 * size} fill="url(#adult-gradient)" />
      <ellipse cx="200" cy="180" rx={12 * size} ry={35 * size} fill="url(#adult-gradient)" />
      
      {/* Legs */}
      <ellipse cx="125" cy="270" rx={10 * size} ry={30 * size} fill="url(#adult-gradient)" />
      <ellipse cx="175" cy="270" rx={10 * size} ry={30 * size} fill="url(#adult-gradient)" />
      
      {/* Weapons */}
      {character === 'deadpool' && (
        <>
          {/* Katanas */}
          <g transform="translate(150,240) rotate(25)">
            <rect x="-1.5" y="-35" width="3" height="70" fill="url(#weapon-gradient)" />
            <rect x="-4" y="-40" width="8" height="6" fill="#8B4513" />
            <circle cx="0" cy="-37" r="2" fill="#FFD700" />
          </g>
          <g transform="translate(150,240) rotate(-25)">
            <rect x="-1.5" y="-35" width="3" height="70" fill="url(#weapon-gradient)" />
            <rect x="-4" y="-40" width="8" height="6" fill="#8B4513" />
            <circle cx="0" cy="-37" r="2" fill="#FFD700" />
          </g>
        </>
      )}
      
      {character === 'wolverine' && (
        <>
          {/* Claws */}
          <g transform="translate(88,200)">
            <rect x="-0.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
            <rect x="2.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
            <rect x="5.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
          </g>
          <g transform="translate(212,200)">
            <rect x="-0.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
            <rect x="-3.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
            <rect x="-6.5" y="-20" width="1" height="40" fill="url(#weapon-gradient)" />
          </g>
        </>
      )}
      
      {/* Mouth */}
      <path 
        d="M 125 125 Q 150 135 175 125" 
        stroke="#0d0d0d" 
        strokeWidth={3 * size} 
        fill="none" 
        strokeLinecap="round" 
      />
    </svg>
  );

  // Render the appropriate stage based on evolutionStage
  const renderCurrentStage = () => {
    if (currentStage.isEgg) return renderEgg();
    
    switch (evolutionStage) {
      case 1: return renderBaby();
      case 2: return renderChild();
      case 3: return renderTeen();
      case 4: return renderAdult();
      default: 
        // For higher stages (5-8), use enhanced versions of adult
        return character === 'deadpool' ? renderDeadpoolSVG() : renderWolverineSVG();
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
        {renderCurrentStage()}
        
        {/* Remove internal text elements - moved outside container */}
      </div>
      
      {/* Stage Name - moved outside pet container */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-foreground text-xs font-bold whitespace-nowrap border border-border/50">
        {currentStage.name}
      </div>
      
      {/* Age Display - moved to top outside pet */}
      <div className="absolute -top-6 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-foreground text-xs border border-border/50">
        {Math.floor(age)}h
      </div>
      
      {/* Evolution Sparkles - repositioned around pet */}
      {showEvolutionEffect && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) * Math.PI / 180;
            const radius = 140;
            const x = 50 + (radius / 2) * Math.cos(angle);
            const y = 50 + (radius / 2) * Math.sin(angle);
            return (
              <div
                key={i}
                className="absolute text-2xl animate-float z-30"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s'
                }}
              >
                ✨
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};