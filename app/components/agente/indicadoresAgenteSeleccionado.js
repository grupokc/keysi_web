/* eslint-disable @next/next/no-img-element */
'use client';

import { Fragment, useState, useEffect } from 'react';
import LoadData from '@/app/components/LoadData';
import useGetData from '@/app/hooks/useGetData';
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
  useDisclosure, n, Skeleton
} from "@heroui/react";
import DefinicionesBono from './definiciones_bono';
import { dollarUSLocale, percentageUSLocale } from '@/app/utils/utils';

const metricas = {
  'PCA Vida 1er Año': 'metrica_pca_vida_1er_ano',
  'PCA Meta 1er Año': 'metrica_pca_meta_1er_ano',
  'PCA Conservación': 'metrica_pca_conservacion',
  'PNA Vida': 'metrica_pna_vida',
  'PNA Meta': 'metrica_pna_meta',
  'Prima Ponderada GM 1er Año': 'metrica_prima_ponderada_gm_1er_ano',
  'PNA GM': 'metrica_pna_gm',
  'PP GM 1er Año': 'metrica_pp_gm_1er_ano',
  'PP GM Renovación': 'metrica_pp_gm_renovacion',
  'Siniestralidad GM': 'metrica_siniestralidad_gm',
};

const useColumnVisibility = (dataI) => {
  const [visibleColumns, setVisibleColumns] = useState({
    QEQ: true,
    KC: true,
    KC2: true,
    PendientePago: true,
    Total: true,
  });

  useEffect(() => {
    const hasKC2Values = dataI.some(
      item =>
        item.KC_PCA_1er_Anio_Vida2 > 0 ||
        item.KC_PCA_1er_Anio_Meta2 > 0 ||
        item.KC_PCA_Conservacion_CY2 > 0 ||
        item.KC_PNA_Vida_CY2 > 0 ||
        item.KC_PNA_Meta_CY2 > 0 ||
        item.KC_P_Ponderada_1er_Anio_CY2 > 0 ||
        item.KC_PP_1er_Anio_CY2 > 0 ||
        item.KC_PP_Renovacion_CY2 > 0 ||
        item.KC_PNA_CY2 > 0
    );

    setVisibleColumns(prev => ({
      ...prev,
      KC2: hasKC2Values,
    }));
  }, [dataI]);

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return { visibleColumns, toggleColumn };
};

export default function IndicadoresAgenteSeleccionado({ user }) {
  const [showDefiniciones, setShowDefiniciones] = useState(false);
  const { data: dataI, isLoading: loadingDataI } = useGetData({
    ClassName: 'Indicadores_IP',
    Action: 'Get',
    Clave_Agente: user.Clave_Agente,
    Guid_Agente: user.Guid_Agente,
  });
  const { data: dataPersistencia } = useGetData({
    ClassName: 'Persistencia',
    Action: 'Ultima',
    Clave_Agente: user.Clave_Agente,
    Guid_Agente: user.Guid_Agente,
  });
  const { data: dataBasesMetricas, isLoading: loadingMetricas } = useGetData({
    ClassName: 'DM_Titan_Bases_Metricas',
    Action: 'Get',
    Clave_Agente: user.Clave_Agente,
    Guid_Agente: user.Guid_Agente,
  });

  const { visibleColumns, toggleColumn } = useColumnVisibility(dataI);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const toggleShowDefiniciones = () => {
    setShowDefiniciones(!showDefiniciones);
  };

  function formatValue(value) {
    if (value === 0) {
      return "No Calculable";
    }
    return dollarUSLocale.format(value);
  }

  const LinkCell = ({ href, guid, amount }) => (
    <div>{amount}</div>
  );

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

  const getMetricData = (type) => dataBasesMetricas?.find(item => item.Id_Met_Importacion_Tipo === type) || {};

  const integralComisiones = getMetricData(45);
  const quienEsQuien = getMetricData(10);
  const pendientesPago = getMetricData(43);

  // Define columns dynamically with small notes
  const columns = [
    { key: "nombre", label: <>&nbsp;</> },
    {
      key: "qeqValor",
      label: (
        <div className="text-center">
          QEQ <br />
          <div className="text-[10px]">
            AL MES {dataI?.[0]?.QEQ_Nombre_Mes || "--"} - {dataI?.[0]?.QEQ_Anio || "--"}
          </div>
        </div>
      )
    },
    visibleColumns.KC && {
      key: "kcValor",
      label: (
        <div className="text-center">
          KC <br />
          {dataI?.[0]?.KC_Nombre_Mes || "--"} - {dataI?.[0]?.KC_Anio || "--"}
          <div className="text-[10px]">AL {getMetricDate(45)}</div>
        </div>
      )
    },
    visibleColumns.KC2 && {
      key: "kc2Valor",
      label: (
        <div className="text-center">
          KC <br />
          {dataI?.[0]?.KC_Nombre_Mes2 || "--"} - {dataI?.[0]?.KC_Anio2 || "--"}
        </div>
      )
    },
    visibleColumns.PendientePago && {
      key: "pendientePago",
      label: (
        <div className="text-center">
          PENDIENTE DE PAGO <br />
          <div className="text-[10px]">AL {getMetricDate(47)}</div>
        </div>
      )
    },
    { key: "total", label: "TOTAL" }
  ].filter(Boolean); // Remove falsy values

  const rows = [
    // 📌 Título de la sección "Vida"
    { isTitle: true, nombre: "Vida" },

    // 📌 PCA Vida 1er Año
    {
      nombre: "PCA Vida 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida),
      kcValor: dataI[0]?.KC_PCA_1er_Anio_Vida > 0 ? (
        <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PCA_Vida_KC`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida)
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida2),
      pendientePago: "--",
      total: dollarUSLocale.format(
        dataI[0]?.QEQ_PCA_1er_Anio_Vida +
        dataI[0]?.KC_PCA_1er_Anio_Vida +
        dataI[0]?.KC_PCA_1er_Anio_Vida2
      )
    },

    // 📌 PCA Meta 1er Año
    {
      nombre: "PCA Meta 1er Año",
      isHighlight: true, // Para agregar un fondo diferente
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta),
      kcValor: dataI[0]?.KC_PCA_1er_Anio_Meta > 0 ? (
        <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PCA_Meta_KC`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta)
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta2),
      pendientePago: "--",
      total: dollarUSLocale.format(
        dataI[0]?.QEQ_PCA_1er_Anio_Meta +
        dataI[0]?.KC_PCA_1er_Anio_Meta +
        dataI[0]?.KC_PCA_1er_Anio_Meta2
      )
    },

    // 📌 PCA Total
    {
      nombre: "PCA Total",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta + dataI[0]?.QEQ_PCA_1er_Anio_Vida),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta + dataI[0]?.KC_PCA_1er_Anio_Vida),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta2 + dataI[0]?.KC_PCA_1er_Anio_Vida2),
      pendientePago: "--",
      total: dollarUSLocale.format(
        dataI[0]?.QEQ_PCA_1er_Anio_Meta +
        dataI[0]?.QEQ_PCA_1er_Anio_Vida +
        dataI[0]?.KC_PCA_1er_Anio_Meta +
        dataI[0]?.KC_PCA_1er_Anio_Vida +
        dataI[0]?.KC_PCA_1er_Anio_Meta2 +
        dataI[0]?.KC_PCA_1er_Anio_Vida2
      )
    },

    // 📌 PCA Conservación
    {
      nombre: "PCA Conservación",
      isHighlight: true,
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PCA_Conservacion_CY),
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY2),
      pendientePago: "--",
      total: dollarUSLocale.format(
        dataI[0]?.QEQ_PCA_Conservacion_CY +
        dataI[0]?.KC_PCA_Conservacion_CY +
        dataI[0]?.KC_PCA_Conservacion_CY2
      )
    },

    // 📌 PNA Vida
    {
      nombre: "PNA Vida",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY),
      kcValor: dataI[0]?.KC_PNA_Vida_CY > 0 ? (
        <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PNA_Vida_KC`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY)
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY2),
      pendientePago: dataI[0]?.Pendiente_Pago_Vida > 0 ? (
        <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/vida`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida)
      ),
      total: dollarUSLocale.format(
        dataI[0]?.QEQ_PNA_Vida_CY +
        dataI[0]?.Pendiente_Pago_Vida +
        dataI[0]?.KC_PNA_Vida_CY +
        dataI[0]?.KC_PNA_Vida_CY2
      )
    },

    // 📌 PNA Meta
    {
      nombre: "PNA Meta",
      isHighlight: true,
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY || 0),
      kcValor: dataI[0]?.KC_PNA_Meta_CY > 0 ? (
        <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PNA_Meta_KC`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY || 0)
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY2 || 0),
      pendientePago: dataI[0]?.Pendiente_Pago_Meta > 0 ? (
        <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/Meta`} className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta)}
        </Link>
      ) : (
        dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta || 0)
      ),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Meta_CY || 0) +
        (dataI[0]?.Pendiente_Pago_Meta || 0) +
        (dataI[0]?.KC_PNA_Meta_CY || 0) +
        (dataI[0]?.KC_PNA_Meta_CY2 || 0)
      )
    },

    // 📌 PNA Total
    {
      nombre: "PNA Total",
      qeqValor: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Vida_CY || 0) +
        (dataI[0]?.QEQ_PNA_Meta_CY || 0)
      ),
      kcValor: dollarUSLocale.format(
        (dataI[0]?.KC_PNA_Vida_CY || 0) +
        (dataI[0]?.KC_PNA_Meta_CY || 0)
      ),
      kc2Valor: dollarUSLocale.format(
        (dataI[0]?.KC_PNA_Vida_CY2 || 0) +
        (dataI[0]?.KC_PNA_Meta_CY2 || 0)
      ),
      pendientePago: (
        <LinkCell
          href="/pendiente-de-pago/agentes"
          guid={user.Guid_Agente}
          amount={dollarUSLocale.format(
            (dataI[0]?.Pendiente_Pago_Vida || 0) +
            (dataI[0]?.Pendiente_Pago_Meta || 0)
          )}
        />
      ),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_Vida_CY || 0) +
        (dataI[0]?.QEQ_PNA_Meta_CY || 0) +
        (dataI[0]?.Pendiente_Pago_Vida || 0) +
        (dataI[0]?.Pendiente_Pago_Meta || 0) +
        (dataI[0]?.KC_PNA_Vida_CY || 0) +
        (dataI[0]?.KC_PNA_Meta_CY || 0) +
        (dataI[0]?.KC_PNA_Vida_CY2 || 0) +
        (dataI[0]?.KC_PNA_Meta_CY2 || 0)
      )
    },
    ...(dataPersistencia.length > 0
      ? [
        { key: "spacer-top", isSpacer: true },

        {
          key: "persistencia-data",
          isHighlight: true,
          nombre: "Persistencia 24 cosechas:",
          qeqValor: percentageUSLocale.format((dataI[0]?.Persistencia || 0) / 100),
          kcValor: "--",
          kc2Valor: "--",
          pendientePago: "--",
          total: percentageUSLocale.format((dataI[0]?.Persistencia || 0) / 100),
        },

        { key: "spacer-bottom", isSpacer: true },
      ]
      : []),

    { isTitle: true, key: "primordial-title", nombre: "Primordial" },

    {
      nombre: "Número de pólizas:",
      qeqValor: dataI[0]?.Primordial_Numero_Polizas ?? 0,
      kcValor: dataI[0]?.KC_Numero_Polizas_Primordial ?? 0,
      kc2Valor: "--",
      pendientePago: "--",
      total: dataI[0]?.Primordial_Numero_Polizas ?? 0
    },
    {
      nombre: "Pólizas con PNA mayor o igual $4,000:",
      qeqValor: dataI[0]?.Primordial_Polizas_Mayor_Igual_4000 ?? 0, // Evita undefined/null, siempre muestra 0
      kcValor: dataI[0]?.KC_Numero_Polizas_Primordial_Con_PNA_Mayor_Igual_4000 ?? 0,
      kc2Valor: "--",
      pendientePago: "--",
      total: dataI[0]?.Primordial_Polizas_Mayor_Igual_4000 ?? 0 // Asegura que no sea undefined/null
    },
    {
      nombre: "PNA:",
      qeqValor: dollarUSLocale.format(dataI[0]?.Primordial_PNA ?? 0), // Evita null/undefined, muestra 0 como default
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PNA_Primordial ?? 0),
      kc2Valor: "--",
      pendientePago: dataI[0]?.Pendiente_Pago_Primordial > 0 ? (
        <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/primordial`}
          className="cursor-pointer text-blue-600 underline hover:text-blue-800">
          {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial)}
        </Link>
      ) : dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial ?? 0), // Muestra 0 si es null
      total: dollarUSLocale.format(
        (dataI[0]?.Primordial_PNA ?? 0) + (dataI[0]?.Pendiente_Pago_Primordial ?? 0)
      )
    },
    {
      nombre: "PP 1er Año:",
      qeqValor: dollarUSLocale.format(dataI[0]?.Primordial_PP_1er_Anio ?? 0), // Si es null/undefined, muestra $0.00
      kcValor: dollarUSLocale.format(dataI[0]?.KC_PNA_Primordial ?? 0),
      kc2Valor: "--",
      pendientePago: "--",
      total: dollarUSLocale.format(dataI[0]?.Primordial_PP_1er_Anio ?? 0) // Total = mismo valor (no hay cálculos adicionales)
    },
    {
      isTitle: true,
      key: "gmm_title",
      nombre: "Gastos Médicos"
    },

    // 📌 Prima Ponderada GMM 1er Año
    {
      nombre: "Prima Ponderada GMM 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY ?? 0),
      kcValor: (
        <LinkCell
          href="/agentes/indicadores/datail"
          guid={metricas['Prima Ponderada GM 1er Año']}
          amount={dollarUSLocale.format(dataI[0]?.KC_P_Ponderada_1er_Anio_CY ?? 0)}
        />
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_P_Ponderada_1er_Anio_CY2 ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY ?? 0) +
        (dataI[0]?.KC_P_Ponderada_1er_Anio_CY ?? 0) +
        (dataI[0]?.KC_P_Ponderada_1er_Anio_CY2 ?? 0)
      )
    },

    // 📌 PNA GMM
    {
      nombre: "PNA GMM",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY ?? 0),
      kcValor: (
        <LinkCell
          href="/agentes/indicadores/datail"
          guid={metricas['PNA GM']}
          amount={dollarUSLocale.format(dataI[0]?.KC_PNA_CY ?? 0)}
        />
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PNA_CY2 ?? 0),
      pendientePago: (
        dataI[0]?.Pendiente_Pago_GMM > 0 ? (
          <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/gmm`}
            className="cursor-pointer text-blue-600 underline hover:text-blue-800">
            {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM)}
          </Link>
        ) : (
          dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM ?? 0)
        )
      ),
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PNA_CY ?? 0) +
        (dataI[0]?.KC_PNA_CY ?? 0) +
        (dataI[0]?.KC_PNA_CY2 ?? 0) +
        (dataI[0]?.Pendiente_Pago_GMM ?? 0)
      )
    },

    // 📌 PP GMM 1er Año
    {
      nombre: "PP GMM 1er Año",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PP_1er_Anio_CY ?? 0),
      kcValor: (
        <LinkCell
          href="/agentes/indicadores/datail"
          guid={metricas['PP GM 1er Año']}
          amount={dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY ?? 0)}
        />
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY2 ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PP_1er_Anio_CY ?? 0) +
        (dataI[0]?.KC_PP_1er_Anio_CY ?? 0) +
        (dataI[0]?.KC_PP_1er_Anio_CY2 ?? 0)
      )
    },

    // 📌 PP GMM Renovación
    {
      nombre: "PP GMM Renovación",
      qeqValor: dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY ?? 0),
      kcValor: (
        <LinkCell
          href="/agentes/indicadores/datail"
          guid={metricas['PP GM Renovación']}
          amount={dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY ?? 0)}
        />
      ),
      kc2Valor: dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY2 ?? 0),
      pendientePago: "--",
      total: dollarUSLocale.format(
        (dataI[0]?.QEQ_PP_Renovacion_CY ?? 0) +
        (dataI[0]?.KC_PP_Renovacion_CY ?? 0) +
        (dataI[0]?.KC_PP_Renovacion_CY2 ?? 0)
      )
    },

    // 📌 Siniestralidad GMM
    {
      nombre: "Siniestralidad GMM",
      qeqValor: percentageUSLocale.format((dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY ?? 0) / 100),
      kcValor: "--",
      kc2Valor: "--",
      pendientePago: "--",
      total: percentageUSLocale.format((dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY ?? 0) / 100)
    }



  ].map((row, index) => ({
    key: index.toString(),
    ...row
  }));



  return (
    <>

      <div className="flex w-full flex-row overflow-x-auto sm:overflow-visible z-100">
        <div className="flex-1 border-1 p-2 w-full max-w-full">
          {dataI.length > 0 ? (
            <>
              <Card>
                <CardHeader className="bg-blue-500 text-white p-3 rounded-t-md text-lg font-semibold">
                  Indicadores
                </CardHeader>

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



                  {/* Información Adicional */}
                  <div className="text-[10px] bg-white text-gray-800 p-3 mt-2 border-t border-gray-300 rounded-b-md">
                    * Los cálculos de la columna KC son un indicativo y dependerán del estilo
                    de venta del agente, es importante que revisen las coberturas que no se
                    consideran en la PCA así como otros factores que pueden cambiar estos indicadores.
                    Para el cálculo se utiliza el reporte Integral de Comisiones,
                    Último archivo cargado: <span className="font-bold">{integralComisiones?.Mes || "--"}</span>
                    el día <span className="font-bold">{integralComisiones?.Fecha_Importacion || "--"}</span>.

                    {/* Validaciones */}
                    {integralComisiones?.Fecha_Desde === quienEsQuien?.Fecha_Desde && (
                      <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md">
                        Debido a que el archivo Integral de Comisiones corresponde al mismo mes del archivo Quién es Quién, la columna KC no puede ser calculada.
                      </div>
                    )}
                    {integralComisiones?.Fecha_Desde < quienEsQuien?.Fecha_Desde && (
                      <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded-md">
                        El archivo Integral de Comisiones es anterior al archivo Quién es Quién, por lo que la columna KC no puede ser calculada.
                      </div>
                    )}
                    {pendientesPago?.Fecha_Desde === quienEsQuien?.Fecha_Desde && (
                      <div className="mt-2 p-2 bg-red-100 text-red-800 rounded-md">
                        El archivo pendientes de pago corresponde al mismo mes del archivo Quién es Quién, por lo que la columna pendiente de pago no debe ser considerada.
                      </div>
                    )}
                  </div>

                  {/* Tabla de Indicadores */}
                  <div className="mt-6 overflow-x-auto">
                    <h2 className="text-lg font-semibold">Resumen de Indicadores</h2>
                    <p className="text-sm text-gray-500">Fecha de Ingreso del agente {dataI[0]?.Fecha_Ingreso}</p>

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
                                    onClick={col.key === "nombre" ? toggleShowDefiniciones : undefined}
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
                    {showDefiniciones && <DefinicionesBono showResumen={toggleShowDefiniciones} />}

                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            <LoadData />
          )}
        </div>
      </div>
    </>
  );
}
