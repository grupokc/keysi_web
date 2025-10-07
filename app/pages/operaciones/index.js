/* eslint-disable @next/next/no-img-element */
import {  useState } from "react"
import useGetData from "@/app/hooks/useGetData"
import { ChevronLeftIcon} from '@heroicons/react/solid'
import LoadData from "@/app/components/LoadData"
import Loading from "@/app/components/Loading"
export default function OperacionesIndex({showResumen,Id_Agente,Id_Liquidacion}) {


    const getUrl=()=>{
        return `https://pegasus.grupokc.com.mx/V3/Estado_De_Cuenta/?Id_Agente=${Id_Agente}&Id_Liquidacion=${Id_Liquidacion}`
    }
    return (
        <> 
            
            <div className="flex flex-row w-11/12  m-5">
                <div className="flex-1"> 
                    <button  className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                    onClick={showResumen}>
                        <ChevronLeftIcon  className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
                        Regresar 
                    </button></div>
                <div className="flex-1  text-lg mt-2 "> <h1> Estado de Cuenta</h1></div>
            </div>
            {
            Id_Liquidacion > 0 ?
                <div className=" w-full">
                    <iframe className=" w-full h-screen" src={getUrl()}></iframe>
                </div>: <Loading />    
        
            }


        </>
    )

}