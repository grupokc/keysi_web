import { useContext } from "react"
import { UserContext } from "@/app/context/UserContext"
import { useRouter } from "next/navigation"
import { ProspectFields, ProspectValues } from "@/app/utils/schemas/ProspectSchema"

import Form from "@/app/components/Form"
import MainLaout from "@/app/components/layouts/MainLayout"

export default function AddProspect() {
  const { push } = useRouter()
  const { user } = useContext(UserContext)

  return (
    <MainLaout>
      <Form
        fields={ProspectFields}
        initialValues={ProspectValues}
        submit={() => push("/prospectos")}
        configFetch={{
          className: "Crm_Prospectos",
          Action: "Insert",
          Guid_Agente: user?.Guid_Agente, //TODO: error en user (no existe)
          Id_Responsable: user?.Id_Persona,
          UsuarioAdd: user?.Id_Persona,
          Id_Agente: user?.Id_Agente
        }}
      />
    </MainLaout>
  )
}
