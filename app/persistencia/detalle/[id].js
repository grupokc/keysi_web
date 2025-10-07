import { useState } from "react"
import { useRouter } from "next/navigation"
import PersistencePolicies from "@/app/components/persistence/PersistencePolicies"
import PolicyDetails from "@/app/components/persistence/PolicyDetails"
import { request } from "@/app/utils/request"
import { useModal } from "@/app/hooks/useModal"
import MainLayout from "@/app/components/layouts/MainLayout"
import Modal from "@/app/components/Modal"

import LoaderLayout from "@/app/components/layouts/LoaderLayout"
import useGetData from "@/app/hooks/useGetData"

export default function PersistenciaDetails() {
  const { query } = useRouter()
  const { data, loading } = useGetData({
    ClassName: "Persistencia_Ultima",
    DB: "Prometeo",
    Action: "X_Fecha_de_Ejecucion",
    // Id_Poliza: query.id,
    Fecha_de_Ejecucion:query.id //.replace("-", "/")
  })
  const { isOpenModal, modalName, openModal, closeModal } = useModal()
  const [policy, setPolicy] = useState(null)
  const persistenceDate = query.id //.replace("-", "/") //2022/5"
  const selectedPolicy = (id) => {
    request({
      body: {
        ClassName: "Persistencia_Ultima",
        Action: "X_Fecha_de_Ejecucion",
        DB: "Prometeo",
        Fecha_de_Ejecucion: persistenceDate
      }
    }).then((policies) => {
      const newPolicy = policies.data.filter((policy) => policy.Poliza === id)
      setPolicy(newPolicy[0])
      openModal("Póliza " + newPolicy[0].Poliza)
    })
  }

  return (
    // <div>Persistencia Detalle</div>
    <MainLayout>
      <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
        Periodo de ejecución {persistenceDate}
      </h3>

      <PersistencePolicies
        policiesDate={persistenceDate}
        policy={policy}
        selectedPolicy={selectedPolicy}
      ></PersistencePolicies>

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
