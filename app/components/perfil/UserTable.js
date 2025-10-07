import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { UserPhoneService } from "@/app/services/userPhoneService";
import { useState } from "react";

export default function UserTable({ user, selectedPhone, handleOpenModal, loading }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeletePhone = async () => {
    if (!user?.Id_Usuario || !selectedPhone) return;
    
    try {
      const userPhone = await UserPhoneService.getUserPhone(user.Id_Usuario);
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
      <h2 className="text-lg font-semibold">Información del usuario</h2>
      <Table aria-label="Tabla del usuario principal" >
        <TableHeader>
          <TableColumn>Campo</TableColumn>
          <TableColumn>Información</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>{user?.Nombre_Persona || "N/A"}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Correo</TableCell>
            <TableCell>{user?.Email || "N/A"}</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Teléfono</TableCell>
            <TableCell>{selectedPhone || "Sin teléfono"}</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => handleOpenModal(user)}
                  disabled={loading}
                >
                  {selectedPhone ? "Editar Teléfono" : "Agregar Teléfono"}
                </Button>
                {selectedPhone && (
                  <button
                    onClick={() => setIsDeleteModalOpen(true)}
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
        </TableBody>
      </Table>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Confirmar eliminación</ModalHeader>
          <ModalBody>
            <p>¿Estás seguro que deseas eliminar el número de teléfono {selectedPhone}?</p>
            <p className="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="danger" onPress={() => {
              handleDeletePhone();
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
