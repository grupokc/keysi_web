export default function PolicyCard({
  Poliza,
  Producto,
  Pagado_Hasta,
  Meses_de_Calculo,
  Estatus_Actual,
  Moneda,
  Prima_Necesaria,
  Prima_Pagada,
  onClick
}) {
  return (
    <li
      onClick={() => onClick(Poliza)}
      className='bg-white shadow-md rounded-sm py-3 px-2 text-xs'
    >
      <div className='flex items-center'>
        <i className='bg-blue-600 text-2xl text-white p-3 mr-3 fas fa-landmark rounded-md' />
        <div>
          <p>
            <span className='font-medium'>Póliza: </span>
            {Poliza}
          </p>
          <p>
            <span className='font-medium'>Producto: </span>
            {Producto}
          </p>
        </div>
      </div>
      <div className='mt-2'>
        <p>
          <span className='font-medium'>Pagado hasta: </span>
          {Pagado_Hasta}
        </p>
        <p>
          <span className='font-medium'>Meses de cálculo: </span>
          {Meses_de_Calculo}
        </p>
        <p>
          <span className='font-medium'>Estatus: </span>
          {Estatus_Actual}
        </p>
        <p>
          <span className='font-medium'>Moneda: </span>
          {Moneda}
        </p>
        <p>
          <span className='font-medium'>Prima necesaria: </span>
          {Prima_Necesaria}
        </p>
        <p>
          <span className='font-medium'>Prima pagada: </span>
          {Prima_Pagada}
        </p>
      </div>
    </li>
  )
}
