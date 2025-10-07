"use client";
import { Button, Card, CardHeader, CardBody, Skeleton } from "@heroui/react";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Loading from "@/app/components/Loading";

interface EdoctaDetalleProps {
  showResumen: () => void;
  Id_Agente: number;
  Id_Liquidacion: number;
}

export default function EdoctaDetalle({
  showResumen,
  Id_Agente,
  Id_Liquidacion,
}: EdoctaDetalleProps) {
  const url = `https://pegasus.grupokc.com.mx/V3/Estado_De_Cuenta/?Id_Agente=${Id_Agente}&Id_Liquidacion=${Id_Liquidacion}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Encabezado */}
      <Card shadow="sm">
        <CardHeader className="flex items-center justify-between px-4 py-3">
          <Button
            onPress={showResumen}
            color="primary"
            variant="flat"
            size="sm"
            startContent={<ChevronLeftIcon className="h-5 w-5" />}
          >
            Regresar
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Estado de Cuenta</h1>
        </CardHeader>

        {/* Contenedor del iframe */}
        <CardBody className="p-4">
          {Id_Liquidacion > 0 ? (
            <div className="w-full">
              <iframe
                title="Estado de Cuenta"
                className="h-[75vh] w-full rounded-md border border-gray-300"
                src={url}
              ></iframe>
            </div>
          ) : (
            <Skeleton className="h-[75vh] w-full rounded-md" />
          )}
        </CardBody>
      </Card>

      {/* Indicador de carga */}
      {Id_Liquidacion === 0 && <Loading />}
    </div>
  );
}
