'use client';

import React, { useState, useEffect, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from '@heroui/react';
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

interface Agent {
  Id_Agente: number;
  Nombre_Agente: string;
  Nombre_Promotoria: string;
  RutaFoto?: string;
  Id_Agente_Tipo: number;
  Estado_Nombre: string;
}

interface FilterValues {
  Id_Zona_Comercial: number;
  Id_Promotoria: number;
}

interface List01Props {
  className?: string;
  filterValues: FilterValues;
  searchTerm: string;
}

const List01: React.FC<List01Props> = ({
  className,
  filterValues,
  searchTerm,
}) => {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);

  const userKCContext = useContext(UserKCContext);
  if (!userKCContext) {
    throw new Error('List01 debe estar dentro de un UserKCContextProvider');
  }
  const { logInAsAgent } = useContext(UserKCContext) as any;

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);

      let params: any = {
        ClassName: 'Agentes_Ip',
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
        setAgents(response.data);
      } else {
        setAgents([]);
      }
      setLoading(false);
    };

    fetchAgents();
  }, [filterValues.Id_Zona_Comercial, filterValues.Id_Promotoria]);

  const handleSelectAgent = (agent: Agent) => {
    logInAsAgent(agent.Id_Agente);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.Nombre_Agente.toLowerCase().includes(searchTerm.toLowerCase()),
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
      <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {filterValues.Id_Promotoria !== 999999999
            ? 'Agentes de la Promotoría'
            : filterValues.Id_Zona_Comercial !== 999999999
            ? 'Agentes de la Zona'
            : 'Todos los Agentes Activos'}
        </h1>
      </div>

      <div className="max-h-96 overflow-y-auto p-3">
        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner size="lg" />
          </div>
        ) : filteredAgents.length > 0 ? (
          <div className="space-y-2">
            {filteredAgents.map((agent) => (
              <div
                key={agent.Id_Agente}
                className="group flex items-center justify-between rounded-lg p-3 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={getImageUrl(agent)} name={agent.Nombre_Agente} />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {agent.Nombre_Agente}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {agent.Nombre_Promotoria}
                    </p>
                  </div>
                </div>
                <Button
                  color="primary" 
                  size="sm"
                  onPress={() => handleSelectAgent(agent)}
                >
                  Ver más
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-500">
            No hay agentes disponibles.
          </p>
        )}
      </div>
    </div>
  );
};

export default List01;
