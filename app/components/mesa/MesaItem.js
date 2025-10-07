"use client"
import { useRouter } from "next/navigation"

export default function MesaItem({
  Ticket_Id,
  Folio_Cia,
  Nombre_Ticket_Flujo,
  Asunto,
  Nombre_Contratante,
  GUID,
  Nombre_Ticket_Estatus,
  Fecha_Inicio,
  Nombre_Ticket_Estatus_Pendiente_De,
  Nombre_Agente
}) {
  const { push } = useRouter()
  return (
    <div
      className='flex items-center border pr-2 w-full min-w-[300px] h-[150px] border-gray-300 bg-white rounded-md cursor-pointer'
      onClick={() => push(`/mesa/detalles/${GUID}`)}
    >
      <span className='flex items-center justify-center h-[150px] p-2 px-3 bg-blue-600 text-white text-base rounded-tl-md rounded-bl-md'>
        <i className='fas fa-sticky-note' />
      </span>
      <div className='ml-3 w-full py-1'>
      <p className='text-xs'>

      <span className='font-medium'>Ticket: </span>
        {Ticket_Id}</p>


        <p className='text-xs'>

        <span className='font-medium'>Asunto: </span>
          {Asunto}</p>
        <p className='text-xs'>
          <span className='font-medium'>Tipo de Solicitud </span>
          {Nombre_Ticket_Flujo}
        </p>
        <p className='text-xs'>
        <span className='font-medium'>Folio Cia: </span>
          {Folio_Cia}</p>


        {/* <p className='text-xs'>
          <span className='font-medium'>Asegurado: </span>
          {Nombre_Contratante}
        </p> */}
        <p className='text-xs'>
          <span className='font-medium'>Estado: </span>
          {Nombre_Ticket_Estatus_Pendiente_De}
        </p>
        <p className='text-xs'>
          <span className='font-medium'>Estatus: </span>
          {Nombre_Ticket_Estatus}
        </p>
        <p className='text-xs'>
          <span className='font-medium'>Fecha: </span>
          {Fecha_Inicio}
        </p>
        <p className='text-xs'>
          <span className='font-medium'>Agente: </span>
          {Nombre_Agente}
        </p>
        
        
      </div>
    </div>
  )
}
