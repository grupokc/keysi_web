'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from '@heroui/react';
import { cn } from '@/lib/utils';
import { executeForCRUD } from '@/app/services/frontBack';
import { Avatar, Button } from '@heroui/react';
import { UserKCContext } from '@/app/context/userKCContext';

const getImageUrl = (user: { RutaFoto?: string }): string => {
  let url = 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
  if (
    user?.RutaFoto &&
    user?.RutaFoto !== 'null' &&
    user?.RutaFoto.trim() !== ''
  ) {
    const foto = user.RutaFoto.replace(/\\/g, '/');
    url = `https://pegasus.grupokc.com.mx/${foto}`;
  }
  return url;
};

// Definimos la estructura del promotor y agentes
interface Promotor {
  Id_Agente: number;
  Guid_Promotoria: string;
  Id_Promotoria: number;
  Nombre_Agente: string;
  Nombre_Promotoria: string;
  RutaFoto?: string;
}

interface FilterValues {
  Id_Zona_Comercial: number;
  Id_Promotoria: number;
}

interface List02Props {
  className?: string;
  filterValues: FilterValues;
  searchTerm: string;
}

const List02: React.FC<List02Props> = ({
  className,
  filterValues,
  searchTerm,
}) => {
  const [loading, setLoading] = useState(true);
  const [promotores, setPromotores] = useState<Promotor[]>([]);

  // Obtener el contexto de usuario
  const userKCContext = useContext(UserKCContext);
  if (!userKCContext) {
    throw new Error('List02 debe estar dentro de un UserKCContextProvider');
  }
  const { logInAsAgent } = userKCContext as any;

  useEffect(() => {
    const fetchPromotores = async () => {
      setLoading(true);
      let params: any = {
        ClassName: 'Promotores_Ip',
        Action: 'List',
        Id_Zona_Comercial:
          filterValues.Id_Zona_Comercial !== 999999999
            ? filterValues.Id_Zona_Comercial
            : undefined,
        Id_Promotoria:
          filterValues.Id_Promotoria !== 999999999
            ? filterValues.Id_Promotoria
            : undefined,
      };

      const response = await executeForCRUD(params);
      if (response.success && Array.isArray(response.data)) {
        setPromotores(response.data);
      } else {
        setPromotores([]);
      }
      setLoading(false);
    };
    fetchPromotores();
  }, [filterValues.Id_Zona_Comercial, filterValues.Id_Promotoria]);

  // Función para seleccionar un promotor y cambiar el agente activo
  const handleSelectPromotor = (promotor: Promotor) => {
    logInAsAgent(promotor.Id_Agente);
  };

  const filteredPromotores = promotores.filter((promotor) =>
    promotor.Nombre_Agente.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-xl',
        'bg-white dark:bg-zinc-900/70',
        'border border-zinc-100 dark:border-zinc-800',
        'rounded-xl shadow-sm backdrop-blur-xl',
        className,
      )}
    >
      {/* Sección de título */}
      <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {filterValues.Id_Promotoria !== 999999999
            ? 'Promotor Filtrado'
            : filterValues.Id_Zona_Comercial !== 999999999
            ? 'Promotores de la Zona'
            : 'Todos los Promotores'}
        </h1>
      </div>

      {/* Contenedor con scroll */}
      <div className="max-h-96 overflow-y-auto p-3">
        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner size="lg" />
          </div>
        ) : filteredPromotores.length > 0 ? (
          <div className="space-y-2">
            {filteredPromotores.map((promotor) => (
              <div
                key={
                  promotor.Guid_Promotoria ||
                  `promotor-${promotor.Id_Promotoria}`
                }
                className={cn(
                  'group flex items-center justify-between',
                  'rounded-lg p-3',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800/50',
                  'transition-all duration-200',
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={getImageUrl(promotor)}
                    name={promotor.Nombre_Agente}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {promotor.Nombre_Agente}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {promotor.Nombre_Promotoria}
                    </p>
                  </div>
                </div>
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => handleSelectPromotor(promotor)}
                >
                  Ver más
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-500">
            No hay promotores disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default List02;
