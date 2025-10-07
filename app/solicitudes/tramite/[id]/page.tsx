'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, Fragment } from 'react';
import MainLayout from '@/app/components/layouts/MainLayout';
import Loading from '@/app/components/Loading';
import FileUpload from '@/app/components/FileUpload';
import Button from '@/app/components/Button';
import { useFetch } from '@/app/hooks/useFetch';
import { executeForCRUD } from '@/app/services/frontBack';

interface Documento {
  Id_Solicitud_Documento_Catalogo: number;
  Nombre_Solicitud_Documento_Catalogo: string;
  Id_Ramo: number;
  Id_Tramite_Tipo: number;
  Nombre_Ramo: string;
  Nombre_Tramitre_Tipo: string;
}

interface User {
  Id_Usuario: number;
  Login: string;
  Id_Agente: number;
}

interface Ticket {
  Id_Ticket: number;
}

export default function TramitePage({ params }: { params: { id: string } }) {
  const now = new Date().toLocaleString();
  const [files, setFiles] = useState<{ [key: string]: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [data, setData] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [detalle, setDetalle] = useState('');
  const [asegurado, setAsegurado] = useState('');
  const [prima_neta, setPrimaNeta] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();
  const { request, loading: fetchLoading } = useFetch();

  // Manejar cambios en los campos de formulario
  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: any) => {
    setter(event.target.value);
  };

  const handleNumericInput = (e: any) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const lastUser = JSON.parse(window?.localStorage?.getItem("user") || '{}');
    setUser(lastUser);
    const fetchData = async () => {
      const rr = await executeForCRUD({
        className: 'documentos_x_tramite_tipo',
        action: 'get',
        Id_Tramite_Tipo: params.id,
      });
      setData(rr.data);
      setLoading(false);
      setTitulo(rr.data[0]?.Nombre_Ramo + '-' + rr.data[0]?.Nombre_Tramitre_Tipo || '');
    };
    fetchData();
  }, [params.id]);

  const handleSubmitEnviar = async (e: any) => {
    e.preventDefault();
    setSending(true);
    setOpen(true);

    if (!user) {
      console.error("User is not defined");
      return;
    }

    request({
      cb: (ticket: any) => {
        setTicket(ticket[0]);
        setTimeout(() => {
          data.forEach((element) => {
            document.getElementById(`btn_${element.Id_Solicitud_Documento_Catalogo}`)?.click();
          });
          setSending(false);
        }, 3000);
      },
      action: 'mesa_control_ip_insert',
      body: {
        Id_Usuario: user.Id_Usuario,
        Asunto: `PS - ${asunto}`,
        Detalle: detalle,
        Asegurado: asegurado,
        PrimaNeta: prima_neta,
        Id_Ticket_Mesa_IP_Ramo: data[0]?.Id_Ramo,
        Id_Tramite_Tipo: data[0]?.Id_Tramite_Tipo,
        Login: user.Login,
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <Fragment>
      <MainLayout>
        <div className="font-sans">
          {/* Header */}
          <div className="mb-3 pt-4 font-medium uppercase text-black">
            {titulo && <h1 className="text-2xl">{titulo}</h1>}
          </div>

          {/* Formulario */}
          <div className="h-full overflow-scroll bg-gray-200 px-8">
            <form>
              <label htmlFor="txtAsunto" className="mt-4 block">Asunto:</label>
              <input type="text" id="txtAsunto" name="txtAsunto" className="w-full border p-2" value={asunto} onChange={handleChange(setAsunto)} />

              <label htmlFor="txtAsegurado" className="mt-4 block">Asegurado:</label>
              <input type="text" id="txtAsegurado" name="txtAsegurado" className="w-full border p-2" value={asegurado} onChange={handleChange(setAsegurado)} />

              <label htmlFor="txtPrimaNeta" className="mt-4 block">Prima Neta:</label>
              <input type="text" id="txtPrimaNeta" name="txtPrimaNeta" className="w-full border p-2" value={prima_neta} onKeyPress={handleNumericInput} onChange={handleChange(setPrimaNeta)} />

              <label htmlFor="txtDetalle" className="mt-4 block">Detalle:</label>
              <textarea rows={5} cols={50} id="txtDetalle" name="txtDetalle" className="w-full border p-2" value={detalle} onChange={handleChange(setDetalle)} />
            </form>

            <h2 className="text-1xl mb-4 mt-2 font-bold text-black">
              Para este tipo de trámite se requieren que envíes los siguientes documentos
            </h2>

            <div className="bg-white p-10">
              {data.map((field, index) => (
                <Fragment key={index}>
                  <iframe
                    width="100px"
                    height="300px"
                    name={`el-iframe-${field.Id_Solicitud_Documento_Catalogo}`}
                    className="hidden h-10 w-full"
                  ></iframe>
                  <form
                    target={`el-iframe-${field.Id_Solicitud_Documento_Catalogo}`}
                    method="post"
                    encType="multipart/form-data"
                    action="https://fb.grupokc.com.mx/api/Nf_File/SaveInSQLServer"
                  >
                    <div>
                      <input className="hidden" name="ClassID" value={ticket?.Id_Ticket || ''} readOnly />
                      <input className="hidden" name="ClassName" value="Ticket" readOnly />
                      <input className="hidden" name="UsuarioAdd" value={user?.Id_Agente || ''} readOnly />
                      <input className="hidden" name="Rules" value="" readOnly />
                      <FileUpload
                        id={`input_${field.Id_Solicitud_Documento_Catalogo}`}
                        name={field.Nombre_Solicitud_Documento_Catalogo}
                        label={field.Nombre_Solicitud_Documento_Catalogo}
                        onChange={(e) =>
                          setFiles([
                            ...files,
                            {
                              [e.target.name]: e.target.value,
                            },
                          ])
                        }
                      />
                      <button
                        className="hidden"
                        id={`btn_${field.Id_Solicitud_Documento_Catalogo}`}
                        name={`btn_${field.Id_Solicitud_Documento_Catalogo}`}
                        type="submit"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </Fragment>
              ))}
            </div>

            <div className="justify-end p-4 text-center text-white">
              <button
                onClick={handleSubmitEnviar}
                className="w-1/3 bg-blue-500 px-4 py-2 text-white"
              >
                Enviar
              </button>
            </div>
          </div>

        </div>
      </MainLayout>
      <div className={`${open ? '' : 'hidden'} absolute bottom-0 left-0 right-0 top-0 z-[70] flex items-center justify-center bg-gray-900 bg-opacity-50`}>
        <div className="h-[150px] w-[90vw] rounded-md bg-white px-3 py-6 text-center text-blue-900">
          {fetchLoading ? (
            <div className="flex h-full w-full animate-pulse items-center justify-center text-blue-600">
              <p>Registrando solicitud...</p>
            </div>
          ) : (
            <Fragment>
              <p className="mb-3">
                Solicitud registrada con ticket número:{' '}
                <b className="text-blue-600">{ticket?.Id_Ticket}</b>
              </p>
              {sending ? (
                <div className="flex w-full animate-pulse items-center justify-center text-blue-600">
                  <p>Enviando documentos. Espera...</p>
                </div>
              ) : (
                <Button type="button" onClick={() => push('/solicitudes')}>
                  Se envió la solicitud, puedes continuar
                </Button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
