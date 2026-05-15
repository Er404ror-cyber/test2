export interface Mission {
  id: number;
  title: string;
  description: string;
  hint: string;
  points: number;
  emoji: string;
  bgColor: string;
  accentColor: string;
}

export interface RecyclingQuestion {
  id: number;
  item: string;
  emoji: string;
  correct: "recicla" | "organico" | "comum";
  explanation: string;
}

export const MISSIONS: Mission[] = [
  {
    id: 1,
    title: "Apague as luzes!",
    description: "Saia de um cômodo e apague a luz. Economizar energia ajuda o planeta!",
    hint: "Cada lâmpada apagada por 1 hora economiza energia suficiente para carregar um celular.",
    points: 50,
    emoji: "💡",
    bgColor: "from-yellow-400 to-orange-400",
    accentColor: "bg-yellow-100",
  },
  {
    id: 2,
    title: "Feche a torneira!",
    description: "Escove os dentes com a torneira fechada. Você economiza até 12 litros de água!",
    hint: "Uma torneira aberta desperdiça 12 litros de água por minuto.",
    points: 60,
    emoji: "🚿",
    bgColor: "from-blue-400 to-cyan-400",
    accentColor: "bg-blue-100",
  },
  {
    id: 3,
    title: "Separe o lixo!",
    description: "Coloque uma lata ou garrafa plástica na lixeira de reciclagem correta.",
    hint: "O Brasil recicla apenas 4% do lixo. Você faz a diferença!",
    points: 70,
    emoji: "♻️",
    bgColor: "from-green-400 to-emerald-400",
    accentColor: "bg-green-100",
  },
  {
    id: 4,
    title: "Plante uma semente!",
    description: "Plante uma sementinha em um potinho ou reutilize uma embalagem para isso.",
    hint: "Uma árvore adulta absorve até 22 kg de CO₂ por ano!",
    points: 80,
    emoji: "🌱",
    bgColor: "from-emerald-400 to-teal-400",
    accentColor: "bg-emerald-100",
  },
  {
    id: 5,
    title: "Use sacola reutilizável!",
    description: "Na próxima compra, leve uma sacola de tecido em vez de pegar sacola plástica.",
    hint: "Uma sacola plástica demora 400 anos para se decompor na natureza.",
    points: 60,
    emoji: "🛍️",
    bgColor: "from-purple-400 to-pink-400",
    accentColor: "bg-purple-100",
  },
  {
    id: 6,
    title: "Coma menos carne!",
    description: "Escolha uma refeição vegetal hoje. Frutas, legumes e verduras são ótimas opções!",
    hint: "Produzir 1 kg de carne bovina usa 15.000 litros de água!",
    points: 70,
    emoji: "🥦",
    bgColor: "from-lime-400 to-green-400",
    accentColor: "bg-lime-100",
  },
];

export const RECYCLING_QUIZ: RecyclingQuestion[] = [
  {
    id: 1,
    item: "Garrafa PET",
    emoji: "🍾",
    correct: "recicla",
    explanation: "Plástico vai na lixeira AZUL de reciclagem!",
  },
  {
    id: 2,
    item: "Casca de banana",
    emoji: "🍌",
    correct: "organico",
    explanation: "Restos de comida vão no lixo ORGÂNICO (marrom)!",
  },
  {
    id: 3,
    item: "Jornal velho",
    emoji: "📰",
    correct: "recicla",
    explanation: "Papel vai na lixeira AZUL de reciclagem!",
  },
  {
    id: 4,
    item: "Pilha usada",
    emoji: "🔋",
    correct: "comum",
    explanation: "Pilha é lixo ESPECIAL — leve a um ponto de coleta de pilhas!",
  },
  {
    id: 5,
    item: "Lata de alumínio",
    emoji: "🥫",
    correct: "recicla",
    explanation: "Metal vai na lixeira AMARELA de reciclagem!",
  },
];

export type GameScreen =
  | "start"
  | "mission"
  | "mission-success"
  | "quiz-intro"
  | "quiz"
  | "quiz-result"
  | "end";
