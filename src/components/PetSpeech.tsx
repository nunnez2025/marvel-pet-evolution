import { useEffect, useState } from 'react';

interface PetSpeechProps {
  character: 'deadpool' | 'wolverine';
  mood: string;
  message?: string;
}

const SPEECH_MESSAGES = {
  deadpool: {
    birth: [
      "Hey aí! Deadpool na área! Preparado para máximo esforço?",
      "Quebrar a quarta parede nunca foi tão divertido!",
      "Basicamente sou imortal, então vamos ter uma LONGA amizade!"
    ],
    happy: [
      "Isso é melhor que chimichangas! Quase...",
      "Você é o melhor parceiro que um mercenário poderia pedir!",
      "Quebrando a quarta parede com estilo!",
      "Máximo esforço em tudo que fazemos!"
    ],
    hungry: [
      "Cadê minhas chimichangas?! EU PRECISO DE CHIMICHANGAS!",
      "Um Deadpool faminto é um Deadpool perigoso...",
      "Me alimente ou vou quebrar mais que a quarta parede!"
    ],
    sad: [
      "Nem minha regeneração cura essa solidão...",
      "Posso ser o Mercenário Tagarela, mas senti sua falta!",
      "Onde você foi? Estava contando as melhores piadas!"
    ],
    sick: [
      "Não se preocupe, me curo rápido! Mas um cuidado não faria mal...",
      "Meu fator de cura está de férias aparentemente...",
      "Até o Deadpool precisa de um kit médico às vezes!"
    ],
    sleeping: [
      "Máximo esforço requer máximo descanso...",
      "Até mercenários precisam de sua beleza do sono!",
      "Hora de um cochilo antes de mais caos!"
    ],
    training: [
      "Montagem de treino! Toca a música dos anos 80!",
      "Ficando mais forte! Logo conseguirei levantar... coisas!",
      "Treinamento de máximo esforço igual ganhos máximos!"
    ]
  },
  wolverine: {
    birth: [
      "E aí, garoto. Pronto para ver o que essas garras podem fazer?",
      "Sou o melhor no que faço, e isso é ser seu pet!",
      "Bem-vindo à experiência X-Men, cara!"
    ],
    happy: [
      "Isso é melhor que uma cerveja gelada após uma longa luta!",
      "Você é legal, garoto. Me lembra dos bons tempos.",
      "Meus instintos animais dizem que você é um dos bons!",
      "Snikt! Esse é o som da felicidade, cara!"
    ],
    hungry: [
      "Meu estômago está roncando mais alto que o Dentes-de-Sabre!",
      "Eu toparia um bacon canadense agora...",
      "Alimente a fera, ou encare as garras!"
    ],
    sad: [
      "Até um mutante velho como eu fica solitário às vezes...",
      "Você ficou fora tanto tempo, pensei que o Magneto te pegou...",
      "A solidão corta mais fundo que adamantium..."
    ],
    sick: [
      "Meu fator de cura não é mais o que era...",
      "Já me senti melhor depois de lutar com o Hulk...",
      "Ajude um velho X-Man, vai?"
    ],
    sleeping: [
      "Esses ossos velhos precisam descansar...",
      "Hora de hibernar como um wolverine de verdade...",
      "Até mutantes precisam de seu tempo de inatividade..."
    ],
    training: [
      "Hora de bater na Sala do Perigo!",
      "Treinando duro, lutando mais duro!",
      "Afiando essas garras e habilidades!"
    ]
  }
};

export const PetSpeech = ({ character, mood, message }: PetSpeechProps) => {
  const [currentMessage, setCurrentMessage] = useState('Olá! Pronto para me ver crescer?');

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      return;
    }

    const messages = SPEECH_MESSAGES[character]?.[mood as keyof typeof SPEECH_MESSAGES.deadpool];
    if (messages && messages.length > 0) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
    } else {
      setCurrentMessage(character === 'deadpool' 
        ? "Máximo esforço sempre!" 
        : "Sou o melhor no que faço, cara!");
    }
  }, [character, mood, message]);

  return (
    <div className="speech-bubble mb-6 max-w-md mt-6">
      {currentMessage}
    </div>
  );
};