"use client"
import { useState, } from "react";
import { Toaster, toast } from "sonner";
import { executeForCRUD } from "../services/frontBack";
import { useLocalStorage } from "./useLocalStorage";
import { useRouter } from "next/navigation";

interface UserData {
    Id_Usuario: number;
    Id_Agente: number;
    Clave_Agente: string;
    UsuarioAdd: string;
    UsuarioUMod: string;
    UsuarioDel: string;
    Id_Solicitante?: number;
    Nombre_Persona?: string;
    RutaFoto?: string;
  }
  
  interface CRUDResponse<T> {
    success: boolean;
    data: T[];
    errorMessage?: string;
  }
  
  interface LoginResponse {
    Guid: string;
    Token?: string;
  }


const useUser = () => {
    const { push } = useRouter();
    const [token, setToken] = useLocalStorage("token", '')
  
    const goToLogin = (error:any) => {
      toast.error(
          <div className="flex flex-col  w-full" >
          <div className="block w-full bg-red-200 p-2 font-bold">Error Validación </div>
          <div className="block w-full bg-red-100 p-2">Ocurrió un error al intentar validar al usuario.</div>
          <div className="block w-full bg-red-100 p-2">{error}</div>
          <div className="block w-full bg-red-100 p-2">Es necesario que ingreses nuevamente</div>
          </div>
      );
      setTimeout(() => {
          push("/login")
      }, 5000);
  }
  
    // const logIn = async (data: LoginData): Promise<CRUDResponse<LoginResponse>> => {
    //   const args = {
    //     className: "Usuario",
    //     action: "LogIn",
    //     LogIn: data.usuario,
    //     Password: data.password,
    //   };
    //   const rrToken = await executeForCRUD<LoginResponse>(args);
    //   if (rrToken.success) {
    //     setToken(rrToken.data[0].Guid);
    //   }
    //   return rrToken;
    // };
  
    // const logOut = async () => {
    //   setToken("");
    // };
  
    const  GetUser = async ()=> {
      console.log("GetUser")
      const args = {
          "className":"Usuario_Get",
          "action":"ByGuid",
          "Guid_Usuario":token,
      };
      const rrUsuario = await executeForCRUD(args)
      if(rrUsuario.success){
          const {
              Id_Usuario,
              Id_Agente,
              Clave_Agente,
              UsuarioAdd,
              UsuarioUMod,
              UsuarioDel,
              Id_Solicitante
          } = rrUsuario.data[0]
          return {
              Id_Usuario,
              Id_Agente,
              Clave_Agente,
              UsuarioAdd,
              UsuarioUMod,
              UsuarioDel,
              Id_Solicitante
          }
      }else{
          goToLogin(rrUsuario.errorMessage)

      }

  }
  
    // const getProfile = async (): Promise<UserData | undefined> => {
    //   const args = {
    //     className: "Usuario_Profile",
    //     action: "ByGuid",
    //     Guid_Usuario: token,
    //   };
    //   const rrUsuario = await executeForCRUD<UserData>(args);
    //   if (rrUsuario.success) {
    //     return rrUsuario.data[0];
    //   } else {
    //     goToLogin(rrUsuario.errorMessage || "Unknown error");
    //   }
    // };
  
    return { GetUser };
  };
  
  export default useUser;