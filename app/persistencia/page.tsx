'use client';
import useGetData from '@/app/hooks/useGetData';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@heroui/react';
import Loading from '@/app/components/Loading';
import { useState, Fragment, Key } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import Search from '../components/Grid/search';

interface Detalle {
  Poliza: string;
  Asegurado: string;
  Moneda: string;
  Prima_Necesaria: number;
  Prima_Pagada: number;
  Persistencia: number;
  Frecuencia_de_Pago: string;
  Estatus_Actual: string;
  Rehabilitacion: string;
  Cuanto_Tiempo_Vivira_La_Poliza: string;
}

export default function PersistenciaPage() {
  const [filterValue, setFilterValue] = useState('');
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const RESUMEN = 333,
    DETALLE = 888;
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const [showPersistencia, setShowPersistencia] = useState(RESUMEN);
  const { data: dataResumen, loading: loadingResumen } = useGetData({
    ClassName: 'Persistencia',
    Action: 'List',
  });
  const { data: rawDataDetalle, loading: loadingDetalle } = useGetData({
    ClassName: 'Persistencia_Ultima',
    Action: 'X_Fecha_de_Ejecucion',
  });
  const dataDetalle = (rawDataDetalle as Detalle[]) || [];

  if (loadingResumen || loadingDetalle) return <Loading />;

  const filteredResumen = dataResumen.filter((item: any) => {
    return Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  const filteredDetalle = dataDetalle.filter((item: any) => {
    return Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  // Filtramos y sumamos según la moneda
  const totalPrimaNecesariaUSD = filteredDetalle
    .filter((item: any) => item.Moneda === 'DOLARES')
    .reduce((sum, item) => sum + item.Prima_Necesaria, 0);

  const totalPrimaNecesariaMXN = filteredDetalle
    .filter((item: any) => item.Moneda === 'PESOS')
    .reduce((sum, item) => sum + item.Prima_Necesaria, 0);

  const totalPrimaPagadaUSD = filteredDetalle
    .filter((item: any) => item.Moneda === 'DOLARES')
    .reduce((sum, item) => sum + item.Prima_Pagada, 0);

  const totalPrimaPagadaMXN = filteredDetalle
    .filter((item: any) => item.Moneda === 'PESOS')
    .reduce((sum, item) => sum + item.Prima_Pagada, 0);

  // Determinar datos actuales según la vista activa (Resumen o Detalle)
  const isDetalle = showPersistencia === DETALLE;
  const currentData = isDetalle ? filteredDetalle : filteredResumen;

  // Calcular paginación dinámicamente según la vista activa
  const totalPages = Math.ceil(currentData.length / rowsPerPage);
  const paginatedData = currentData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  // 🔹 Función para renderizar el SearchBar
  const renderSearchBar = (title: string) => (
    <div className="mt-4 flex w-full items-center pb-4">
      <h2 className="pr-8 text-lg font-semibold">{title}</h2>
      <Search
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onClear={() => setFilterValue('')}
      />
    </div>
  );

  // 🔹 Función para renderizar la tabla
  const renderTable = (headers: JSX.Element[], body: JSX.Element[]) => (
    <Table className="min-w-max rounded-lg shadow-md" aria-label="Persistencia">
      <TableHeader>{headers}</TableHeader>
      <TableBody>{body}</TableBody>
    </Table>
  );

  // 🔹 Función para renderizar el footer (total registros y paginación)
  const renderFooter = () => (
    <div className="mt-4 flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
      {/* Total de registros */}
      <span className="text-sm text-gray-600">
        Total de registros:{' '}
        <span className="font-semibold">{currentData.length}</span>
      </span>

      {/* Paginación (ocultar si hay solo 1 página) */}
      {totalPages > 1 && (
        <div className="flex w-full justify-center md:justify-end">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            total={totalPages}
            page={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center">
      <Card className="mx-auto w-full max-w-screen-xl rounded-lg bg-gray-50 px-4 shadow-md sm:px-6 lg:px-8">
        <CardHeader className="rounded-t-lg bg-gray-200 p-3 text-center text-xl font-bold">
          Persistencia
        </CardHeader>
        <CardBody className="overflow-x-auto p-4">
          {/* 🔹 Tabla RESUMEN */}
          {showPersistencia === RESUMEN && filteredResumen.length > 0 && (
            <div className="w-full">
              {renderSearchBar('Resumen')}
              {renderTable(
                [
                  <TableColumn key="periodo">Periodo</TableColumn>,
                  <TableColumn key="cosechas">Cosechas</TableColumn>,
                  <TableColumn key="primaNecesaria">
                    Prima Necesaria
                  </TableColumn>,
                  <TableColumn key="primaPagada">Prima Pagada</TableColumn>,
                  <TableColumn key="persistencia">Persistencia</TableColumn>,
                  <TableColumn key="acciones">{''}</TableColumn>,
                ],
                paginatedData.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.Fecha_de_Ejecucion}</TableCell>
                    <TableCell>{item.Cosechas}</TableCell>
                    <TableCell>
                      {dollarUSLocale.format(item.Prima_Necesaria)}
                    </TableCell>
                    <TableCell>
                      {dollarUSLocale.format(item.Prima_Pagada)}
                    </TableCell>
                    <TableCell>{item.Persistencia}%</TableCell>
                    <TableCell>
                      {index === 0 && (
                        <Button
                          size="sm"
                          variant="solid"
                          color="primary"
                          onPress={() => setShowPersistencia(DETALLE)}
                        >
                          Ver Detalle
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )),
              )}
              {renderFooter()}
            </div>
          )}
          {showPersistencia === DETALLE && dataDetalle.length > 0 ? (
            <div className="w-full">
              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                {/* Botón de Regresar */}
                <Button
                  size="sm"
                  variant="bordered"
                  onPress={() => setShowPersistencia(RESUMEN)}
                >
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />{' '}
                  Regresar
                </Button>

                {/* Totales Responsivos */}
                <div className="grid w-full grid-cols-1 gap-4 text-sm font-semibold sm:grid-cols-2 md:flex md:gap-6">
                  <div>
                    <span className="text-gray-500">
                      Prima Necesaria (USD):{' '}
                    </span>
                    <span className="text-green-600">
                      ${dollarUSLocale.format(totalPrimaNecesariaUSD)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">
                      Prima Necesaria (MXN):{' '}
                    </span>
                    <span className="text-green-600">
                      ${dollarUSLocale.format(totalPrimaNecesariaMXN)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Prima Pagada (USD): </span>
                    <span className="text-blue-600">
                      ${dollarUSLocale.format(totalPrimaPagadaUSD)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Prima Pagada (MXN): </span>
                    <span className="text-blue-600">
                      ${dollarUSLocale.format(totalPrimaPagadaMXN)}
                    </span>
                  </div>
                </div>
              </div>
              {renderSearchBar('Detalle')}
              <div className="w-full overflow-x-auto">
                <Table
                  className="min-w-max rounded-lg shadow-md"
                  aria-label="Detalle de Persistencia"
                >
                  <TableHeader>
                    <TableColumn className="text-left">Póliza</TableColumn>
                    <TableColumn className="text-left">Asegurado</TableColumn>
                    <TableColumn className="text-center">Moneda</TableColumn>
                    <TableColumn className="text-right">
                      Prima Necesaria
                    </TableColumn>
                    <TableColumn className="text-right">
                      Prima Pagada
                    </TableColumn>
                    <TableColumn className="text-right">
                      Persistencia
                    </TableColumn>
                    <TableColumn className="text-center">
                      Frecuencia de Pago
                    </TableColumn>
                    <TableColumn className="text-center">Estatus</TableColumn>
                    <TableColumn className="text-center">
                      Rehabilitación
                    </TableColumn>
                    <TableColumn className="text-center">
                      Tiempo de Vida Póliza
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className="transition hover:bg-gray-100"
                      >
                        <TableCell>
                          {item.Poliza} - {item.Producto}
                        </TableCell>
                        <TableCell>{item.Asegurado}</TableCell>
                        <TableCell className="text-center">
                          <Chip color="warning">{item.Moneda}</Chip>
                        </TableCell>
                        <TableCell className="text-right">
                          ${dollarUSLocale.format(item.Prima_Necesaria)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${dollarUSLocale.format(item.Prima_Pagada)}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.Persistencia}%
                        </TableCell>
                        <TableCell className="text-center">
                          {item.Frecuencia_de_Pago}
                        </TableCell>
                        <TableCell className="text-center">
                          <Chip color="success">{item.Estatus_Actual}</Chip>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.Rehabilitacion}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.Cuanto_Tiempo_Vivira_La_Poliza}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {renderFooter()}
            </div>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
}
