"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { executeForCRUD } from "../services/frontBack";
import { setCookie, getCookie } from "cookies-next";

export const UserKCContext = createContext({
  userKC: {},
  setUserKC: () => { },
  logInAsAgent: () => { },
  userError: ''
});


export function UserKCContextProvider({ children }) {
  const [userKC, setUserKC] = useLocalStorage("userKC", {});
  const { errorRequest, request } = useFetch();
  const [user, setUser] = useLocalStorage("user", {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const getImageUrl = (user) => {
    let url = "https://pegasus.grupokc.com.mx/img/iconUsuario.png";
    
    if (user?.RutaFoto && user?.RutaFoto !== "null") {
      let foto = user.RutaFoto.replace(/\\/g, "/"); // Convertir \ a /
      
      // ⚠️ Validar si ya contiene el dominio
      if (!foto.startsWith("http")) {
        foto = `https://pegasus.grupokc.com.mx/${foto}`;
      }
  
      url = foto;
    }
  
    return url;
  };
  
  

  // 🔹 Nuevo useEffect para escuchar cambios en la cookie
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUserData = getCookie("user_data");
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
  
        // ⚠️ Verificar si `RutaFoto` ya es una URL completa
        if (!parsedUserData.RutaFoto.startsWith("http")) {
          parsedUserData.RutaFoto = getImageUrl(parsedUserData);
        }
  
        if (JSON.stringify(parsedUserData) !== JSON.stringify(user)) {
          setUser(parsedUserData);
        }
      }
    }, 1000); // Revisamos cada segundo
  
    return () => clearInterval(interval);
  }, [user]);
  
  

  const logInAsAgent = async (idAgente) => {
    // ⛔ Verificamos si el usuario actual es tipo 1
    if (user.Id_Tipo !== 1) {
      setError("No tienes permiso para hacer impersonation.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const respGetLogin = await executeForCRUD({
        ClassName: "Usuarios",
        Action: "Get",
        Id_Agente: idAgente,
      });

      if (!respGetLogin.success || !respGetLogin.data?.length) {
        setError("No se encontró el usuario para este Id_Agente");
        setIsLoading(false);
        return;
      }

      const agentUser = respGetLogin.data[0];
      const loginValue = agentUser.Login;

      const rr = await executeForCRUD({
        ClassName: "Usuario",
        Action: "logIn",
        LogIn: loginValue,
        Password: "FH.6AK*Lw",
      });

      if (!rr.success) {
        setError(rr.errorMessage || "Error al hacer login como agente");
        setIsLoading(false);
        return;
      }

      const dataUsuarioLogIn = rr.data[0];

      const rrToken = await executeForCRUD({
        ClassName: "Usuario_Get",
        Action: "ByToken",
        Token: dataUsuarioLogIn.Token,
      });

      if (!rrToken.success) {
        setError(rrToken.errorMessage || "Error al obtener datos de usuario");
        setIsLoading(false);
        return;
      }

      const dataUsuario = rrToken.data[0];

      if (!getCookie("original_user_data")) {
        setCookie("original_user_data", JSON.stringify(user), { path: "/" });
      }

      setCookie("impersonation_mode", "true", { path: "/" });
      setCookie("user_data", JSON.stringify(dataUsuario), { path: "/", sameSite: 'lax', secure: true });

      setUser({
        ...dataUsuario,
        RutaFoto: getImageUrl(dataUsuario),
      });

      window.localStorage.setItem("promotor", JSON.stringify(dataUsuario));
      window.localStorage.setItem("person", JSON.stringify(dataUsuario));

      push(dataUsuario.Id_Categoria === 10 ? "/inbox/promotores" : "/inbox/agentes");

    } catch (error) {
      console.error(error);
      setError("Error inesperado al intentar loguear como agente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserKCContext.Provider value={{ userKC, setUserKC, logInAsAgent, userError: errorRequest }}>
      {children}
    </UserKCContext.Provider>
  );
}
