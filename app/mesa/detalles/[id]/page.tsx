'use client';
import LoaderLayout from '@/app/components/layouts/LoaderLayout';
import useGetData from '@/app/hooks/useGetData';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import {Fragment} from 'react';

export default function Details({ params }: { params: { id: string } }) {
  const { data: dataTicket, loading: loadingTicket } = useGetData({
    ClassName: 'Titan_Mesa_App',
    Action: 'Get',
    Guid_Ticket: params?.id,
  });

  const { data: dataBitacoras, loading: loadingBitacoras } = useGetData({
    ClassName: 'Bitacoras_Todas',
    Action: 'List',
    Guid_Ticket: params?.id,
  });
  const { data: dataDoctos, loading: loadingDoctos } = useGetData({
    ClassName: 'Documentos_X_Ticket',
    Action: 'List',
    Guid_Ticket: params?.id,
  });

  return (
    <>
      <LoaderLayout loading={loadingTicket}>
        {dataTicket?.length > 1
          ? null
          : dataTicket?.map((ticket:any,index) => (
              <div className="w-full" key={index}>
                <h1 className="w-90 m-5 bg-blue-600 p-4 text-center font-bold text-blue-50">
                  Ticket: {ticket.Id_Ticket}
                </h1>

                <div className="w-90 m-5 grid grid-cols-3 gap-1 bg-gray-50">
                  <div className="bg-blue-600 p-2 font-bold text-blue-50 ">
                    Asunto:
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {ticket.Asunto}
                  </div>
                  <div className="bg-blue-600 p-2 font-bold text-blue-50 ">
                    Folio Cia:
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {ticket.Folio_Cia}
                  </div>
                  <div className="bg-blue-600 p-2  font-bold text-blue-50 ">
                    Asegurado:
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {ticket.Nombre_Contratante}
                  </div>
                  <div className="bg-blue-600 p-2  font-bold text-blue-50 ">
                    Agente:
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {ticket.Nombre_Agente}
                  </div>

                  <div className="bg-blue-600 p-2 font-bold text-blue-50 ">
                    Estatus:
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {ticket.Nombre_Ticket_Estatus}
                  </div>
                </div>
              </div>
            ))}
        <h1 className="w-90 m-5 bg-blue-600 p-4 text-center font-bold text-blue-50">
          
          Bitacoras
        </h1>
        {dataBitacoras?.map((bitacora:any,index) => {
          if (bitacora.Texto.indexOf('De:') == -1) {
            return (
              <div className="w-full" key={index}>
                <div className="w-90 m-5 grid grid-cols-3 gap-1 bg-gray-50">
                  <div className="bg-blue-600 p-2 font-bold text-blue-50 ">
                    {bitacora.Fecha_Posteo}
                  </div>
                  <div className=" col-span-2 bg-gray-50 p-2">
                    {bitacora.Texto.replace(/(<([^>]+)>)/gi, ' ').replace(
                      /&nbsp;/g,
                      ' ',
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}

        <h1 className="w-90 m-5 bg-blue-600 p-4 text-center font-bold text-blue-50">
          
          Documentos
        </h1>
        {loadingDoctos ? (
          <div>
            <Loading />
          </div>
        ) : dataDoctos.length == 0 ? (
          <div className="m-10">No hay Documentos</div>
        ) : (
          <ul className="m-5">
            {dataDoctos.map((docto:any, index) => (
              <Fragment key={index}>
                <li className="mb-2" >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${docto.Guid_Documento}`}
                    href={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${docto.Guid_Documento}`}
                  >
                    <i className="fas fa-file-alt text-base text-blue-900 text-opacity-50" />
                    {docto.Nombre_Documento}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        )}
        <div className="mb-40"></div>
      </LoaderLayout>
    </>
  );
}
