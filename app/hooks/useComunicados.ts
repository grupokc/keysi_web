import { useState, useEffect } from 'react';
import { executeForCRUD } from "@/app/services/frontBack";

interface Comunicado {
  id: number; // Id_Comunicado
  idMarca: number; // Id_Comunicado_Marca
  titulo: string;
  descripcion: string;
  fecha: string;
  url: string;
  leido: boolean;
  guidDocumento?: string; // Nuevo campo para el GUID del documento
}

export const useComunicados = (open: boolean = false) => {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasComunicados, setHasComunicados] = useState(false);
  const [hasUnreadComunicados, setHasUnreadComunicados] = useState(false);
  const [shouldAutoShow, setShouldAutoShow] = useState(false);

  // Función para obtener comunicados
  const fetchComunicados = async () => {
    setLoading(true);
    try {
      const response = await executeForCRUD({
        ClassName: "Comunicados",
        Action: "List",
        Id_Comunidad: 6,
        Id_Usuario: 1,
      });
      
      const data = Array.isArray(response) ? response : response?.data || [];
      
      // Mapeo los datos al formato esperado
      const mappedComunicados = data.map((item: any) => ({
        id: item.Id_Comunicado, // <-- ID real del comunicado
        idMarca: item.Id_Comunicado_Marca, // <-- Marca de leído
        titulo: item.Asunto,
        descripcion: item.Summary,
        fecha: item.Fecha_Inicio ? `Hace ${calcularDias(item.Fecha_Inicio)} días` : "",
        url: item.Url,
        leido: !(item.Id_Comunicado_Marca === null || item.Id_Comunicado_Marca === 0 || item.Id_Comunicado_Marca === "" || item.Id_Comunicado_Marca === undefined),
        guidDocumento: item.Guid_Documento, // <-- Nuevo campo
      }));

      // Verificar si hay comunicados no leídos (Id_Comunicado_Marca es null, 0, string vacío o undefined)
      const hasUnread = data.some((item: any) =>
        item.Id_Comunicado_Marca === null ||
        item.Id_Comunicado_Marca === 0 ||
        item.Id_Comunicado_Marca === "" ||
        item.Id_Comunicado_Marca === undefined
      );

      // Actualizar estados solo si hay cambios para evitar re-renders innecesarios
      setComunicados(prevComunicados => {
        // Solo actualizar si los datos son diferentes
        if (JSON.stringify(prevComunicados) !== JSON.stringify(mappedComunicados)) {
          return mappedComunicados;
        }
        return prevComunicados;
      });

      setHasComunicados(data.length > 0);
      setHasUnreadComunicados(hasUnread);
      
      // Verificar si debe mostrar automáticamente (solo si hay comunicados no leídos)
      if (hasUnread) {
        setShouldAutoShow(true);
      }
    } catch (error) {
      console.error('Error al obtener comunicados:', error);
      setComunicados([]);
      setHasComunicados(false);
      setHasUnreadComunicados(false);
    } finally {
      setLoading(false);
    }
  };

  // Función para marcar como leído
  const marcarComoLeido = async (idComunicado: number) => {
    try {
      await executeForCRUD({
        ClassName: "Comunicados",
        Action: "Marcar",
        Id_Comunicado: idComunicado,
        Id_Persona_Usuario: 1,
        Id_Comunicado_Marca: 1, // LEIDO
      });
      
      // Actualizar inmediatamente el estado local para respuesta instantánea
      setComunicados(prevComunicados => {
        const updatedComunicados = prevComunicados.map(comunicado => 
          comunicado.id === idComunicado 
            ? { ...comunicado, leido: true, idMarca: 1 }
            : comunicado
        );
        
        // Verificar si todos los comunicados están leídos usando los datos actualizados
        const allRead = updatedComunicados.every(comunicado => comunicado.leido);
        setHasUnreadComunicados(!allRead);
        
        return updatedComunicados;
      });
      
      // Refresca la lista completa de comunicados para sincronizar con el servidor
      await fetchComunicados();
    } catch (error) {
      console.error('Error al marcar como leído:', error);
    }
  };

  // Función auxiliar para calcular días desde la fecha
  const calcularDias = (fecha: string) => {
    const fechaInicio = new Date(fecha);
    const hoy = new Date();
    const diff = Math.floor((hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "hoy" : diff;
  };

  // Efecto para cargar comunicados cuando se abre el modal
  useEffect(() => {
    if (open) {
      fetchComunicados();
    }
  }, [open]);

  // Efecto para verificar si hay comunicados (para el sidebar y auto-show)
  useEffect(() => {
    fetchComunicados();
  }, []);

  // // Efecto para verificar periódicamente si hay nuevos comunicados no leídos
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchComunicados();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, []);

  // Función para resetear el estado de auto-show
  const resetAutoShow = () => {
    setShouldAutoShow(false);
  };

  // Función para forzar actualización inmediata
  const forceRefresh = () => {
    fetchComunicados();
  };



  return {
    comunicados,
    loading,
    hasComunicados,
    hasUnreadComunicados,
    shouldAutoShow,
    marcarComoLeido,
    fetchComunicados,
    resetAutoShow,
    forceRefresh
  };
}; 