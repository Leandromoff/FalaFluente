import React, { useState, useEffect } from 'react';
import { LessonSection } from '../types';
import { BookOpen, Check, Volume2, Square } from 'lucide-react';

interface LessonProps {
  intro: string;
  sections: LessonSection[];
  onStartQuiz: () => void;
}

const Lesson: React.FC<LessonProps> = ({ intro, sections, onStartQuiz }) => {
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Stop audio when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = (text: string, lang: 'pt-BR' | 'en-US') => {
    // If currently speaking this specific text, stop it
    if (speakingText === text) {
      window.speechSynthesis.cancel();
      setSpeakingText(null);
      return;
    }

    // Stop any previous audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = lang === 'en-US' ? 0.9 : 1.1; // English slightly slower for learning
    
    utterance.onend = () => {
      setSpeakingText(null);
    };

    utterance.onerror = () => {
      setSpeakingText(null);
    };

    setSpeakingText(text);
    window.speechSynthesis.speak(utterance);
  };

  const SpeakButton: React.FC<{ text: string; lang: 'pt-BR' | 'en-US'; className?: string }> = ({ text, lang, className = "" }) => {
    const isPlaying = speakingText === text;
    return (
      <button 
        onClick={() => handleSpeak(text, lang)}
        className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
          isPlaying 
            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
            : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600'
        } ${className}`}
        title={isPlaying ? "Parar leitura" : "Ouvir texto"}
      >
        {isPlaying ? <Square className="h-4 w-4 fill-current" /> : <Volume2 className="h-4 w-4" />}
      </button>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Intro Box */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative group">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Explicação do Tópico</h2>
          </div>
          <SpeakButton text={intro} lang="pt-BR" />
        </div>
        <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-blue-400 pl-4 py-1">
          {intro}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
              <SpeakButton text={section.content} lang="pt-BR" />
            </div>
            <div className="p-6">
              <div className="prose prose-slate max-w-none text-slate-700 mb-6">
                <p>{section.content}</p>
              </div>
              
              {section.examples && section.examples.length > 0 && (
                <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-100">
                  <h4 className="text-sm font-semibold text-emerald-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Exemplos
                  </h4>
                  <ul className="space-y-3">
                    {section.examples.map((ex, i) => (
                      <li key={i} className="flex gap-3 text-slate-800 items-start group/ex">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0" />
                        <span className="flex-grow pt-0.5">{ex}</span>
                        <SpeakButton text={ex} lang="en-US" className="opacity-100 sm:opacity-0 sm:group-hover/ex:opacity-100 scale-90" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-8 pb-12">
        <button
          onClick={() => {
            window.speechSynthesis.cancel();
            onStartQuiz();
          }}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Ir para os Exercícios
        </button>
      </div>
    </div>
  );
};

export default Lesson;