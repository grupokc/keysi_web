import { useState, useMemo } from 'react';
import {Registro} from '../lib/interfaces';
import { SortDescriptor,Selection } from '@nextui-org/react';

const useDataManagement = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<Selection>('all');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'Fecha_Add',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Filtrado
  const filteredItems = useMemo(() => {
    if (!Array.isArray(registros)) {
      console.warn('Expected registros to be an array, received:', registros);
      return [];
    }
  
    let filtered = [...registros];
    if (filterValue) {
      filtered = filtered.filter((item) =>
        Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(filterValue.toLowerCase())
        ),
      );
    }
    return filtered;
  }, [registros, filterValue]);
  

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Ordenación
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const column = sortDescriptor.column as keyof Registro;
      let first = String(a[column]).toLowerCase();
      let second = String(b[column]).toLowerCase();

      // Comparación directa de cadenas.
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  // Exposición de estados y acciones
  return {
    registros,
    setRegistros,
    filteredItems,
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    sortDescriptor,
    setSortDescriptor,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    items,
    sortedItems,
  };
};

export default useDataManagement;