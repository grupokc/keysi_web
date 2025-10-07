import { Card, CardHeader, CardBody } from '@heroui/react';
import BandaRankPromotorias from '@/app/components/RankBandaPromorias';
import RankBandaPromotor from '@/app/components/RankBandaPromotor';
import BandaRank from '@/app/components/RankBanda';

interface RankProps {
  person?: unknown;
}

const Rank: React.FC<RankProps> = ({ person }) => {
  return (
    <Card className="mx-auto mt-5 w-full max-w-[80vw] rounded-md bg-white shadow-lg ">
      <CardHeader className="rounded-md bg-blue-500 p-4 text-center text-xl font-bold text-white mb-3">
        RANK PROMOTORIAS
      </CardHeader>
      <CardBody className="space-y-8">
        <BandaRankPromotorias Id_Ramo="1" />
        <BandaRankPromotorias Id_Ramo="5" />

        {/* Sección de Rank Agente/Promotor */}
        <CardHeader className="rounded-md bg-blue-500 p-4 text-center text-lg font-bold text-white">
          RANK AGENTE/PROMOTOR
        </CardHeader>
        <RankBandaPromotor Id_Ramo="1" />
        <RankBandaPromotor Id_Ramo="5" />

        {/* Sección de Rank Agentes */}
        <CardHeader className="rounded-md bg-blue-500 p-4 text-center text-lg font-bold text-white">
          RANK AGENTES
        </CardHeader>
        <BandaRank Id_Ramo="1" Id_Agente_Clave_Categoria_Cia="9" />
        <BandaRank Id_Ramo="5" Id_Agente_Clave_Categoria_Cia="9" />
        <BandaRank Id_Ramo="1" Id_Agente_Clave_Categoria_Cia="10" />
        <BandaRank Id_Ramo="5" Id_Agente_Clave_Categoria_Cia="10" />
        <BandaRank Id_Ramo="1" Id_Agente_Clave_Categoria_Cia="11" />
        <BandaRank Id_Ramo="5" Id_Agente_Clave_Categoria_Cia="11" />
      </CardBody>
    </Card>
  );
};

export default Rank;
