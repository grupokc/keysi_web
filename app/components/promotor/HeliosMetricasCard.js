/* eslint-disable @next/next/no-img-element */
"use client"
import {  useState,useEffect, Fragment} from "react"
import Indicadores from "@/app/components/promotor/indicadores"
import { Dialog, Menu, Transition } from '@headlessui/react'
import useGetData from "@/app/hooks/useGetData"


export default function HeliosMetricaCard({Ver_Promotoria}) {

  const { data: dMetricas } = useGetData({
    ClassName: "Titan_Resumen_Metricas_Helios",
    Ver_Promotoria:Ver_Promotoria,
    Action: "Get",
    url: "URL_NETAPI"
  })

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"))
    setUser(user)
  }, [])
  return (


    <>
    <div  className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-5">
            <div className="flex items-center">

                <div className=" w-0 flex-1">
                <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">Cartera</dt>
                    <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"> Estado </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"> Casos</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {dMetricas.map((item, itemIdx) => (
                            <tr key={item.Id_Agente_Clave_Categoria_Cia}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 " >{item.Nombre_Solicitud_Paso} </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 " >{item.Casos} </td>
                            </tr>
                        ))}

                    </tbody>
                    </table>

                </dl>
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-5 py-3 flex ">
            <div className="text-sm flex-1 text-center">
                <a href={"/polizas/Promotores"} className="font-medium text-cyan-700 hover:text-cyan-900">
                Ver Helios
                </a>
            </div>
        </div>
    </div>
  </>
  )
}
