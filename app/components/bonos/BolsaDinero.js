// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
// import useGetData from "@/app/hooks/useGetData"
const BolsaDinero = () => {
  
  // const [puedesGanar, setPuedeGanar] = useState([]);
  // const { data } = useGetData({
  //   ClassName: "Titan_Bonos_Resultados_Puede_Ganar",
  //   Action: "Get",
  // })

  // const [accumulatedAmount, setAccumulatedAmount] = useState(0);
  // const [fillPercentage, setFillPercentage] = useState(0);

  // useEffect(() => {
  //   setPuedeGanar(data[0]?.Puedes_Ganar)
  //   const interval = setInterval(() => {
  //     setAccumulatedAmount((prevAmount) => {
  //       const newAmount = prevAmount + 50000;
  //       if (newAmount >= puedesGanar) {
  //         setFillPercentage(100);
  //         setTimeout(() => {
  //           setAccumulatedAmount(0);
  //           setFillPercentage(0);
  //         }, 2000);
  //       } else {
  //         const newFillPercentage = (newAmount / puedesGanar) * 100;
  //         setFillPercentage(newFillPercentage);
  //       }
  //       return newAmount;
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };

  // }, [data]);

  return (
    <div className="flex flex-col items-center bg-white rounded-br-lg">
      {/* <div className="w-32 h-32 flex items-center justify-center" style={{ marginTop: "2rem" }}>
        <FontAwesomeIcon
          icon={faSackDollar}
          size="8x"
          style={{
            // color: `hsl(120, ${fillPercentage}%, ${50 + fillPercentage / 4}%)`
            color: `hsl(120, 100%,30%)`
          }}
        />
      </div>
      <h2 className="text-gray-800 text-2xl mt-4 font-semibold">Bolsa acumulada</h2>
      <h1 className="text-4xl font-bold">${puedesGanar?.toLocaleString()}</h1> */}
    </div>
  );
};

export default BolsaDinero;
