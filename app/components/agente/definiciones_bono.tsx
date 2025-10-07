"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Button } from "@heroui/react";
import { ChevronLeft } from "lucide-react";

interface DefinicionesBonoProps {
  showResumen: () => void;
}

export default function DefinicionesBono({ showResumen }: DefinicionesBonoProps) {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });

  return (
    <Modal isOpen={isOpen} onOpenChange={(isOpen) => !isOpen && showResumen()} size="5xl" scrollBehavior="inside">
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex items-center gap-3 border-b p-4">
              <Button variant="ghost" onClick={() => { onCloseModal(); showResumen(); }} className="flex items-center gap-2">
                <ChevronLeft size={20} />
                Regresar
              </Button>
              <h1 className="text-lg font-semibold">Definiciones</h1>
            </ModalHeader>

            <ModalBody className="p-4">
              <iframe className="w-full h-[80vh] rounded-lg border" src="/Definiciones_Bonos_Met_IP_2024.pdf"></iframe>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
