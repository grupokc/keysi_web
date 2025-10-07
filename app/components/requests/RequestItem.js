import { useRouter } from "next/navigation"

export default function RequestItem({ Id_Tramite_Tipo, Nombre }) {
  const { push } = useRouter()
  return (
    <div
      className='flex items-center gap-2 bg-white border-blue-600 border rounded-lg shadow-sm px-5 py-2 cursor-pointer'
      onClick={() => push(`/solicitudes/tramite/${Id_Tramite_Tipo}`)}
    >
      <i className='text-blue-600 fas fa-mail-bulk'></i>
      <p className='font-medium'>{Nombre}</p>
    </div>
  )
}
