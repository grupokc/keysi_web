/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import useGetData from '@/app/hooks/useGetData';
import LoadData from '@/app/components/LoadData';
import Link from 'next/link';
import { AcademicCapIcon } from '@heroicons/react/outline';

export default function AgentesIndicadores() {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const { data: dataI } = useGetData({
    ClassName: 'Indicadores_Agentes_Promotoria_IP',
    Ver_promotoria: 1,
    Action: 'Get',
    url: "URL_NETAPI"
  });

  return (
    <>
      {dataI.length > 0 ? (
        <div className="block">
          <h1 className=" m-10 mt-2 text-xs"></h1>
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flex flex-col">
              <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {' '}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        QEQ <br />
                        {dataI[0]?.QEQ_Nombre_Mes} - {dataI[0]?.QEQ_Anio}
                      </th>
                      {/* <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"> KC <br />  {dataI[0]?.KC_Nombre_Mes} - {dataI[0]?.KC_Anio} <br />A LA FECHA </th> */}
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        {' '}
                        PENDIENTE DE PAGO <br />{' '}
                        {dataI[0]?.Fecha_Pendiente_Pago}{' '}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                      >
                        TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td
                        className="whitespace-nowrap bg-gray-400 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                        colSpan="5"
                      >
                        Vida :
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        PCA Vida 1er Año
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        $
                        {dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida)}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Vida) }</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">
                        $
                        {dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida)}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PCA MetaLife 1er Año
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PCA_1er_Anio_Meta,
                        )}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${dollarUSLocale.format(dataI[0]?.KC_PCA_1er_Anio_Meta) }  </td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta)}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PCA Total 1er Año:
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_Total_PCA_1er_Anio,
                        )}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_Total_PCA_1er_Anio)}</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_Total_PCA_1er_Anio,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PCA Conservación
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PCA_Conservacion_CY,
                        )}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PCA_Conservacion_CY ) }</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PCA_Conservacion_CY,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PNA Vida:
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY)}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY) } </td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        ${dollarUSLocale.format(
                          dataI[0]?.Pendiente_Pago_Vida,
                        )}{' '}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PNA_Vida_CY +
                            dataI[0]?.Pendiente_Pago_Vida,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PNA Meta:
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY)}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PNA_Meta_CY) } </td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        ${dollarUSLocale.format(
                          dataI[0]?.Pendiente_Pago_Meta,
                        )}{' '}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PNA_Meta_CY +
                            dataI[0]?.Pendiente_Pago_Meta,
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PNA Total:
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PNA_Vida_CY + dataI[0]?.QEQ_PNA_Meta_CY,
                        )}{' '}
                      </td>
                      {/* <td  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PNA_Vida_CY + dataI[0]?.KC_PNA_Meta_CY) } </td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PNA_Vida_CY + dataI[0]?.QEQ_PNA_Meta_CY,
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td
                        className="whitespace-nowrap bg-gray-400 py-4 pl-4 pr-3 text-sm font-medium text-gray-900  sm:pl-6"
                        colSpan="5"
                      >
                        Gastos Médicos:
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        P. Ponderada 1er Año
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY,
                        )}{' '}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_P_Ponderada_1er_Anio_CY) }</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PNA
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY)}{' '}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right ">  ${dollarUSLocale.format(dataI[0]?.KC_PNA_CY) } </td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        ${dollarUSLocale.format(
                          dataI[0]?.Pendiente_Pago_GMM,
                        )}{' '}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        $
                        {dollarUSLocale.format(
                          dataI[0]?.QEQ_PNA_CY +
                            dataI[0]?.KC_PNA_CY +
                            dataI[0]?.Pendiente_Pago_GMM,
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PP 1er Año
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(
                          dataI[0]?.QEQ_PP_1er_Anio_CY,
                        )}{' '}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PP_1er_Anio_CY) }</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(dataI[0]?.QEQ_PP_1er_Anio_CY)}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {' '}
                        PP Renovación
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(
                          dataI[0]?.QEQ_PP_Renovacion_CY,
                        )}{' '}
                      </td>
                      {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> ${ dollarUSLocale.format(dataI[0]?.KC_PP_Renovacion_CY) }</td> */}
                      <td
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm  text-gray-500"
                      >
                        {' '}
                        --
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 ">
                        {' '}
                        ${dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY)}
                      </td>
                    </tr>
                    {/* <tr >
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> Siniestralidad:</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> -- </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> { dollarUSLocale.format(dataI[0]?.KC_Porcentaje_Siniestralidad_CY) } % </td>
                                    <td scope="col" className="px-3 py-3.5 text-center text-sm  text-gray-500"> -- </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right "> { dollarUSLocale.format(dataI[0]?.KC_Porcentaje_Siniestralidad_CY )} %</td>
                                </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadData />
      )}
    </>
  );
}
