import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { UserPhoneService } from "@/app/services/userPhoneService";
import { useState } from "react";

export default function AssistantsTable({ relatedUsers, handleOpenModal, loading }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const handleDeletePhone = async (assistant) => {
    if (!assistant?.Id_Usuario) return;
    
    try {
      const userPhone = await UserPhoneService.getUserPhone(assistant.Id_Usuario);
      if (userPhone) {
        await UserPhoneService.deleteUserPhone(userPhone);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al eliminar el teléfono:", error);
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold mt-6 mb-2">Asistentes</h2>
      <Table aria-label="Tabla de asistentes">
        <TableHeader>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Correo</TableColumn>
          <TableColumn>Teléfono</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.isArray(relatedUsers) && relatedUsers.length > 0 ? (
            relatedUsers.map((relatedUser) => (
              <TableRow key={relatedUser.Id_Usuario}>
                <TableCell>{relatedUser.Nombre || "N/A"}</TableCell>
                <TableCell>{relatedUser.Email || "Sin correo"}</TableCell>
                <TableCell>{relatedUser.Numero_WhatsApp || "Sin teléfono"}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => handleOpenModal(relatedUser)}
                      disabled={loading}
                    >
                      {relatedUser.Numero_WhatsApp ? "Editar" : "Agregar"}
                    </Button>
                    {relatedUser.Numero_WhatsApp && (
                      <button
                        onClick={() => {
                          setSelectedAssistant(relatedUser);
                          setIsDeleteModalOpen(true);
                        }}
                        disabled={loading}
                        className="p-1 text-red-500 hover:text-red-700 disabled:opacity-50"
                        title="Eliminar teléfono"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No hay asistentes</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="text-sm text-gray-500 m-4">
        Para registrar un asistente es necesario que envíes un correo electrónico a tu promotor indicando su nombre y su correo.
      </div>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro que deseas eliminar el número de teléfono {selectedAssistant?.Numero_WhatsApp} del asistente {selectedAssistant?.Nombre}?</p>
            <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="danger" onPress={() => {
              handleDeletePhone(selectedAssistant);
              setIsDeleteModalOpen(false);
            }}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
