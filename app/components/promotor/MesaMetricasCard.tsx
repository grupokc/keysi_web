"use client";

import { useState, useEffect } from "react";
import useGetData from "@/app/hooks/useGetData";
import {
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@heroui/react";
import { ClipboardListIcon } from "@heroicons/react/solid";

interface MesaMetrica {
  Nombre_Agente: string;
  Id_Ticket: number;
  Fecha_Ultimo_Movimiento: string;
  Estatus: string;
  Asunto: string;
  Dias_Laborales: number;
}

interface MesaMetricaCardProps {
  Id_Promotoria: number;
}

export default function MesaMetricaCard({ Id_Promotoria }: MesaMetricaCardProps) {
    const { data } = useGetData({
    ClassName: "Tickets_Mesa_IP_Pendientes_X_Promotoria",
    Id_Promotoria: Id_Promotoria,
    Action: "Get",
    url: "URL_NETAPI"
  });
  const dMetricas = (data as MesaMetrica[]) || [];

  return (
    <>
      {/* Cabecera con ícono */}
      <div className="flex items-center gap-2 px-4 py-3 text-gray-900 font-semibold">
        <ClipboardListIcon className="h-5 w-5 text-gray-600" />
        <span className="text-lg">Último movimiento en mesa de emisión y servicios por agente</span>
      </div>

      <CardBody className="p-4 max-h-[300px] overflow-y-auto">
        {dMetricas.length > 0 ? (
          <Table aria-label="Resumen de la Mesa">
            <TableHeader className="sticky top-0">
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Ticket
              </TableColumn>
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Fecha
              </TableColumn>
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Agente
              </TableColumn>
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Asunto
              </TableColumn>
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Estatus
              </TableColumn>
              <TableColumn className="text-left text-gray-700 font-medium border-b">
                Dias Laborales
              </TableColumn>
            </TableHeader>
            <TableBody className="max-h-[200px] overflow-y-auto">
              {dMetricas.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-gray-800">{item.Id_Ticket}</TableCell>
                  <TableCell className="text-gray-800">{item.Fecha_Ultimo_Movimiento}</TableCell>
                  <TableCell className="text-gray-800">{item.Nombre_Agente}</TableCell>
                  <TableCell className="text-gray-800">{item.Asunto}</TableCell>
                  <TableCell className="text-left text-gray-800">{item.Estatus}</TableCell>
                  <TableCell className="text-left text-gray-800">{item.Dias_Laborales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500 py-4">No hay datos disponibles.</p>
        )}
      </CardBody>

      {/* Botón ajustado */}
      <div className="flex justify-center p-4">
        <Button
          variant="solid"
          color="primary"
          className="text-sm px-4 py-2 rounded-md shadow"
          onPress={() => (window.location.href = "/tickets")}
        >
          Ver Mesa
        </Button>
      </div>
    </>
  );
}
