import { useRouter } from "next/navigation"

export default function InboxItem({
  Asunto,
  Nombre_Prospecto,
  Id_Ticket,
  Id_Tarea_Tipo
}) {
  const { push } = useRouter()
  const icon =
    Id_Tarea_Tipo === 2
      ? "fas fa-calendar-check"
      : Id_Tarea_Tipo === 3
      ? "fas fa-mobile-alt"
      : Id_Tarea_Tipo === 4
      ? "fas fa-envelope"
      : Id_Tarea_Tipo === 5
      ? "fas fa-bell"
      : "fas fa-sticky-note"

  return (
    <div
      className='flex items-center border pr-2 w-full min-w-[300px] max-h-[65px] border-gray-300 bg-white rounded-md'
      onClick={() => push(`/inbox/detalles/${Id_Ticket}`)}
    >
      <span className='flex items-center justify-center min-h-[65px] p-2 px-3 bg-blue-600 text-white text-base rounded-tl-md rounded-bl-md'>
        <i className={icon} />
      </span>
      <div className='ml-3 w-full py-1'>
        <p className='font-medium'>{Nombre_Prospecto}</p>
        <p className='text-xs'>{Asunto}</p>
      </div>
    </div>
  )
}
