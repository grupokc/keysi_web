'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/app/components/Grid/dataTable';
import { executeForCRUD } from '@/app/services/frontBack';

interface User {
  Id_Promotoria: number;
  Id_Categoria: number;
  Clave_Agente: number;
}

export default function DetalleReportePage({
  params,
}: {
  params: { Nombre_Tabla_BI: string };
}) {
  const [state, setState] = useState<{
    user: User | null;
    args: any | null;
    columns: any | null;
  }>({
    user: null,
    args: null,
    columns: null,
  });

  useEffect(() => {
    const getGrid = async () => {
      try {
        // Recupera datos del usuario desde localStorage
        const userLocalStr = window.localStorage.getItem('user');
        const userLocal = userLocalStr ? JSON.parse(userLocalStr) : null;

        if (!userLocal) {
          console.error('No se encontró usuario en localStorage');
          return;
        }

        const { Id_Promotoria, Id_Categoria, Clave_Agente } = userLocal;

        // Ejecuta la operación CRUD para obtener los datos del GridView
        const argsGridView = {
          ClassName: 'GridView',
          Action: 'Get',
          GridViewName: `Titan_${params.Nombre_Tabla_BI}`,
        };

        const rrGridView = await executeForCRUD(argsGridView);
        if (!rrGridView?.data?.length) {
          console.error('No se encontraron datos en rrGridView:', rrGridView);
          return;
        }

        const { GridViewID, IdProperty, Fields } = rrGridView.data[0];

        // Procesa y filtra las columnas
        const parsedFields = parseFields(Fields);
        if (!parsedFields.length) {
          console.error('No hay columnas visibles después del filtrado.');
          return;
        }

        const columnsForGrid = parsedFields.filter(
          (field: any) =>
            field.isVisible &&
            !field.name.includes('Id_') &&
            !['Id_Promotoria', 'Clave_Pegasus'].includes(field.name),
        );

        // Determina los parámetros de consulta basados en la categoría del usuario
        const qs = generateQueryParams(
          Id_Categoria,
          Id_Promotoria,
          Clave_Agente,
        );

        // Configura los argumentos para la tabla
        const gridArgs = {
          sort: { property: IdProperty, direction: 'ASC' },
          ClassName: `Titan_${params.Nombre_Tabla_BI}`,
          IdProperty,
          GridViewID,
          qs,
          page: 0,
          limit: 100,
          fromRecord: 1,
          toRecord: 20,
          db: 'Prometeo',
          url_onclick: '',
        };

        // Actualiza el estado con los valores obtenidos
        setState({ user: userLocal, args: gridArgs, columns: columnsForGrid });
      } catch (error) {
        console.error('Error en getGrid:', error);
      }
    };

    getGrid();
  }, [params.Nombre_Tabla_BI]); // Se ejecuta solo cuando cambia el nombre de la tabla

  return state.columns && state.args ? (
    <DataTable columns={state.columns} args={state.args} />
  ) : null;
}

// 🔹 Función para analizar y validar Fields
const parseFields = (fields: any): any[] => {
  try {
    return typeof fields === 'string'
      ? JSON.parse(fields)
      : Array.isArray(fields)
      ? fields
      : [];
  } catch (error) {
    console.error('Error al analizar el JSON de Fields:', error);
    return [];
  }
};

// 🔹 Función para generar parámetros de consulta
const generateQueryParams = (
  Id_Categoria: number,
  Id_Promotoria: number,
  Clave_Agente: number,
) => {
  return Id_Categoria === 10
    ? [
        {
          itemId: 'Id_Promotoria',
          property: 'Id_Promotoria',
          type: 'int',
          sign: 'equal',
          value: Id_Promotoria,
          description: '',
        },
      ]
    : [
        {
          itemId: 'Clave_Pegasus',
          property: 'Clave_Pegasus',
          type: 'int',
          sign: 'equal',
          value: Clave_Agente,
          description: '',
        },
      ];
};
