import suggestionsData from './suggestions.json';

// Obtener sugerencias iniciales
export const getInitialSuggestions = (): string[] => {
  return suggestionsData.initialSuggestions;
};

// Obtener todas las sugerencias disponibles (para debugging)
export const getAllSuggestions = () => {
  return suggestionsData;
}; 