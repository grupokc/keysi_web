"use client";

import { useContext, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@heroui/react";
import { AssistantService } from "@/app/services/AssistantService";

export default function AssistantModal({ isOpen, setIsOpen }) {
  const { user } = useContext(UserContext); // 🔹 Tomamos el usuario logueado
  const [assistantData, setAssistantData] = useState({
    RFC: "",
    Nombre_Razon_Social: "",
    Email1: "",
    Telefono1: "",
  });

  const handleAssistantChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "Telefono1") {
      newValue = value.replace(/\D/g, ""); // Solo números
      if (!newValue.startsWith("521")) {
        newValue = `521${newValue}`;
      }
    }

    setAssistantData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSaveAssistant = async (onClose) => {
    if (!assistantData.RFC || !assistantData.Nombre_Razon_Social || !assistantData.Email1 || !assistantData.Telefono1) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const success = await AssistantService.saveAssistant(assistantData, user);
    if (success) {
      setIsOpen(false); // 🔹 Cierra el modal automáticamente
      onClose(); // 🔹 Asegura que el modal también se cierre si usa un estado interno
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={setIsOpen}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Agregar Asistente</ModalHeader>
            <ModalBody>
              <Input label="RFC" name="RFC" placeholder="Ingrese el RFC" value={assistantData.RFC} onChange={handleAssistantChange} variant="bordered" />
              <Input label="Nombre o Razón Social" name="Nombre_Razon_Social" placeholder="Ingrese el nombre" value={assistantData.Nombre_Razon_Social} onChange={handleAssistantChange} variant="bordered" />
              <Input label="Correo Electrónico" name="Email1" placeholder="Ingrese el correo" value={assistantData.Email1} onChange={handleAssistantChange} variant="bordered" />
              <Input label="Teléfono" name="Telefono1" placeholder="Ingrese el teléfono" value={assistantData.Telefono1} onChange={handleAssistantChange} type="tel" inputMode="numeric" pattern="[0-9]*" variant="bordered" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={() => handleSaveAssistant(onClose)}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
