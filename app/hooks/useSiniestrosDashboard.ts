"use client";

import { useEffect, useState, useRef } from "react";
import { executeForCRUD } from "@/app/services/frontBack";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { UserPhoneService } from "../services/userPhoneService";

export function useSiniestrosDashboard() {
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalTickets: 0,
    ticketsNuevos: 0,
    ticketsAbiertos: 0,
    ticketsCerrados: 0,
  });
  const [selectedTab, setSelectedTab] = useState("details");
  const [user, setUser] = useLocalStorage("user", null);
  const [isMounted, setIsMounted] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("700px");
  const [isAllowed, setIsAllowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasRejectedNotifications, setHasRejectedNotifications] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // 🔹 Determinar qué filtro usar (Id_Agente o Id_Promotoria)
  const getFilterParams = () => {
    if (!user) return {};
    if (user?.Id_Tipo === 2 && user?.Id_Categoria === 10) {
      return { Id_Promotoria: user.Id_Promotoria };
    }
    if (user?.Id_Tipo === 1) {
      return {};
    }
    return { Id_Agente: user.Id_Agente };
  };

  // 🔹 Obtener datos del Dashboard
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await executeForCRUD({
          ClassName: "Tickets_Mesa_Siniestros",
          Action: "Get",
          ...getFilterParams(),
        });

        if (response.success && response.data.length > 0) {
          const data = response.data[0];
          setDashboardData({
            totalTickets: data.Total_Tickets || 0,
            ticketsNuevos: data.Tickets_Nuevos || 0,
            ticketsAbiertos: data.Tickets_Abiertos || 0,
            ticketsCerrados: data.Tickets_Cerrados || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  // 🔹 Verificar acceso y rechazo de notificaciones
  const checkAccessAndRejection = async () => {
    if (!user?.Guid_Agente) return;

    try {
      const accessResponse = await executeForCRUD({
        ClassName: "Acceso_Tickets_Mesa",
        Action: "Check",
        Guid_Agente: user.Guid_Agente,
      });

      const hasAccess = accessResponse?.data?.[0]?.Success === 1;
      setIsAllowed(hasAccess);
      setInitialLoading(false);

      const rejectionResponse = await executeForCRUD({
        ClassName: "Titan_Rechaza_Notificaciones_WA_Logs",
        Action: "Get",
        Id_Usuario: user.Id_Usuario,
        Id_Agente: user.Id_Agente,
      });

      const hasRejected = rejectionResponse?.data?.length > 0;
      setHasRejectedNotifications(hasRejected);

      const shouldShowModal = await UserPhoneService.shouldShowModal(user?.Id_Usuario);

      if (hasAccess && !hasRejected && shouldShowModal) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error al verificar acceso y rechazo de notificaciones:", error);
      setIsAllowed(false);
      setInitialLoading(false);
    }
  };

  // 🔹 Manejo de la altura del iframe
  useEffect(() => {
    setIsMounted(true);
    const calculateHeight = () => {
      const availableHeight = window.innerHeight;
      setIframeHeight(`${availableHeight - 80}px`);
    };

    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  useEffect(() => {
    if (user?.Guid_Agente) {
      checkAccessAndRejection();
    }
  }, [user?.Guid_Agente]);

  return {
    loading,
    initialLoading,
    dashboardData,
    selectedTab,
    setSelectedTab,
    user,
    isMounted,
    iframeHeight,
    isAllowed,
    isModalOpen,
    setIsModalOpen,
    hasRejectedNotifications,
    iframeRef,
    getFilterParams,
  };
} 