"use client"

import useGetData from "@/app/hooks/useGetData"
import Image from "next/image"
import React from 'react';

interface BonoRango {
    PCA: number;
    DIRECTO: number;
    AUTOMATICO: number;
    Prima_Limite_Inferior: number;
    Prima_Limite_Superior: number;
    Bono: number;
    Puedes_Ganar: number;
    Bono_2: number;
    Puedes_Ganar_2: number;
    Falta: number;
    En_Rango: number;
}

interface BonosRangos438Props {
    Bono_Periodo: string;
}

const BonosRangos438: React.FC<BonosRangos438Props> = ({ Bono_Periodo }) => {
    const dollarUSLocale = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
    let iCeros = 0;

    // Especificamos el tipo de `dataBonoRango` como `BonoRango[]`
    const { data: dataBonoRango } = useGetData({
        ClassName: "Titan_Bonos_Resultados_Rangos",
        Action: "Get",
        Bono_Periodo: Bono_Periodo
    }) as { data: BonoRango[] };  // Especificamos el tipo aquí

    const secciones = ["DIRECTO", "AUTOMATICO"];

    return (
        <>
            {
                dataBonoRango.length > 0 ?
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mt-3 flex flex-col">
                            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                <h1 className="text-sm font-semibold bg-blue-300 p-4">
                                    <div>
                                        Se calcula con base en la Prima Computable Ajustada de 1er Año (PCA) (${dollarUSLocale.format(dataBonoRango[0].PCA)}).<br />
                                        Se otorga un Porcentaje sobre la Prima Computable Ajustada  (PCA) (${dollarUSLocale.format(dataBonoRango[0].PCA)}). <br />
                                    </div>
                                </h1>
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-300">
                                        <tr >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 bg-blue-200" colSpan={7}>
                                                CONDUCTO DE PAGO DIRECTO ${dollarUSLocale.format(dataBonoRango[0].DIRECTO)} <br />
                                                CONDUCTO DE PAGO AUTOMATICO ${dollarUSLocale.format(dataBonoRango[0].AUTOMATICO)}
                                            </td>
                                        </tr>
                                        <tr >
                                            <th className="bg-blue-500 w-2">&nbsp;</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6" rowSpan={2}>Rango</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6" colSpan={2}>Pago Directo</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6" colSpan={2}>Pago Automático</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6" rowSpan={2}>Te falta</th>
                                        </tr>
                                        <tr >
                                            <th className="bg-blue-500 w-2">&nbsp;</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Bono</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Puedes ganar</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Bono</th>
                                            <th scope="col" className="border-2 border-gray-400 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Puedes ganar</th>
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
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                                                                {dollarUSLocale.format(bonoRango.Prima_Limite_Inferior)} - {dollarUSLocale.format(bonoRango.Prima_Limite_Superior)}
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.Bono}%</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">${dollarUSLocale.format(bonoRango.Puedes_Ganar)}</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.Bono_2}%</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">${dollarUSLocale.format(bonoRango.Puedes_Ganar_2)}</td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-center text-sm font-medium text-gray-900 sm:pl-6">
                                                                {
                                                                    bonoRango.En_Rango === 1 ?
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
                            </div>
                        </div>
                    </div>
                    :
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">  
                        <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 bg-blue-200">
                            Para mostrar el premio del bono , debes tener una persistencia minima del 80%.
                        </div>
                    </div>
            }
        </>
    )
}

export default BonosRangos438;
