import React from 'react';
import { Button } from '@nextui-org/react';
import { FiFileText } from 'react-icons/fi';
import * as XLSX from 'xlsx';

interface ExportExcelButtonProps {
  data: object[]; 
}

const ExportExcelButton: React.FC<ExportExcelButtonProps> = ({ data }) => {
  const handleExport = () => {
    // Define un nombre de archivo estático, con fecha y hora para hacerlo único
    const date = new Date();
    const fileName = `Registros_Exportados_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    // Usamos el nombre de archivo estático definido anteriormente
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    // <></>
    <Button
      color="success"
      onPress={handleExport}
      aria-label="Export to Excel"
    >
    <FiFileText size={20} />
    </Button>
  );
};

export default ExportExcelButton;
