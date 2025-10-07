import DataGrid from '@/app/components/Grid/grid';
import { executeForCRUD } from '../services/frontBack';

export const metadata = {
  title: 'Reportes',
};

/**
 * Obtiene las configuraciones para el grid de reportes.
 */
async function fetchGridProps() {
  const response = await executeForCRUD({
    ClassName: 'GridView',
    Action: 'Get',
    GridViewName: 'TitanReportes',
  });

  if (!response?.data?.length) return null;

  const { GridViewID, Fields } = response.data[0];

  return {
    gridViewID: GridViewID,
    className: 'TitanReportes',
    sort: '[{"property":"Id_Ticket","direction":"ASC"}]',
    page: 0,
    limit: 1000,
    qs: '[]',
    db: 'Prometeo',
    uiConfig: {
      initialVisibleColumns: [
        'Nombre',
        'Nombre_Tabla_BI',
        'Fecha_Desde',
        'Fecha_Hasta',
        'Mes',
      ],
      showSearch: true,
      showColumnsDropdown: true,
      showAddNewButton: false,
      title: 'Catálogo de reportes',
      detailUrl: '/reportes/detalle/{item}',
      clickableRows: true,
      urlField: 'Nombre_Tabla_BI',
    },
  };
}

export default async function ReportesPage() {
  const gridProps = await fetchGridProps();

  return (
    <>
      {gridProps ? (
          <DataGrid {...gridProps} />
        ) : (
          <p>No hay reportes disponibles.</p>
        )}
    </>
  );
}
