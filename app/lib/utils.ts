import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UseFileHandlerProps } from "./interfaces";
import { ListaArchivos } from "./types";
import { toast } from "sonner";

export const formatCurrency = (value: number | string, locale = 'es-MX', currency = 'MXN'): string => {
  let number = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(number);
};



export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export function capitalize(str: string) {
  // Verificar si str es un string y tiene al menos un carácter
  if (typeof str === 'string' && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  // Retorna un string vacío o un valor predeterminado si str no es válido
  return str || "";
}
export const replaceUnderscores = (text: string): string => {
  return text.replace(/_/g, ' ').slice(0, -1);
};

export function FileHandler({ handleRefresh, onClose }: UseFileHandlerProps) {
  const [files, setFiles] = useState<ListaArchivos[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(mappedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const eliminarArchivo = useCallback((fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  }, []);


  // Función para cargar archivos al servidor
  const subirArchivos = async () => {
    setLoading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
      formData.append('ClassName', 'Metas_DxN');
      formData.append('UsuarioAdd', `${1163}`); 
      formData.append('Rules', 'METAS_DXN');
    });

    try {
      const response = await fetch('https://fb.grupokc.com.mx/api/Nf_File/SaveInSQLServer', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Files uploaded successfully');
        handleRefresh();
        setFiles([]);
        onClose(); 
      } else {
        toast.error('Error uploading files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading files');
    } finally {
      setLoading(false);
    }
  };

  return {
    getRootProps,
    getInputProps,
    files,
    eliminarArchivo,
    loading,
    subirArchivos
  };
}

// Función para subir avatar de perfil
export const uploadAvatar = async (file: File, userId: number, onSuccess?: (avatarUrl?: string) => void, onError?: (error: string) => void) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('ClassName', 'Avatar');
  formData.append('UsuarioAdd', `${1}`); 
  formData.append('ClassID', `${userId}`); 
  formData.append('Rules', '');

  try {
    const response = await fetch('https://fb.grupokc.com.mx/api/Nf_File/SaveInSQLServer', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    // Log para debug
    console.log('Upload Avatar Response:', result);

    if (result.success) {
      // Construir la URL del avatar subido usando el servidor de Grupo KC
      let guidDocumento = null;
      
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        guidDocumento = result.data[0].Guid_Documento;
      } else if (result.data && typeof result.data === 'object') {
        guidDocumento = result.data.Guid_Documento;
      }
      
      // Log para debug
      console.log('Guid Documento found:', guidDocumento);
      
      // Construir la URL correcta del servidor de Grupo KC usando Guid_Documento
      const avatarUrl = guidDocumento 
        ? `https://fb.grupokc.com.mx/api/Nf_File/GetFile?Id_Documento=${guidDocumento}`
        : `https://fb.grupokc.com.mx/api/Nf_File/GetFile?Id_Documento=${userId}`;
      
      console.log('Avatar URL constructed:', avatarUrl);
      
      toast.success('Avatar uploaded successfully');
      onSuccess?.(avatarUrl);
    } else {
      const errorMessage = result.message || 'Error uploading avatar';
      toast.error(errorMessage);
      onError?.(errorMessage);
    }
  } catch (error) {
    console.error('Error uploading avatar:', error);
    const errorMessage = 'Error uploading avatar';
    toast.error(errorMessage);
    onError?.(errorMessage);
  }
};