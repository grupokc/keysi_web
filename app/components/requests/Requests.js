"use client"
import ListLayout from "@/app/components/layouts/ListLayout";
import MainLayout from "@/app/components/layouts/MainLayout";
import Tabs from "@/app/components/tabs";

import useGetData from "@/app/hooks/useGetData";
import { useState } from "react";
import RequestItem from "./RequestItem";

const VIDA = 1;

export default function Requests() {
  const [insurance, setInsurance] = useState(VIDA);
  const { data, loading, refetch } = useGetData({
    action: "tramites_por_ramo",
    Id_Ramo: insurance
  });

  return (
    <MainLayout>
      <div className="w-full px-4 py-2">
        <h2 className="text-xl text-center mb-3 font-medium">Servicios</h2>
        <Tabs
          handleChange={(value) => {
            setInsurance(value);
            refetch({ Id_Ramo: value });
          }}
        />
      </div>
      <ListLayout loading={loading}>
        {data.map((item) => (
          <RequestItem {...item} key={item.Id_Tramite_Tipo} />
        ))}
      </ListLayout>
    </MainLayout>
  );
}
