import { CEFRLevel, Skill, Topic } from './types';
import { BookOpen, PenTool, MessageCircle, Mic, Layers, GraduationCap } from 'lucide-react';

export const LEVELS = [
  { id: CEFRLevel.A1, label: 'A1 Elementary', color: 'bg-emerald-500', hover: 'hover:bg-emerald-600', text: 'text-emerald-600' },
  { id: CEFRLevel.A2, label: 'A2 Pre-intermediate', color: 'bg-teal-500', hover: 'hover:bg-teal-600', text: 'text-teal-600' },
  { id: CEFRLevel.B1, label: 'B1 Intermediate', color: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-600' },
  { id: CEFRLevel.B1_PLUS, label: 'B1+ Intermediate Plus', color: 'bg-indigo-500', hover: 'hover:bg-indigo-600', text: 'text-indigo-600' },
  { id: CEFRLevel.B2, label: 'B2 Upper Intermediate', color: 'bg-purple-500', hover: 'hover:bg-purple-600', text: 'text-purple-600' },
  { id: CEFRLevel.C1, label: 'C1 Advanced', color: 'bg-rose-500', hover: 'hover:bg-rose-600', text: 'text-rose-600' },
];

export const SKILLS = [
  { id: Skill.GRAMMAR, label: 'Gramática', icon: BookOpen, description: 'Regras e estruturas' },
  { id: Skill.VOCABULARY, label: 'Vocabulário', icon: Layers, description: 'Palavras e expressões' },
  { id: Skill.READING, label: 'Leitura', icon: GraduationCap, description: 'Compreensão de texto' },
  { id: Skill.USE_OF_ENGLISH, label: 'Uso do Inglês', icon: PenTool, description: 'Collocations e phrasal verbs' },
];

export const GRAMMAR_TOPICS: Topic[] = [
  { id: 'tenses', name: 'Present & Past Tenses', description: 'Simple, Continuous, Perfect' },
  { id: 'modals', name: 'Modal Verbs', description: 'Can, Could, Should, Must' },
  { id: 'conditionals', name: 'Conditionals', description: 'Zero, First, Second, Third' },
  { id: 'passive', name: 'Passive Voice', description: 'Formation and usage' },
  { id: 'prepositions', name: 'Prepositions', description: 'In, On, At, By, For' },
];

export const VOCAB_TOPICS: Topic[] = [
  { id: 'daily_life', name: 'Daily Life & Routines', description: 'Everyday activities' },
  { id: 'business', name: 'Business English', description: 'Workplace and meetings' },
  { id: 'travel', name: 'Travel & Tourism', description: 'Airports, hotels, directions' },
  { id: 'phrasal_verbs', name: 'Common Phrasal Verbs', description: 'Get up, look for, etc.' },
  { id: 'false_cognates', name: 'False Cognates (Falsos Amigos)', description: 'Pretend vs Intend, Push vs Pull' },
];