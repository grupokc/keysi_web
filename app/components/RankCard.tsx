import { Card, CardHeader, CardBody, Avatar } from '@heroui/react';

interface RankCardProps {
  nombrePromotoria: string;
  nombreAgente: string;
  recno: number;
  monto: number;
  fechaIngreso: string;
  estado: string;
  rutaFoto?: string;
  rankIndex?: number; // Para determinar si es oro, plata o bronce
}

const rankStyles = [
  'bg-gradient-to-b from-yellow-400 to-yellow-200 border-yellow-600 shadow-yellow-500', // Oro
  'bg-gradient-to-b from-gray-400 to-gray-200 border-gray-600 shadow-gray-500', // Plata
  'bg-gradient-to-b from-amber-500 to-amber-200 border-amber-700 shadow-amber-600', // Bronce
];

const RankCard: React.FC<RankCardProps> = ({
  nombrePromotoria,
  nombreAgente,
  recno,
  monto,
  fechaIngreso,
  estado,
  rutaFoto,
  rankIndex,
}) => {
  const dollarUSLocale = Intl.NumberFormat('en-US');

  const getImageUrl = (ruta?: string) => {
    return ruta && ruta !== 'null' && ruta !== ''
      ? `https://pegasus.grupokc.com.mx/${ruta.replace(/\\/g, '/')}`
      : 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
  };

  return (
    <Card
      className={`w-64 flex-shrink-0 transform border-4 p-4 text-center shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        ${
          rankIndex !== undefined && rankIndex < 3
            ? rankStyles[rankIndex]
            : 'border-gray-200'
        }
      `}
    >
      <CardHeader className="flex flex-col items-center">
        <Avatar
          size="lg"
          className="border-4 border-gray-200 shadow-md"
          src={getImageUrl(rutaFoto)}
          alt={nombreAgente}
        />
      </CardHeader>
      <CardBody className="text-center">
        <p className="text-lg font-bold uppercase text-gray-800">
          {nombrePromotoria}
        </p>
        <p className="text-xs text-gray-600">{nombreAgente}</p>
        <div className="mt-2 rounded-md border border-gray-300 bg-white p-2 shadow-sm">
          <p className="font-medium text-gray-700">Lugar {recno}</p>
          <p className="text-lg font-bold text-blue-600">
            ${dollarUSLocale.format(monto)}
          </p>
        </div>
        <p className="mt-2 text-xs text-gray-500">{fechaIngreso}</p>
      </CardBody>
    </Card>
  );
};

export default RankCard;
