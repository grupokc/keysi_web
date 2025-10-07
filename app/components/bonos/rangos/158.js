import useGetData from "@/app/hooks/useGetData"
import Image from "next/image"

export default function BonosRangos158({Bono_Periodo}){
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let iCeros = 0
    console.log(Bono_Periodo)
    const { data: dataBonoRango } = useGetData({
        ClassName: "Titan_Bonos_Resultados_Rangos",
        Action: "Get",
        Bono_Periodo: Bono_Periodo
      })
    const secciones = [""]

    return (
        <>
            { 
            dataBonoRango.length > 0 ?
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
                    <div className="mt-3 flex flex-col">
                        <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                            <h1 scope="col" className="text-sm font-semibold bg-blue-300 p-4"> 
                                <div> 
                                    Tu PNA de Gastos Médicos es de  :${dollarUSLocale.format(dataBonoRango[0].Puedes_Ganar)} <br />
                                    Tu PNA de Vida es de  :${dollarUSLocale.format(dataBonoRango[0].Puedes_Ganar_2)} <br />
                                    Tu PNA total es de :${dollarUSLocale.format(dataBonoRango[0].Puedes_Ganar_3)} <br />
                                    Fuente : Archivo Quién es Quién  <br />
                                </div>
                             
                            </h1>

                            <iframe className=" w-full h-screen" src="/pdf/bonos/158.pdf"></iframe>

                            
                
                            <div className="bg-blue-300 p-3">
                            KC pagará $500 usd al regreso del evento MDRT.
Para nuestros agentes ganadores, Grupo KC cubrirá como máximo el 100% de vuelos y hospedaje VÍA REEMBOLSO.
Grupo KC organizará en grupo el hospedaje y traslado de todos los participantes, preferencias de hotel y traslado individuales correrán 100% por cuenta del agente
                            </div>
                        </div>
                    </div>
                </div>
            :null
            }
        </>
       
    )
} 