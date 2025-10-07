"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { UserPhoneService } from "@/app/services/userPhoneService";
import { executeForCRUD } from "@/app/services/frontBack";

// ✅ Interfaz para las props del modal
interface NotificacionesWAProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  user: {
    Id_Usuario: number;
    Id_Agente: number | null;
  };
}

export default function NotificacionesWA({ isOpen, setIsOpen, user }: NotificacionesWAProps) {
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [phoneId, setPhoneId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState<boolean>(false);

  // 🔹 Obtener el número de WhatsApp del usuario si ya existe
  useEffect(() => {
    if (user?.Id_Usuario) {
      const fetchPhoneNumber = async () => {
        const userPhone = await UserPhoneService.getUserPhone(user.Id_Usuario);
        if (userPhone) {
          setPhoneInput(userPhone.Numero_WhatsApp_Sin_Prefijo || "");
          setPhoneId(userPhone.Id_Usuario_WhatsAppTelefono || null);
        }
      };
      fetchPhoneNumber();
    }
  }, [user]);

  // 🔹 Manejo del input del número de teléfono
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numericValue = e.target.value.replace(/\D/g, ""); // Solo números

    if (numericValue.length > 10) {
      numericValue = numericValue.slice(0, 10); // Limitar a 10 dígitos
    }

    setPhoneInput(numericValue);
    setError(numericValue.length === 10 ? "" : "El número debe tener 10 dígitos");
  };

  // 🔹 Guardar o actualizar el número de WhatsApp
  const handleSavePhone = async () => {
    if (!user) return;

    if (phoneInput.length !== 10) {
      setError("El número debe tener exactamente 10 dígitos");
      return;
    }

    setLoading(true);

    const updatedData = await UserPhoneService.saveUserPhone({
      idTelefono: phoneId, // Si existe, se actualiza; si no, se inserta
      user,
      phoneNumber: phoneInput,
    });

    setLoading(false);

    if (updatedData) {
      setIsOpen(false); // 🔹 Cierra el modal después de guardar
    }
  };

  // 🔹 Manejo del rechazo (cambia la vista dentro del mismo modal)
  const handleReject = () => {
    setShowConfirmationScreen(true);
  };

  // 🔹 Volver al formulario de ingreso de número (dentro del mismo modal)
  const handleGoBack = () => {
    setShowConfirmationScreen(false);
  };

  // 🔹 Confirmar el rechazo y registrarlo en la BD
  const handleConfirmRejection = async () => {
    setLoading(true);

    await executeForCRUD({
      ClassName: "Titan_Rechaza_Notificaciones_WA_Logs",
      Action: "Insert",
      Id_Usuario: user.Id_Usuario,
      Id_Agente: user.Id_Agente,
      UsuarioAdd: user.Id_Usuario,
    });

    setLoading(false);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={setIsOpen}>
      <ModalContent>
        <>
          {showConfirmationScreen ? (
            // 🔹 Segunda pantalla: Confirmación de rechazo
            <>
              <ModalHeader>Confirmar Rechazo</ModalHeader>
              <ModalBody>
                <p>
                  Estoy enterado que la única manera de dar seguimiento a mis trámites es entrando a la 
                  plataforma de solicitudes ya que el sistema solo notifica por WhatsApp y decidí no proporcionarlo.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onPress={handleGoBack}>
                  Regresar
                </Button>
                <Button color="primary" onPress={handleConfirmRejection} disabled={loading}>
                  {loading ? "Registrando..." : "Aceptar"}
                </Button>
              </ModalFooter>
            </>
          ) : (
            // 🔹 Primera pantalla: Ingreso de número
            <>
              <ModalHeader>Notificaciones de WhatsApp</ModalHeader>
              <ModalBody>
                <p>
                  Para que estés comunicado de los cambios de estatus de la plataforma de solicitudes, 
                  es necesario que proporciones un número de WhatsApp.
                </p>
                <Input
                  label="Número de WhatsApp"
                  placeholder="Ingresa tu número"
                  value={phoneInput}
                  onChange={handleInputChange}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleReject}>
                  No Quiero Proporcionarlo
                </Button>
                <Button color="primary" onPress={handleSavePhone} disabled={loading}>
                  {loading ? "Guardando..." : "Aceptar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </>
      </ModalContent>
    </Modal>
  );
}
