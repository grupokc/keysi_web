
import React from 'react';

interface RowPerPageSelectorProps {
  setRowsPerPage: (rowsPerPage: number) => void;
  setPage: (page: number) => void;
}

const RowPerPageSelector: React.FC<RowPerPageSelectorProps> = ({ setRowsPerPage, setPage }) => (
  <div>
    <label>
      Filas por pagina:
      <select
        onChange={(e) => {
          const value = e.target.value;
          setRowsPerPage(Number(value));
          setPage(1);
        }}
      >
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </label>
  </div>
);

export default RowPerPageSelector;
