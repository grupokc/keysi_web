'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useComunicados } from '@/app/hooks/useComunicados';

interface ComunicadosContextType {
  showComunicados: boolean;
  setShowComunicados: (show: boolean) => void;
  closeComunicados: () => void;
  hasComunicados: boolean;
  hasUnreadComunicados: boolean;
  loading: boolean;
  shouldAutoShow: boolean;
  resetAutoShow: () => void;
  forceRefresh: () => void;
  forceAutoShowAfterLogin: () => void;
}

const ComunicadosContext = createContext<ComunicadosContextType | undefined>(undefined);

export const useComunicadosContext = () => {
  const context = useContext(ComunicadosContext);
  if (context === undefined) {
    throw new Error('useComunicadosContext must be used within a ComunicadosProvider');
  }
  return context;
};

export const ComunicadosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showComunicados, setShowComunicados] = useState(false);
  const [hasBeenClosedManually, setHasBeenClosedManually] = useState(false);
  const { 
    hasComunicados, 
    hasUnreadComunicados, 
    loading, 
    shouldAutoShow, 
    resetAutoShow,
    forceRefresh
  } = useComunicados();

  // Efecto para manejar el auto-show del modal de comunicados
  useEffect(() => {
    if (shouldAutoShow && !showComunicados && !hasBeenClosedManually) {
      setShowComunicados(false);
      resetAutoShow(); // Resetear para evitar que se muestre múltiples veces
    }
  }, [shouldAutoShow, showComunicados, resetAutoShow, hasBeenClosedManually]);

  // Función para cerrar el modal y marcar que fue cerrado manualmente
  const handleCloseComunicados = () => {
    setShowComunicados(false);
    setHasBeenClosedManually(true);
  };

  // Función para forzar la apertura automática después del login
  const forceAutoShowAfterLogin = () => {
    setHasBeenClosedManually(false); // Resetear para permitir apertura automática
    forceRefresh(); // Forzar verificación de comunicados
  };

  const value = {
    showComunicados,
    setShowComunicados,
    closeComunicados: handleCloseComunicados,
    hasComunicados,
    hasUnreadComunicados,
    loading,
    shouldAutoShow,
    resetAutoShow,
    forceRefresh,
    forceAutoShowAfterLogin
  };

  return (
    <ComunicadosContext.Provider value={value}>
      {children}
    </ComunicadosContext.Provider>
  );
}; 