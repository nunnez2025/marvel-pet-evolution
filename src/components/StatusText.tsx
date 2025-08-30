interface StatusTextProps {
  mood: string;
}

const MOOD_DISPLAY = {
  happy: { text: 'Feliz', emoji: '😄' },
  sad: { text: 'Triste', emoji: '😢' },
  hungry: { text: 'Faminto', emoji: '🤤' },
  sick: { text: 'Doente', emoji: '😷' },
  sleeping: { text: 'Dormindo', emoji: '😴' },
  normal: { text: 'Normal', emoji: '😐' },
  excited: { text: 'Animado', emoji: '🤩' },
  angry: { text: 'Irritado', emoji: '😠' }
};

export const StatusText = ({ mood }: StatusTextProps) => {
  const moodData = MOOD_DISPLAY[mood as keyof typeof MOOD_DISPLAY] || MOOD_DISPLAY.normal;
  
  return (
    <p className="text-xl mb-6 font-bold text-white gpu-accelerated" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
      {moodData.text} {moodData.emoji}
    </p>
  );
};