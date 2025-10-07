
import React from 'react';
import { Chip,ChipProps } from '@nextui-org/react';
import { Registro } from '@/app/lib/interfaces'; 

interface CustomTableCellProps {
  registro: Registro;
  columnKey: keyof Registro;
}

const confirmationColorMap: Record<string, ChipProps['color']> = {
  Sí: 'success', // o el color que prefieras para "Sí"
  No: 'danger', // o el color que prefieras para "No"
};

const CustomTableCell: React.FC<CustomTableCellProps> = ({ registro, columnKey }) => {
  const cellValue = registro[columnKey];

  switch (columnKey) {
    case 'Nombre':
    case 'Nombre_Estado':
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            {cellValue as string}
          </p>
        </div>
      );
    case 'Esta_Confirmado':
      const confirmationText = cellValue === 0 ? 'No' : 'Sí';
      return (
        <Chip
          className="capitalize"
          color={confirmationColorMap[confirmationText]}
          size="sm"
          variant="flat"
        >
          {confirmationText}
        </Chip>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default CustomTableCell;
