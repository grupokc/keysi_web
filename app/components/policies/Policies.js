"use client"
import useList from "@/app/hooks/useList"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import ListLayout from "@/app/components/layouts/ListLayout"
import Loading from "@/app/components/Loading"
import PoliciesItem from "@/app/components/policies/PoliciesItem"
import ListTools from "@/app/components/ListTools"
import Dropdown from "@/app/components/Dropdown"


export default function Policies({Ver_Promotoria}) {
  const [dataToPrint, setDataToPrint] = useState([])
  const { push } = useRouter()
  const { filter, data, loading } = useList({
    ClassName: "Titan_Polizas_App",
    Action: "Get",
    Ver_Promotoria:Ver_Promotoria
  })


  useEffect(() => {
    setDataToPrint(data)
  }, [data])

  if (loading && data.length <= 0) return <Loading />
  const cmbEstatus_Click = (e) => {
    console.log(e)
    const Id_Ramo = e.key
    setDataToPrint( data.filter((e)=>{
      return e.Id_Ramo == Id_Ramo
    }))
  }
  return (
    <>
      <Dropdown comboName="Ramos_IP" placeholder="" label="Ramo" onChange={cmbEstatus_Click} />
      <ListTools
        placeholder='Filtrar por asegurado'
        name='Nombre_Contratante'
        handleFilter={filter}

      />
      <div className="w-full m-10">
        Polizas { dataToPrint.length}
      </div>
      <ListLayout>
      {dataToPrint.map((policy) => (
        <PoliciesItem key={policy.Id_Poliza} {...policy} />
      ))}
    </ListLayout>
    </>
  )
}
