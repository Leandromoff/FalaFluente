export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B1_PLUS = 'B1+',
  B2 = 'B2',
  C1 = 'C1'
}

export enum Skill {
  GRAMMAR = 'Grammar',
  VOCABULARY = 'Vocabulary',
  READING = 'Reading',
  LISTENING = 'Listening', // Future implementation
  USE_OF_ENGLISH = 'Use of English'
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // 0-based index of options
  explanationPt: string; // Explanation in Portuguese
}

export interface LessonSection {
  title: string;
  content: string; // HTML-like string or markdown
  examples: string[];
}

export interface ExerciseSet {
  title: string;
  instructions: string;
  lesson: {
    intro: string;
    sections: LessonSection[];
  };
  questions: Question[];
  readingText?: string; // Optional context for reading comprehension
}

export interface Topic {
  id: string;
  name: string;
  description: string;
}