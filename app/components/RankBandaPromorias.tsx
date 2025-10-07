import { Card, CardBody, Spinner } from '@heroui/react';
import useGetData from '@/app/hooks/useGetData';
import RankList from '@/app/components/RankList';

interface Agente {
  Nombre_Ramo: string;
  Nombre_Promotoria: string;
  Nombre_Agente: string;
  Recno: number;
  Monto: number;
  Fecha_Ingreso: string;
  Estado_Nombre: string;
  RutaFoto?: string;
}

interface BandaRankPromotoriasProps {
  Id_Ramo: string;
}

const BandaRankPromotorias: React.FC<BandaRankPromotoriasProps> = ({ Id_Ramo }) => {
  const { data, loading } = useGetData({
    ClassName: 'Titan_Promotoria_Rank',
    Action: 'Get',
    Id_Ramo: Id_Ramo,
    url: "URL_NETAPI"
  });

  const dataRank: Agente[] = Array.isArray(data) ? (data as Agente[]) : [];

  if (loading || dataRank.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Card className="mb-6 border border-gray-200 p-6 shadow-lg">
        <CardBody>
          <p className="text-lg font-semibold text-gray-800">
            <b>RAMO:</b> {dataRank[0]?.Nombre_Ramo} | <b>PROMOTORIAS:</b> {dataRank.length}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {dataRank[0]?.Nombre_Ramo === 'VIDA'
              ? 'El ranking de Vida se calcula tomando el valor de la PCA del QeQ + PCA de cálculo KC.'
              : 'El ranking de Gastos Médicos se calcula tomando el valor de la Prima Ponderada del QeQ + la Prima Ponderada de cálculo KC.'}
          </p>
        </CardBody>
      </Card>
      <RankList data={dataRank} loading={loading} />
    </div>
  );
};

export default BandaRankPromotorias;
