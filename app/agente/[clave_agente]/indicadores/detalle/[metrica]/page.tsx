import { DataTable } from '@/app/components/Grid/dataTable';
import { Metadata } from 'next';
import { executeForCRUD } from '@/app/services/frontBack';

export const metadata: Metadata = {
  title: 'Titan :: Detalle',
};

export default async function AgentesIndicadoresDetailPage({
  params,
}: {
  params: { metrica: string; clave_agente: string };
}) {
  console.log(params);

  let title = params.metrica.replace(/titan/gi, '').replace(/_/g, ' ');

  const argsGridView = {
    ClassName: 'GridView',
    Action: 'Get',
    GridViewName: params.metrica,
  };

  const rrGridView = await executeForCRUD(argsGridView);
  const gridViewID = rrGridView.data[0].GridViewID;
  const IdProperty = rrGridView.data[0].IdProperty;
  const columns = JSON.parse(rrGridView.data[0].Fields);

  const args = {
    sort: { property: 'Clave_Pegasus', direction: 'ASC' },
    GridViewID: gridViewID,
    ClassName: params.metrica,
    IdProperty: IdProperty,
    qs: [
      {
        itemId: 'Clave_Pegasus',
        property: 'Clave_Pegasus',
        type: 'int',
        sign: 'equal',
        value: params.clave_agente,
        description: '',
      },
    ],
    page: 0,
    limit: 100,
    fromRecord: 1,
    toRecord: 20,
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4">
      <h1 className="text-center text-xl font-bold text-gray-800 md:text-3xl">
        {title}
      </h1>

      <p className="mt-2 w-full rounded border-l-4 border-yellow-500 bg-yellow-100 p-3 text-center text-xs text-yellow-700 md:max-w-2xl md:text-sm">
        Los cálculos de la columna KC son un indicativo y dependerán del estilo
        de venta del agente. Es importante que revisen las coberturas que no se
        consideran en la PCA, así como otros factores que pueden cambiar estos
        indicadores.
      </p>

      <DataTable columns={columns} args={args} />
    </div>
  );
}
