"use client";
import { useState, useEffect } from "react";
import useGetData from "@/app/hooks/useGetData";
import { Card, CardBody, Avatar, Chip, Select } from "@heroui/react";
import IndicadoresAgenteSeleccionado from "@/app/components/agente/indicadoresAgenteSeleccionado";
import Indicadores from '@/app/components/agente/indicadores';
interface IAgente {
  Id_Agente: number;
  Clave_Pegasus: string;
  Guid: string;
  Clave_Met: string;
  Nombre_Agente: string;
  Fecha_Ingreso: string;
  Nombre_Agente_Clave_Categoria_Cia: string;
  Estado_Nombre: string;
  Correo_Personal: string;
  Telefono_Celular: string;
  RutaFoto: string;
}

const getImageUrl = (user: IAgente) => {
  return user.RutaFoto && user.RutaFoto !== "null"
    ? `https://pegasus.grupokc.com.mx/${user.RutaFoto.replace(/\\/g, "/")}`
    : "https://pegasus.grupokc.com.mx/img/iconUsuario.png";
};

export default function IndicadoresAgentePromotor() {
  const [agente, setAgente] = useState<IAgente | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("agenteSeleccionado");
    if (data) setAgente(JSON.parse(data));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-8">
      {agente ? (
        <>
          {/* Header simple con foto, nombre y clave */}
          <div className="flex flex-col items-center mb-8">
            <Avatar
              src={getImageUrl(agente)}
              className="h-24 w-24 rounded-full border mb-4"
              alt={`Foto de ${agente.Nombre_Agente}`}
            />
            <h1 className="text-xl font-bold text-gray-900">{agente.Nombre_Agente}</h1>
            <span className="text-sm text-gray-500">Clave MetLife: {agente.Clave_Met}</span>
          </div>
          {/* Indicadores del agente seleccionado */}
          <IndicadoresAgenteSeleccionado user={{
            ...agente,
            Clave_Agente: agente.Clave_Pegasus,
            Guid_Agente: agente.Guid
          }} />
          {/* <Indicadores user={{
            ...agente,
            Clave_Agente: agente.Clave_Pegasus,
            Guid_Agente: agente.Guid
          }} /> */}


          
        </>
      ) : (
        <div className="text-center text-gray-500">No hay datos de agentes disponibles.</div>
      )}
    </div>
  );
} 