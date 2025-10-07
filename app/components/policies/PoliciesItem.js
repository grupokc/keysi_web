import { useRouter } from "next/navigation"

export default function ProspectItem({
  Poliza_Numero,
  Nombre_Contratante,
  Nombre_Cia,
  Nombre_Ramo,
  Id_Poliza,
  Nombre_Solicitud_Paso,
  Vigencia_Inicio,
  Vigencia_Fin,
  Nombre_Plan_De_Cobertura
}) {
  const { push } = useRouter()
  return (
    <div
      className='flex items-center border pr-2 w-full min-w-[300px]  border-gray-300 bg-white rounded-md'
      onClick={() => push(`/polizas/detalles/${Id_Poliza}`)}
    >
      <span className='flex items-center justify-center h-full p-2 px-3 bg-blue-600 text-white text-base rounded-tl-md rounded-bl-md'>
        <i className='fas fa-doc' />
      </span>
      <div className='ml-3 w-full py-1'>
        <p className='font-medium mb-1 '>{Poliza_Numero}</p>
        <p className='font-medium mb-1 '>{Nombre_Plan_De_Cobertura}</p>
        <p className='font-medium mb-1 '>{Vigencia_Inicio} - {Vigencia_Fin}</p>
        <p className='font-medium mb-1 '>{Nombre_Solicitud_Paso}</p>
        <p className='font-medium mb-1 '>{Nombre_Contratante}</p>
        
        <span className='divide-y divide-blue-600' />
        <p className='text-xs'>
          <span className='font-medium'>Cia: </span>
          {Nombre_Cia}
        </p>
        <p className='text-xs'>
          <span className='font-medium'>Ramo: </span>
          {Nombre_Ramo}
        </p>
      </div>
    </div>
  )
}
