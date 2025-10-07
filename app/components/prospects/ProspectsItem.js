import { useRouter } from "next/navigation"

export default function PoliciesItem({
  Nombre,
  Email1,
  Telefonos_Celular,
  Id_Crm_Id_Prospecto
}) {
  const { push } = useRouter()
  return (
    <div
      className='flex items-center border pr-2 w-full min-w-[300px] max-h-[85px] border-gray-300 bg-white rounded-md'
      onClick={() => push(`prospectos/detalles/${Id_Crm_Id_Prospecto}`)}
    >
      <span className='flex items-center justify-center min-h-[85px] p-2 px-3 bg-blue-600 text-white text-base rounded-tl-md rounded-bl-md'>
        <i className='fas fa-file-alt' />
      </span>
      <div className='ml-3 w-full py-1'>
        <p className='font-medium mb-1 '>{Nombre}</p>
        <span className='divide-y divide-blue-600' />
        <p className='text-xs'>
          <span className='font-medium'>Celular: </span>
          {Telefonos_Celular}
        </p>
        <p className='text-xs'>
          <span className='font-medium'>Correo: </span>
          {Email1}
        </p>
      </div>
    </div>
  )
}
