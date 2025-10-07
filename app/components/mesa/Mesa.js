"use client"
import { Fragment, useEffect, useState } from "react"
import useList from "@/app/hooks/useList"
import { useRouter } from "next/navigation"

import ListLayout from "@/app/components/layouts/ListLayout"
import Loading from "@/app/components/Loading"
import MesaItem from "@/app/components/mesa/MesaItem"
import ListTools from "@/app/components/ListTools"
import Dropdown from "@/app/components/Dropdown"
import {executeForCRUD} from "@/app/services/frontBack"

export default function Mesa({Ver_Promotoria}) {
  const [fechaActualizacion, setFechaActualizacion] = useState('')
  const { query ,back,push} = useRouter()
   const [idTicketEstatusPendienteDe ,setIdTicketEstatusPendienteDe] = useState(parseInt(query?.id))

  const tabs = [
    { idTicketEstatusPendienteDe:0, name: 'Todos', href: '#', current: true },
    { idTicketEstatusPendienteDe:3, name: 'Pendientes Agente', href: '#', current: false },
    { idTicketEstatusPendienteDe:1, name: 'Pendientes KC', href: '#', current: false },
    { idTicketEstatusPendienteDe:2, name: 'Pendientes Met', href: '#', current: false },
    { idTicketEstatusPendienteDe:6, name: 'Caducados', href: '#', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
 
  const [dataToPrint, setDataToPrint] = useState([])
  const { filter, data, loading } = useList({
    ClassName: "Titan_Mesa_App",
    Action: "Get",
    Ver_Promotoria:Ver_Promotoria
  })

  

  const filterData = (idTicketEstatusPendienteDe) => {
    setIdTicketEstatusPendienteDe(idTicketEstatusPendienteDe)
    if(idTicketEstatusPendienteDe === 0){
      setDataToPrint(data)
      return
    }
    let data2Print = data.filter((r)=>{
      return parseInt(r.Id_Ticket_Estatus_Pendiente_De) === parseInt(idTicketEstatusPendienteDe)// MET
    })
    setDataToPrint(data2Print)
  }

  useEffect(() => {
    const fetchData = async () => {
      const rr = await  executeForCRUD({
        className: "DM_Titan_TicketsIP_Fecha_Actualizacion",
        action: "Get",
      })
      setFechaActualizacion( rr.data[0].Fecha_Actualizacion)
    }
    fetchData()

    // FechaActualizacion = dataFA[0]?.Fecha_Actualizacion
    filterData(idTicketEstatusPendienteDe? idTicketEstatusPendienteDe:0)
  }, [data])


  if (loading && data.length <= 0) return <Loading />

  
  return (
    <div >
      <div className="mb-10"> 
        <div className="p-4 w-full">
          <div className="block">
            <nav className="flex space-x-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={(e)=>filterData(tab.idTicketEstatusPendienteDe )}
                  className={classNames(
                    tab.idTicketEstatusPendienteDe == idTicketEstatusPendienteDe ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={tab.idTicketEstatusPendienteDe ==idTicketEstatusPendienteDe ? 'page' : undefined}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
          
        </div>
        <div className="w-full flex flex-col">
          {/* <Dropdown comboName="Estados_Mesa_IP" placeholder="" label="Estado" onChange={cmbEstado_Click} /> */}
          {/* <Dropdown comboName="Estatus_Mesa_IP" placeholder="" label="Estatus" onChange={cmbEstatus_Click} />  */}
          <div className="w-3/4"> 
            <ListTools
              placeholder='Filtrar por asunto, por asegurado, por agente o por folio aseguradora'
              name='Asunto'
              handleFilter={filter}
            />
          </div>
          <div className="text-sm  ">{dataToPrint?.length} Registros Totales |   Fecha de actualización {fechaActualizacion} </div>
        </div>
      </div>
      <ListLayout> 
        {dataToPrint.map((item,index) => (
          <MesaItem key={index} {...item} />
        ))}
        <br />
        <br />
        <br />
        <br />
      </ListLayout>
    </div>
  )
}
