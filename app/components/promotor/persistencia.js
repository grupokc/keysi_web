/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import useGetData from '@/app/hooks/useGetData';
import LoadData from '@/app/components/LoadData';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Skeleton } from "@heroui/react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { AcademicCapIcon } from '@heroicons/react/outline';

export default function PersistenciaPromotoria() {
  const { data: dataI, isLoading } = useGetData({
    ClassName: 'Persistencia_Promotoria',
    Action: 'List',
    url: "URL_NETAPI"
  });

  const dollarUSLocale = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  // Cálculo de totales
  const primaNecesariaPromotoria = dataI?.reduce((acc, item) => acc + (item?.Prima_Necesaria ?? 0), 0);
  const primaNecesariaPagada = dataI?.reduce((acc, item) => acc + (item?.Prima_Pagada ?? 0), 0);
  const persistenciaPromotoria = primaNecesariaPromotoria > 0
    ? ((primaNecesariaPagada / primaNecesariaPromotoria) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="flex justify-center items-center p-4">
      <CardBody>
        {isLoading ? (
          <Skeleton className="h-40 w-full rounded-md" />
        ) : dataI?.length > 0 ? (
          <>
            <Table aria-label="Tabla de Persistencia" className="min-w-full">
              <TableHeader>
                <TableColumn className="text-center">Fecha de Ejecución</TableColumn>
                <TableColumn className="text-center">Agente</TableColumn>
                <TableColumn className="text-center">Prima Necesaria</TableColumn>
                <TableColumn className="text-center">Prima Pagada</TableColumn>
                <TableColumn className="text-center">Persistencia</TableColumn>
              </TableHeader>
              <TableBody>
                {dataI.map((item) => (
                  <TableRow key={item.Id_Met_Persistencia_IP}>
                    <TableCell className="text-center">{item.Fecha_de_Ejecucion}</TableCell>
                    <TableCell className="text-center">{item.Nombre_Agente}</TableCell>
                    <TableCell className="text-right">{dollarUSLocale.format(item.Prima_Necesaria)}</TableCell>
                    <TableCell className="text-right">{dollarUSLocale.format(item.Prima_Pagada)}</TableCell>
                    <TableCell className="text-right">{item.Persistencia}%</TableCell>
                  </TableRow>
                ))}

                {/* ✅ Fila de Totales corregida: Ahora tiene exactamente 5 columnas */}
                <TableRow className="bg-gray-50 font-semibold">
                  <TableCell className="text-center font-medium" colSpan={2}>Persistencia Promotoria</TableCell>
                  <TableCell className="text-right">{dollarUSLocale.format(primaNecesariaPromotoria)}</TableCell>
                  <TableCell className="text-right">{dollarUSLocale.format(primaNecesariaPagada)}</TableCell>
                  <TableCell className="text-right">{persistenciaPromotoria}%</TableCell>
                  <TableCell className="text-right">{''}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Notas de la tabla */}
            <div className="mt-4 text-sm text-gray-600">
              * Información obtenida del último archivo de persistencia correspondiente al periodo: <b>{dataI[0]?.Fecha_de_Ejecucion}</b>, cargado el <b>{dataI[0]?.Fecha_Add}</b>.<br />
              * Sólo se muestran agentes que cuentan con pólizas de vida con más de 15 meses de emitidas.
            </div>
          </>
        ) : (
          <LoadData />
        )}
      </CardBody>
    </div>
  );
}
