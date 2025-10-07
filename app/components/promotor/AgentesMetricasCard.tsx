'use client';

import { useState, useEffect } from 'react';
import useGetData from '@/app/hooks/useGetData';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@heroui/react';
import { UsersIcon } from '@heroicons/react/solid';

interface AgenteMetrica {
  Id_Agente_Clave_Categoria_Cia: number;
  Nombre_Agente_Clave_Categoria_Cia: string;
  Agentes: number;
}

export default function AgentesMetricaCard() {
  const [user, setUser] = useState<Record<string, any> | null>(null);

  const { data } = useGetData({
    ClassName: 'Titan_Agentes_X_Promotoria',
    Action: 'Get',
    url: "URL_NETAPI"
  });
  const dMetricas = (data as AgenteMetrica[]) || [];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {/* Cabecera más alineada al encabezado */}
      <div className="flex items-center gap-2 px-4 py-3 font-semibold text-gray-900">
        <UsersIcon className="h-5 w-5 text-gray-600" />
        <span className="text-lg">Agentes</span>
      </div>

      <CardBody className="p-4">
        {dMetricas.length > 0 ? (
          <Table aria-label="Lista de Agentes">
            <TableHeader>
              <TableColumn className="border-b text-left font-medium text-gray-700">
                Categoría
              </TableColumn>
              <TableColumn className="border-b text-center font-medium text-gray-700">
                # Agentes
              </TableColumn>
            </TableHeader>
            <TableBody>
              {dMetricas.map((item) => (
                <TableRow key={item.Id_Agente_Clave_Categoria_Cia}>
                  <TableCell className="text-gray-800">
                    {item.Nombre_Agente_Clave_Categoria_Cia}
                  </TableCell>
                  <TableCell className="text-center text-gray-800">
                    {item.Agentes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="py-4 text-center text-gray-500">
            No hay datos disponibles.
          </p>
        )}
      </CardBody>

      {/* Ajuste en los botones */}
      <div className="flex justify-center gap-3 p-4">
        <Button
          variant="solid"
          color="primary"
          className="rounded-md px-4 py-2 text-sm shadow"
          onPress={() => (window.location.href = '/promotores/agentes')}
        >
          Ver Agentes
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="rounded-md px-4 py-2 text-sm shadow"
          onPress={() => (window.location.href = '/promotores/agentes_rank')}
        >
          Ver Rank
        </Button>
      </div>
    </>
  );
}
