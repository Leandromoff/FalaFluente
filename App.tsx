import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Usamos HashRouter para garantir compatibilidade total com GitHub Pages e outros hosts estáticos.
// Isso evita erros 404 ao recarregar a página em subdiretórios.
const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;