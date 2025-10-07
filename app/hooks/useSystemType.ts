import { useState, useEffect } from 'react';

export const useSystemType = () => {
  const [systemType, setSystemType] = useState<'titan' | 'ss'>('titan');

  useEffect(() => {
    const determineSystemType = () => {
      // En desarrollo local, usar la variable de entorno
      if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SYSTEM_TYPE) {
        console.log('Development mode - Using NEXT_PUBLIC_SYSTEM_TYPE:', process.env.NEXT_PUBLIC_SYSTEM_TYPE);
        return process.env.NEXT_PUBLIC_SYSTEM_TYPE as 'titan' | 'ss';
      }

      // En producción o si no hay variable de entorno, determinar basado en el hostname
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        console.log('Current hostname:', hostname);
        
        // Verificar si es Self-Service
        if (hostname === 'ss.grupokc.com.mx' || hostname.includes('ss.grupokc.com.mx')) {
          console.log('Detected Self-Service system');
          return 'ss';
        }
        
        console.log('Detected Titan system');
        return 'titan';
      }

      return 'titan';
    };

    setSystemType(determineSystemType());
  }, []);

  return systemType;
};

// Función para forzar el tipo de sistema en desarrollo
export const forceSystemType = (type: 'titan' | 'ss') => {
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('forcedSystemType', type);
    window.location.reload();
  }
}; 