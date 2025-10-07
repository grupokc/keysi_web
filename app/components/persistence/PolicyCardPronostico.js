export default function PolicyCardPronostico({
  Poliza,
  Producto,
  Anio_Vigencia,
  Subclasificacion_Cartera,
  Vigencia_Inicio,
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
          <span className='font-medium'>Anio_Vigencia: </span>
          {Anio_Vigencia}
        </p>
        <p>
          <span className='font-medium'>Subclasificacion_Cartera: </span>
          {Subclasificacion_Cartera}
        </p>
        <p>
          <span className='font-medium'>Vigencia_Inicio: </span>
          {Vigencia_Inicio}
        </p>
        {/* <p>
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
        </p> */}
      </div>
    </li>
  )
}
