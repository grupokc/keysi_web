"use client";

import DataGrid from '@/app/components/Grid/grid';
import { executeForCRUD } from '@/app/services/frontBack';
import { useEffect, useState } from 'react';

interface GridProps {
  gridViewID: string;
  className: string;
  sort: string;
  page: number;
  limit: number;
  qs: string;
  db: string;
  uiConfig: {
    showSearch: boolean;
    showColumnsDropdown: boolean;
    showAddNewButton: boolean;
    title: string;
    detailUrl: string;
    clickableRows: boolean;
    urlField: string;
    initialVisibleColumns: string[];
  };
  columns: Array<{
    key: string;
    header: string;
    width: string;
    type: string;
    order: string;
    isVisible: boolean;
  }>;
}

interface Field {
  name: string;
  header: string;
  width: string;
  xType: string;
  order: string;
  isVisible: boolean;
}

interface GridGenericoProps {
  Clave_Agente: number;
}

export default function GridGenerico({ Clave_Agente }: GridGenericoProps) {
  const [gridProps, setGridProps] = useState<GridProps | null>(null);

  useEffect(() => {
    async function fetchGridProps() {
      const response = await executeForCRUD({
        ClassName: 'GridView',
        Action: 'Get',
        GridViewName: 'Prospectos',
      });
    
      if (!response?.data?.length) return null;
    
      const { GridViewID, Fields, GridViewName } = response.data[0];
    
      let parsedFields: Field[] = [];
      try {
        parsedFields = JSON.parse(Fields);
      } catch (error) {
        console.error('Error parsing Fields:', error);
        return null;
      }

      const filteredFields = parsedFields.filter((field: Field) => {
        // Solo incluir columnas visibles
        if (!field.isVisible) return false;
        
        // Excluir columnas que empiezan con Id_ (excepto las necesarias)
        if (field.name.startsWith('Id_')) return false;
        
        return true;
      });

      setGridProps({
        gridViewID: GridViewID,
        className: GridViewName,
        sort: '[{"property":"Id_Ticket","direction":"ASC"}]',
        page: 0,
        limit: 1000,
        qs: JSON.stringify([{
          itemId: "Clave_Agente",
          property: "Clave_Agente",
          type: "number",
          sign: "equal",
          value: Clave_Agente
        }]),
        db: 'Prometeo',
        uiConfig: {
          showSearch: true,
          showColumnsDropdown: false,
          showAddNewButton: false,
          title: GridViewName,
          detailUrl: '',
          clickableRows: false,
          urlField: '',
          initialVisibleColumns: filteredFields.map(field => field.name)
        },
        columns: filteredFields.map(field => ({
          key: field.name,
          header: field.header,
          width: field.width,
          type: field.xType,
          order: field.order,
          isVisible: field.isVisible
        }))
      });
    }

    fetchGridProps();
  }, [Clave_Agente]);

  if (!gridProps) return <p>Cargando...</p>;

  return <DataGrid {...gridProps} />;
} 