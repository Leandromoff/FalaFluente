import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Globe, Brain, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto pt-16 pb-20 px-4 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 lg:text-left text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Inglês estruturado</span>{' '}
                <span className="block text-blue-600 xl:inline">para brasileiros</span>
              </h1>
              <p className="mt-4 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Aprenda com a estrutura do quadro europeu (A1-C1) com explicações focadas nas dificuldades de quem fala português. Exercícios infinitos gerados por IA.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                 <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center lg:justify-end relative">
               {/* Abstract Grid Visual */}
               <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mr-0 opacity-90">
                  <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center aspect-square shadow-sm">
                     <span className="text-3xl font-bold text-emerald-600 mb-2">A1-C1</span>
                     <span className="text-xs text-emerald-800 font-medium">Níveis CEFR</span>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center aspect-square shadow-sm translate-y-8">
                     <Brain className="h-10 w-10 text-blue-600 mb-2" />
                     <span className="text-xs text-blue-800 font-medium">IA Generativa</span>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex flex-col items-center justify-center aspect-square shadow-sm">
                      <Globe className="h-10 w-10 text-purple-600 mb-2" />
                      <span className="text-xs text-purple-800 font-medium">Contexto BR</span>
                  </div>
                   <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex flex-col items-center justify-center aspect-square shadow-sm translate-y-8">
                      <Zap className="h-10 w-10 text-orange-600 mb-2" />
                      <span className="text-xs text-orange-800 font-medium">Feedback Rápido</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">Por que o FalaFluente?</h2>
            <p className="mt-4 text-lg text-slate-500">Uma abordagem moderna baseada nos métodos tradicionais que funcionam.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Padrão Internacional</h3>
              <p className="text-slate-500 leading-relaxed">
                Todo o conteúdo é rigorosamente organizado pelos níveis A1 (Iniciante) até C1 (Avançado), ideal para preparação de exames.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Exercícios Infinitos</h3>
              <p className="text-slate-500 leading-relaxed">
                Diferente de livros estáticos, nossa IA gera novas perguntas a cada tentativa. Você nunca fará o mesmo exercício duas vezes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Focado no Brasileiro</h3>
              <p className="text-slate-500 leading-relaxed">
                Entendemos por que você confunde "Make" e "Do" ou "In" e "On". As explicações atacam diretamente os vícios de linguagem do português.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;