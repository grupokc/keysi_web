"use client";
import { useState, useEffect } from "react";
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
  Card,
  CardBody,
} from "@heroui/react";

interface PolicyData {
  Nombre_Agente: string;
  Poliza: string;
  Nombre_Asegurado: string;
  Conducto_De_Cobro: string;
  Frecuencia_Pago: string;
  PNA: number;
  Fecha_Emision: string;
  Producto: string;
}

const DetallePolizaPage = ({ params }: { params: { guid_agente: string; ramo: string } }) => {
  const { data: fetchedData, loading } = useGetData({
    ClassName: "Titan_Met_Pendiente_de_Pago",
    Action: "Get",
    Ver_Promotoria: "0",
    Guid_Agente: params?.guid_agente,
    Ramo: params?.ramo,
  });

  const [data, setData] = useState<PolicyData[]>([]);

  useEffect(() => {
    setData(fetchedData);
  }, [fetchedData]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Agente: {data.length > 0 ? data[0].Nombre_Agente : "Cargando..."}
        </h1>
        <p className="text-xs text-gray-500">
          <b>FUENTE:</b> Archivo Pendiente de Pago
        </p>
      </div>

      {/* Tabla con HeroUI */}
      <Card shadow="sm" className="overflow-hidden">
        <CardBody className="p-4">
          <Table
            isStriped
            removeWrapper
            aria-label="Lista de pólizas pendientes"
            className="w-full"
          >
            <TableHeader>
              <TableColumn className="text-left">Póliza</TableColumn>
              <TableColumn className="text-right">Nombre Asegurado</TableColumn>
              <TableColumn className="text-right">Conducto de Cobro</TableColumn>
              <TableColumn className="text-right">Frecuencia de Pago</TableColumn>
              <TableColumn className="text-right">PNA</TableColumn>
              <TableColumn className="text-right">Fecha Emisión</TableColumn>
              <TableColumn className="text-right">Producto</TableColumn>
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
                    <TableCell><Skeleton className="h-4 w-24 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-28 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-16 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-4 w-24 rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : (
                data.map((policy, index) => (
                  <TableRow key={index}>
                    <TableCell>{policy.Poliza}</TableCell>
                    <TableCell className="text-right">{policy.Nombre_Asegurado}</TableCell>
                    <TableCell className="text-right">{policy.Conducto_De_Cobro}</TableCell>
                    <TableCell className="text-right">{policy.Frecuencia_Pago}</TableCell>
                    <TableCell className="text-right">{dollarUSLocale.format(policy.PNA)}</TableCell>
                    <TableCell className="text-right">{policy.Fecha_Emision}</TableCell>
                    <TableCell className="text-right">{policy.Producto}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default DetallePolizaPage;
