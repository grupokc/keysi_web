import { Fragment, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { UserContext } from "@/app/context/UserContext"
import MainLaout from "@/app/components/layouts/MainLayout"
import ListLayout from "@/app/components/layouts/ListLayout"
import FileUpload from "@/app/components/FileUpload"
import Button from "@/app/components/Button"
import useGetData from "@/app/hooks/useGetData"
import { useFetch } from "@/app/hooks/useFetch"
import Loading from "@/app/components/Loading"

export default function Procedure() {
  const now = new Date().toLocaleString() + "";
  const [files, setFiles] = useState([])
  const [open, setOpen] = useState(false)
  const isOpen = open ? "" : "hidden"
  const [ticket, setTicket] = useState({})
  const [subject, setSubject] = useState("") // New state for subject
  const [detail, setDetail] = useState("") // New state for detail
  const { user } = useContext(UserContext)
  const { query, isReady, push } = useRouter()
  const { data, loading } = useGetData({
    action: "documentos_x_tramite_tipo",
    Id_Tramite_Tipo: query.id
  })

  const { request, loading: fetchLoading } = useFetch()

  const handleSubmitEnviar = (e) => {
    e.preventDefault()

    const timer = setTimeout(() => {
      data.forEach((element) => {
        const btnFileUpload = document.getElementById(
          `btn_${element.Id_Solicitud_Documento_Catalogo}`
        )

        btnFileUpload.click()
      })
    }, 3000);
    setOpen(true)
  }

  if (!isReady || loading) return <Loading />

  return (
    <Fragment>
        {data[0] ? (
          <p className='text-center font-medium mb-3 uppercase'>
            {data[0].Nombre_Ramo} {"-"}{" "}
            {data[0].Nombre_Tramitre_Tipo}
          </p>
        ) : null}
        <ListLayout>
          {data.map((field) => (
            <Fragment key={field.Id_Solicitud_Documento_Catalogo}>
              <iframe
                width="100px"
                height="300px"
                name={`el-iframe-${field.Id_Solicitud_Documento_Catalogo}`}
                className='hidden w-full h-10'
              ></iframe>
              <form
                target={`el-iframe-${field.Id_Solicitud_Documento_Catalogo}`}
                method='post'
                encType='multipart/form-data'
                action='https://fb.grupokc.com.mx/api/Nf_File/SaveInSQLServer'
              >
                <div>
                  <input
                    className={"hidden bg-red-100"}
                    name='ClassID'
                    value='1158358'
                  ></input>

                  <input
                    className={"hidden"}
                    name='ClassName'
                    value='Ticket'
                    readOnly
                  ></input>
                  <input
                    className={"hidden"}
                    name='UsuarioAdd'
                    value={user.Id_Agente}
                    readOnly
                  ></input>
                  <input
                    className={"hidden"}
                    name='Rules'
                    value=''
                    readOnly
                  ></input>
                  <FileUpload
                    id={`input_${field.Id_Solicitud_Documento_Catalogo}`}
                    name={field.Nombre_Solicitud_Documento_Catalogo}
                    label={field.Nombre_Solicitud_Documento_Catalogo}
                    onChange={(e) =>
                      setFiles([
                        ...files,
                        {
                          [e.target.name]: e.target.value
                        }
                      ])
                    }
                  />
                  <button
                    className='hidden'
                    id={`btn_${field.Id_Solicitud_Documento_Catalogo}`}
                    name={`btn_${field.Id_Solicitud_Documento_Catalogo}`}
                    type='submit'
                  >
                    enviar
                  </button>
                </div>
              </form>
            </Fragment>
          ))}
          <form onSubmit={handleSubmitEnviar} className='flex flex-col gap-3'>

            <Button type='submit'>Enviar</Button>
          </form>

        </ListLayout>
      <div
        className={`${isOpen} absolute flex items-center justify-center z-[70] top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50`}
      >
        <div className='bg-white w-[90vw] rounded-md h-[150px] px-3 py-6 text-center text-blue-900'>
          {fetchLoading ? (
            <div className='text-blue-600 animate-pulse flex items-center justify-center h-full w-full'>
              <p>Enviando...</p>
            </div>
          ) : (
            <Fragment>
              <h3 className=' font-medium'>Trámite solicitado con éxito</h3>
              <p className='mb-3'>
                folio: <b className='text-blue-600'>{ticket.Id_Ticket}</b>
              </p>
              <Button type='button' onClick={() => alert("¡Todo bien!")}>
                Continuar
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}
