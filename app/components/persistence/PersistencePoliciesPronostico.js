"use client"
import { Fragment, useEffect, useState } from "react"
import { request } from "@/app/utils/request"

import Loading from "@/app/components/Loading"
import PolicyCardPronostico from "./PolicyCardPronostico"
import ListTools from "@/app/components/ListTools"

export default function PersistencePoliciesPronostico({
  policiesDate,
  children,
  selectedPolicy,
  policy
}) {
  const [currentDate, setCurrentDate] = useState(policiesDate)
  const [policies, setPolicies] = useState([])
  const [policiesStats, setPoliciesStats] = useState([])
  const [policiesToPrint, setPoliciesToPrint] = useState([])
  const [policiesCount, setPoliciesCount] = useState([])
  const [filterBy, setFilterBy] = useState([])

  const filter = function (valueToFilter) {
    valueToFilter = valueToFilter.trim()
    console.log(valueToFilter)
    console.log(policies)
    let arrPolicies = []
    if (valueToFilter.length > 0) {
      setFilterBy("Filtro: " + valueToFilter)
      arrPolicies = policies.filter((e) => {
        console.log(e.Subclasificacion_Cartera.indexOf(valueToFilter))
        return (
          e.Poliza.indexOf(valueToFilter) > -1 ||
          e.Subclasificacion_Cartera === valueToFilter
        )
      })
      console.log(arrPolicies)
    } else {
      setFilterBy("Sin filto")
      arrPolicies = policies
    }
    setPoliciesToPrint(arrPolicies)
    setPoliciesCount(arrPolicies.length)
  }

  useEffect(() => {
    if (!currentDate) return false
    request({
      body: {
        ClassName: "Persistencia_Pronostico",
        Action: "Detalle",
        DB: "Prometeo",
        Fecha_de_Ejecucion: currentDate
      }
    }).then((policiesResponse) => {
      setPolicies(policiesResponse.data)
      setPoliciesToPrint(policiesResponse.data)
      setPoliciesCount(policiesResponse.data.length)

      request({
        body: {
          ClassName: "Persistencia_Pronostico_Detalle",
          Action: "Estadisticas",
          DB: "Prometeo",
          Fecha_de_Ejecucion: currentDate
        }
      }).then((policiesStatsResponse) => {
        console.log(policiesStatsResponse)
        setPoliciesStats(policiesStatsResponse.data)
      })

      request({
        body: {
          ClassName: "Persistencia_Ultima",
          Action: "Estadisticas",
          DB: "Prometeo",
          Fecha_de_Ejecucion: currentDate
        }
      }).then((policiesStatsResponse) => {
        console.log(policiesStatsResponse)
        setPoliciesStats(policiesStatsResponse.data)
      })  

    })
  }, [currentDate])

  if (!policies) return <Loading />

  const handleFilter = function (ele) {
    const keyCode = ele.keyCode
    const key = ele.key
    const value = ele.target.value
    if (keyCode === 13) {
      filter(value)
      console.log(value)
    }
    if (value.length === 0) {
      filter("")
    }
  }
  return (
    <Fragment>
      {!policy ? (
        <Fragment>
          <div className='border p-3 bg-white  mb-2'>
            <h1>Resumén de estatus</h1>
            <p className='font-medium'>Meses</p>
            <ul className='flex flex-wrap gap-3 my-2 text-white justify-center'>
              <li
                className={`${
                  currentDate === "2022/06/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/06/01")}
              >
                06
              </li>
              <li
                className={`${
                  currentDate === "2022/07/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/07/01")}
              >
                07
              </li>
              <li
                className={`${
                  currentDate === "2022/08/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/08/01")}
              >
                08
              </li>
              <li
                className={`${
                  currentDate === "2022/09/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/09/01")}
              >
                09
              </li>
              <li
                className={`${
                  currentDate === "2022/10/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/10/01")}
              >
                10
              </li>
              <li
                className={`${
                  currentDate === "2022/11/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/11/01")}
              >
                11
              </li>
              <li
                className={`${
                  currentDate === "2022/12/01" ? "bg-opacity-50 " : ""
                } bg-blue-600 px-2 cursor-pointer`}
                onClick={() => setCurrentDate("2022/12/01")}
              >
                12
              </li>
            </ul>
            {policiesStats.map((ele) => (
              <button
                type='button'
                className='block m-2  w-11/12 items-center px-3.5 py-2  rounded-sm border border-transparent text-sm leading-4 font-medium  shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                onClick={() => filter(ele.Subclasificacion_Cartera)}
                key={ele.Subclasificacion_Cartera}
              >
                {" "}
                {ele.Subclasificacion_Cartera} ({ele.Casos}){" "}
              </button>
            ))}
          </div>

          <ListTools
            placeholder="Escribe y presiona 'Enter' para buscar "
            handleFilter={handleFilter}
          />
          <div className=' text-right m-2 text-gray-400'> {filterBy}</div>
          <div className=' text-right m-2 text-gray-400'>
            {policiesCount} localizados
          </div>
          <ul className='flex flex-col gap-3 mt-3'>
            {policiesToPrint.map((policy) => (
              <PolicyCardPronostico
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
