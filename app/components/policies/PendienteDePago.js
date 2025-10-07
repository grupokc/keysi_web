"use client"
import { useState, useEffect } from "react";
import useGetData from "@/app/hooks/useGetData";
import Loading from "@/app/components/Loading";
import { dollarUSLocale } from "@/app/utils/utils";
import { useRouter } from "next/navigation";

export default function PendienteDePago({ Ver_Promotoria }) {
  const router = useRouter();
  const [dataToPrint, setDataToPrint] = useState([]);
  const { data, loading } = useGetData({
    ClassName: "Titan_Met_Pendiente_de_Pago",
    Action: "Get",
    Ver_Promotoria: Ver_Promotoria,

  });
  
  useEffect(() => {
    setDataToPrint(data);
  }, [data]);



  return (
    <>
      <div className="flex flex-row w-11/12 m-10">
        <div className="flex-1"><h1>Agentes con Pólizas Pendientes de Pago: {dataToPrint.length}</h1></div>
        <div className="text-xs mt-2 m-10">
          <b>FUENTE</b>: Sistema de gestión de pólizas
        </div>
      </div>
        <div className="block">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mt-2 flex flex-col">
              <div className="min-w-full overflow-x-auto align-middle shadow sm:rounded-lg">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="max-h-[600px] overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-500 sticky top-0 z-10">
                        <tr className="bg-gray-300">
                          <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 border-2 sticky top-0">Nombre Agente</th>
                          <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 border-2 sticky top-0 ">Número de Pólizas</th>
                          <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 border-2 sticky top-0 ">Total PNA</th>
                          <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 border-2 sticky top-0">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      {dataToPrint.map((policy,index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 border-2">{policy.Nombre_Agente}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right border-2">{policy.Numero_De_Polizas}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right border-2">{dollarUSLocale.format(policy.PNA)}</td>
                            <td className='relative py-3.5 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 border-2'>
                            <button
                              type="button"
                              onClick={() => router.push(`/pendiente-de-pago/agentes/${policy.Guid_Agente}`)}
                              className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              Ver Detalle
                            </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {loading && <Loading />}
    </>
  );
}