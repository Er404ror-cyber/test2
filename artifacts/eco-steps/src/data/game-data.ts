export type GameScreen = "start" | "scene" | "end";

export type SceneId = "lights" | "trash" | "taps";

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
    tip: "Apagar luzes desnecessárias reduz o CO₂ e a tua conta de luz!",
    points: 80,
    bgColor: "from-indigo-900 to-purple-900",
  },
  {
    id: "trash",
    title: "Separe o Lixo!",
    objective: "Escolha a lixeira certa para cada item.",
    tip: "Separar o lixo permite que os materiais sejam reciclados!",
    points: 100,
    bgColor: "from-green-600 to-teal-700",
  },
  {
    id: "taps",
    title: "Feche as Torneiras!",
    objective: "Clique nos botões vermelhos para fechar as torneiras abertas.",
    tip: "Uma torneira aberta desperdiça 12 litros de água por minuto!",
    points: 80,
    bgColor: "from-blue-600 to-cyan-700",
  },
];

export interface TrashItem {
  id: number;
  name: string;
  /** Use a single, universally supported emoji OR a colored circle fallback */
  emoji: string;
  bin: "blue" | "brown" | "gray";
  binLabel: string;
}

export const TRASH_ITEMS: TrashItem[] = [
  /* ── Reciclável (blue) ── */
  { id: 1,  name: "Garrafa de Plástico",  emoji: "🥤", bin: "blue",  binLabel: "Reciclável" },
  { id: 2,  name: "Jornal / Revista",     emoji: "📰", bin: "blue",  binLabel: "Reciclável" },
  { id: 3,  name: "Lata de Alumínio",     emoji: "🥫", bin: "blue",  binLabel: "Reciclável" },
  { id: 4,  name: "Caixa de Cartão",      emoji: "📦", bin: "blue",  binLabel: "Reciclável" },
  { id: 5,  name: "Garrafa de Vidro",     emoji: "🍾", bin: "blue",  binLabel: "Reciclável" },
  { id: 6,  name: "Folha de Papel",       emoji: "📄", bin: "blue",  binLabel: "Reciclável" },
  /* ── Orgânico (brown) ── */
  { id: 7,  name: "Casca de Banana",      emoji: "🍌", bin: "brown", binLabel: "Orgânico" },
  { id: 8,  name: "Restos de Comida",     emoji: "🍎", bin: "brown", binLabel: "Orgânico" },
  { id: 9,  name: "Folhas Secas",         emoji: "🍂", bin: "brown", binLabel: "Orgânico" },
  { id: 10, name: "Casca de Ovo",         emoji: "🥚", bin: "brown", binLabel: "Orgânico" },
  /* ── Comum (gray) ── */
  { id: 11, name: "Saco de Plástico Sujo",emoji: "🛍️", bin: "gray",  binLabel: "Comum" },
  { id: 12, name: "Fralda Usada",         emoji: "👶", bin: "gray",  binLabel: "Comum" },
  { id: 13, name: "Guardanapo Usado",     emoji: "🧻", bin: "gray",  binLabel: "Comum" },
];
