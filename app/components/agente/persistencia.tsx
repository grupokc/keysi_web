import useGetData from "@/app/hooks/useGetData";
import Image from "next/image";
import CustomCard from "./card";

interface PersistenciaData {
  Icono?: string;
  Persistencia?: number;
  Fecha_de_Ejecucion?: string;
}

export default function Persistencia() {
  const { data: dataPersistencia = [] } = useGetData({
    ClassName: "Persistencia",
    Action: "Ultima",
    url: "URL_NETAPI"
  }) as { data: PersistenciaData[] }; // Definimos el tipo esperado

  const persistenciaData: PersistenciaData = dataPersistencia?.[0] || {}; // Evita errores de undefined

  const iconUrl = (persistenciaData.Persistencia ?? 0) >= 95
    ? "/img/check-mark.webp"
    : "/img/mark-wrong.png";

  return (
    <CustomCard
      title="Persistencia"
      description="Mantener una persistencia arriba del 95% fortalece la confianza con tus clientes."
      backgroundImage="/img/persistencia.jpeg"
      isLoading={!dataPersistencia.length} // Asegura el estado de carga correcto
      extraContent={
        persistenciaData.Persistencia !== undefined ? (
          <div className="flex items-center justify-center space-x-3">
            <Image className="h-8 w-8 rounded-full" src={iconUrl} width={32} height={32} alt="Estado" />
            <p className="text-sm font-medium text-white">
              Persistencia a 24 meses: <strong>{persistenciaData.Persistencia}%</strong>
            </p>
          </div>
        ) : (
          <p className="text-sm text-white">
            Aún no tienes datos de persistencia, sigue en contacto con tus clientes.
          </p>
        )
      }
      buttonText="Ver Detalle"
      buttonLink="/persistencia"
      footerText={`FUENTE: REPORTE DE PERSISTENCIA DE METLIFE ${persistenciaData.Fecha_de_Ejecucion || ""}`}
    />
  );
}
