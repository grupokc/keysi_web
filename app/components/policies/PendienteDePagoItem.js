import { useRouter } from "next/navigation"

export default function PendienteDePagoItem({
  Poliza,
  Fecha_Emision,
  Frecuencia_Pago,
  Nombre_Agente,
  PNA,
  Producto

}) {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const { push } = useRouter()
  return (
    <div
      className='flex items-center border pr-2 w-full min-w-[300px]  border-gray-300 bg-white rounded-md'

    >
      <span className='flex items-center justify-center h-full p-2 px-3 bg-blue-600 text-white text-base rounded-tl-md rounded-bl-md'>
        <i className='fas fa-doc' />
      </span>
      <div className='ml-3 w-full py-1'>
        <p className='font-thin mb-1 '> <b>Póliza:</b> {Poliza}</p>
        <p className='font-thin mb-1 '><b>Producto:</b> {Producto}</p>
        <p className='font-thin mb-1 '><b>Fecha Emisión: </b> {Fecha_Emision} </p>
        <p className='font-thin mb-1 '> <b>Agente : </b> {Nombre_Agente}</p>
        <p className='font-thin mb-1 '><b>Frecuencia de pago:</b>  {Frecuencia_Pago}</p>
        
        <span className='divide-y divide-blue-600' />
        <p className='text-lg'>
          <span className='font-medium'>PNA: </span>
          {dollarUSLocale.format(PNA)}
        </p>
        {/* <p className='text-xs'>
          <span className='font-medium'>Ramo: </span>
          {Nombre_Ramo}
        </p> */}
      </div>
    </div>
  )
}
