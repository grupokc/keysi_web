import Loading from '@/app/components/Loading';
import useGetData from '@/app/hooks/useGetData';
import Link from 'next/link';
import Image from 'next/image';
import { MailIcon, PhoneIcon, ChartBarIcon } from '@heroicons/react/solid';
import { Toaster, toast } from 'sonner';
export default function Rank({ cargarDatos, hide }) {
  let dollarUSLocale = Intl.NumberFormat('en-US');

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const { data: dataAgentes } = useGetData({
    ClassName: 'Agentes_X',
    Action: 'Promotoria',
    url: "URL_NETAPI"
  });
  const getImageUrl = (user) => {
    const foto = (user.RutaFoto + '').replace(/\\/g, '/');
    return 'https://pegasus.grupokc.com.mx/' + foto;
  };
  const cambiar = (person) => {
    toast.promise(cargarDatos(person), {
      loading: 'Loading...',
      success: (data) => {
        hide();
        return `toast has been added`;
      },
      error: 'Error',
    });
  };
  return (
    <div className="w-full bg-gray-100 ">
      <div>
        <Toaster expand={true} richColors />
        <button onClick={() => toast('My first toast')}>Give me a toast</button>
      </div>
      <div className="sticky top-0 mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {dataAgentes[0]?.Nombre_Promotoria}
          </h2>
          <label className="block">
            <span className="text-gray-700">Buscar</span>
            <input
              type="text"
              className="form-input mt-1 block w-full"
              placeholder="Nombre del agente"
            />
          </label>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        >
          {dataAgentes.map((person,index) => (
            <li
              key={index}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <Image
                  className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                  src={getImageUrl(person)}
                  alt=""
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {person.Nombre_Agente}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">
                    {person.Fecha_Ingreso}
                  </dd>
                  <dt className="sr-only">Role</dt>
                  {person.Estado_Nombre == 'ACTIVO' ? (
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {person.Estado_Nombre}
                      </span>
                    </dd>
                  ) : (
                    <dd className="mt-3">
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                        {person.Estado_Nombre}
                      </span>
                    </dd>
                  )}
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${person.Correo_Personal}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <MailIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Correo
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${person.Telefono_Celular}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Llamar
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      onClick={() => cambiar(person)}
                      href="#"
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <ChartBarIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
