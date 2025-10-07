import useGetData from "@/app/hooks/useGetData"
import Link from "next/link"
import Image from "next/image"

export default function Cartera({person}) {
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
  
    return (
  
      <div className='flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-300'>
      <div className='flex-shrink-0 content-center'>
        <img
          className='w-full object-cover'
          src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"

          alt=''
        />
      </div>
      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <Link href="/polizas/Agentes" className='block mt-2'>
            <div>
              <div className='text-xl font-semibold text-gray-900'>
              Tramites pendientes
              </div>
              <div className='mt-3 text-base text-gray-500'>

                <h2>Vida</h2>
                <ul className="list-disc ml-10">
                {dataCarteraIndicadoresVida.map((e)=>{
                  return <>
                    <li> {e.Nombre_Solicitud_Paso_Workflow} : {e.Casos}</li>
                  </>
                })}
                </ul>
                <h2>Gastos Médicos</h2>
                <ul className="list-disc ml-10">
                {dataCarteraIndicadoresGm.map((e)=>{
                  return <>
                    <li> {e.Nombre_Solicitud_Paso_Workflow} : {e.Casos}</li>
                  </>
                })}
                </ul>

              </div>


            </div>

          </Link>
        </div>

        <div className='flex space-x-1 text-sm text-gray-500 mt-4 bg-slate-50 p-3'>
            <h1 className=" text-xs mt-2 text-gray-500">FUENTE: SISTEMA HELIOS </h1>
        </div>
        <div className='text-sm text-gray-500 mt-4 bg-slate-50 p-3 '>
          <Link href="/polizas/Agentes" className='block mt-2'>
            <span className='text-sm font-medium text-indigo-600'>
              Ver Detalle
            </span>
          </Link>
        </div>
      </div>
    </div>        
    )
}