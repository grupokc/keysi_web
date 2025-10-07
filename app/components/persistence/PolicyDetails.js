import { mapResponseApi } from "@/app/utils/mapResponseApi"

export default function PolicyDetails({ policy }) {
  const fields = mapResponseApi(policy)
  let polizaNumero = ''
  const polizasElements = fields.filter(e =>{
    return e.key === 'Poliza'
  })
  if(polizasElements.length> 0)
  {
     polizaNumero =  polizasElements[0].value
  }
  return (
      <div >
        <table className="bg-white text-gray-900 border-collapse w-full shadow-lg ">
          <tbody>
            {fields.map((item) => (
                <tr className=" text-blue-900 border-dotted border-2 border-blue-100 " key={item.key}>
                  <td className="bg-blue-100 p-2 w-1/2 ">{item.label}</td>
                  <td className="p-2 w-1/2">{item.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
  )
}
