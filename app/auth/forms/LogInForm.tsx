"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { LogInValues } from "@/app/utils/schemas/LogInSchema";
import { LogInValidations } from "@/app/utils/validations/LogInForm";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { executeForCRUD } from "@/app/services/frontBack";
import { logInAuth } from "@/app/services/auth";
import { setCookie } from "cookies-next";
import { getUserHome } from "@/app/utils/getUserHome";
import { useComunicadosContext } from "@/app/context/ComunicadosContext";
import { useSystemType} from '@/app/hooks/useSystemType';

export function useLogIn() {
  const [userKC, setUserKC] = useLocalStorage("userKC", {});
  const { push } = useRouter();
  const [user, setUser] = useLocalStorage("user", {});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { forceAutoShowAfterLogin } = useComunicadosContext();
   const systemType = useSystemType();

  const formik = useFormik({
    initialValues: LogInValues,
    validationSchema: LogInValidations,
    enableReinitialize: true,
    validateOnBlur: true,
    onSubmit: (data) => {
      logIn(data);
    },
  });

  const getImageUrl = (user: any) => {
    let url = "https://pegasus.grupokc.com.mx/img/iconUsuario.png";
    if (user?.RutaFoto && user?.RutaFoto !== "null") {
      const foto = user.RutaFoto.replace(/\\/g, "/");
      url = `https://pegasus.grupokc.com.mx/${foto}`;
    }
    return url;
  };

  const logIn = async (args: any) => {
    try {
      setIsLoading(true);
      setError("");

      const respLogin = await executeForCRUD({
        ClassName: "Usuario",
        Action: "logIn",
        LogIn: args.usuario,
        Password: args.password,
      });

      if (!respLogin.success) {
        setError(respLogin.errorMessage);
        return;
      }

      const respToken = await executeForCRUD({
        ClassName: "Usuario_Get",
        Action: "ByToken",
        Token: respLogin.data[0].Token,
      });

      if (!respToken.success) {
        setError(respToken.errorMessage);
        return;
      }


      const dataUsuario = respToken.data[0];

      if(dataUsuario.Id_Agente_Tipo === 1 && systemType.toLowerCase() == 'titan'){
        setError("Error: Titán no permite iniciar sesión ya que es para agentes  IP. Por favor, inicia sesión en Self-Service o inicia con tu usuario de Titán");
        return;
      }

      const userObj = { ...dataUsuario, RutaFoto: getImageUrl(dataUsuario) };

      setUser(userObj);
      window.localStorage.setItem("promotor", JSON.stringify(userObj));
      window.localStorage.setItem("person", JSON.stringify(userObj));

      setCookie("user_data", JSON.stringify(userObj), {
        maxAge: 60 * 60 * 24,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      await logInAuth(dataUsuario.Guid);

      if (dataUsuario.Id_Tipo === 1) {
        setUserKC(userObj);
      } else {
        setUserKC({});
      }

      const userHome = getUserHome(dataUsuario);
      if (respLogin.data[0].Password_Vencido === 1) {
        setCookie("anuncio_correo", respLogin.data[0].Correo_Recuperacion, {
          maxAge: 60 * 5, // 5 minutos
          path: "/"
        });
        push("/anuncios");
      } else {
        console.log(userHome)
        setTimeout(() => {
          push(userHome);
        }, 500);
      }
    } catch (error: any) {
      console.error("Error en logIn()", error);
      setError(error?.message || "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  
  

  return {
    formik,
    error,
    isLoading,
  };
}
