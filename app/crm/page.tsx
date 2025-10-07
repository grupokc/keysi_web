"use client";

import { useState, useEffect } from 'react';
import GridGenerico from '@/app/components/GridGenerico';

interface User {
  Clave_Agente?: number;
}

export default function RegistroSolicitudes() {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user.Clave_Agente) {
    return <div>No se encontró información del agente</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white p-4">
      <GridGenerico Clave_Agente={user.Clave_Agente} />
    </div>
  );
}
