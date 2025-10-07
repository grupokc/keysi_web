import useGetData from "@/app/hooks/useGetData"
import Image from "next/image"
export default function BonosRangos139({Bono_Periodo}){
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
                                Se calcula con base en la Prima Ponderada de 1er Año (PPGM) (${dollarUSLocale.format(dataBonoRango[0].PPGM)}).<br />
                                Se otorga un porcentaje sobre la Prima Pagada de 1er Año (PP) (${dollarUSLocale.format(dataBonoRango[0].PP)}). <br />
                            </div>
                             
                            </h1>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">

                                    <tr >
                                        <th>&nbsp;</th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rango </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Bono</th>
                                        {/* <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">En Rango</th> */}
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Puedes ganar</th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Te falta</th>
    
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {
                                
                                            dataBonoRango.map((bonoRango, index) => {
                                                let filaAmarilla = false;

                                                if (
                                                    bonoRango.En_Rango === 1 &&
                                                    ((index === dataBonoRango.length - 1) || (index < dataBonoRango.length - 1 && dataBonoRango[index + 1].En_Rango === 0))
                                                ) {
                                                    filaAmarilla = true;
                                                }

                                                let banda = null;
                                                if (bonoRango.En_Rango === 0) {
                                                    iCeros++;
                                                }
                                                if (iCeros < 100 || filaAmarilla) {
                                                    banda = <>

                                                        <tr className={filaAmarilla ? 'bg-yellow-200' : 'bg-white'}>
                                                    <td className="bg-blue-500 w-2">&nbsp;</td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{dollarUSLocale.format(bonoRango.Prima_Limite_Inferior)} - {dollarUSLocale.format(bonoRango.Prima_Limite_Superior)}</td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.Bono}%</td>
                                                    {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.En_Rango}</td> */}
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${dollarUSLocale.format(bonoRango.Puedes_Ganar)}</td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> 
                                                    {
                                                        bonoRango.En_Rango == "1" ?                                                          
                                                            <Image 
                                                            src ="https://cdn.grupokc.com.mx/img/unlock.png" 
                                                            width={35}
                                                            height={35}
                                                            alt="Requisito desbloqueado"/>
                                                        : 
                                                            <>
                                                            ${dollarUSLocale.format(bonoRango.Falta)} 
                                                            </>
                                                    }
                                                        

                                                    
                                                    </td>
                                                </tr>
                                            </>
                                        }
                                        return banda
                                    })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            :null
            }
        </>
       
    )
} 