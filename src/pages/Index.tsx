
import React, { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import Proforma from '../components/Proforma';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay una sesión guardada
  useEffect(() => {
    const authStatus = sessionStorage.getItem('allisAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('allisAuth', 'true');
    setIsAuthenticated(true);
  };

  // Si no está autenticado, mostrar pantalla de login
  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  // Si está autenticado, mostrar la proforma
  return <Proforma />;
};

export default Index;
