import useGetData from "@/app/hooks/useGetData";
import Image from "next/image";
import React from "react";

interface BonoRango {
    DIRECTO: number;
    AUTOMATICO: number;
    PCA: number;
    PCC: number;
    Persistencia_24_L: number;
    Prima_Limite_Inferior: number;
    Prima_Limite_Superior: number;
    Descripcion: string;
    Bono: number;
    Puedes_Ganar: number;
    Falta: number;
    En_Rango: number | string;
}

interface BonosRangos282Props {
    Bono_Periodo: string;
}

const BonosRangos282: React.FC<BonosRangos282Props> = ({ Bono_Periodo }) => {
    const dollarUSLocale = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
    let iCeros = 0;


    const { data: dataBonoRango } = useGetData({
        ClassName: "Titan_Bonos_Resultados_Rangos",
        Action: "Get",
        Bono_Periodo: Bono_Periodo
    }) as { data: BonoRango[] };

    const secciones = [""];

    return (
        <>
            { 
                dataBonoRango.length > 0 ?
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mt-3 flex flex-col">
                            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                <h1 className="text-sm font-semibold bg-blue-300 p-4"> 
                                    <div> 
                                        SE CALCULA CON BASE EN LA PRIMA COMPUTABLE AJUSTADA 1ER AÑO (PCA ${dollarUSLocale.format(dataBonoRango[0].PCA)})&nbsp; <br/>
                                        SE OTORGA UN PORCENTAJE DE LA PRIMA COMPUTABLE DE CONSERVACION (PCC ${dollarUSLocale.format(dataBonoRango[0].PCC)})&nbsp; <br/>
                                        TU PERSISTENCIA ES DE : {dollarUSLocale.format(dataBonoRango[0].Persistencia_24_L)}%
                                    </div>
                                </h1>
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Rango</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Bono</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Puedes ganar</th>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Te falta</th>
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
                                                    banda = (
                                                        <tr className={filaAmarilla ? 'bg-yellow-200' : 'bg-white'} key={index}>
                                                            <td className="bg-blue-500 w-2">&nbsp;</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                {dollarUSLocale.format(bonoRango.Prima_Limite_Inferior)} - {dollarUSLocale.format(bonoRango.Prima_Limite_Superior)}
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.Bono}%</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">${dollarUSLocale.format(bonoRango.Puedes_Ganar)}</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> 
                                                                {
                                                                    bonoRango.En_Rango == "1" ?                                                          
                                                                        <Image 
                                                                            src="https://cdn.grupokc.com.mx/img/unlock.png" 
                                                                            width={35}
                                                                            height={35}
                                                                            alt="Requisito desbloqueado"
                                                                        /> :
                                                                        <>
                                                                            ${dollarUSLocale.format(bonoRango.Falta)} 
                                                                        </>
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                                return banda;
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="bg-blue-300 p-3">
                                    Puedes alcanzar un 1% (${dollarUSLocale.format(dataBonoRango[0].PCC * 0.01)}) adicional si tu persistencia llega a 99%.
                                </div>
                            </div>
                        </div>
                    </div>
                : null
            }
        </>
    );
};

export default BonosRangos282;
