import LoaderLayout from "@/app/components/layouts/LoaderLayout"
import useGetData from "@/app/hooks/useGetData"
import { useRouter } from "next/navigation"
import LoadData from "@/app/components/LoadData"
import { useState,useEffect } from 'react';
import { ChevronLeftIcon} from '@heroicons/react/solid'
import BonosRangos110 from "@/app/components/bonos/rangos/110"
import BonosRangos111 from "@/app/components/bonos/rangos/111"
import BonosRangos113 from "@/app/components/bonos/rangos/113"
import BonosRangos117 from "@/app/components/bonos/rangos/117"
import BonosRangos118 from "@/app/components/bonos/rangos/118"
import BonosRangos119 from "@/app/components/bonos/rangos/119"
import BonosRangos114 from "@/app/components/bonos/rangos/114"
import BonosRangos120 from "@/app/components/bonos/rangos/120"
import BonosRangos121 from "@/app/components/bonos/rangos/121"
import BonosRangos122 from "@/app/components/bonos/rangos/122"
import BonosRangos123 from "@/app/components/bonos/rangos/123"
import BonosRangos124 from "@/app/components/bonos/rangos/124"
import BonosRangos125 from "@/app/components/bonos/rangos/125"
import BonosRangos126 from "@/app/components/bonos/rangos/126"
import BonosRangos127 from "@/app/components/bonos/rangos/127"
import BonosRangos130 from "@/app/components/bonos/rangos/130"
import BonosRangos131 from "@/app/components/bonos/rangos/131"
import BonosRangos132 from "@/app/components/bonos/rangos/132"
import BonosRangos133 from "@/app/components/bonos/rangos/133"
import BonosRangos134 from "@/app/components/bonos/rangos/134"
import BonosRangos135 from "@/app/components/bonos/rangos/135"
import BonosRangos138 from "@/app/components/bonos/rangos/138"
import BonosRangos139 from "@/app/components/bonos/rangos/139" 
import BonosRangos143 from "@/app/components/bonos/rangos/143"
import BonosRangos144 from "@/app/components/bonos/rangos/144"
import BonosRangos145 from "@/app/components/bonos/rangos/145"
import BonosRangos146 from "@/app/components/bonos/rangos/146"
import BonosRangos147 from "@/app/components/bonos/rangos/147"
import BonosRangos148 from "@/app/components/bonos/rangos/148"
import BonosRangos149 from "@/app/components/bonos/rangos/149"
import BonosRangos150 from "@/app/components/bonos/rangos/150"
import BonosRangos151 from "@/app/components/bonos/rangos/151"
import BonosRangos153 from "@/app/components/bonos/rangos/153"
import BonosRangos154 from "@/app/components/bonos/rangos/154"
import BonosRangos155 from "@/app/components/bonos/rangos/155"
import BonosRangos156 from "@/app/components/bonos/rangos/156"
import BonosRangos157 from "@/app/components/bonos/rangos/157"
import BonosRangos158 from "@/app/components/bonos/rangos/158"
import BonosRangos159 from "@/app/components/bonos/rangos/159"
import BonosRangos160 from "@/app/components/bonos/rangos/160"
import BonosRangos161 from "@/app/components/bonos/rangos/161"
import BonosRangos162 from "@/app/components/bonos/rangos/162"
import BonosRangos163 from "@/app/components/bonos/rangos/163"
import BonosRangos164 from "@/app/components/bonos/rangos/164"
import BonosRangos165 from "@/app/components/bonos/rangos/165"
import BonosRangos166 from "@/app/components/bonos/rangos/166"
import BonosRangos167 from "@/app/components/bonos/rangos/167"
import BonosRangos168 from "@/app/components/bonos/rangos/168"
import BonosRangos169 from "@/app/components/bonos/rangos/169"
import BonosRangos170 from "@/app/components/bonos/rangos/170"
import BonosRangos171 from "@/app/components/bonos/rangos/171"
import BonosRangos172 from "@/app/components/bonos/rangos/172"
import BonosRangos173 from "@/app/components/bonos/rangos/173"
import BonosRangos175 from "@/app/components/bonos/rangos/175"
import BonosRangos176 from "@/app/components/bonos/rangos/176"
import BonosRangos177 from "@/app/components/bonos/rangos/177"
import BonosRangos178 from "@/app/components/bonos/rangos/178"
import BonosRangos207 from "@/app/components/bonos/rangos/207"
import BonosRangos208 from "@/app/components/bonos/rangos/208"
import BonosRangos216 from "@/app/components/bonos/rangos/216"
import BonosRangos217 from "@/app/components/bonos/rangos/217"
import BonosRangos220 from "@/app/components/bonos/rangos/220"
import BonosRangos221 from "@/app/components/bonos/rangos/221"
import BonosRangos222 from "@/app/components/bonos/rangos/222"
import BonosRangos223 from "@/app/components/bonos/rangos/223"
import BonosRangos224 from "@/app/components/bonos/rangos/224"
import BonosRangos225 from "@/app/components/bonos/rangos/225"
import BonosRangos226 from "@/app/components/bonos/rangos/226"
import BonosRangos227 from "@/app/components/bonos/rangos/227"
import BonosRangos228 from "@/app/components/bonos/rangos/228"
import BonosRangos277 from "@/app/components/bonos/rangos/277"
import BonosRangos251 from "@/app/components/bonos/rangos/251"
import Image from "next/image"
export default function Details() {
  const [lastUpdated, setLastUpdated] = useState(null)
  const { query ,back} = useRouter()
  const Bono_Periodo = query.id
  let dollarUSLocale = Intl.NumberFormat('en-US');
  const { data: dataRequisitos } = useGetData({
    ClassName: "Titan_Bonos_Requisito_X_Bono",
    Action: "Get",
    Bono_Periodo: query.id
  })
  const { data: dataBono } = useGetData({
    ClassName: "Helios_Bonos_Resultados",
    Action: "Get",
    Bono_Periodo: query.id
  })



  const getMetaLogroFalta = (row, MLF) => {
    let valor = dataBono[0][`${row.Columna}_${MLF}`];
    console.log(valor)
    if (row.Simbolo === "$") {
      valor = `${row.Simbolo} ${dollarUSLocale.format(valor)}`;
    } else {
      valor = `${valor} ${row.Simbolo}`;
    }
    return valor;
  };

  const getValorMetaLogroFalta = (row, MLF) => {
    return dataBono[0][`${row.Columna}_${MLF}`];
  };

  useEffect(() => {
    if (dataBono.length > 0) {
      setLastUpdated(new Date());
    }
  }, [dataBono]);

  // Función para formatear la fecha
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('es-MX', options);
  };
  // Calcular los días restantes hasta la fecha de cierre
  const calculateDaysRemaining = (fechaHasta) => {
    const today = new Date();
    const cierre = new Date(fechaHasta);
    const differenceInTime = cierre.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  return (
    <LoaderLayout >

      <div className=" pb-20 h-full w-full bg-fixed bg-cover  bg-[url('https://cdn.grupokc.com.mx/img/fondos/Fondo2.jpg')]">
        <div className="flex flex-row w-11/12  mb-5 ml-5">
          <div className="flex-1 mt-10"> 
            <button  className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
              onClick={()=>{back()}}>
              <ChevronLeftIcon  className="-ml-0.5 h-5 w-5" aria-hidden="true"/>
              Regresar 
            </button>
          </div>
        </div>
        {
          dataBono.length > 0 ?
            <div className="block ">
              <div className="flex flex-cols mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {
                  dataBono[0].Id_Cia == 9 ?
                    <div className="flex-1">
                      <Image
                        src="https://cdn.grupokc.com.mx/img/logos/GrupoKCLogo300.png"
                        width={200}
                        height={200}
                        alt="Grupo KC"
                      />
                    </div>
                    :
                    <div className="flex-1 pt-10">
                      <Image
                        src="https://cdn.grupokc.com.mx/img/logos/MetLife.png"
                        width={300}
                        height={75}
                        alt="Metlife"
                      /> </div>
                }


                <div className="flex-1">
                  <h1
                    className={`font-bold text-lg  mt-2 p-10 rounded-lg ${dataBono[0].Id_Ramo == 1 ? "bg-blue-500 text-white" : "bg-blue-500 text-white"} `}
                  >
                    {
                      dataRequisitos.length > 0 ?
                        <>
                          <div> {dataRequisitos[0].Nombre_Helios_Bono_Catalogo} </div>
                          <div> RAMO: {dataBono[0].Nombre_Ramo} </div>
                          <div> PERIODO: {dataBono[0].Fecha_Desde}  -  {dataBono[0].Fecha_Hasta}</div>
                          <div> FECHA DE ACTUALIZACIÓN: {lastUpdated ? formatDate(lastUpdated) : 'Cargando...'}</div>
                          <div> AUN TE FALTAN {dataBono[0].Dias_Restantes} DIAS PARA PARTICIPAR</div>
                        </>
                        : null
                    }
                  </h1>

                </div>
              </div>

              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mt-2 flex flex-col">
                  <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-300">
                        <tr>
                          <th> &nbsp;</th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Requisito</th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Meta</th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Logro</th>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Falta</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200blue-900">
                        {
                          dataRequisitos.length > 0 ?
                            dataRequisitos.map((row) =>
                              <tr className="bg-white" key={row.Id_Helios_Bonos_Requisito_X_Bono}>
                                <td className="bg-blue-500 w-2">&nbsp;</td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> {row.Nombre_Helios_Bono_Requisitos}</td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {getMetaLogroFalta(row, "M").includes("%")
                                    ? parseFloat(getMetaLogroFalta(row, "M")).toFixed(0) + "%"
                                    : isNaN(getMetaLogroFalta(row, "M"))
                                      ? getMetaLogroFalta(row, "M")
                                      : Math.floor(getMetaLogroFalta(row, "M"))}
                                </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{getMetaLogroFalta(row, "L")} </td>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">

                                  {
                                    getValorMetaLogroFalta(row, "F") <= 0 ?
                                      <Image
                                        src="https://cdn.grupokc.com.mx/img/unlock.png"
                                        width={35}
                                        height={35}
                                        alt="Requisito desbloqueado" />
                                      :
                                      <>
                                        {getMetaLogroFalta(row, "F")}
                                      </>
                                  }
                                </td>
                              </tr>
                            )
                            : null
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {dataBono[0].Id_Helios_Bono_Catalogo === 111 ? <BonosRangos111 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 110 ? <BonosRangos110 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 113 ? <BonosRangos113 Bono_Periodo={Bono_Periodo} /> : null}

              {dataBono[0].Id_Helios_Bono_Catalogo === 114 ? <BonosRangos114 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 117 ? <BonosRangos117 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 118 ? <BonosRangos118 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 119 ? <BonosRangos119 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 120 ? <BonosRangos120 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 121 ? <BonosRangos121 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 122 ? <BonosRangos122 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 123 ? <BonosRangos123 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 124 ? <BonosRangos124 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 125 ? <BonosRangos125 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 126 ? <BonosRangos126 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 127 ? <BonosRangos127 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 130 ? <BonosRangos130 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 131 ? <BonosRangos131 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 132 ? <BonosRangos132 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 133 ? <BonosRangos133 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 134 ? <BonosRangos134 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 135 ? <BonosRangos135 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 138 ? <BonosRangos138 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 139 ? <BonosRangos139 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 143 ? <BonosRangos143 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 144 ? <BonosRangos144 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 145 ? <BonosRangos145 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 146 ? <BonosRangos146 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 147 ? <BonosRangos147 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 148 ? <BonosRangos148 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 149 ? <BonosRangos149 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 150 ? <BonosRangos150 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 151 ? <BonosRangos151 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 153 ? <BonosRangos153 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 154 ? <BonosRangos154 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 155 ? <BonosRangos155 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 156 ? <BonosRangos156 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 157 ? <BonosRangos157 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 158 ? <BonosRangos158 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 159 ? <BonosRangos159 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 160 ? <BonosRangos160 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 161 ? <BonosRangos161 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 162 ? <BonosRangos162 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 163 ? <BonosRangos163 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 164 ? <BonosRangos164 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 165 ? <BonosRangos165 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 166 ? <BonosRangos166 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 167 ? <BonosRangos167 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 168 ? <BonosRangos168 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 169 ? <BonosRangos169 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 170 ? <BonosRangos170 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 171 ? <BonosRangos171 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 172 ? <BonosRangos172 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 173 ? <BonosRangos173 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 175 ? <BonosRangos175 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 176 ? <BonosRangos176 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 178 ? <BonosRangos178 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 177 ? <BonosRangos177 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 207 ? <BonosRangos207 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 208 ? <BonosRangos208 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 216 ? <BonosRangos216 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 217 ? <BonosRangos217 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 220 ? <BonosRangos220 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 221 ? <BonosRangos221 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 222 ? <BonosRangos222 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 223 ? <BonosRangos223 Bono_Periodo={Bono_Periodo} /> : null}   
              {dataBono[0].Id_Helios_Bono_Catalogo === 224 ? <BonosRangos224 Bono_Periodo={Bono_Periodo} /> : null}
              {dataBono[0].Id_Helios_Bono_Catalogo === 225 ? <BonosRangos225 Bono_Periodo={Bono_Periodo} /> : null} 
              {dataBono[0].Id_Helios_Bono_Catalogo === 226 ? <BonosRangos226 Bono_Periodo={Bono_Periodo} /> : null} 
              {dataBono[0].Id_Helios_Bono_Catalogo === 227 ? <BonosRangos227 Bono_Periodo={Bono_Periodo} /> : null} 
              {dataBono[0].Id_Helios_Bono_Catalogo === 228 ? <BonosRangos228 Bono_Periodo={Bono_Periodo} /> : null}  
              {dataBono[0].Id_Helios_Bono_Catalogo === 277 ? <BonosRangos277 Bono_Periodo={Bono_Periodo} /> : null}      
              {dataBono[0].Id_Helios_Bono_Catalogo === 251 ? <BonosRangos251 Bono_Periodo={Bono_Periodo} /> : null}              
              <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
                <div className="bg-yellow-200 p-3 min-w-full mt-3 align-middle shadow sm:rounded-lg">
                  <div className="font-bold"> IMPORTANTE:</div>
                  Si no se han desbloqueado todos los requisitos, no se podrá ganar el bono.
                </div>
              </div>

            </div>
            : <LoadData />
        }

      </div>

    </LoaderLayout>
  )
}
