'use client'
import MainLayout from "@/app/components/layouts/MainLayout"
import {  useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import WarningModal from "@/app/components/WarningModal";
export default function BonosPage() {
  const { push, back } = useRouter()
  const [showModal, setShowModal] = useState(false);
  const handleConfirm = () => {
    setShowModal(false);

    // TODO: INSERTAR EN LA BD FECHA Y HORA DE ACEPTACION
    push('/bonos/kc/lista')
  };

  const handleModalClose = () => {
    setShowModal(false);
    push('/inbox/agentes')

  };
  useEffect(() => {
    setShowModal(true);

  }, []);
  return (
    <MainLayout>
          <div className=" pb-20 w-full h-screen bg-fixed bg-cover bg-center ">
          {showModal && (
            <WarningModal
              isOpen={showModal}
              onClose={handleModalClose}
              onConfirm={handleConfirm}
            />
          )}
          </div>
    </MainLayout>
  )
}
