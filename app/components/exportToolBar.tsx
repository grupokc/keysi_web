import React from 'react';
import { FaFileExcel } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { ExportToolbarProps,Registro } from '../lib/interfaces';


const ExportToolbar: React.FC<ExportToolbarProps> = ({ registros }) => {
  const exportToExcel = () => {
    if (!registros.length) return;

    const data = registros.map(({ Id_VC_Registro, Registro, Nombre, Nombre_Estado, Esta_Confirmado }) => ({
      'ID Registro': Id_VC_Registro,
      'Registro': Registro,
      'Nombre': Nombre,
      'Estado': Nombre_Estado,
      'Confirmado': Esta_Confirmado === 1 ? 'Sí' : 'No',
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registros');
    XLSX.writeFile(workbook, 'registros.xlsx');
  };

  return (
    <button className="text-green-600 flex items-center gap-2">
      <FaFileExcel className="h-6 w-6" />
    </button>
  );
};

export default ExportToolbar;
