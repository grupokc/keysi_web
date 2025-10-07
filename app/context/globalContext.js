"use client";
import React, { createContext, useContext, useState } from 'react';
import { formatISO, startOfYear, endOfMonth } from 'date-fns';

// Crear el contexto
const GlobalContext = createContext(undefined);

// Hook personalizado para usar el contexto
export const useSelectedValues = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useSelectedValues debe usarse dentro de un SelectedValuesProvider');
  }
  return context;
};

// Componente proveedor del contexto
export const GlobalContextProvider = ({ children }) => {
  const [selectedValues, setSelectedValues] = useState({
    Zona: '',
    Promotoria: '',
    FechaInicio: formatISO(startOfYear(new Date())), // Inicio del año en curso
    FechaFin: formatISO(endOfMonth(new Date())), // Fin del mes actual
    Id_Promotoria: null,
    Periodo: 'anual',
    Titulo: "Dashboard Promotoria",
    ShowBack: false,
    Id_Mes: new Date().getMonth() + 1,  // Usar el mes actual
    Anio: new Date().getFullYear(),      // Usar el año actual
    Nombre_Mes: new Intl.DateTimeFormat('es', { month: 'long' }).format(new Date()), // Mes en texto
  });

  return (
    <GlobalContext.Provider value={{ selectedValues, setSelectedValues }}>
      {children}
    </GlobalContext.Provider>
  );
};
