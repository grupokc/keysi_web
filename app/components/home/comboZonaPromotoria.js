'use client';

import React, { useState, useEffect } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { executeForCRUD } from '@/app/services/frontBack';

const ComboZonaPromotoria = ({ onSelectionChange, filterValues }) => {
  const [selectedValues, setSelectedValues] = useState({
    Id_Zona_Comercial: filterValues?.Id_Zona_Comercial || 999999999,
    Id_Promotoria: 999999999,
    Id_Agente: 999999999,
  });

  const [dropdownData, setDropdownData] = useState({
    Zonas: [],
    Promotorias: [],
    Agentes: [],
  });

  useEffect(() => {
    const loadZonasData = async () => {
      try {
        console.log("📢 Enviando petición manual a la API...");
  
        const response = await fetch("https://tu-api.com/api/Zonas_IP/List", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({})
        });
  
        const data = await response.json();
        console.log("📌 Respuesta fetch manual:", data);
      } catch (error) {
        console.error("❌ Error en fetch manual:", error);
      }
    };
  
    loadZonasData();
  }, []);
  
  

  useEffect(() => {
    if (selectedValues.Id_Zona_Comercial === 999999999) return;

    const loadPromotoriasData = async () => {
      const promotorias = await executeForCRUD({
        ClassName: 'Promotorias',
        Action: 'List',
        Id_Zona_Comercial: selectedValues.Id_Zona_Comercial,
      });

      setDropdownData((prev) => ({
        ...prev,
        Promotorias: promotorias.success
          ? promotorias.data
          : [{ Id_Promotoria: 999999999, Nombre_Promotoria: '-- TODAS --' }],
      }));

    };

    loadPromotoriasData();
  }, [selectedValues.Id_Zona_Comercial]);

  useEffect(() => {
    if (selectedValues.Id_Promotoria === 999999999) return;

    const loadAgentesData = async () => {
      const agentes = await executeForCRUD({
        ClassName: 'Agentes',
        Action: 'List',
        Id_Promotoria: selectedValues.Id_Promotoria,
      });

      setDropdownData((prev) => ({
        ...prev,
        Agentes: agentes.success
          ? agentes.data
          : [{ Id_Agente: 999999999, Nombre_Agente: '-- TODOS --' }],
      }));

    };

    loadAgentesData();
  }, [selectedValues.Id_Promotoria]);

  const handleZonaChange = (idZonaComercial) => {
    setSelectedValues({
      Id_Zona_Comercial: idZonaComercial,
      Id_Promotoria: 999999999,
      Id_Agente: 999999999,
    });
    onSelectionChange({
      Id_Zona_Comercial: idZonaComercial,
      Id_Promotoria: 999999999,
      Id_Agente: 999999999,
    });
  };

  const handlePromotoriaChange = (idPromotoria) => {
    const promotoriaSeleccionada = dropdownData.Promotorias.find(p => p.Id_Promotoria === idPromotoria);
    
    setSelectedValues((prev) => ({
      ...prev,
      Id_Promotoria: idPromotoria,
      Id_Agente: 999999999,
    }));
  
    onSelectionChange({
      ...selectedValues,
      Id_Promotoria: idPromotoria,
      Id_Agente: 999999999,
      Nombre_Promotoria: promotoriaSeleccionada?.Nombre_Promotoria || "",
      Nombre_Promotor: promotoriaSeleccionada?.Nombre_Promotor || "",
    });
  };
  

  const handleAgenteChange = (idAgente) => {
    setSelectedValues((prev) => ({
      ...prev,
      Id_Agente: idAgente,
    }));
    onSelectionChange({ ...selectedValues, Id_Agente: idAgente });
  };

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-white p-4 shadow-lg md:flex-row md:items-center md:gap-4 md:space-y-0">
      {/* Zona */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
        <label className="text-sm font-semibold text-gray-700">Zona:</label>
        <Dropdown aria-label="Seleccionar Zona Comercial">
          <DropdownTrigger>
            <button className="rounded-md border p-2 text-sm">{
              dropdownData.Zonas.find(z => z.Id_Zona_Comercial === selectedValues.Id_Zona_Comercial)?.Nombre_Zona_Comercial || 'Seleccione una Zona'
            }</button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => handleZonaChange(Number(key))}>
            {dropdownData.Zonas.map((zona) => (
              <DropdownItem key={zona.Id_Zona_Comercial.toString()}>{zona.Nombre_Zona_Comercial}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Promotoria */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
        <label className="text-sm font-semibold text-gray-700">Promotoria:</label>
        <Dropdown isDisabled={selectedValues.Id_Zona_Comercial === 999999999} aria-label="Seleccionar Promotoria">
          <DropdownTrigger>
            <button className="rounded-md border p-2 text-sm" disabled={selectedValues.Id_Zona_Comercial === 999999999}>{
              dropdownData.Promotorias.find(p => p.Id_Promotoria === selectedValues.Id_Promotoria)?.Nombre_Promotoria || 'Seleccione una Promotoria'
            }</button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => handlePromotoriaChange(Number(key))}>
            {dropdownData.Promotorias.map((promotoria) => (
              <DropdownItem key={promotoria.Id_Promotoria.toString()}>{promotoria.Nombre_Promotoria}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Agente */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
        <label className="text-sm font-semibold text-gray-700">Agente:</label>
        <Dropdown isDisabled={selectedValues.Id_Promotoria === 999999999} aria-label="Seleccionar Agente">
          <DropdownTrigger>
            <button className="rounded-md border p-2 text-sm" disabled={selectedValues.Id_Promotoria === 999999999}>{
              dropdownData.Agentes.find(a => a.Id_Agente === selectedValues.Id_Agente)?.Nombre_Agente || 'Seleccione un Agente'
            }</button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => handleAgenteChange(Number(key))}>
            {dropdownData.Agentes.map((agente) => (
              <DropdownItem key={agente.Id_Agente.toString()}>{agente.Nombre_Agente}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div> */}
    </div>
  );
};

export default ComboZonaPromotoria;
