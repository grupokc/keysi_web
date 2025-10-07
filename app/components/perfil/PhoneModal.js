import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@heroui/react";
import { useState } from "react";

export default function PhoneModal({ isOpen, onOpenChange, phoneInput, setPhoneInput, userToEdit, savePhoneNumber, setSelectedPhone, loading }) {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let numericValue = e.target.value.replace(/\D/g, ""); // Solo números

    if (numericValue.length > 10) {
      numericValue = numericValue.slice(0, 10); // Limitar a 10 dígitos
    }

    setPhoneInput(numericValue);
    setError(numericValue.length === 10 ? "" : "El número debe tener 10 dígitos");
  };

  const handleSavePhone = async (onClose) => {
    if (!userToEdit) return;

    if (phoneInput.length !== 10) {
      setError("El número debe tener exactamente 10 dígitos");
      return;
    }

    const updatedData = await savePhoneNumber({
      idTelefono: userToEdit.Id_Usuario_WhatsAppTelefono,
      user: {
        ...userToEdit,
        Id_Agente: userToEdit.Id_Agente,
        Nombre: userToEdit.Nombre,
      },
      phoneNumber: phoneInput, // 🔹 Se envían solo 10 dígitos, el SP agregará el prefijo `521`
    });

    if (updatedData) {
      setSelectedPhone(updatedData.Numero_WhatsApp);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {phoneInput ? `Editar Teléfono de ${userToEdit?.Nombre}` : `Agregar Teléfono a ${userToEdit?.Nombre}`}
            </ModalHeader>
            <ModalBody>
              <Input
                label="Número de Teléfono"
                placeholder="Ingresa el número"
                value={phoneInput}
                onChange={handleInputChange}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                variant="bordered"
                disabled={loading}
                isInvalid={!!error}
                errorMessage={error}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose} disabled={loading}>
                Cancelar
              </Button>
              <Button color="primary" onPress={() => handleSavePhone(onClose)} disabled={loading}>
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
