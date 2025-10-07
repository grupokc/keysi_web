import LoaderLayout from "@/app/components/layouts/LoaderLayout"
import useGetData from "hooks/useGetData"
import { useRouter } from "next/router"
import LoadData from "@/app/components/LoadData"

import Image from "next/image"

import { ChevronLeftIcon} from '@heroicons/react/solid'
export default function Details() {
  const { query } = useRouter()
  const Bono_Periodo = query.id
  const { push, back } = useRouter()
  const getUrl=()=>{
    const bono = query?.id?.split("-")[0]
    return `/pdf/bonos/${bono}.pdf`
}
  return (
    <LoaderLayout >
      <div className=" pb-20 h-full w-full bg-fixed bg-cover  bg-[url('https://cdn.grupokc.com.mx/img/fondos/Fondo2.jpg')]">

       <div className="flex flex-row w-11/12  m-5">
          <div className="flex-1 mt-10"> 
              <button  className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
              onClick={()=>{back()}}>
                  <ChevronLeftIcon  className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                  Regresar 
              </button>
          </div>
        </div>
        <div  className="flex-1  text-lg mt-2 ">
            <iframe className=" w-full h-screen" src={getUrl()}></iframe>
        </div> 

      </div>

    </LoaderLayout>
  )
}
