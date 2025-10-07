"use client";
import { useState } from "react";
import useGetData from "@/app/hooks/useGetData";
import Loading from "@/app/components/Loading";
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
  Button,
  Pagination,
} from "@heroui/react";

interface ComisionData {
  Row: number;
  Id_Agente: number;
  Id_Liquidacion: number;
  Periodo_Nombre: string;
  Ingresos: number;
  Egresos: number;
  Total: number;
}

interface EdoctaResumenProps {
  verDetalle: (Id_Agente: number, Id_Liquidacion: number) => void;
}

export default function EdoctaResumen({ verDetalle }: EdoctaResumenProps) {
  const dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: dataComisiones, loading } = useGetData({
    ClassName: "Comisiones_X_Agente",
    Action: "get",
    db: "GrupoKCBI",
  });

  // Estado de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Obtener los datos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataComisiones.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold text-gray-900">Estados de Cuenta</h1>
        <p className="text-xs text-gray-500">
          <b>FUENTE:</b> Liquidación de comisiones, Sistema Pegasus
        </p>
      </div>

      {/* Tabla con HeroUI */}
      <Card shadow="sm" className="overflow-hidden">
        <CardBody className="p-4">
          <Table isStriped removeWrapper aria-label="Estados de cuenta">
            <TableHeader>
              <TableColumn className="text-left">Periodo</TableColumn>
              <TableColumn className="text-right">Ingresos</TableColumn>
              <TableColumn className="text-right">Egresos</TableColumn>
              <TableColumn className="text-right">Total</TableColumn>
              <TableColumn className="text-center">Acciones</TableColumn>
            </TableHeader>

            <TableBody emptyContent={"No hay registros disponibles"}>
              {loading
                ? [...Array(6)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-32 rounded-md" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-20 rounded-md" /></TableCell>
                      <TableCell className="text-center"><Skeleton className="h-8 w-24 rounded-md" /></TableCell>
                    </TableRow>
                  ))
                : currentData.map((ele: ComisionData) => (
                    <TableRow key={ele.Row}>
                      <TableCell>{ele.Periodo_Nombre}</TableCell>
                      <TableCell className="text-right">{dollarUSLocale.format(ele.Ingresos)}</TableCell>
                      <TableCell className="text-right">{dollarUSLocale.format(ele.Egresos)}</TableCell>
                      <TableCell className="text-right">{dollarUSLocale.format(ele.Total)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="flat"
                          color="primary"
                          size="sm"
                          onPress={() => verDetalle(ele.Id_Agente, ele.Id_Liquidacion)}
                        >
                          Ver Detalle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Paginación y total de registros */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Total de registros: {dataComisiones.length}</p>
        <Pagination
           isCompact
           showControls
           showShadow
          total={Math.ceil(dataComisiones.length / itemsPerPage)}
          initialPage={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
