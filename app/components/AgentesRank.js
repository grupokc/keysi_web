/* eslint-disable @next/next/no-img-element */
"use client"
import {  useState,useEffect } from "react"
import useGetData from "@/app/hooks/useGetData"
import BandaRank from '@/app/components/RankBanda'
import BandaRankPromotorias from '@/app/components/RankBandaPromorias'
export default function AgentesRank() {
    const [user, setUser] = useState({})
    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem("user"))
        setUser(user)
        console.log(user)
      }, [])
    return (
        <>
  
         <div className="bg-white  w-full  ">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-lg font-bold text-gray-900">
                        RANK PROMOTORIAS
                    </h1>
                <BandaRankPromotorias Id_Ramo="1" /> 
                <BandaRankPromotorias Id_Ramo="5" /> 
                </div>
                { user.Id_Promotoria > 0 ?
                    <>
                    <div className="flex flex-col items-center justify-center gap-4 mt-10">
                        <h1 className="text-lg font-semibold text-gray-900">
                            RANK AGENTES DE LA PROMOTORIA
                        </h1>    
                        <BandaRank Id_Ramo="1" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="9"/>
                        <BandaRank Id_Ramo="5" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="9"/>

                        <BandaRank Id_Ramo="1" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="10"/>
                        <BandaRank Id_Ramo="5" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="10"/>

                        <BandaRank Id_Ramo="1" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="11"/>
                        <BandaRank Id_Ramo="5" Id_Promotoria={user.Id_Promotoria} Id_Agente_Clave_Categoria_Cia="11"/>
                    </div>
                </>:null
                }
            </div>
    
        </>
    )
}