import { Card, CardHeader, CardBody, Spinner } from '@heroui/react';
import useGetData from '@/app/hooks/useGetData';
import RankList from '@/app/components/RankList';

interface Agente {
  Nombre_Ramo: string;
  Nombre_Agente: string;
  Nombre_Agente_Clave_Categoria_Cia: string; // 🔥 Se agregó para mostrar el tipo de agente
  Nombre_Promotoria: string;
  Recno: number;
  Monto: number;
  Fecha_Ingreso: string;
  Estado_Nombre: string;
  Clave_Met: string;
  Clave_Pegasus: string;
  RutaFoto?: string;
}

interface BandaRankProps {
  Id_Promotoria?: string;
  Id_Ramo: string;
  Id_Agente_Clave_Categoria_Cia: string;
  Id_Categoria?: string;
}

const BandaRank: React.FC<BandaRankProps> = ({
  Id_Promotoria,
  Id_Ramo,
  Id_Agente_Clave_Categoria_Cia,
  Id_Categoria,
}) => {
  const { data, loading } = useGetData({
    ClassName: 'Titan_Rank',
    Action: 'Get',
    Id_Promotoria: Id_Promotoria,
    Id_Ramo: Id_Ramo,
    Id_Agente_Clave_Categoria_Cia: Id_Agente_Clave_Categoria_Cia,
    Id_Categoria: Id_Categoria,
    url: "URL_NETAPI"
  });

  const dataRank: Agente[] = Array.isArray(data) ? (data as Agente[]) : [];

  return (
    <div className="w-full">
      {/* Encabezado del ranking */}
      {dataRank.length > 0 && (
        <Card className="mb-6 border border-gray-200 p-6 shadow-lg">
          <CardBody>
            {loading ? (
              <Spinner size="lg" className="mx-auto" />
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-800">
                  <b>TIPO DE AGENTE:</b>{' '}
                  {Id_Categoria === '10'
                    ? 'PROMOTOR ASOCIADO'
                    : dataRank[0]?.Nombre_Agente_Clave_Categoria_Cia}{' '}
                  | <b>RAMO:</b> {dataRank[0]?.Nombre_Ramo} |{' '}
                  <b>{Id_Categoria === '10' ? 'PROMOTORES' : 'AGENTES'}:</b>{' '}
                  {dataRank.length}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {dataRank[0]?.Nombre_Ramo === 'VIDA'
                    ? 'El ranking de Vida se calcula tomando el valor de la PCA del QeQ + PCA de cálculo KC.'
                    : 'El ranking de Gastos Médicos se calcula tomando el valor de la Prima Ponderada del QeQ + la Prima Ponderada de cálculo KC.'}
                </p>
              </>
            )}
          </CardBody>
        </Card>
      )}

      {/* Lista de Agentes usando RankList */}
      <RankList data={dataRank} loading={loading} />
    </div>
  );
};

export default BandaRank;
