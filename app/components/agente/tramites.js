import useGetData from "@/app/hooks/useGetData"
import Link from "next/link"
import Image from "next/image"
import { CheckIcon } from '@heroicons/react/solid'

export default function Tramites({person}) {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const { data: dataCarteraIndicadoresVida } = useGetData({
      ClassName: "Crm_Cartera_Indicadores",
      Action: "Get",
      Id_Ramo: 1
    })
  
    const { data: dataCarteraIndicadoresGm } = useGetData({
      ClassName: "Crm_Cartera_Indicadores",
      Action: "Get",
      Id_Ramo: 5
    })
    const steps = [
      { id: '01', name: 'Job details', href: '#', status: 'complete' },
      { id: '02', name: 'Application form', href: '#', status: 'current' },
      { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
    ]
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }

    const getGmm = () => {
      return dataCarteraIndicadoresGm.filter((e)=>{
        return e.Id_Solicitud_Paso > 0 
      })[0]?.Casos
    }
    const getVida = () => {
      return dataCarteraIndicadoresVida.filter((e)=>{
        return e.Id_Solicitud_Paso > 0  
      })[0]?.Casos
    }
    return (
      <div className='w-full rounded-lg shadow-lg overflow-hidden bg-white  p-10 '>
        <div className='text-xl font-semibold text-gray-900'>
            Cartera
        </div>

        <table className="w-3/4 divide-y divide-gray-300">
          <thead className="bg-gray-50">
              <tr>
                  <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Gastos Médicos</th>
                  <th className="px-3 py-2 text-center text-sm font-semibold text-gray-900">Vida<br /></th>

              </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
          
            <tr>
                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900" > {getGmm()}</td>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900"> {getVida()}</td>
            </tr>
             
          </tbody>
      </table>
        {/* <nav aria-label="Progres" className="flex">
          <ol role="list" className="overflow-hidden mr-20">
            <h2> Vida</h2>
            {dataCarteraIndicadoresVida.map((step, stepIdx) => (
              <li key={step.Id_Solicitud_Paso} className={classNames(stepIdx !== dataCarteraIndicadoresVida.length - 1 ? 'pb-10' : '', 'relative')}>
                  { stepIdx !== dataCarteraIndicadoresVida.length - 1 ? (
                      <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-400" aria-hidden="true" />
                    ) : null}
                  <a href="#" className="group relative flex items-start">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className=" text-gray-100 relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      {step.Casos} 
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col ">
                      <span className="text-sm font-medium text-gray-500">  {step.Nombre_Solicitud_Paso}</span>
                      <span className="text-sm text-gray-500">${dollarUSLocale.format(step.Prima_Neta)}</span>
                    </span>
                  </a>
              </li>
            ))}
          </ol>

          <ol role="list" className="overflow-hidden">
          <h2>Gastos Médicos</h2>
            {dataCarteraIndicadoresGm.map((step, stepIdx) => (
              <li key={step.Id_Solicitud_Paso} className={classNames(stepIdx !== dataCarteraIndicadoresGm.length - 1 ? 'pb-10' : '', 'relative')}>
                  { stepIdx !== dataCarteraIndicadoresGm.length - 1 ? (
                      <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-400" aria-hidden="true" />
                    ) : null}
                  <a href="#" className="group relative flex items-start">
                    <span className="flex h-9 items-center" aria-hidden="true">
                      <span className=" text-gray-100 relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        {step.Casos}
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col ">
                      <span className="text-sm font-medium text-gray-500">{step.Nombre_Solicitud_Paso}</span>
                      <span className="text-sm text-gray-500">${dollarUSLocale.format(step.Prima_Neta)}</span>
                    </span>
                  </a>
              </li>
            ))}
          </ol>
        </nav> */}




        <div className='flex space-x-1 text-sm text-gray-500 bg-slate-50 p-3 mb-2'>
            <h1 className=" text-xs mt-2 text-gray-500">
            Cartera registrada en sistema HELIOS al 29 de diciembre 2029 <br/>FUENTE: HELIOS
            </h1>

          </div>
          <div className='text-sm text-gray-500 bg-slate-50 p-3 '>
            <Link href="/polizas/Agentes" className='block mt-2'>
              <span className='text-sm font-medium text-indigo-600'>
                Ver Detalle
              </span>
            </Link>
          </div>
      </div>

    )
}