import { request } from "@/app/utils/request"
import { useState } from "react"
import { useModal } from "@/app/hooks/useModal"

import PersistencePoliciesPronostico from "@/app/components/persistence/PersistencePoliciesPronostico"
import PolicyDetails from "@/app/components/persistence/PolicyDetails"
import MainLayout from "@/app/components/layouts/MainLayout"
import Modal from "@/app/components/Modal"

export default function DetallePronosticoDetails() {
  const { isOpenModal, modalName, openModal, closeModal } = useModal()
  const [policy, setPolicy] = useState(null)
  const persistenceDate = "2022/06/01"

  const selectedPolicy = (id) => {
    request({
      body: {
        ClassName: "Persistencia_Pronostico",
        Action: "Detalle",
        DB: "Prometeo",
        Fecha_De_Ejecucion: persistenceDate
      }
    }).then((policies) => {
      const newPolicy = policies.data.filter((policy) => policy.Poliza === id)
      setPolicy(newPolicy[0])
      openModal("Póliza " + newPolicy[0].Poliza)
    })
  }

  return (
    <MainLayout>
      <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
        Periodo de ejecución {persistenceDate}
      </h3>

      <PersistencePoliciesPronostico
        policiesDate={persistenceDate}
        policy={policy}
        selectedPolicy={selectedPolicy}
      ></PersistencePoliciesPronostico>

      <Modal
        title={modalName}
        isOpen={isOpenModal}
        cancelLabel='Cerrar'
        handleCancel={() => {
          closeModal()
          setPolicy(null)
        }}
      >
        <PolicyDetails policy={policy} />
      </Modal>
    </MainLayout>
  )
}
