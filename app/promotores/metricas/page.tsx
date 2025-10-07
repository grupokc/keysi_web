"use client";

import { useState, useEffect } from 'react';
import MetricasGrid from '../../components/promotor/metricasAgentes/MetricasGrid';

interface User {
  Id_Promotoria?: number;
  Nombre_Promotoria?: string;
}

export default function MetricasPromotoria() {
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

  if (!user.Id_Promotoria) {
    return <div>No se encontró información de la promotoría</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white p-4">
      <MetricasGrid idPromotoria={user.Id_Promotoria} />
    </div>
  );
}
