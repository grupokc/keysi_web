import LoaderLayout from "@/app/components/layouts/LoaderLayout"
import useGetData from "@/app/hooks/useGetData"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Loading from "@/app/components/Loading"
export default function Details() {
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const { query } = useRouter()
  const { data:dataPoliza, loading } = useGetData({
    ClassName: "Titan_Polizas_App",
    Action: "Get",
    Id_Poliza: query.id
  })
  let Id_Solicitud = dataPoliza[0]?.Id_Solicitud
  const { data: dataDoctos, loading: loadingDoctos } = useGetData({
    ClassName: "Documentos_X_Solicitud",
    Action: "get",
    Id_Poliza: query.id
  })


  return (
    <LoaderLayout loading={loading}>
      {dataPoliza.length > 1
        ? null
        : dataPoliza.map((pol) => (<>
          <div className='w-full' key={pol.Poliza_Numero}>
            <h1 className='font-bold text-center w-90 p-4 bg-blue-600 m-5 text-blue-50'> Póliza: {pol.Poliza_Numero}</h1>

            <div className='grid grid-cols-3 gap-1 m-5 w-90 bg-gray-50'>
              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Póliza: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Poliza_Numero}</div>
              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Aseguradora: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Nombre_Cia}</div>
              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Ramo: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Nombre_Ramo}</div>


              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Vigencia: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Vigencia_Inicio} - {pol.Vigencia_Fin}</div>

              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Contratante: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Nombre_Contratante}</div>
              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>RFC: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.RFC}</div>

              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Prima Total: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{dollarUSLocale.format(pol.Prima_Total)}</div>

              <div className='font-bold bg-blue-600 text-blue-50 p-2 '>Conducto de Pago: </div>
              <div className=' bg-blue-50 p-2 col-span-2'>{pol.Nombre_Conducto_Pago}</div>

            </div>
          </div>
          </>
        ))
      }
      <h1 className='font-bold text-center w-90 p-4 bg-blue-600 text-blue-50 m-5'> Documentos</h1>
      {
      loadingDoctos?<div><Loading /> </div>
      :dataDoctos.length == 0 
        ? <div>No hay Documentos</div>
        : <ul className="m-5"> 
          {dataDoctos.map((docto) => (<>
          <div className='w-full' key={docto.Id_Documento_X_Solicitud}>

            <li className=' bg-blue-50 mb-2' >
              <a 
              target="_blank" rel="noopener noreferrer" download={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${docto.Guid_Documento}`}
              href={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${docto.Guid_Documento}`} >
                       <i className='fas fa-file-alt text-base text-opacity-50 text-blue-900' /> {docto.Nombre_Documento}
                </a>
              </li>

          </div>
          </>
        ))}
        </ul>
      }
      <div className="mb-40"></div>
    </LoaderLayout>
  )
}
