"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useFetch } from "./useFetch"

export default function useList(config) {
  const { request, loading, errorRequest } = useFetch()
  const [allData, setAllData] = useState([])
  const [data, setData] = useState([])
  const { current } = useRef(config)

  const getData = useCallback(() => {
    const user = JSON.parse(window?.localStorage?.getItem("user"))
    if (allData.length > 0) return
    request({
      action: "Exe4CRUD",
      body: { ...current, Guid_Agente: user.Guid_Agente },
      cb: (res) => {
        setAllData(res)
        setData(res)
      }
    })
  }, [request, current, allData])

  const filter = (e) => {
    const { name, value } = e.target
    const leakedData = allData.filter((element) =>
      element["Tupla"].toLowerCase().includes(value.toLowerCase())
    )
    setData(leakedData)
  }

  useEffect(() => {
    getData()
  }, [getData])

  return { filter, refetch: getData, data, loading, error: errorRequest }
}
