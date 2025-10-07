"use client";

import useGetData from "@/app/hooks/useGetData";
import CustomCard from "./card";

interface MesaIndicador {
  Id_Ticket_Estatus_Pendiente_De: number;
  Casos: number;
  Fecha_Actualizacion?: string;
}

export default function Mesa() {
  const { data, loading } = useGetData({
    ClassName: "Crm_Mesa_Indicadores",
    Action: "Get",
  });

  const dataMesaIndicadoresPolizas = (data as MesaIndicador[]) || [];
  const getValue = (id: number) =>
    dataMesaIndicadoresPolizas.find((e) => e.Id_Ticket_Estatus_Pendiente_De === id)?.Casos ?? 0;

  return (
    <CustomCard
      title="Mesa de Control"
      description="Monitorea los tickets en proceso y consulta su estatus en tiempo real."
      backgroundImage="/img/help-desk.png"
      isLoading={loading}
      extraContent={
        <div className="flex justify-center items-center gap-x-4">
          {[
            { label: "Pend. Agente", value: getValue(3) },
            { label: "Pend. KC", value: getValue(1) },
            { label: "Pend. Met", value: getValue(2) },
            { label: "Caducados", value: getValue(6) },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-[10px] text-gray-300">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      }
      buttonText="Ver Detalle"
      buttonLink="/tickets"
      footerText={`Tickets en proceso al ${
        dataMesaIndicadoresPolizas[0]?.Fecha_Actualizacion ?? "N/A"
      } - FUENTE: MESA DE CONTROL`}
    />
  );
}
