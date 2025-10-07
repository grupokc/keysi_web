import useGetData from "@/app/hooks/useGetData"
import Image from "next/image"
export default function BonosRangos207({Bono_Periodo}){
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
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
                <div className="mt-3 flex flex-col">
                    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <div className="bg-white p-10">
                        La convención V.I.P. KC es una increíble viaje a un destino INTERNACIONAL.<br />
                        No te lo puedes perder !!!
                        </div>
                    </div>
                </div>
                
             </div>
            }
        </>
       
    )
} 