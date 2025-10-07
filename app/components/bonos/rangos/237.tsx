import useGetData from "@/app/hooks/useGetData";
import Image from "next/image";
import React from "react";

interface BonoRango {
    DIRECTO: number;
    AUTOMATICO: number;
    PPGM: number;
    PCA: number;
    Descripcion: string;
    Prima_Limite_Inferior: number;
    Prima_Limite_Superior: number;
    Bono: number;
    Puedes_Ganar: number;
    Falta: number;
    En_Rango: number | string;
}

interface BonosRangos237Props {
    Bono_Periodo: string;
}

const BonosRangos237: React.FC<BonosRangos237Props> = ({ Bono_Periodo }) => {
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

    return (
        <>
            {dataBonoRango.length > 0 ? (
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-3 flex flex-col">
                        <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                            <h1 className="text-sm font-semibold bg-blue-300 p-4">
                                <div>
                                    <b>La clasificación se calcula con base en el promedio mensual de pólizas vigentes de vida y de Gastos Médicos</b><br />
                                    Tus pólizas del periodo: {dollarUSLocale.format(dataBonoRango[0].DIRECTO)}. Tu promedio mensual: {dollarUSLocale.format(dataBonoRango[0].AUTOMATICO)}<br /><br />
                                    <b>Se otorga Porcentaje sobre la Prima Pagada de 1er año GMM y sobre la prima Computable Ajustada de 1er Año PCA</b><br />
                                    Tu PCA es de: ${dollarUSLocale.format(dataBonoRango[0].PCA)} 
                                    Tu PPGM es de: ${dollarUSLocale.format(dataBonoRango[0].PPGM)}<br />
                                    NOTA: Sólo se pagará el máximo entre el Activity Ratio Mix y la suma del Activity Ratio Vida más el Activity Ratio GMM
                                </div>
                            </h1>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Producción <br /> promedio mensual
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Bono</th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Puedes ganar</th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Te falta</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {dataBonoRango.map((bonoRango, index) => {
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
                                                        {bonoRango.Descripcion} <br />
                                                        {dollarUSLocale.format(bonoRango.Prima_Limite_Inferior)} - {dollarUSLocale.format(bonoRango.Prima_Limite_Superior)}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{bonoRango.Bono}%</td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{dollarUSLocale.format(bonoRango.Puedes_Ganar)}</td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {bonoRango.En_Rango == "1" ? (
                                                            <Image
                                                                src="https://cdn.grupokc.com.mx/img/unlock.png"
                                                                width={35}
                                                                height={35}
                                                                alt="Requisito desbloqueado"
                                                            />
                                                        ) : (
                                                            <>
                                                                {dollarUSLocale.format(bonoRango.Falta)} Pólizas
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return banda;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default BonosRangos237;
