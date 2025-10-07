'use client';

import { useState, useMemo } from 'react';
import useGetData from '@/app/hooks/useGetData';
import { Card, CardBody, Avatar, Chip, Button } from '@heroui/react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { ChartBarIcon } from '@heroicons/react/solid';
import Search from './Grid/search';
import { useRouter } from "next/navigation";

// 📌 Definimos la interfaz del agente
interface IAgente {
  Id_Agente: number;
  Clave_Pegasus: string;
  Clave_Met:string;
  Nombre_Agente: string;
  Fecha_Ingreso: string;
  Nombre_Agente_Clave_Categoria_Cia: string;
  Estado_Nombre: string;
  Correo_Personal: string;
  Telefono_Celular: string;
  RutaFoto: string;
}

// 📌 Función para obtener la URL de la imagen del agente
const getImageUrl = (user: IAgente) => {
  return user.RutaFoto && user.RutaFoto !== 'null'
    ? `https://pegasus.grupokc.com.mx/${user.RutaFoto.replace(/\\/g, '/')}`
    : 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
};

export default function AgentesList() {
  const [filterValue, setFilterValue] = useState('');
  const router = useRouter();

  // 📌 Aplicamos una type assertion para evitar problemas con never[]
  const { data: dataAgentes } = useGetData({
    ClassName: 'Titan_Agentes_X_Promotoria',
    Action: 'List',
  }) as { data: IAgente[] };

  // 📌 Filtrado optimizado con useMemo para mejorar rendimiento
  const filteredAgents = useMemo(() => {
    if (!dataAgentes) return [];
    return filterValue.trim()
      ? dataAgentes.filter((item) =>
          item.Nombre_Agente.toLowerCase().includes(filterValue.toLowerCase()),
        )
      : dataAgentes;
  }, [filterValue, dataAgentes]);

  // 📌 Función para limpiar la búsqueda
  const handleClearSearch = () => {
    setFilterValue('');
  };

  return (
    <div className="w-full bg-white py-6">
      <div className="mx-auto  px-6 lg:px-8">
        {/* 📌 Input de búsqueda con Search de HeroUI */}
        <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
          <h1 className="text-lg font-semibold text-gray-900">
            Agentes ({filteredAgents.length})
          </h1>
          <div className="flex items-center gap-4">
            <Search
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              onClear={handleClearSearch}
            />
            <Button
              color="primary"
              variant="solid"
              className="whitespace-nowrap"
              onPress={() => router.push('/promotores/metricas')}
            >
              Reporte de Métricas
            </Button>
          </div>
        </div>

        {/* 📌 Lista de agentes */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.Id_Agente}
              className="flex flex-col items-center rounded-lg border border-gray-200 p-4 shadow-sm relative"
            >
              {/* 📌 Botón de Indicadores */}
              <div className="absolute right-2 top-2">
                <div className="relative flex items-center">
                  <button
                    type="button"
                    className="p-1 text-gray-300 hover:text-primary focus:outline-none"
                    onClick={() => {
                      sessionStorage.setItem("agenteSeleccionado", JSON.stringify(agent));
                      router.push("/promotores/indicadoresAgente");
                    }}
                    onMouseEnter={e => {
                      const tooltip = e.currentTarget.nextSibling as HTMLElement | null;
                      if (tooltip) tooltip.classList.remove('hidden');
                    }}
                    onMouseLeave={e => {
                      const tooltip = e.currentTarget.nextSibling as HTMLElement | null;
                      if (tooltip) tooltip.classList.add('hidden');
                    }}
                  >
                    <ChartBarIcon className="h-5 w-5" />
                  </button>
                  <span className="hidden absolute top-7 right-0 z-10 rounded bg-gray-800 px-2 py-1 text-xs text-white whitespace-nowrap shadow-lg">
                    Indicadores
                  </span>
                </div>
              </div>

              {/* 📌 Imagen del Agente */}
              <Avatar
                src={getImageUrl(agent)}
                className="h-20 w-20 rounded-full border"
                alt={`Foto de ${agent.Nombre_Agente}`}
              />

              {/* 📌 Información */}
              <CardBody className="flex flex-col items-center p-2 text-center">
                {/* 📌 Estado con Chip (Mejor Posicionado) */}
                <div className="mb-2">
                  <Chip
                    variant="flat"
                    color={
                      agent.Estado_Nombre === 'ACTIVO' ? 'success' : 'danger'
                    }
                    className="text-xs"
                  >
                    {agent.Estado_Nombre}
                  </Chip>
                </div>
                <h3 className="text-sm font-bold text-gray-900">
                  {agent.Nombre_Agente} 
                </h3>
                <h3 className="text-xs  text-gray-900">
                  Clave MetLife: {agent.Clave_Met}
                </h3>

                <p className="text-xs text-gray-500">
                  {agent.Nombre_Agente_Clave_Categoria_Cia}
                </p>
              </CardBody>

              {/* 📌 Acciones (Correo y Teléfono) */}
              <div className="mt-2 flex w-full justify-between">
                <Button
                  as="a"
                  href={`mailto:${agent.Correo_Personal}`}
                  variant="light"
                  className="flex w-1/2 items-center justify-center gap-2 text-xs"
                >
                  <MailIcon className="h-4 w-4 text-gray-500" />
                  Correo
                </Button>
                <Button
                  as="a"  
                  href={`tel:${agent.Telefono_Celular}`}
                  variant="light"
                  className="flex w-1/2 items-center justify-center gap-2 text-xs"
                >
                  <PhoneIcon className="h-4 w-4 text-gray-500" />
                  Llamar
                </Button>
                <Button
                    onPress={() => {
                      sessionStorage.setItem("agenteSeleccionado", JSON.stringify(agent));
                      router.push("/promotores/indicadoresAgente");
                    }}
                  variant="light"
                  className="flex w-1/2 items-center justify-center gap-2 text-xs"
                >
                   <ChartBarIcon  className="h-4 w-4 text-gray-500"  />
                  Indicadores
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
