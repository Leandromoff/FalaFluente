import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Menu, X, Github } from 'lucide-react';
import { LEVELS } from '../constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl text-slate-800 tracking-tight">Fala<span className="text-blue-600">Fluente</span></span>
              </Link>
              <div className="hidden md:ml-8 md:flex md:space-x-8 items-center">
                <Link to="/" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/' ? 'text-slate-900 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-700'}`}>
                  Início
                </Link>
                <Link to="/dashboard" className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname.includes('dashboard') ? 'text-slate-900 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-700'}`}>
                  Exercícios
                </Link>
              </div>
            </div>
            
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700">Início</Link>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50">Exercícios</Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-slate-400 text-center md:text-left">
            &copy; 2024 FalaFluente. Baseado na estrutura do test-english.com.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="text-slate-400 hover:text-slate-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;