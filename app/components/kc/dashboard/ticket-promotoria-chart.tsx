"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { executeForCRUD } from "@/app/services/frontBack"
import { Spinner } from "@heroui/react"

interface ChartData {
  name: string
  total: number
}

export function TicketPromotoriaChart() {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await executeForCRUD({
          ClassName: "Mesa_De_Ayuda_Dashboard_Promotoria", // 🔹 Llamamos al nuevo SP
          Action: "Report",
          url: "URL_NETAPI",

        })

        if (response.success && Array.isArray(response.data)) {
          // 🔹 Transformamos los datos para la gráfica
          const formattedData = response.data.map((item:any) => ({
            name: item.Promotoria || "Sin Promotoria", // Si viene vacío, asignamos "Sin Promotoria"
            total: item.Total_Tickets || 0
          }))
          
          setChartData(formattedData)
        }
      } catch (error) {
        console.error("Error fetching ticket promotoria chart data:", error)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      )}
    </ResponsiveContainer>
  )
}
