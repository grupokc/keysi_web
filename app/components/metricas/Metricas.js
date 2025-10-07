import Loading from "@/app/components/Loading";
import useList from "@/app/hooks/useList";
import useGetData from "@/app/hooks/useGetData";
import Link from "next/link";
import Image from "next/image";

export default function Metricas() {
  let dollarUSLocale = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: dataResponseIndicadores, loading } = useGetData({
    ClassName: "Indicadores_IP",
    Action: "Get",
  });

  const { data: dataDetalleIndicadoresVida } = useGetData({
    ClassName: "Indicadores_Vida_IP_Detalle",
    Action: "Get",
  });

  const { data: dataDetalleIndicadoresGm } = useGetData({
    ClassName: "Indicadores_Gm_IP_Detalle",
    Action: "Get",
  });

  return (
    <div className="static w-screen mx-auto overflow-x-auto">
      <h2 className="sticky">Vida</h2>
      <div className="grid grid-cols-7 gap-1 m-5 w-[1000px] bg-gray-50 text-xs">
        <div className="bg-blue-600 text-blue-50 p-2">Periodo</div>
        <div className="bg-blue-600 text-blue-50 p-2">PCA 1er Año Vida</div>
        <div className="bg-blue-600 text-blue-50 p-2">PCA 1er Año Meta</div>
        <div className="bg-blue-600 text-blue-50 p-2">PCA Conservación</div>
        <div className="bg-blue-600 text-blue-50 p-2">PCA Total 1er ño</div>
        <div className="bg-blue-600 text-blue-50 p-2">PNA Vida</div>
        <div className="bg-blue-600 text-blue-50 p-2">PNA Meta</div>

        {dataDetalleIndicadoresVida.map((item, index) => {
          return (
            <>
              <div className="bg-blue-50 p-2">{item.Nombre_Mes} - {item.Anio}</div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PCA_1er_Anio_Vida_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PCA_1er_Anio_Meta_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PCA_Conservacion_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_Total_PCA_1er_Anio_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PNA_Vida_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PNA_Meta_CY)}
              </div>
            </>
          );
        })}
      </div>

      <h2 className="sticky">Gastos Médicos</h2>
      <div className="grid grid-cols-5 gap-1 m-5 w-[1000px] bg-gray-50 text-xs">
        <div className="font-bold bg-blue-600 text-blue-50 p-2">Periodo</div>
        <div className="font-bold bg-blue-600 text-blue-50 p-2">Siniestralidad</div>
        <div className="font-bold bg-blue-600 text-blue-50 p-2">PNA</div>
        <div className="font-bold bg-blue-600 text-blue-50 p-2">P Ponderada 1er Año</div>
        <div className="font-bold bg-blue-600 text-blue-50 p-2">PP Renovación</div>

        {dataDetalleIndicadoresGm.map((item, index) => {
          return (
            <>
              <div className="bg-blue-50 p-2">{item.Nombre_Mes} - {item.Anio}</div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_Porcentaje_Siniestralidad_CY)} %
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PNA_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_P_Ponderada_1er_Año_CY)}
              </div>
              <div className="bg-blue-50 p-2 text-right">
                {dollarUSLocale.format(item.Acumulado_PP_Renovacion_CY)}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
