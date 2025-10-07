import useGetData from '@/app/hooks/useGetData';
import Image from 'next/image';
import React from 'react';

interface BonoRango {
  Fecha: string;
  PPGM: number;
  PP: number;
  DIRECTO: number;
  Prima_Limite_Inferior: number;
  Prima_Limite_Superior: number;
  Bono: number;
  Puedes_Ganar: number;
  Falta: number;
  En_Rango: number | string;
}

interface BonosRangos268Props {
  Bono_Periodo: string;
}

const BonosRangos268: React.FC<BonosRangos268Props> = ({ Bono_Periodo }) => {
  const dollarUSLocale = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
  let iCeros = 0;

  // Especificamos el tipo de `dataBonoRango` como `BonoRango[]`
  const { data: dataBonoRango } = useGetData({
    ClassName: 'Titan_Bonos_Resultados_Rangos',
    Action: 'Get',
    Bono_Periodo: Bono_Periodo,
  }) as { data: BonoRango[] }; // Especificamos el tipo aquí

  const secciones = [''];

  return (
    <>
      {dataBonoRango.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
          <div className="mt-3 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <h1 className="bg-blue-300 p-4 text-sm font-semibold">
                <div>
                   SE CALCULA Y SE OTORGA SOBRE LA PRIMA PAGADA PRIMER AÑO ($
                  {dollarUSLocale.format(dataBonoRango[0].PP)}).
                </div>
                <div className="mt-2">
                  Las pólizas deberán cumplir con una Prima Nueva Anualizada
                  (PNA) mínima de $4,000.
                </div>
                <ul className="mt-2 list-inside list-disc">
                  <li>
                    Las pólizas con una Prima Nueva Anualizada (PNA) menor de
                    $4,000 contarán como 0.50 siempre y cuando cumplan con
                    alguna de las dos condiciones:
                  </li>
                </ul>
                <ol className="ml-6 mt-1 list-inside list-decimal">
                  <li>
                    La póliza tenga contratada la cobertura de incremento de
                    Suma Asegurada.
                  </li>
                  <li>Que la póliza tenga 2 o más asegurados.</li>
                </ol>
              </h1>

              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th>&nbsp;</th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Rango
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Bono
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Puedes ganar
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Te falta
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {dataBonoRango.map((bonoRango, index) => {
                    let filaAmarilla = false;

                    if (
                      bonoRango.En_Rango === 1 &&
                      (index === dataBonoRango.length - 1 ||
                        (index < dataBonoRango.length - 1 &&
                          dataBonoRango[index + 1].En_Rango === 0))
                    ) {
                      filaAmarilla = true;
                    }

                    let banda = null;
                    if (bonoRango.En_Rango === 0) {
                      iCeros++;
                    }
                    if (iCeros < 100 || filaAmarilla) {
                      banda = (
                        <tr
                          className={
                            filaAmarilla ? 'bg-yellow-200' : 'bg-white'
                          }
                          key={index}
                        >
                          <td className="w-2 bg-blue-500">&nbsp;</td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {dollarUSLocale.format(
                              bonoRango.Prima_Limite_Inferior,
                            )}{' '}
                            -{' '}
                            {dollarUSLocale.format(
                              bonoRango.Prima_Limite_Superior,
                            )}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {bonoRango.Bono}%
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            ${dollarUSLocale.format(bonoRango.Puedes_Ganar)}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {bonoRango.En_Rango == '1' ? (
                              <Image
                                src="https://cdn.grupokc.com.mx/img/unlock.png"
                                width={35}
                                height={35}
                                alt="Requisito desbloqueado"
                              />
                            ) : (
                              <>${dollarUSLocale.format(bonoRango.Falta)}</>
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

export default BonosRangos268;
