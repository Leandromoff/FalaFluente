import React, { useState, useEffect } from 'react';
import { ExerciseSet } from '../types.ts';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, ArrowRight, Volume2, Square } from 'lucide-react';

interface QuizProps {
  data: ExerciseSet;
  onReset: () => void;
}

const Quiz: React.FC<QuizProps> = ({ data, onReset }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Reading texts are always in English
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const checkAnswers = () => {
    let correctCount = 0;
    data.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    window.speechSynthesis.cancel(); // Stop reading if active
    setIsSpeaking(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScoreColor = () => {
    const percentage = (score / data.questions.length) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Results */}
      {showResults && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Resultado</h3>
          <div className={`text-4xl font-extrabold ${getScoreColor()} mb-4`}>
            {score} / {data.questions.length}
          </div>
          <p className="text-slate-600 mb-6">
            {(score / data.questions.length) >= 0.8 ? 'Excelente trabalho! 🎉' : 'Continue praticando! 💪'}
          </p>
          <button
            onClick={() => {
              window.speechSynthesis.cancel();
              onReset();
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Novo Exercício
          </button>
        </div>
      )}

      {/* Reading Text (if applicable) */}
      {data.readingText && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded uppercase tracking-wide mr-2">Texto</span>
              Leia com atenção
            </h3>
            <button 
              onClick={() => toggleSpeech(data.readingText!)}
              className={`inline-flex items-center justify-center p-2 rounded-full transition-colors ${
                isSpeaking 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
              }`}
              title={isSpeaking ? "Parar leitura" : "Ouvir texto"}
            >
              {isSpeaking ? <Square className="h-4 w-4 fill-current" /> : <Volume2 className="h-5 w-5" />}
              <span className="ml-2 text-sm font-medium hidden sm:inline">{isSpeaking ? 'Parar' : 'Ouvir'}</span>
            </button>
          </div>
          
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
            {data.readingText.split('\n').map((paragraph, idx) => (
               <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
        <p className="text-blue-800 font-medium">{data.instructions}</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {data.questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-semibold text-sm">
                  {idx + 1}
                </span>
                <div className="flex-grow">
                  <h4 className="text-lg font-medium text-slate-900 mb-4">{q.questionText}</h4>
                  
                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => {
                      const isSelected = userAnswers[q.id] === optIdx;
                      const isCorrect = q.correctAnswerIndex === optIdx;
                      let btnClass = "w-full text-left p-3 rounded-md border text-sm md:text-base transition-colors duration-200 ";
                      
                      if (showResults) {
                        if (isCorrect) btnClass += "bg-green-50 border-green-200 text-green-800 ring-1 ring-green-500 ";
                        else if (isSelected && !isCorrect) btnClass += "bg-red-50 border-red-200 text-red-800 ring-1 ring-red-500 ";
                        else btnClass += "bg-white border-slate-200 text-slate-400 opacity-60 ";
                      } else {
                        if (isSelected) btnClass += "bg-blue-50 border-blue-300 text-blue-900 ring-1 ring-blue-500 ";
                        else btnClass += "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 ";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionSelect(q.id, optIdx)}
                          disabled={showResults}
                          className={btnClass}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResults && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {showResults && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {showResults && (
                    <div className="mt-6 bg-slate-50 rounded-lg p-4 text-sm text-slate-700 border border-slate-100 flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="block font-semibold text-slate-900 mb-1">Explicação:</span>
                        {q.explanationPt}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showResults && (
        <div className="flex justify-end pt-4 pb-12">
          <button
            onClick={checkAnswers}
            disabled={Object.keys(userAnswers).length !== data.questions.length}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Verificar Respostas
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;