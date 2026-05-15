export type GameScreen = "start" | "scene" | "end";

export type SceneId = "lights" | "trash" | "taps" | "plant";

export interface SceneConfig {
  id: SceneId;
  title: string;
  objective: string;
  tip: string;
  points: number;
  bgColor: string;
}

export const SCENES: SceneConfig[] = [
  {
    id: "lights",
    title: "Apague as Luzes!",
    objective: "Clique em todas as lâmpadas acesas para apagar e economizar energia.",
    tip: "Apagar luzes desnecessárias reduz o CO₂ e a sua conta de luz!",
    points: 80,
    bgColor: "from-indigo-900 to-purple-900",
  },
  {
    id: "trash",
    title: "Separe o Lixo!",
    objective: "Arraste cada item para a lixeira correta.",
    tip: "Separar o lixo permite que os materiais sejam reciclados!",
    points: 100,
    bgColor: "from-green-600 to-teal-700",
  },
  {
    id: "taps",
    title: "Feche as Torneiras!",
    objective: "Clique nas torneiras abertas para fechar e parar o desperdício de água.",
    tip: "Uma torneira aberta desperdiça 12 litros de água por minuto!",
    points: 80,
    bgColor: "from-blue-600 to-cyan-700",
  },
];

export interface TrashItem {
  id: number;
  name: string;
  emoji: string;
  bin: "blue" | "brown" | "gray";
  binLabel: string;
}

export const TRASH_ITEMS: TrashItem[] = [
  { id: 1, name: "Garrafa PET", emoji: "🍶", bin: "blue", binLabel: "Reciclável" },
  { id: 2, name: "Casca de banana", emoji: "🍌", bin: "brown", binLabel: "Orgânico" },
  { id: 3, name: "Jornal", emoji: "📰", bin: "blue", binLabel: "Reciclável" },
  { id: 4, name: "Restos de comida", emoji: "🍎", bin: "brown", binLabel: "Orgânico" },
  { id: 5, name: "Saco sujo", emoji: "🗑️", bin: "gray", binLabel: "Comum" },
  { id: 6, name: "Lata de alumínio", emoji: "🥫", bin: "blue", binLabel: "Reciclável" },
  { id: 7, name: "Papel usado", emoji: "📄", bin: "blue", binLabel: "Reciclável" },
  { id: 8, name: "Folhas secas", emoji: "🍂", bin: "brown", binLabel: "Orgânico" },
];
