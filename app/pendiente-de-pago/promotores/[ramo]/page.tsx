"use client";
import { useRouter } from "next/navigation";
import useGetData from "@/app/hooks/useGetData";
import { dollarUSLocale } from "@/app/utils/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Skeleton,
  Button,
  Card,
  CardBody,
} from "@heroui/react";

export default function PendienteDePago({ params }: { params: { ramo: string } }) {
  const router = useRouter();
  
  const { data, loading } = useGetData({
    ClassName: "Titan_Met_Pendiente_de_Pago",
    Action: "Get",
    Ver_Promotoria: 1,
    Ramo: params.ramo,
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Agentes ({data?.length ?? 0})</h1>
        <p className="text-xs text-gray-500"><b>FUENTE:</b> Archivo Pendiente de Pago</p>
      </div>

      {/* Tabla con HeroUI */}
      <Card shadow="sm" className="overflow-hidden">
        <CardBody className="p-4">
          <Table
            isStriped
            removeWrapper
            aria-label="Lista de agentes con pagos pendientes"
            className="w-full"
          >
            <TableHeader>
              <TableColumn className="text-left">Nombre Agente</TableColumn>
              <TableColumn className="text-right">Número de Pólizas</TableColumn>
              <TableColumn className="text-right">Total PNA</TableColumn>
              <TableColumn className="text-center">Acciones</TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="text-center text-gray-500 py-4">
                  No hay datos disponibles.
                </div>
              }
            >
              {loading ? (
                // Placeholder con Skeleton mientras carga la data
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-32 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-8 w-24 rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : (
                data.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item?.Nombre_Agente}</TableCell>
                    <TableCell className="text-right">{item?.Numero_De_Polizas}</TableCell>
                    <TableCell className="text-right">{dollarUSLocale.format(item?.PNA)}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="flat"
                        color="primary"
                        size="sm"
                        onPress={() => router.push(`/pendiente-de-pago/agentes/${item?.Guid_Agente}/${params.ramo}`)}
                      >
                        Ver Detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
