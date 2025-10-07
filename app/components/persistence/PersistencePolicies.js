"use client"
import { Fragment, useEffect, useState } from "react"
import { request } from "@/app/utils/request"

import Loading from "@/app/components/Loading"
import PolicyCard from "./PolicyCard"
import ListTools from "@/app/components/ListTools"

export default function PersistencePolicies({
  policiesDate,
  children,
  selectedPolicy,
  policy
}) {
  const [policies, setPolicies] = useState([])
  const [policiesStats, setPoliciesStats] = useState([])
  const [policiesToPrint, setPoliciesToPrint] = useState([])
  const [policiesCount, setPoliciesCount] = useState([])
  const [filterBy, setFilterBy] = useState([])
  

  const filter = function(valueToFind){
   
    let arrPolicies = []
    if(valueToFind.length> 0){
      setFilterBy("Filtro: " + valueToFind)
      arrPolicies = policies.filter((e)=>{
        return e.Poliza.indexOf(valueToFind)> -1 || e.Estatus_Actual.indexOf(valueToFind)> -1
      })
    }else{
      setFilterBy("Sin filto")
      arrPolicies = policies
    }
    setPoliciesToPrint(arrPolicies)
    setPoliciesCount(arrPolicies.length)
  }
  useEffect(() => {
    if (!policiesDate) return false
    request({
      body: {
        ClassName: "Persistencia_Ultima",
        Action: "X_Fecha_de_Ejecucion",
        DB: "Prometeo",
        Fecha_de_Ejecucion: policiesDate
      }
    }).then((policiesResponse) => {
      setPolicies(policiesResponse.data)
      setPoliciesToPrint(policiesResponse.data)
      setPoliciesCount(policiesResponse.data.length)


      request({
        body: {
          ClassName: "Persistencia_Ultima",
          Action: "Estadisticas",
          DB: "Prometeo",
          Fecha_de_Ejecucion: policiesDate
        }
      }).then((policiesStatsResponse) => {
        console.log(policiesStatsResponse)
        setPoliciesStats(policiesStatsResponse.data)
      })  
    })     
  }, [policiesDate])



  if (!policies) return <Loading />

  const handleFilter = function(ele){
    const keyCode = ele.keyCode
    const key = ele.key
    const value  = ele.target.value
    if(keyCode === 13){
      filter(value)
      console.log(value)
    }
    if(value.length === 0){
      filter("")
    }
 
  }
  return (
    <Fragment>
      {!policy ? (
        <Fragment>

          <div className="border p-3 bg-white  mb-2">
            <h1>Resumen de estatus</h1>
            {policiesStats.map((ele)=>(
              <button 
              type="button"
              className="block m-2  w-11/12 items-center px-3.5 py-2  rounded-sm border border-transparent text-sm leading-4 font-medium  shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={()=>filter(ele.Estatus_Actual)}
              key={ele.Estatus_Actual}> {ele.Estatus_Actual} ({ele.Casos}) </button> 
            ))}
          </div>

          <ListTools
            placeholder="Escribe y presiona 'Enter' para buscar "
            handleFilter={handleFilter}
          />
          <div className=" text-right m-2 text-gray-400"> {filterBy}</div>
          <div className=" text-right m-2 text-gray-400">{policiesCount} localizados</div>
          <ul className='flex flex-col gap-3 mt-3'>
            
            {policiesToPrint.map((policy) => (
              <PolicyCard
                onClick={selectedPolicy}
                key={policy.Poliza}
                {...policy}
              />
            ))}
          </ul>
        </Fragment>
      ) : (
        children
      )}
    </Fragment>
  )
}
