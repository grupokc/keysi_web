'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  Pagination,
  Selection,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from '@nextui-org/react';
import Search from '@/app/components/Grid/search';
import ExportExcelButton from '@/app/components/Grid/exportExcelButton';
import useDataManagement from '@/app/hooks/useTableManagement';
import {
  capitalize,
  formatCurrency,
  replaceUnderscores,
} from '@/app/lib/utils';
import { executeForGrid, executeForCRUD } from '@/app/services/frontBack';

interface DataTableProps<TData, _TValue> {
  columns: any;
  args: any;
}

export function DataTable<TData, TValue>({
  columns,
  args,
}: DataTableProps<TData, TValue>) {
  let INITIAL_VISIBLE_COLUMNS: string[] = [];

  columns
    .filter((ele: any) => ele.isVisible && !ele.name.startsWith('Id_'))
    .map((ele: any) => INITIAL_VISIBLE_COLUMNS.push(ele.name));

  const [isLoading, setIsLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const PK = args.IdProperty;
  const {
    registros,
    setRegistros,
    filterValue,
    setFilterValue,
    page,
    setPage,
    rowsPerPage,
    sortedItems,
    filteredItems,
  } = useDataManagement();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const argsForGetGrid = {
        sort: args.sort,
        Id_Oficina: 2,
        Id_Usuario: 1,
        Id_Usuario_Add: 1,
        UsuarioAdd: 1,
        UsuarioDel: 1,
        user: 1,
        Id_Usaurio: 1,
        Id_Usuario_Modificacion: 1,
        UsuarioUMod: 1,
        gridViewID: args.GridViewID,
        ClassName: args.ClassName,
        viewType: '',
        qs: args.qs,
        page: 0,
        limit: 1000,
        fromRecord: 1,
        toRecord: 20,
        actionName: 'GetGrid',
      };
      const response = await executeForGrid(argsForGetGrid);
      setRegistros(response.data);
      setIsLoading(false);
    };
    if (!isLoading) {
      loadData();
    }
  }, [args]);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') {
      return columns;
    }

    if (visibleColumns instanceof Set) {
      return columns.filter((column: any) => visibleColumns.has(column.name));
    }

    return columns.filter(
      (column: any) => column.isVisible && !column.name.startsWith('Id_'),
    );
  }, [columns, visibleColumns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const renderCell = React.useCallback(
    (registro: any, columnKey: string) => {
      const cellValue = registro[columnKey];
      let formattedValue = cellValue;
      const columnType = columns.find(
        (column: any) => column.name === columnKey,
      )?.dataType;
      switch (columnType) {
        case 'money':
          formattedValue = formatCurrency(cellValue);
          break;
        case 'percentage':
          formattedValue = `${parseFloat(cellValue).toFixed(2)}%`;
          break;
        default:
          if (columnKey === 'name') {
            formattedValue = replaceUnderscores(cellValue);
          }
          break;
      }

      return <p className="text-bold text-small">{formattedValue}</p>;
    },
    [columns],
  );

  const renderLink = (item: any, columnKey: React.Key) => {
    const content = renderCell(item, columnKey.toString()); // Convert columnKey to string
    if (args.url_onclick) {
      return <Link href={`${args.url_onclick}${item[PK]}`}>{content}</Link>;
    }
    return content;
  };

  const exportData = React.useMemo(() => {
    if (visibleColumns === 'all') {
      return registros.map((registro) => {
        const orderedRow: Record<string, any> = {};
        columns.forEach((column: any) => {
          orderedRow[column.name] = registro[column.name];
        });
        return orderedRow;
      });
    }

    if (!registros.length || !(visibleColumns instanceof Set)) {
      return [];
    }

    return registros.map((registro) => {
      const orderedRow: Record<string, any> = {};
      columns
        .filter((column: any) => visibleColumns.has(column.name))
        .forEach((column: any) => {
          orderedRow[column.name] = registro[column.name];
        });
      return orderedRow;
    });
  }, [registros, visibleColumns, columns]);

  const renderSkeletonTable = () => (
    <div className="flex w-full flex-col gap-2">
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex w-full">
          {headerColumns.map((column: { name: string }, colIndex: number) => (
            <Skeleton
              key={`${rowIndex}-${colIndex}`}
              className="mx-2 my-1 h-6 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );

  const renderSearchBar = (title: string) => (
    <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 pb-4">
      {isLoading ? (
        <Skeleton className="h-6 w-32" />
      ) : (
        <Search
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          onClear={() => setFilterValue('')}
        />
      )}
      {isLoading ? (
        <Skeleton className="h-6 w-40" />
      ) : (
        <ExportExcelButton data={exportData} />
      )}
    </div>
  );

  const renderTable = () => (
    <div className="w-full overflow-x-auto">
      <Table
        className="min-w-max rounded-lg shadow-md"
        aria-label="Detalle de Reportes"
        isHeaderSticky
      >
        <TableHeader>
          {headerColumns.map(
            (column: { header: string; xType: string; name: string }) => (
              <TableColumn
                key={column.name}
                align={column.xType === 'string' ? 'center' : 'start'}
                allowsSorting
              >
                {column.header}
              </TableColumn>
            ),
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={renderSkeletonTable()} // Usamos la nueva función de Skeleton
          emptyContent={
            <div className="flex items-center justify-center">No hay datos</div>
          }
          items={sortedItems}
        >
          {sortedItems.map((item, index) => (
            <TableRow key={`${item[PK]}`}>
              {headerColumns.map((column: { name: string }) => (
                <TableCell
                  key={`${item[PK]}-${column.name}`}
                  className="px-2 text-sm md:px-4 md:text-base"
                >
                  {renderLink(item, column.name)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

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
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-col items-center">
      <Card className="mx-auto w-full max-w-screen-xl rounded-lg bg-gray-50 px-4 shadow-md sm:px-6 lg:px-8">
        <CardHeader className="rounded-t-lg bg-gray-200 p-3 text-center text-xl font-bold">
          Detalle del Reporte
        </CardHeader>
        <CardBody className="overflow-x-auto p-4">
          <div className="w-full">
            {renderSearchBar('')}
            {renderTable()}
            {renderFooter()}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
