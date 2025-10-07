"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { executeForCRUD } from "@/app/services/frontBack"
import { Spinner } from "@heroui/react"

// Colores para cada segmento del gráfico
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D2691E", "#A52A2A", "#32CD32"]

interface ChartData {
  name: string
  value: number
}

interface TicketCategoryChartProps {
  Id_Agente?: number // Parámetro opcional para filtrar por agente
  Id_Promotoria?: number // Parámetro opcional para filtrar por promotoria
}

export function TicketCategoryChart({ Id_Agente, Id_Promotoria }: TicketCategoryChartProps) {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const requestData: Record<string, any> = {
          ClassName: "Mesa_De_Ayuda_Dashboard_Ramo",
          Action: "Report",
          url: "URL_NETAPI"
        }

        // 🔹 Agregar `Id_Promotoria` si está presente, de lo contrario usar `Id_Agente`
        if (Id_Promotoria) {
          requestData["Id_Promotoria"] = Id_Promotoria
        } else if (Id_Agente) {
          requestData["Id_Agente"] = Id_Agente
        }

        const response = await executeForCRUD(requestData)

        if (response.success && Array.isArray(response.data)) {
          // 🔹 Transformamos los datos para la gráfica
          const formattedData = response.data.map((item: any) => ({
            name: item.Ramo || "Sin Ramo", // Si viene vacío, asignamos "Sin Ramo"
            value: item.Total_Tickets || 0
          }))
          
          setChartData(formattedData)
        }
      } catch (error) {
        console.error("Error fetching ticket ramo chart data:", error)
      }

      setLoading(false)
    }

    fetchData()
  }, [Id_Agente, Id_Promotoria]) 

  return (
    <ResponsiveContainer width="100%" height={300}>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" />
        </div>
      ) : (
        <PieChart>
          <Pie 
            data={chartData} 
            cx="50%" 
            cy="50%" 
            labelLine={false} 
            outerRadius={80} 
            fill="#8884d8" 
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </ResponsiveContainer>
  )
}
