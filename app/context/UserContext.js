"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { executeForCRUD } from "../services/frontBack";
import { logInAuth } from "../services/auth";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { errorRequest, request } = useFetch();
  const [user, setUser] = useLocalStorage("user", {});
  const [dataCodigoRecuperacion, setDataCodigoRecuperacion] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const getImageUrl = (user) => {
    let url = 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
    if (user?.RutaFoto && user?.RutaFoto !== 'null') {
      const foto = user.RutaFoto.replace(/\\/g, "/");
      url = `https://pegasus.grupokc.com.mx/${foto}`;
    }
    return url;
  };

  const logIn = async (args) => {
    request({
      ...args,
      cb: (res) => {
        const passwordVencido = parseInt(res[0].Password_Vencido);
        request({
          body: { token: res[0].Token },
          action: "usuario",
          cb: (res) => {
            setUser({
              ...res[0],
              RutaFoto: getImageUrl(res[0]),
            });
            window.localStorage.setItem('promotor', JSON.stringify(res[0]));
            window.localStorage.setItem('person', JSON.stringify(res[0]));

            const url = res[0].Id_Categoria === 10 ? "/inbox/promotores" : "/inbox/agentes";
            push(passwordVencido === 0 ? url : "/cambiar-contrasena");
          },
        });
      },
    });
  };

  const cambiarAgente = async (args) => {
    request({
      ...args,
      cb: (res) => {
        request({
          body: { token: res[0].Token },
          action: "usuario",
          cb: (res) => {
            setUser({
              ...res[0],
              RutaFoto: getImageUrl(res[0]),
            });
          },
        });
      },
    });
  };

  const changePassword = async (args) => {
    const body = {
      ClassName: "Password",
      Action: "Update",
      uGuid: user.Guid,
      Usuario: args.usuario,
      PasswordNuevo: args.password,
      PasswordConfirmacion: args.confirmacion_password,
      CodigoRecuperacion: args.codigo,
      Guid_Agente: user.Guid_Agente,
      Clave_Pegasus: user.Login,
    };
    console.log("Request body for changePassword:", body);
    request({
      body,
      action: "Exe4CRUD",
      cb: (res) => {
        console.log("Response from changePassword:", res);
        if (res[0].CodigoRecuperacion === args.codigo) {
          push("/auth");
        }
      },
    });
  };

  const sendResetCode = async (login) => {
    const body = {
      ClassName: "Usuarios_Codigo_Recuperacion",
      Action: "Enviar",
      Login: login,
    };
    request({
      body,
      action: "Exe4CRUD",
      cb: (res) => {
        setDataCodigoRecuperacion(res[0]);
      },
    });
  };

  // Función para actualizar el avatar del usuario
  const updateUserAvatar = (newAvatarUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      Url_Avatar: newAvatarUrl,
      // No tocar RutaFoto, solo actualizar Url_Avatar
    }));
    
    // Actualizar también en localStorage para mantener consistencia
    const updatedUser = {
      ...user,
      Url_Avatar: newAvatarUrl,
      // No tocar RutaFoto
    };
    window.localStorage.setItem('promotor', JSON.stringify(updatedUser));
    window.localStorage.setItem('person', JSON.stringify(updatedUser));
  };

  const logOut = () => {
    push("/");
    setUser({ foto: "" });
    window.localStorage.setItem('promotor', JSON.stringify({ foto: "" }));
    window.localStorage.setItem('person', JSON.stringify({ foto: "" }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        dataCodigoRecuperacion,
        logIn,
        changePassword,
        sendResetCode,
        logOut,
        cambiarAgente,
        updateUserAvatar,
        userError: errorRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
