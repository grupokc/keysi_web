import useGetData from "@/app/hooks/useGetData";
import CustomCard from "./card";

export default function KCCoins() {
  const { data, loading: loadingKcCoins } = useGetData({
    ClassName: "KCC_Wallet_Saldo",
    Action: "Get",
  });

  const dataKcCoins = (data as { Saldo_En_KCC?: number }[]) || [];
  const saldoKCC = dataKcCoins?.[0]?.Saldo_En_KCC ?? 0;
  const dollarUSLocale = new Intl.NumberFormat("en-US");

  return (
    <CustomCard
      title="KC Coins"
      description="Tu saldo en KC Coins te permite acceder a productos exclusivos."
      backgroundImage="/img/kccoins.png"
      isLoading={loadingKcCoins}
      extraContent={
        <p className="mt-2 text-md text-white">
          Saldo: <strong>{dollarUSLocale.format(saldoKCC)}</strong>
        </p>
      }
      buttonText="Ir de Compras"
      buttonLink="https://self.grupokc.com.mx/kccoins"
      footerText="(Usuario y password son los mismos de TITAN) Fuente: Sistema Prometeo"
    />
  );
}
