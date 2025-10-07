import { useRouter } from 'next/navigation';
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';

// Definir la interfaz para las props del componente
interface ProspectItemProps {
  Nombre_Helios_Bono_Catalogo: string;
  Id_Helios_Bono_Catalogo: number;
  Id_Ramo: number;
  Nombre_Ramo: string;
  Fecha_Desde: string;
  Fecha_Hasta: string;
  Nombre_Cia: string;
  Id_Helios_Bono_Periodo: number;
  Nombre_Helios_Cuaderno_Bono: string;
  Id_Helios_Bono_Tipo: number;
  Cumplimiento_Banda: number;
  Cumplimiento_Requisitos: number;
  Con_Tabla: number;
}

// Función para obtener el color del `Chip` según el cumplimiento
const getComplianceColor = (
  value: number,
  type: 'requisitos' | 'banda',
): 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'secondary' => {
  if (type === 'requisitos') {
    if (value >= 100) return 'success'; // Cumple al 100%
    if (value >= 60) return 'warning'; // Cumplimiento medio
    return 'danger'; // No cumple
  }
  if (type === 'banda') {
    if (value >= 100) return 'success'; // Cumple al 100%
    if (value >= 80) return 'warning'; // Cumplimiento medio
    return 'danger'; // No cumple
  }
  return 'default';
};

const ProspectItem: React.FC<ProspectItemProps> = ({
  Nombre_Helios_Bono_Catalogo,
  Id_Helios_Bono_Catalogo,
  Id_Ramo,
  Nombre_Ramo,
  Fecha_Desde,
  Fecha_Hasta,
  Nombre_Cia,
  Id_Helios_Bono_Periodo,
  Nombre_Helios_Cuaderno_Bono,
  Id_Helios_Bono_Tipo,
  Cumplimiento_Banda,
  Cumplimiento_Requisitos,
  Con_Tabla,
}) => {
  const router = useRouter();

  // Manejo de la navegación al hacer click en la tarjeta
  const handleOnClick = () => {
    const basePath = Id_Helios_Bono_Tipo === 2 ? 'pdf' : 'detalles';
    router.push(
      `/bonos/${basePath}/${Id_Helios_Bono_Catalogo}-${Id_Helios_Bono_Periodo}`,
    );
  };

  return (
    <Card
      isPressable
      className="mx-auto flex h-80 w-[320px] cursor-pointer flex-col rounded-xl border border-gray-300 bg-white shadow-lg transition-all hover:shadow-2xl"
      onPress={handleOnClick}
    >
      {/* Título */}
      <CardHeader className="rounded-t-lg border-b border-gray-200 bg-blue-50 p-5 text-center text-gray-900">
        <h2 className="text-lg font-bold uppercase leading-tight tracking-wide">
          {Nombre_Helios_Bono_Catalogo}
        </h2>
      </CardHeader>

      {/* Contenido Principal */}
      <CardBody className="flex h-full flex-col justify-between p-6">
        {/* Periodo */}
        <div className="text-center">
          <p className="text-base font-bold uppercase text-gray-700">Periodo</p>
          <p className="text-lg font-semibold text-gray-900">
            {Fecha_Desde} - {Fecha_Hasta}
          </p>
        </div>

        {/* Chips de cumplimiento */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {Cumplimiento_Requisitos >= 0 && (
            <Chip
              color={getComplianceColor(Cumplimiento_Requisitos, 'requisitos')}
              className="px-5 py-2 text-sm font-semibold"
            >
              Requisitos
            </Chip>
          )}
          {Con_Tabla > 0 && Cumplimiento_Banda >= 0 && (
            <Chip
              color={getComplianceColor(Cumplimiento_Banda, 'banda')}
              className="px-5 py-2 text-sm font-semibold"
            >
              Banda
            </Chip>
          )}
        </div>

        {/* Botón para abrir el Popover */}
        <Popover placement="bottom">
          <PopoverTrigger>
            <Button variant="light" size="sm" className="mt-6">
              Informacion extra ▼
            </Button>
          </PopoverTrigger>
          <PopoverContent className="rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-lg">
            <p className="text-gray-700">
              <strong className="text-gray-900">Ramo:</strong> {Nombre_Ramo}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Empresa:</strong> {Nombre_Cia}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Cuaderno:</strong>{' '}
              {Nombre_Helios_Cuaderno_Bono}
            </p>
          </PopoverContent>
        </Popover>
      </CardBody>
    </Card>
  );
};
export default ProspectItem;
