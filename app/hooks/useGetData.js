"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { useFetch } from "./useFetch"

export default function useGetData(config) {
  const { current } = useRef(config)

  const { request, loading, errorRequest } = useFetch()
  const [data, setData] = useState([])
  const getData  =  useCallback(
    async (values)  => {
      const user = JSON.parse(window?.localStorage?.getItem("user"))
      const body = values || { ...current }

      await request({
        action: current.action || "Exe4CRUD",
        url: current.url || "URL",
        body: {
          ...body,
          Guid_Agente: config.Guid_Agente? config.Guid_Agente: user.Guid_Agente,
          Clave_Pegasus: config.Clave_Agente? config.Clave_Agente:user.Login
        },
        cb: (res) => setData(res)
      })
    },
    []
  )
  const reload  =  useCallback(
    async (values)  => {
      const user = JSON.parse(window?.localStorage?.getItem("user"))
      const body = values || { ...current }
      await request({
        action: current.action || "Exe4CRUD",
        url: current.url || "URL",
        body: {
          ...body,
          Guid_Agente: config.Guid_Agente? config.Guid_Agente: user.Guid_Agente,
          Clave_Pegasus: config.Clave_Agente? config.Clave_Agente:user.Login
        },
        cb: (res) => setData(res)
      })
    },
    [request, current]
  )
  
  useEffect(() => {
    setData([])
    getData()
  }, [getData])

  return { refetch: getData, data, loading, error: errorRequest, reload }
}
