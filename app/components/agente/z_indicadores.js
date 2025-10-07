/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react"
import LoadData from "@/app/components/LoadData"
import useList from "@/app/hooks/useList"
import useGetData from "@/app/hooks/useGetData"
import Link from "next/link"
import Image from "next/image"
import Rank from "@/app/components/rank/index"
import { UserContext } from "@/app/context/UserContext"
import DefinicionesBono from "./definiciones_bono"
export default function Indicadores({person}) {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const [showDefiniciones, setShowDefiniciones] = useState(false)
    const toggleShowDefiniciones = () => { setShowDefiniciones(!showDefiniciones) }
    const { data: dataI } = useGetData({
        ClassName: "Indicadores_IP",
        Action: "Get"
      })
    const { data: dataPersistencia } = useGetData({
    ClassName: "Persistencia",
    Action: "Ultima"
    })
    return (
        <> 
        { 
            showDefiniciones? <DefinicionesBono showResumen={toggleShowDefiniciones} />:
            <div className='flex flex-row rounded-lg shadow-lg  w-full  overflow-x-auto  bg-gray-300'>
                <div className='hidden lg:inline w-2/5 '>
                    <img className='w-full h-full '
                        src="https://grupokc.imgix.net/metricas.png?bg=FFFFFF&q=50"
                        alt='' />
                </div>
                <div className='flex-1 bg-white p-6 '>
                {
                    dataI.length >0?   
                    <>
                        <div className="sticky left-0 ">
                            <div className='text-xl font-semibold text-gray-900'> Indicadores</div>
                            <div className='text-[10px]  text-gray-800'>  Fecha de actualización {dataI[0]?.Fecha_Actualizacion}  </div>
                        </div>
                        <div className="min-w-full align-middle shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">&nbsp;</th>
                                        <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900">QEQ <br />{dataI[0]?.QEQ_Nombre_Mes} - {dataI[0]?.QEQ_Anio}</th>
                                        <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900"> PENDIENTE DE PAGO <br/> {dataI[0]?.Fecha_Pendiente_Pago} </th>
                                        <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                    
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PCA Vida 1er Año</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Vida) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PCA Meta 1er Año</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta) }</td>
                                    </tr>
                                    <tr >
                                        <td className=" bg-gray-50 whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PCA Total</td>
                                        <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta  + dataI[0]?.QEQ_PCA_1er_Anio_Vida) }</td>
                                        <td className="bg-gray-50 px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_1er_Anio_Meta + dataI[0]?.QEQ_PCA_1er_Anio_Vida ) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PCA Conservación</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_Conservacion_CY) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PCA_Conservacion_CY) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PNA Vida</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500">  ${ dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida) }</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY +dataI[0]?.Pendiente_Pago_Vida)}</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}> PNA Meta</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> ${ dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Meta) }</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right"> ${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY  +dataI[0]?.Pendiente_Pago_Meta)}</td>
                                    </tr>
                                    <tr >
                                        <td className="bg-gray-50 whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PNA Total</td>
                                        <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Meta_CY) }</td>
                                        <td className="bg-gray-50 px-3 py-2 text-center text-sm  text-gray-500"> ${ dollarUSLocale.format(dataI[0]?.Pendiente_Pago_Vida+dataI[0]?.Pendiente_Pago_Meta) }</td>
                                        <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_Vida_CY +dataI[0]?.QEQ_PNA_Meta_CY + dataI[0]?.Pendiente_Pago_Vida+dataI[0]?.Pendiente_Pago_Meta)}</td>
                                    </tr>

                                    { 
                                            dataPersistencia.length >0 ? 
                                            <>
                                                <tr >
                                                    <td className="bg-gray-50 whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>Persistencia 24 cosechas:</td>
                                                    <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">{ dollarUSLocale.format(dataI[0]?.Persistencia) } %</td>
                                                    <td className="bg-gray-50 px-3 py-2 text-center text-sm  text-gray-500"> -</td>
                                                    <td className="bg-gray-50 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">-</td>
                                                </tr>
                                            </>:null
                                    
                                    }



                                    <tr className="" >
                                        <td className="border-t-4 whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>Prima Ponderada GM 1er Año</td>
                                        <td className="border-t-4 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY) }</td>
                                        <td className="border-t-4 px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="border-t-4 whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_P_Ponderada_1er_Anio_CY) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PNA GM</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> ${ dollarUSLocale.format(dataI[0]?.Pendiente_Pago_GMM) }</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PNA_CY) }</td>
                                    </tr>
                                    <tr >
                                        <td className="  whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PP GM 1er Año</td>
                                        <td className=" whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format( dataI[0]?.QEQ_PP_1er_Anio_CY) }</td>
                                        <td className=" px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className=" whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PP_1er_Anio_CY ) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>PP GM Renovación</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">${ dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY) }</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500"> --</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_PP_Renovacion_CY) }</td>
                                    </tr>
                                    <tr >
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 hover:text-blue-800  sm:pl-6 cursor-pointer" onClick={() => toggleShowDefiniciones()}>Siniestralidad GM</td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right ">{ dollarUSLocale.format(dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY) } %</td>
                                        <td className="px-3 py-2 text-center text-sm  text-gray-500">  -- </td>
                                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500 text-right">${ dollarUSLocale.format(dataI[0]?.QEQ_Porcentaje_Siniestralidad_CY)} %</td>
                                    </tr>
                                </tbody>
                                
                            </table>
                        </div>
                    </>
                    :<LoadData />
                }
                </div>
            </div>
        }
        </>
    )
}