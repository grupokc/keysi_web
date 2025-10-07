"use client";
import EdoctaResumen from "@/app/components/edocta/Resumen";
import EdoctaDetalle from "@/app/components/edocta/Detalle";
import { useState } from "react";

export default function EdoctaPage() {
  const [isDetalleVisible, setIsDetalleVisible] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState<{ Id_Liquidacion: number; Id_Agente: number }>({
    Id_Liquidacion: 0,
    Id_Agente: 0,
  });

  const showDetalle = (Id_Agente: number, Id_Liquidacion: number) => {
    setDetalleSeleccionado({ Id_Agente, Id_Liquidacion });
    setIsDetalleVisible(true);
  };

  return isDetalleVisible ? (
    <EdoctaDetalle
      showResumen={() => setIsDetalleVisible(false)}
      Id_Liquidacion={detalleSeleccionado.Id_Liquidacion}
      Id_Agente={detalleSeleccionado.Id_Agente}
    />
  ) : (
    <EdoctaResumen verDetalle={showDetalle} />
  );
}
