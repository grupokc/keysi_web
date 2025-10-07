import LoaderLayout from "@/app/components/layouts/LoaderLayout"
import useGetData from "@/app/hooks/useGetData"
import { useRouter } from "next/navigation"

export default function Details() {
  const { query } = useRouter()
  const { data, loading } = useGetData({
    ClassName: "Crm_Prospectos_App",
    Action: "Get",
    Id_Crm_Id_Prospecto: query.id
  })

  return (
    <LoaderLayout loading={loading}>
      {data.length > 1
        ? null
        : data.map((prospect) => (
            <div
              key={prospect.Id_Crm_Id_Prospecto}
              className='grid grid-cols-2 gap-y-2 gap-x-2 text-center'
            >
              <p className='font-bold col-span-2'>{prospect.Nombre}</p>
              <p className='font-medium'>
                Cartera: <span className='font-normal'>{prospect.Cartera}</span>
              </p>
              <p className='font-medium'>
                Contactado:
                <span className='font-normal'>{prospect.Contactado}</span>
              </p>
              <p className='font-medium'>
                Cartera:
                <span className='font-normal'>
                  {prospect.Nombre_Prospecto_Origen}
                </span>
              </p>
              <p className='font-medium'>
                RFC: <span className='font-normal'>{prospect.RFC}</span>
              </p>
            </div>
          ))}
    </LoaderLayout>
  )
}
