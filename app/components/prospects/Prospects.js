import ListLayout from "@/app/components/layouts/ListLayout"
import { useRouter } from "next/navigation"

import ListTools from "@/app/components/ListTools"
import Loading from "@/app/components/Loading"
import useList from "@/app/hooks/useList"
import ProspecstItem from "./ProspectsItem"

export default function Prospects() {
  const { push } = useRouter()
  const { filter, data, loading } = useList({
    ClassName: "Crm_Prospectos_App",
    Action: "Get"
  })

  if (loading && data.length <= 0) return <Loading />

  return (
    <ListLayout>
      <ListTools
        placeholder='Filtrar por nombre'
        name='Nombre'
        handleFilter={filter}
        handleAdd={() => push("/prospectos/agregar")}
      />
      {data.map((prospect) => (
        <ProspecstItem key={prospect.Id_Crm_Id_Prospecto} {...prospect} />
      ))}
    </ListLayout>
  )
}
