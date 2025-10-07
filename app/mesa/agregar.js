import { useContext } from "react"
import { UserContext } from "@/app/context/UserContext"
import { useRouter } from "next/navigation"

import Form from "@/app/components/Form"
import MainLaout from "@/app/components/layouts/MainLayout"
import { policyFields, policyValues } from "@/app/utils/schemas/PolicySchema"

export default function AddPolicy() {
  const { push } = useRouter()
  const { user } = useContext(UserContext)

  return (
    <MainLaout>
      <Form
        fields={policyFields}
        initialValues={policyValues}
        submit={() => push("/polizas")}
        configFetch={{
          className: "Titan_Polizas_App",
          Action: "Insert",
          Guid_Agente: "CDBA67D3-9D9C-4AD2-90D9-5DD4242EA908", //TODO: agregar GUID real
          Guid_Agente: user?.Guid_Agente, //TODO: error en user (no existe)
          Id_Responsable: user?.Id_Persona,
          UsuarioAdd: user?.Id_Persona,
          Id_Agente: user?.Id_Agente
        }}
      />
    </MainLaout>
  )
}
