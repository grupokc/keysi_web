'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@nextui-org/react';
import { Skeleton, Spinner } from '@heroui/react';
import { fetchGridData } from '@/app/services/frontBack';
import { capitalize } from '@/app/lib/utils';
import Search from './search';
import ExportExcelButton from './exportExcelButton';
import { useRouter } from 'next/navigation';
import { DataGridProps } from '@/app/lib/interfaces';

interface Column {
  key: string;
  header: string;
}

const DataGrid = ({
  uiConfig,
  gridViewID,
  className,
  sort,
  qs,
}: DataGridProps) => {
  const {
    initialVisibleColumns,
    title,
    detailUrl,
    clickableRows = false,
    urlField,
  } = uiConfig;
  const { push } = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(initialVisibleColumns),
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  useEffect(() => {
    // const userInLocalStorage = JSON.parse(window.localStorage.getItem("user"))
    // setUser(userInLocalStorage)

    const fetchData = async () => {
      const requestData = {
        gridViewID: gridViewID,
        className: className,
        user: '1',
        sort: sort,
        start: '0',
        qs: qs,
        db: 'Prometeo',
        fromRecord: '1',
        toRecord: '5',
        page: 0,
        limit: 1000,
        apiName: 'Nf_GridView',
        actionName: 'GetGrid',
        UsuarioUMod: '1',
        UsuarioDel: '1',
        Id_Oficina: '0',
        Id_Usuario: '1',
        Id_Usuario_Add: '1',
        UsuarioAdd: '1',
      };

      const response = await fetchGridData(requestData);
      if (response && response.data && response.data.length > 0) {
        setData(response.data);
        const newColumns = response.data[0]
          ? Object.keys(response.data[0]).map((key) => ({
              key: key,
              header: capitalize(response.data[0][key]?.header || key),
            }))
          : [];
        setColumns(newColumns);
        setVisibleColumns(
          new Set(
            newColumns
              .filter((column) => initialVisibleColumns.includes(column.key))
              .map((column) => column.key),
          ),
        );
      }
    };
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(data)) {
      return [];
    }

    let filtered = [...data];
    if (filterValue) {
      filtered = filtered.filter((item) =>
        Object.keys(item).some((key) =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase()),
        ),
      );
    }
    return filtered;
  }, [data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  const exportData = useMemo(() => {
    if (!data.length || !visibleColumns.size) {
      return [];
    }
    return data.map((row) => {
      const filteredRow: any = {};
      Array.from(visibleColumns).forEach((columnKey) => {
        filteredRow[columnKey] = row[columnKey];
      });
      return filteredRow;
    });
  }, [data, visibleColumns]);

  if (!columns || columns.length === 0 || !data || data.length === 0) {
    return (
      <div className="flex w-full flex-col space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  const handleRowClick = (item: any) => {
    if (clickableRows && detailUrl && item[urlField]) {
      push(detailUrl.replace('{item}', encodeURIComponent(item[urlField])));
    }
  };

  // 🔹 Función para renderizar el SearchBar
  const renderSearchBar = (title: string) => (
    <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 pb-4">
      <h2 className="pr-8 text-lg font-semibold">{title}</h2>
      <Search
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onClear={() => setFilterValue('')}
      />
      <ExportExcelButton data={exportData} />
    </div>
  );

  // 🔹 Función para renderizar la tabla
  const renderTable = () => (
    <div className="w-full overflow-x-auto">
      <Table
        className="min-w-max rounded-lg shadow-md"
        aria-label="Detalle de Reportes"
      >
        <TableHeader>
          {columns
            .filter((column) => visibleColumns.has(column.key))
            .map((column) => (
              <TableColumn key={column.key} allowsSorting>
                {column.header}
              </TableColumn>
            ))}
        </TableHeader>
        <TableBody>
          {items.map((item, idx) => (
            <TableRow
              key={idx}
              onClick={() => handleRowClick(item)}
              style={{ cursor: clickableRows ? 'pointer' : 'default' }}
              className="transition-colors hover:bg-gray-100 "
            >
              {columns
                .filter((column) => visibleColumns.has(column.key))
                .map((column) => (
                  <TableCell
                    key={`${idx}-${column.key}`}
                    className="px-2 text-sm md:px-4 md:text-base"
                  >
                    {item[column.key]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  // 🔹 Función para renderizar el footer con paginación
  const renderFooter = () => (
    <div className="mt-4 flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
      <span className="text-sm text-gray-600">
        Total de registros:{' '}
        <span className="font-semibold">{filteredItems.length}</span>
      </span>
      {pages > 1 && (
        <div className="flex w-full justify-center md:justify-end">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
            className="w-full md:w-auto"
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center">
      <Card className="mx-auto w-full max-w-screen-xl rounded-lg bg-gray-50 px-4 shadow-md sm:px-6 lg:px-8">
        <CardHeader className="rounded-t-lg bg-gray-200 p-3 text-center text-xl font-bold">
          {title}
        </CardHeader>
        <CardBody className="overflow-x-auto p-4">
          <div className="w-full">
            {/* Barra de búsqueda */}
            {renderSearchBar('')}
            {/* Tabla */}
            {renderTable()}
            {/* Footer con paginación */}
            {renderFooter()}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DataGrid;
