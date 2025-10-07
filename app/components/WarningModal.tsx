import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const message =
    "La información presentada en esta aplicación es una estimación conforme a los registros integrada por Grupo KC. " +
    "No se garantizan montos, ni percepciones y Grupo KC no tiene ninguna obligación, ni responsabilidad por cualquier diferencia " +
    "conforme a alcances reales de producción personal del agente.";

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center gap-2 bg-blue-300 p-2">
              {/* Icono de advertencia */}
              <svg
                className="h-6 w-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-2a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM9 9V7h2v5H9V9zm0-4h2v2H9V5z" />
              </svg>
              <span className="text-lg font-bold text-gray-900">Advertencia</span>
            </ModalHeader>

            <ModalBody>
              <p className="text-gray-700 text-lg leading-snug text-justify">{message}</p>
            </ModalBody>

            <ModalFooter>
              <Button color="success" onPress={onConfirm}>
                SI ACEPTO
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                NO ACEPTO
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
