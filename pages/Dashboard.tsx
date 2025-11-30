import React, { useState } from 'react';
import { CEFRLevel, Skill, ExerciseSet } from '../types.ts';
import { LEVELS, SKILLS, GRAMMAR_TOPICS, VOCAB_TOPICS } from '../constants.ts';
import { generateExercise } from '../services/geminiService.ts';
import Quiz from '../components/Quiz.tsx';
import Lesson from '../components/Lesson.tsx';
import { Loader2, ChevronRight, Play, BookOpen, PenTool } from 'lucide-react';

const Dashboard: React.FC = () => {
  // State
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const [exerciseData, setExerciseData] = useState<ExerciseSet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 'lesson' or 'quiz' tab state
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');

  // Helper to get available topics based on skill
  const getTopics = () => {
    if (selectedSkill === Skill.GRAMMAR) return GRAMMAR_TOPICS;
    if (selectedSkill === Skill.VOCABULARY) return VOCAB_TOPICS;
    // For Reading/Use of English, we can mix both or have general topics
    return [...GRAMMAR_TOPICS, ...VOCAB_TOPICS];
  };

  const handleStartExercise = async (topicId: string, topicName: string) => {
    if (!selectedLevel || !selectedSkill) return;
    
    setSelectedTopic(topicId);
    setLoading(true);
    setError(null);
    setExerciseData(null);
    setActiveTab('lesson'); // Default to lesson when new content loads

    try {
      const data = await generateExercise(selectedLevel, selectedSkill, topicName);
      setExerciseData(data);
    } catch (err) {
      setError("Não foi possível gerar o exercício. Verifique sua chave API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setExerciseData(null);
    setSelectedTopic(null);
  };

  const handleFullReset = () => {
    setSelectedLevel(null);
    setSelectedSkill(null);
    setSelectedTopic(null);
    setExerciseData(null);
  };

  // --- RENDER ---

  // 4. Content View (Lesson + Quiz)
  if (exerciseData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Breadcrumb */}
        <button onClick={handleReset} className="mb-6 text-sm text-slate-500 hover:text-blue-600 flex items-center">
          ← Voltar para tópicos
        </button>

        {/* Header */}
        <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">{exerciseData.title}</h1>
            <div className="flex gap-2 mt-3 justify-center md:justify-start">
                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                  {selectedLevel}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {selectedSkill}
                </span>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all
                ${activeTab === 'lesson' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              <BookOpen className={`mr-2 h-5 w-5 ${activeTab === 'lesson' ? 'text-blue-500' : 'text-slate-400'}`} />
              Explicação
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-all
                ${activeTab === 'quiz' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              <PenTool className={`mr-2 h-5 w-5 ${activeTab === 'quiz' ? 'text-blue-500' : 'text-slate-400'}`} />
              Exercícios
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'lesson' ? (
            <Lesson 
              intro={exerciseData.lesson.intro}
              sections={exerciseData.lesson.sections}
              onStartQuiz={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : (
            <Quiz data={exerciseData} onReset={handleReset} />
          )}
        </div>
      </div>
    );
  }

  // Loading View
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <h3 className="text-xl font-semibold text-slate-800">Preparando sua aula...</h3>
        <p className="text-slate-500 mt-2 max-w-md">
          A IA está gerando uma explicação detalhada e exercícios exclusivos para o nível {selectedLevel}.
        </p>
      </div>
    );
  }

  // 1. Level Selection (Default View)
  if (!selectedLevel) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">Escolha o seu Nível</h1>
        <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
          Selecione o nível de dificuldade para começar. O conteúdo será adaptado para o padrão CEFR.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => setSelectedLevel(lvl.id as CEFRLevel)}
              className="group relative bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className={`absolute top-0 left-0 w-2 h-full rounded-l-xl ${lvl.color}`} />
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${lvl.text}`}>{lvl.id}</span>
                <ChevronRight className="h-5 w-6 text-slate-300 group-hover:text-slate-500" />
              </div>
              <p className="text-slate-600 font-medium">{lvl.label}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. Skill Selection
  if (!selectedSkill) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => setSelectedLevel(null)} className="mb-8 text-sm text-slate-500 hover:text-blue-600 flex items-center">
          ← Mudar nível ({selectedLevel})
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">O que você quer praticar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill.id as Skill)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all text-left group"
              >
                <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                  <Icon className="h-6 w-6 text-slate-600 group-hover:text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{skill.label}</h3>
                <p className="text-sm text-slate-500">{skill.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    );
  }

  // 3. Topic Selection
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8 text-sm text-slate-500">
        <button onClick={handleFullReset} className="hover:text-blue-600">Níveis</button>
        <ChevronRight className="h-4 w-4" />
        <button onClick={() => setSelectedSkill(null)} className="hover:text-blue-600">{selectedSkill}</button>
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-2">Tópicos de {selectedSkill}</h2>
      <p className="text-slate-500 mb-8">Selecione um tópico para gerar uma aula e exercícios exclusivos.</p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getTopics().map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleStartExercise(topic.id, topic.name)}
            className="flex items-center p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group text-left"
          >
            <div className="flex-shrink-0 bg-blue-50 p-2 rounded-full mr-4 group-hover:bg-blue-100">
               <Play className="h-4 w-4 text-blue-600 ml-0.5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-700">{topic.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{topic.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;