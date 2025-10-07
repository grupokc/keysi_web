import { MailIcon, PhoneIcon, ChartBarIcon } from '@heroicons/react/solid'
export default function AgenteCard({person},hideVerMas) {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const getImageUrl = (user) => {
        const foto = (user.RutaFoto + "").replace(/\\/g, "/")
        return "https://pegasus.grupokc.com.mx/" + foto
    }
    const cambiar = (person) => {
       
        toast.promise( cargarDatos(person), {
            loading: 'Loading...',
            success: (data) => {
                hide(person)
              return `toast has been added`;
            },
            error: 'Error',
          });
    }
    return (
        <li  key={person.Clave_Agente}  className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col p-8 ">
                <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={getImageUrl(person)} alt="" />
                <h3 className="mt-6 text-sm font-medium text-gray-900">{person.Nombre_Agente}</h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{person.Fecha_Ingreso}</dd>
                <dt className="sr-only">Role</dt>
                {
                    person.Estado_Nombre == "ACTIVO" ?                  
                    <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {person.Estado_Nombre}
                        </span>
                    </dd>
                    :
                    <dd className="mt-3">
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                        {person.Estado_Nombre}
                        </span>
                    </dd>
                }
                </dl>
            </div>
            <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                    <a
                    href={`mailto:${person.Correo_Personal}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                    <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Correo
                    </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                    <a
                    href={`tel:${person.Telefono_Celular}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                    <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    Llamar
                    </a>
                </div>
                {/* { 
                    hideVerMas ? null :
                    <div className="-ml-px flex w-0 flex-1">
                        <a  onClick={() =>cambiar(person)} 
                        href="#"
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                        <ChartBarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        Ver más 
                        </a>
                    </div>
                } */}

                
                </div>
            </div>
        </li>
    )
}