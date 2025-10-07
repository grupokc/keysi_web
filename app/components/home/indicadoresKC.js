/* eslint-disable @next/next/no-img-element */
'use client';

import { Fragment, useState, useEffect } from 'react';
import LoadData from '@/app/components/LoadData';
import useGetData from '@/app/hooks/useGetData';
import Link from 'next/link';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import ComboZonaPromotoria from './comboZonaPromotoria';
import { useSelectedValues } from '@/app/context/globalContext';
import DefinicionesBono from '../agente/definiciones_bono';
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

const Column = ({ isVisible, children }) => {
  if (!isVisible) return null;
  return <td className="px-3 py-2 text-center text-sm text-gray-500 border border-gray-300">{children}</td>;
};

const HeaderColumn = ({ isVisible, children }) => {
  if (!isVisible) return null;
  return <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900 border border-gray-300">{children}</th>;
};

export default function IndicadoresKC({ user }) {
  const { selectedValues, setSelectedValues } = useSelectedValues();
  const [promotoriaSeleccionada, setPromotoriaSeleccionada] = useState({
    Nombre_Promotoria: "",
    Nombre_Promotor: "",
    RutaFoto: "",
  });
  const [showDefiniciones, setShowDefiniciones] = useState(false);
  const [showFechas, setShowFechas] = useState(false);
  const { data: dataI } = useGetData({
    ClassName: 'Indicadores_IP',
    Action: 'Get',
    url: "URL_NETAPI"
  });
  const { data: dataPersistencia } = useGetData({
    ClassName: 'Persistencia',
    Action: 'Ultima',
  });
  const { data: dataBasesMetricas } = useGetData({
    ClassName: 'DM_Titan_Bases_Metricas',
    Action: 'Get',
    url: "URL_NETAPI"
  });

  const { visibleColumns, toggleColumn } = useColumnVisibility(dataI);

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
    // <Link
    //   href={`${href}/${guid}`}
    //   className="cursor-pointer text-blue-600 underline hover:text-blue-800"
    // >
    //   {amount}
    // </Link>
  );

  const handleComboSelectionChange = (comboValues) => {
    setPromotoriaSeleccionada({
      Nombre_Promotoria: comboValues.Nombre_Promotoria,
      Nombre_Promotor: comboValues.Nombre_Promotor,
      RutaFoto: comboValues.RutaFoto,
    });

    setSelectedValues((prevValues) => ({
      ...prevValues,
      ...comboValues,
    }));
  };

  const getImageUrl = (promotor) => {
    let url = 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
    if (promotor?.RutaFoto && promotor?.RutaFoto !== 'null' && promotor?.RutaFoto.trim() !== '') {
      const foto = promotor.RutaFoto.replace(/\\/g, '/');
      url = `https://pegasus.grupokc.com.mx/${foto}`;
    }
    return url;
  };

  return (
    <>
      {showDefiniciones ? (
        <DefinicionesBono showResumen={toggleShowDefiniciones} />
      ) : (
        <div className="flex w-full flex-row overflow-x-auto rounded-lg bg-white shadow-lg">
          <div className="hidden w-1/3 lg:flex justify-center items-center">
            {!promotoriaSeleccionada.Nombre_Promotoria ? (
              // Logo grande y centrado si no hay promotoría seleccionada
              <img
                className="mt-20 "
                src="/img/logos/logo-2024.png"
                alt="Logo"
              />
            ) : (
              <Card className="w-full max-w-lg p-8 shadow-xl rounded-2xl border border-gray-300 bg-white">
                <CardHeader className="flex flex-col items-center text-center">
                  <p className="text-sm uppercase font-bold text-gray-500 tracking-widest">Promotoría</p>
                  <h4 className="text-2xl font-extrabold text-gray-900 mt-2">{promotoriaSeleccionada?.Nombre_Promotoria}</h4>
                  <small className="text-lg text-gray-700 font-medium mt-1">
                    Promotor: {promotoriaSeleccionada?.Nombre_Promotor}
                  </small>
                </CardHeader>
                <CardBody className="flex justify-center items-center p-4">
                  <Image
                    alt={`Imagen de ${promotoriaSeleccionada.Nombre_Promotor}`}
                    className="w-40 h-40 object-cover rounded-full border-2 border-gray-300 shadow-sm"
                    src={getImageUrl(promotoriaSeleccionada)}
                  />
                </CardBody>
              </Card>
            )}
          </div>
          <div className="flex-1 bg-gray-100 border-1 p-2">
            {dataI.length > 0 ? (
              <>
                <div className="-100">
                  <ComboZonaPromotoria
                    onSelectionChange={handleComboSelectionChange}
                    filterValues={selectedValues}
                  />
                  <div className="text-xl font-semibold bg-blue-800 text-gray-100  p-6 rounded-md">
                    Indicadores
                  </div>
                  <div className="text-[14px] bg-white text-gray-800 p-2 ">
                    Los cálculos se realizan con base en la información de los siguientes archivos:
                    <div className="inline bg-grey-500 hover:bg-grey-700 font-bold rounded cursor-pointer" onClick={() => setShowFechas(!showFechas)}> Ver Archivos</div>
                    {dataBasesMetricas.length > 0 && showFechas ?
                      dataBasesMetricas.map((item, index) => (
                        <div key={index} className="text-[10px] text-black leading-normal">
                          <span>{index + 1}</span>{') '}<span>{item.Nombre}</span> DEL MES <span>{item.Mes}</span>{' '}
                          CARGADO EL DIA <span>{item.Fecha_Importacion}</span> POR <span>{item.Nombre_Usuario_Add}</span>
                        </div>
                      )) : null}
                    <div></div>
                  </div>
                  <div className="text-[10px] bg-white text-gray-800 p-2  mb-5 rounded-b-md  leading-normal">
                    * Los cálculos de la columna KC son un indicativo y dependerán del estilo
                    de venta del agente, es importante que revisen las coberturas que no se
                    consideran en la PCA así como otros factores que pueden cambiar estos indicadores.
                    Para el cálculo se utiliza el reporte Integral de Comisiones,
                    el último archivo cargado corresponde al mes de {dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 45)[0]?.Mes}
                    {' '} y fue cargado el día {dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 45)[0]?.Fecha_Importacion}.
                    {dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 45)[0]?.Fecha_Desde ===
                      dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 10)[0]?.Fecha_Desde ?
                      <div>
                        Debido a que el archivo Integral de Comisiones corresponde al mismo mes del archivo Quién es Quién,
                        la columna KC no puede ser calculada
                      </div> : null}
                    {dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 45)[0]?.Fecha_Desde <
                      dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 10)[0]?.Fecha_Desde ?
                      <div>
                        Debido a que el archivo Integral de Comisiones corresponde es anterior al archivo Quién es Quién,
                        la columna KC no puede ser calculada
                      </div> : null}
                    {dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 43)[0]?.Fecha_Desde ===
                      dataBasesMetricas.filter(item => item.Id_Met_Importacion_Tipo === 10)[0]?.Fecha_Desde ?
                      <div className='block'>{' '}
                        Debido a que el archivo pendientes de pago corresponde al mismo mes del archivo Quién es Quién,
                        la columna pendiente de pago, no debe ser considerada
                      </div> : null}
                  </div>
                </div>
                <div className="min-w-full align-middle shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 border border-gray-300 sm:pl-6">&nbsp;</th>
                        <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900 border border-gray-300">
                          QEQ <br />
                          <span className="text-[10px]"> AL MES {dataI[0]?.QEQ_Nombre_Mes} - {dataI[0]?.QEQ_Anio}</span>
                        </th>
                        <HeaderColumn isVisible={visibleColumns.KC}>
                          KC <br />  {dataI[0]?.KC_Nombre_Mes} - {dataI[0]?.KC_Anio}
                          {dataBasesMetricas.length > 0 &&
                            <div className='text-[10px] '> AL {dataBasesMetricas.filter((e) => e.Id_Met_Importacion_Tipo == 45)[0].Fecha_Hasta}</div>}
                        </HeaderColumn>
                        <HeaderColumn isVisible={visibleColumns.KC2}>
                          KC <br /> {dataI[0]?.KC_Nombre_Mes2} - {dataI[0]?.KC_Anio2}
                        </HeaderColumn>
                        <HeaderColumn isVisible={visibleColumns.PendientePago}>
                          PENDIENTE DE PAGO <br />
                          {dataBasesMetricas.length > 0 &&
                            <div className='text-[10px] '> AL {dataBasesMetricas.filter((e) => e.Id_Met_Importacion_Tipo == 47)[0].Fecha_Hasta}</div>}
                        </HeaderColumn>
                        <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900 border border-gray-300">
                          TOTAL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap bg-gray-50  px-3 py-2 text-left text-sm text-gray-900" colSpan="6">
                          <b>Vida</b> <br />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6 "
                          onClick={toggleShowDefiniciones}
                        >
                          PCA Vida 1er Año
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dataI[0]?.KC_PCA_1er_Anio_Vida > 0 ?
                            <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PCA_Vida_KC`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida)}
                            </Fragment>}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida2)}
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          --
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PCA_1er_Anio_Vida +
                            dataI[0]?.KC_PCA_1er_Anio_Vida + dataI[0]?.KC_PCA_1er_Anio_Vida2
                          )}
                        </td>
                      </tr>
                      <tr className='bg-gray-50'>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PCA Meta 1er Año
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dataI[0]?.KC_PCA_1er_Anio_Meta > 0 ?
                            <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PCA_Meta_KC`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta)}
                            </Fragment>}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          {dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta2)}
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          --
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PCA_1er_Anio_Meta +
                            dataI[0]?.KC_PCA_1er_Anio_Meta + dataI[0]?.KC_PCA_1er_Anio_Meta2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PCA Total
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PCA_1er_Anio_Meta +
                            dataI[0]?.QEQ_PCA_1er_Anio_Vida
                          )}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dollarUSLocale.format(
                            dataI[0]?.KC_PCA_1er_Anio_Meta +
                            dataI[0]?.KC_PCA_1er_Anio_Vida
                          )}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          {dollarUSLocale.format(
                            dataI[0]?.KC_PCA_1er_Anio_Meta2 +
                            dataI[0]?.KC_PCA_1er_Anio_Vida2
                          )}
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          --
                        </Column>
                        <td className="whitespace-nowrap  px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PCA_1er_Anio_Meta +
                            dataI[0]?.QEQ_PCA_1er_Anio_Vida +
                            dataI[0]?.KC_PCA_1er_Anio_Meta +
                            dataI[0]?.KC_PCA_1er_Anio_Vida +
                            dataI[0]?.KC_PCA_1er_Anio_Meta2 +
                            dataI[0]?.KC_PCA_1er_Anio_Vida2
                          )}
                        </td>
                      </tr>
                      <tr className='bg-gray-50'>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PCA Conservación
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PCA_Conservacion_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY)}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          {dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY2)}
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          --
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PCA_Conservacion_CY +
                            dataI[0]?.KC_PCA_Conservacion_CY +
                            dataI[0]?.KC_PCA_Conservacion_CY2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PNA Vida
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dataI[0]?.KC_PNA_Vida_CY > 0 ?
                            <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PNA_Vida_KC`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY)}
                            </Fragment>}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['metrica_pna_vida']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          {dataI[0]?.Pendiente_Pago_Vida > 0 ?
                            <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/vida`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida)}
                            </Fragment>}
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PNA_Vida_CY +
                            dataI[0]?.Pendiente_Pago_Vida +
                            dataI[0]?.KC_PNA_Vida_CY +
                            dataI[0]?.KC_PNA_Vida_CY2
                          )}
                        </td>
                      </tr>
                      <tr className='bg-gray-50'>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PNA Meta
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dataI[0]?.KC_PNA_Vida_CY > 0 ?
                            <Link href={`/agente/${user.Clave_Agente}/indicadores/detalle/Titan_PNA_Meta_KC`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY)}
                            </Fragment>}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['metrica_pna_meta']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          {dataI[0]?.Pendiente_Pago_Meta > 0 ?
                            <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/Meta`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta)}
                            </Fragment>}
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PNA_Meta_CY +
                            dataI[0]?.Pendiente_Pago_Meta +
                            dataI[0]?.KC_PNA_Meta_CY +
                            dataI[0]?.KC_PNA_Meta_CY2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PNA Total
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY + dataI[0]?.QEQ_PNA_Meta_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY + dataI[0]?.KC_PNA_Meta_CY)}
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          {dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY2 + dataI[0]?.KC_PNA_Meta_CY2)}
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          <LinkCell
                            href="/pendiente-de-pago/agentes"
                            guid={user.Guid_Agente}
                            amount={dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida + dataI[0]?.Pendiente_Pago_Meta)}
                          />
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PNA_Vida_CY +
                            dataI[0]?.QEQ_PNA_Meta_CY +
                            dataI[0]?.Pendiente_Pago_Vida +
                            dataI[0]?.Pendiente_Pago_Meta +
                            dataI[0]?.KC_PNA_Vida_CY +
                            dataI[0]?.KC_PNA_Meta_CY +
                            dataI[0]?.KC_PNA_Vida_CY2 +
                            dataI[0]?.KC_PNA_Meta_CY2
                          )}
                        </td>
                      </tr>
                      {dataPersistencia.length > 0 && (
                        <>
                          <tr>
                            <td colSpan="6">&nbsp;</td>
                          </tr>
                          <tr className='bg-gray-50 '>
                            <td
                              className="cursor-pointer whitespace-nowrap  py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                              onClick={toggleShowDefiniciones}
                            >
                              Persistencia 24 cosechas:
                            </td>
                            <td className="whitespace-nowrap  px-3 py-2 text-right text-sm text-gray-500">
                              {percentageUSLocale.format(dataI[0]?.Persistencia / 100)}
                            </td>
                            <Column isVisible={visibleColumns.KC}>--</Column>
                            <Column isVisible={visibleColumns.KC2}>--</Column>
                            <Column isVisible={visibleColumns.PendientePago}>--</Column>
                            <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                              {percentageUSLocale.format(dataI[0]?.Persistencia / 100)}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="6">&nbsp;</td>
                          </tr>
                        </>
                      )}
                      <tr>
                        <td colSpan="6" className=" h-1">&nbsp;</td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap bg-gray-50  px-3 py-2 text-left text-sm text-gray-900" colSpan="6">
                          <b>Primordial</b> <br />
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap  px-3 py-2 text-left text-sm text-gray-900 border-1">
                          Número de pólizas:
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right  text-sm text-gray-500 border-1">
                          {dataI[0]?.Primordial_Numero_Polizas}
                        </td>
                        <Column isVisible={visibleColumns.KC}>--</Column>
                        <Column isVisible={visibleColumns.KC2}>--</Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap px-3 py-2   text-right  text-sm text-gray-500">
                          {dataI[0]?.Primordial_Numero_Polizas}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap  bg-gray-50 px-3 py-2 text-left text-sm text-gray-900">
                          Pólizas con PNA mayor o igual $4,000:
                        </td>
                        <td className="whitespace-nowrap bg-gray-50 px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dataI[0]?.Primordial_Polizas_Mayor_Igual_4000}
                        </td>
                        <Column isVisible={visibleColumns.KC}>--</Column>
                        <Column isVisible={visibleColumns.KC2}>--</Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap bg-gray-50 px-3 py-2 text-right text-sm text-gray-500">
                          {dataI[0]?.Primordial_Polizas_Mayor_Igual_4000}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap  px-3 py-2 text-left text-sm text-gray-900">
                          PNA:
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.Primordial_PNA)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>--</Column>
                        <Column isVisible={visibleColumns.KC2}>--</Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          {dataI[0]?.Pendiente_Pago_Primordial > 0 ?
                            <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/primordial`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Primordial)}
                            </Fragment>}
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(dataI[0]?.Primordial_PNA + dataI[0]?.Pendiente_Pago_Primordial)}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap  bg-gray-50 px-3 py-2 text-left text-sm text-gray-900">
                          PP 1er Año:
                        </td>
                        <td className="whitespace-nowrap bg-gray-50 px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.Primordial_PP_1er_Anio)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>--</Column>
                        <Column isVisible={visibleColumns.KC2}>--</Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap bg-gray-50 px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(dataI[0]?.Primordial_PP_1er_Anio)}
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="6">&nbsp;</td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap bg-gray-50  px-3 py-2 text-left text-sm text-gray-900" colSpan="6">
                          <b>Gastos Médicos</b> <br />
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6 border-1"
                          onClick={toggleShowDefiniciones}
                        >
                          Prima Ponderada GMM 1er Año
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['Prima Ponderada GM 1er Año']}
                            amount={formatValue(dataI[0]?.KC_P_Ponderada_1er_Anio_CY)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['Prima Ponderada GM 1er Año']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_P_Ponderada_1er_Anio_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY +
                            dataI[0]?.KC_P_Ponderada_1er_Anio_CY +
                            dataI[0]?.KC_P_Ponderada_1er_Anio_CY2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PNA GMM
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PNA GM']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PNA_CY)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PNA GM']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PNA_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>
                          {dataI[0]?.Pendiente_Pago_GMM > 0 ?
                            <Link href={`/pendiente-de-pago/agentes/${user.Guid_Agente}/gmm`}
                              className="cursor-pointer text-blue-600 underline hover:text-blue-800">
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM)}
                            </Link>
                            : <Fragment>
                              {dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM)}
                            </Fragment>}
                        </Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PNA_CY +
                            dataI[0]?.KC_PNA_CY +
                            dataI[0]?.KC_PNA_CY2 +
                            dataI[0]?.Pendiente_Pago_GMM
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PP GMM 1er Año
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PP_1er_Anio_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PP GM 1er Año']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PP GM 1er Año']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PP_1er_Anio_CY +
                            dataI[0]?.KC_PP_1er_Anio_CY +
                            dataI[0]?.KC_PP_1er_Anio_CY2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          PP GMM Renovación
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PP GM Renovación']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.KC2}>
                          <LinkCell
                            href="/agentes/indicadores/datail"
                            guid={metricas['PP GM Renovación']}
                            amount={dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY2)}
                          />
                        </Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {dollarUSLocale.format(
                            dataI[0]?.QEQ_PP_Renovacion_CY +
                            dataI[0]?.KC_PP_Renovacion_CY +
                            dataI[0]?.KC_PP_Renovacion_CY2
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="cursor-pointer whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800 sm:pl-6"
                          onClick={toggleShowDefiniciones}
                        >
                          Siniestralidad GMM
                        </td>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500 border-1">
                          {percentageUSLocale.format(dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY / 100)}
                        </td>
                        <Column isVisible={visibleColumns.KC}>--</Column>
                        <Column isVisible={visibleColumns.KC2}>--</Column>
                        <Column isVisible={visibleColumns.PendientePago}>--</Column>
                        <td className="whitespace-nowrap px-3 py-2 text-right text-sm text-gray-500">
                          {percentageUSLocale.format(dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY / 100)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <LoadData />
            )}
          </div>
        </div>
      )}
    </>
  );
}
