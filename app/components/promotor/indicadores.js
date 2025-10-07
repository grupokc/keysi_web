/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect, Fragment } from 'react';
import useGetData from '@/app/hooks/useGetData';
import LoadData from '@/app/components/LoadData';
import Link from 'next/link';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure, Skeleton
} from "@heroui/react";

export default function Indicadores() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showfechas, setShowfechas] = useState(false);
  let dollarUSLocale = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  let percentageUSLocale = Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const { data: dataI, isLoading: loadingDataI } = useGetData({
    ClassName: 'Indicadores_IP',
    Ver_promotoria: 1,
    Action: 'Get',
    url: "URL_NETAPI"
  });
  const { data: dataBasesMetricas, isLoading: loadingMetricas } = useGetData({
    ClassName: 'DM_Titan_Bases_Metricas',
    Action: 'Get',
    url: "URL_NETAPI"
  });

  // Ensure each item has a unique key
  const dataWithKeys = dataI.map((item, index) => ({
    ...item,
    key: item.nombre || `row-${index}` // Use a unique identifier if available
  }));

  // Helper function to get date metric
  const getMetricDate = (type) => {
    const metric = dataBasesMetricas.find(e => e.Id_Met_Importacion_Tipo === type);
    return metric ? metric.Fecha_Hasta : "--";
  };


  // 📌 Definimos las columnas dinámicamente
  const columns = [
    { key: "nombre", label: " " },
    { key: "qeqValor", label: <div className="text-center">QEQ<br /><span className="text-[10px]">AL MES {dataI?.[0]?.QEQ_Nombre_Mes} - {dataI?.[0]?.QEQ_Anio}</span></div> },
    { key: "kcValor", label: <div className="text-center">KC<br /><span className="text-[10px]">AL {getMetricDate(45, dataBasesMetricas)}</span></div> },
    { key: "pendientePago", label: <div className="text-center">PENDIENTE DE PAGO<br /><span className="text-[10px]">AL {getMetricDate(47, dataBasesMetricas)}</span></div> },
    { key: "total", label: "TOTAL" }
  ];

  // 📌 Definimos las filas dinámicamente
  const rows = [
    // 📌 Sección: Vida
    { key: "vida-title", isTitle: true, nombre: "Vida" },
    {
      key: "pca-vida",
      nombre: "PCA Vida 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida ?? 0),
      kcValor: dataI[0]?.KC_PCA_1er_Anio_Vida > 0 ? (
        <Link href="/reportes/detalle/PCA_Vida_KC" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PCA_1er_Anio_Vida ?? 0) + (dataI[0]?.KC_PCA_1er_Anio_Vida ?? 0)
      )
    },
    {
      key: "pca-meta",
      nombre: "PCA MetaLife 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PCA_1er_Anio_Meta ?? 0) + (dataI[0]?.KC_PCA_1er_Anio_Meta ?? 0)
      )
    },
    {
      key: "pca-total",
      nombre: "PCA Total 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_Total_PCA_1er_Anio ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_Total_PCA_1er_Anio ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_Total_PCA_1er_Anio ?? 0) + (dataI[0]?.KC_Total_PCA_1er_Anio ?? 0)
      )
    },
    {
      key: "pca-conservacion",
      nombre: "PCA Conservación",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_Conservacion_CY ?? 0),
      kcValor: dataI[0]?.KC_PCA_Conservacion_CY > 0 ? (
        <Link href="/reportes/detalle/PCA_Conservacion_KC" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PCA_Conservacion_CY ?? 0) + (dataI[0]?.KC_PCA_Conservacion_CY ?? 0)
      )
    },
    {
      key: "pna-vida",
      nombre: "PNA Vida",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY ?? 0),
      kcValor: dataI[0]?.KC_PNA_Vida_CY > 0 ? (
        <Link href="/reportes/detalle/PNA_Vida_KC" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY ?? 0),
      pendientePago: dataI[0]?.Pendiente_Pago_Vida > 0 ? (
        <Link href="/pendiente-de-pago/promotores/vida" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida ?? 0),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Vida_CY ?? 0) + (dataI[0]?.KC_PNA_Vida_CY ?? 0)
      )
    },
    {
      key: "pna-meta",
      nombre: "PNA Meta",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY ?? 0),
      kcValor: dataI[0]?.KC_PNA_Meta_CY > 0 ? (
        <Link href="/reportes/detalle/PNA_Meta_KC" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY ?? 0),
      pendientePago: dataI[0]?.Pendiente_Pago_Meta > 0 ? (
        <Link href="/pendiente-de-pago/promotores/meta" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta ?? 0),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Meta_CY ?? 0) + (dataI[0]?.KC_PNA_Meta_CY ?? 0)
      )
    },
    {
      key: "pna-total",
      nombre: "PNA Total",
      qeqValor: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Vida_CY ?? 0) + (dataI[0]?.QEQ_PNA_Meta_CY ?? 0)
      ),
      kcValor: dollarUSLocale.format(
        (dataI[0]?.KC_PNA_Vida_CY ?? 0) + (dataI[0]?.KC_PNA_Meta_CY ?? 0)
      ),
      pendientePago: dollarUSLocale.format(
        (dataI[0]?.Pendiente_Pago_Vida ?? 0) + (dataI[0]?.Pendiente_Pago_Meta ?? 0)
      ),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Vida_CY ?? 0) + (dataI[0]?.QEQ_PNA_Meta_CY ?? 0) +
        (dataI[0]?.KC_PNA_Vida_CY ?? 0) + (dataI[0]?.KC_PNA_Meta_CY ?? 0)
      )
    },

    // 📌 Sección: Primordial
    { key: "primordial-title", isTitle: true, nombre: "Primordial" },
    {
      key: "num-polizas",
      nombre: "Número de pólizas",
      qeqValor: dataI[0]?.Primordial_Numero_Polizas ?? 0,
      kcValor:dataI[0]?.KC_Numero_Polizas_Primordial ?? 0,
      pendientePago: "--",
      total: (dataI[0]?.Primordial_Numero_Polizas ?? 0) +( dataI[0]?.KC_Numero_Polizas_Primordial ?? 0)
    },  
    {
      key: "polizas-mayores",
      nombre: "Número de pólizas con prima mayor o igual a $4,000.00",
      qeqValor: dataI[0]?.Primordial_Polizas_Mayor_Igual_4000 ?? 0,
      kcValor: dataI[0]?.KC_Numero_Polizas_Primordial_Con_PNA_Mayor_Igual_4000 ?? 0,
      pendientePago: "--",
      total: (dataI[0]?.Primordial_Polizas_Mayor_Igual_4000 ?? 0) + (dataI[0]?.KC_Numero_Polizas_Primordial_Con_PNA_Mayor_Igual_4000 ?? 0)
    },
    {
      key: "pna-primordial",
      nombre: "PNA",
      qeqValor: dollarUSLocale.format(dataI[0]?.Primordial_PNA ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PNA_Primordial ?? 0),
      pendientePago: dataI[0]?.Pendiente_Pago_Primordial > 0 ? (
        <Link href="/pendiente-de-pago/promotores/primordial" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial ?? 0),
      total: dollarUSLocale.format(
        (dataI[0]?.Primordial_PNA ?? 0) + (dataI[0]?.KC_PNA_Primordial ?? 0)
      )
    },
    {
      key: "pp-1er-anio",
      nombre: "PP 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.Primordial_PP_1er_Anio ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PP_Primordial ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format((dataI[0]?.Primordial_PP_1er_Anio ?? 0) + (dataI[0]?.KC_PP_Primordial ?? 0))
    },

    // 📌 Sección: Gastos Médicos
    { key: "gmm-title", isTitle: true, nombre: "Gastos Médicos" },
    {
      key: "p-ponderada",
      nombre: "P. Ponderada 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_P_Ponderada_1er_Anio_CY ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format((dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY ?? 0) +(dataI[0]?.KC_P_Ponderada_1er_Anio_CY ?? 0))
    },
    {
      key: "pna-gmm",
      nombre: "PNA",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PNA_CY ?? 0),
      pendientePago: dataI[0]?.Pendiente_Pago_GMM > 0 ? (
        <Link href="/pendiente-de-pago/promotores/gmm" className="text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM ?? 0),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_CY ?? 0) + (dataI[0]?.KC_PNA_CY ?? 0) 
      )
    },
    {
      key: "pp-gmm",
      nombre: "PP 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PP_1er_Anio_CY ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PP_1er_Anio_CY ?? 0) + (dataI[0]?.KC_PP_1er_Anio_CY ?? 0)
      )
    },
    {
      key: "pp-renovacion",
      nombre: "PP Renovación",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY ?? 0),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY ?? 0), // Eliminado el Link
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PP_Renovacion_CY ?? 0) + (dataI[0]?.KC_PP_Renovacion_CY ?? 0)
      )
    },
    {
      key: "siniestralidad",
      nombre: "Siniestralidad",
      qeqValor: "--",
      kcValor: dataI[0]?.KC_Porcentaje_Siniestralidad_CY
        ? percentageUSLocale.format(dataI[0].KC_Porcentaje_Siniestralidad_CY / 100)
        : "--",
      pendientePago: "--",
      total: dataI[0]?.KC_Porcentaje_Siniestralidad_CY
        ? percentageUSLocale.format(dataI[0].KC_Porcentaje_Siniestralidad_CY / 100)
        : "--"
    }
  ];



  return (
    <>

      <div className="flex w-[80vw] flex-row overflow-x-auto sm:overflow-visible z-100">
        <div className="flex-1 border-1 p-2 w-full max-w-full">
          {dataI.length > 0 ? (
            <>
              <CardBody>
                {/* Encabezado de Indicadores */}
                <div className="text-sm bg-white text-gray-800">
                  Los cálculos se realizan con base en la información de los siguientes archivos:

                  {loadingMetricas ? (
                    <Skeleton className="h-6 w-24 mt-2" />
                  ) : (
                    <Button
                      onPress={onOpen}
                      size='sm'
                      variant='ghost'
                      className='z-100'
                    >
                      📂 <span className="text-xs">Ver Archivos</span>
                    </Button>
                  )}
                </div>

                {/* MODAL PARA VER ARCHIVOS */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="max-w-lg sm:max-w-2xl md:max-w-3xl">
                  <ModalContent className="max-h-[70vh] overflow-y-auto rounded-xl bg-white shadow-lg">
                    {(onClose) => (
                      <>
                        {/* CABECERA DEL MODAL */}
                        <ModalHeader className="text-lg font-bold text-gray-900 border-b p-4">
                          📁 Archivos Cargados
                        </ModalHeader>

                        {/* CUERPO DEL MODAL */}
                        <ModalBody className="p-4">
                          {loadingMetricas ? (
                            <Skeleton className="h-24 w-full rounded-md" />
                          ) : dataBasesMetricas.length > 0 ? (
                            <ul className="list-none space-y-3">
                              {dataBasesMetricas.map((item, index) => (
                                <li
                                  key={index}
                                  className="border rounded-lg p-3 text-sm md:text-base bg-gray-50 hover:bg-gray-100 transition-all"
                                >
                                  <span className="block font-semibold text-gray-900">
                                    {index + 1}. {item.Nombre.toUpperCase()}
                                  </span>
                                  <div className="text-xs text-gray-600 flex flex-col gap-1 mt-1">
                                    <span className="flex items-center gap-2">
                                      📅 <span>{item.Mes} | ⏳ {item.Fecha_Importacion}</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                      👤 <span>{item.Nombre_Usuario_Add}</span>
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 text-center text-sm">No hay archivos disponibles.</p>
                          )}
                        </ModalBody>

                        {/* PIE DEL MODAL */}
                        <ModalFooter className="border-t p-3 flex justify-end">
                          <Button color="danger" variant="light" size="md" className="rounded-lg px-4 py-2" onPress={onClose}>
                            ❌ Cerrar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>


                {/* Tabla de Indicadores */}
                <div className="mt-6 overflow-x-auto">

                  {loadingDataI ? (
                    <Skeleton className="h-20 w-full mt-2" />
                  ) : (
                    <Table aria-label="Tabla de Indicadores" items={dataWithKeys} className="mt-2 min-w-[600px]">
                      <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key} className="text-center border border-gray-300">{column.label}</TableColumn>}
                      </TableHeader>
                      <TableBody items={rows}>
                        {(row) =>
                          row.isSpacer ? (
                            <TableRow key={row.key}>
                              {columns.map((col) => (
                                <TableCell key={col.key} className="border-none h-4"></TableCell>
                              ))}
                            </TableRow>
                          ) : row.isTitle ? (
                            <TableRow key={row.key} className="bg-gray-50">
                              {columns.map((col, index) => (
                                <TableCell
                                  key={col.key}
                                  className={`text-left font-bold text-gray-900 px-3 py-2 ${index === 0 ? "" : "hidden"
                                    }`} // Oculta las celdas adicionales para evitar el error
                                >
                                  {index === 0 ? row.nombre : null}
                                </TableCell>
                              ))}
                            </TableRow>
                          ) : (
                            <TableRow key={row.key} className={row.isHighlight ? "bg-gray-50" : ""}>
                              {columns.map((col) => (
                                <TableCell
                                  key={col.key}
                                  className={`text-center border border-gray-300 px-3 py-2 text-sm text-gray-500 ${col.key === "nombre" ? "font-medium text-gray-900 cursor-pointer hover:text-blue-800" : ""
                                    }`}
                                 
                                >
                                  {row[col.key] || "0"}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        }
                      </TableBody>

                    </Table>
                  )}
                </div>
              </CardBody>
            </>
          ) : (
            <LoadData />
          )}
        </div>
      </div>
    </>
  );
};
