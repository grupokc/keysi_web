'use client';
import LoaderLayout from '@/app/components/layouts/LoaderLayout';
import useGetData from '@/app/hooks/useGetData';
import { useRouter } from 'next/navigation';
import LoadData from '@/app/components/LoadData';
import React, { useState, useEffect } from 'react';
import {
  ChevronLeftIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/solid';
import * as BonosRangos from '@/app/lib/indexBonosRangos';
import Image from 'next/image';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from '@heroui/react';

interface DataRequisito {
  Id_Helios_Bonos_Requisito_X_Bono: string;
  Nombre_Helios_Bono_Requisitos: string;
  Nombre_Helios_Bono_Catalogo: string;
  Columna: string;
  Simbolo: string;
}

interface DataBono {
  Id_Cia: number;
  Id_Ramo: number;
  Nombre_Ramo: string;
  Fecha_Desde: string;
  Fecha_Hasta: string;
  Dias_Restantes: number;
  [key: string]: any;
}

interface DetailsProps {
  params: { Bono_Periodo: string };
}

const bonosRangosMap: { [key: number]: React.ElementType } = {
  144: BonosRangos.BonosRangos144,
  146: BonosRangos.BonosRangos146,
  147: BonosRangos.BonosRangos147,
  148: BonosRangos.BonosRangos148,
  153: BonosRangos.BonosRangos153,
  154: BonosRangos.BonosRangos154,
  226: BonosRangos.BonosRangos226,
  227: BonosRangos.BonosRangos227,
  228: BonosRangos.BonosRangos228,
  229: BonosRangos.BonosRangos229,
  230: BonosRangos.BonosRangos230,
  231: BonosRangos.BonosRangos231,
  233: BonosRangos.BonosRangos233,
  234: BonosRangos.BonosRangos234,
  235: BonosRangos.BonosRangos235,
  236: BonosRangos.BonosRangos236,
  237: BonosRangos.BonosRangos237,
  238: BonosRangos.BonosRangos238,
  239: BonosRangos.BonosRangos239,
  240: BonosRangos.BonosRangos240,
  251: BonosRangos.BonosRangos251,
  252: BonosRangos.BonosRangos252,
  253: BonosRangos.BonosRangos253,
  254: BonosRangos.BonosRangos254,
  255: BonosRangos.BonosRangos255,
  256: BonosRangos.BonosRangos256,
  259: BonosRangos.BonosRangos259,
  260: BonosRangos.BonosRangos260,
  261: BonosRangos.BonosRangos261,
  262: BonosRangos.BonosRangos262,
  263: BonosRangos.BonosRangos263,
  264: BonosRangos.BonosRangos264,
  265: BonosRangos.BonosRangos265,
  266: BonosRangos.BonosRangos266,
  267: BonosRangos.BonosRangos267,
  268: BonosRangos.BonosRangos268,
  277: BonosRangos.BonosRangos277,
  278: BonosRangos.BonosRangos278,
  279: BonosRangos.BonosRangos279,
  280: BonosRangos.BonosRangos280,
  281: BonosRangos.BonosRangos281,
  282: BonosRangos.BonosRangos282,
  285: BonosRangos.BonosRangos285,
  286: BonosRangos.BonosRangos286,
  287: BonosRangos.BonosRangos287,
  288: BonosRangos.BonosRangos288,
  289: BonosRangos.BonosRangos289,
  290: BonosRangos.BonosRangos290,
  291: BonosRangos.BonosRangos291,
  292: BonosRangos.BonosRangos292,
  293: BonosRangos.BonosRangos293,
  294: BonosRangos.BonosRangos294,
  426: BonosRangos.BonosRangos426,
  427: BonosRangos.BonosRangos427,
  428: BonosRangos.BonosRangos428,
  431: BonosRangos.BonosRangos431,
  434: BonosRangos.BonosRangos434,
  435: BonosRangos.BonosRangos435,
  436: BonosRangos.BonosRangos436,
  438: BonosRangos.BonosRangos438,
  439: BonosRangos.BonosRangos439,
  440: BonosRangos.BonosRangos440,
  441: BonosRangos.BonosRangos441,
  442: BonosRangos.BonosRangos442,
  443: BonosRangos.BonosRangos443,
  445: BonosRangos.BonosRangos445,
  446: BonosRangos.BonosRangos446,
  447: BonosRangos.BonosRangos447,
  448: BonosRangos.BonosRangos448,
  449: BonosRangos.BonosRangos449,
  450: BonosRangos.BonosRangos450,
  454: BonosRangos.BonosRangos454,
  455: BonosRangos.BonosRangos455,
  456: BonosRangos.BonosRangos456,
  457: BonosRangos.BonosRangos457,
  458: BonosRangos.BonosRangos458,
  459: BonosRangos.BonosRangos459,
  460: BonosRangos.BonosRangos460,
  461: BonosRangos.BonosRangos461,
};

export default function Details({ params }: DetailsProps) {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const router = useRouter();
  const Bono_Periodo = params.Bono_Periodo;
  const dollarUSLocale = Intl.NumberFormat('en-US');

  const { data: dataRequisitos, loading: loadingRequisitos } = useGetData({
    ClassName: 'Titan_Bonos_Requisito_X_Bono',
    Action: 'Get',
    Bono_Periodo: Bono_Periodo,
  }) as { data: DataRequisito[]; loading: boolean };

  const { data: dataBono, loading: loadingBono } = useGetData({
    ClassName: 'Helios_Bonos_Resultados',
    Action: 'Get',
    Bono_Periodo: Bono_Periodo,
  }) as { data: DataBono[]; loading: boolean };

  const getMetaLogroFalta = (row: DataRequisito, MLF: string) => {
    let valor: any = dataBono[0][`${row.Columna}_${MLF}`];
    if (row.Simbolo === '$') {
      valor = `${row.Simbolo} ${dollarUSLocale.format(valor)}`;
    } else {
      valor = `${valor} ${row.Simbolo}`;
    }
    if (valor == '') {
      valor = dataBono[0][`${row.Columna}_M`];
    }
    return valor;
  };

  const getValorMetaLogroFalta = (row: DataRequisito, MLF: string) => {
    return dataBono[0][`${row.Columna}_${MLF}`] == ''
      ? 1
      : dataBono[0][`${row.Columna}_${MLF}`];
  };

  useEffect(() => {
    if (dataBono && dataBono.length > 0) {
      setLastUpdated(new Date());
    }
  }, [dataBono]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('es-MX', options);
  };

  const calculateDaysRemaining = (fechaHasta: string) => {
    const today = new Date();
    const cierre = new Date(fechaHasta);
    const differenceInTime = cierre.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  if (loadingRequisitos || loadingBono) {
    return <LoadData />;
  }

  const BonoComponent =
    dataBono && dataBono.length > 0
      ? bonosRangosMap[dataBono[0].Id_Helios_Bono_Catalogo]
      : null;

  return (
    <LoaderLayout loading={loadingRequisitos || loadingBono}>
      <div className="h-full w-full">
        {/* Contenedor principal centrado */}
        <div className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Logo con botón de regresar */}
          <div className="flex items-center justify-between">
            <Button
              color="primary"
              startContent={<ChevronLeftIcon className="h-5 w-5" />}
              onPress={() => router.back()}
              className="w-auto"
            >
              Regresar
            </Button>
            <Image
              src={
                dataBono[0]?.Id_Cia === 9
                  ? 'https://cdngrupokc.azureedge.net/web/img/logos/GrupoKCLogo300.png'
                  : 'https://cdngrupokc.azureedge.net/web/img/logos/MetLife.png'
              }
              width={200}
              height={75}
              alt="Empresa"
              className="object-contain"
            />
            <div className="w-20"></div> {/* Espacio para centrar */}
          </div>

          {/* Sección de información */}
          {dataBono && dataBono.length > 0 ? (
            <div className="mt-8 space-y-6">
              {/* Card de Información */}
              <Card className="shadow-md">
                <CardBody className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
                  {/* Información del bono */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-lg font-bold">
                      {dataRequisitos?.[0]?.Nombre_Helios_Bono_Catalogo}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      <strong>Ramo:</strong> {dataBono[0].Nombre_Ramo}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Periodo:</strong> {dataBono[0].Fecha_Desde} -{' '}
                      {dataBono[0].Fecha_Hasta}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Última actualización:</strong>{' '}
                      {lastUpdated ? formatDate(lastUpdated) : 'Cargando...'}
                    </p>
                    <p className="mt-2 font-semibold text-yellow-600">
                      {dataBono[0].Dias_Restantes} días restantes para
                      participar
                    </p>
                  </div>

                  {/* Estado del Bono */}
                  <div
                    className={`rounded-lg p-4 font-semibold text-white ${
                      dataBono[0].Id_Ramo === 1 ? 'bg-blue-600' : 'bg-green-600'
                    }`}
                  >
                    {dataBono[0].Dias_Restantes > 0 ? 'Activo' : 'Finalizado'}
                  </div>
                </CardBody>
              </Card>

              {/* Tabla de Requisitos */}
              <Card>
                <CardHeader className="bg-gray-100 p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Requisitos del Bono
                  </h2>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Table aria-label="Requisitos del Bono">
                    <TableHeader>
                      <TableColumn>Requisito</TableColumn>
                      <TableColumn>Meta</TableColumn>
                      <TableColumn>Logro</TableColumn>
                      <TableColumn>Falta</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {dataRequisitos && dataRequisitos.length > 0 ? (
                        dataRequisitos.map((row) => (
                          <TableRow key={row.Id_Helios_Bonos_Requisito_X_Bono}>
                            <TableCell>
                              {row.Nombre_Helios_Bono_Requisitos}
                            </TableCell>
                            <TableCell>
                              {getMetaLogroFalta(row, 'M').includes('%')
                                ? `${parseFloat(
                                    getMetaLogroFalta(row, 'M'),
                                  ).toFixed(0)}%`
                                : isNaN(getMetaLogroFalta(row, 'M'))
                                ? getMetaLogroFalta(row, 'M')
                                : Math.floor(getMetaLogroFalta(row, 'M'))}
                            </TableCell>
                            <TableCell>{getMetaLogroFalta(row, 'L')}</TableCell>
                            <TableCell>
                              {getValorMetaLogroFalta(row, 'F') <= 0 ? (
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                              ) : (
                                <div className="flex items-center gap-1">
                                  <span>{getMetaLogroFalta(row, 'F')}</span>
                                  <LockClosedIcon className="h-4 w-4 text-gray-400" />
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="py-4 text-center text-gray-500"
                          >
                            No hay requisitos disponibles.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>

              {/* Componente adicional de Bono (si existe) */}
              {BonoComponent && <BonoComponent Bono_Periodo={Bono_Periodo} />}

              {/* Nota importante */}
              <Card>
                <CardBody className="bg-yellow-200">
                  <h3 className="text-lg font-bold">IMPORTANTE:</h3>
                  <p>
                    Si no se han desbloqueado todos los requisitos, no se podrá
                    ganar el bono.
                  </p>
                </CardBody>
              </Card>
            </div>
          ) : (
            <LoadData />
          )}
        </div>
      </div>
    </LoaderLayout>
  );
}
