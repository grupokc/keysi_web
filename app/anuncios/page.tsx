"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { getCookie, deleteCookie } from "cookies-next";
import { getUserHome } from "@/app/utils/getUserHome";

const AnunciosPage: React.FC = () => {
  const router = useRouter();
  const [correo, setCorreo] = useState("correo@ejemplo.com");

  useEffect(() => {
    const cookieCorreo = getCookie("anuncio_correo") as string | undefined;
    if (cookieCorreo) {
      setCorreo(cookieCorreo);
      deleteCookie("anuncio_correo");
    }
  }, []);

  const handleActualizar = () => {
    window.location.href = "https://sso.gokc.net/reset-password";
  };

  const handleSeguir = () => {
    if (typeof window !== "undefined") {
      const userStr = window.localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const home = getUserHome(user);
        router.push(home);
        return;
      }
    }
    router.push("/inbox/agentes"); // fallback
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white rounded-xl shadow border border-gray-300">
      <div className="flex items-center justify-center mb-4">
        <FaLock className="text-2xl text-yellow-500 mr-2" />
        <h1 className="text-2xl font-semibold text-center">Actualiza tu contraseña para proteger tu información</h1>
      </div>
      <p className="text-center mb-4">
        Para mantener la seguridad de tus datos y garantizar el acceso seguro a tu cuenta, es necesario que actualices tu contraseña.
      </p>
      <p className="text-center mb-4">
        El sistema enviará un código de verificación al siguiente correo registrado:<br />
        <span className="font-semibold">[{correo}]</span>
      </p>
      <p className="text-center mb-4">
        Si este correo no es correcto o ya no tienes acceso, por favor contacta a nuestro Contact Center vía WhatsApp para solicitar el cambio de correo y continuar con el proceso de verificación.
        <br />
        <a 
          href="https://wa.me/5215564874957" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Contactar por WhatsApp
        </a>
        <br />
        <span className="text-sm text-gray-600">Horario de atención: 8:00 AM - 5:00 PM</span>
      </p>
      <p className="text-center mb-4">
        Este paso es fundamental para proteger tu información personal y asegurar que solo tú puedas acceder a tu cuenta.
      </p>
      <div className="text-center text-yellow-600 font-medium mb-6">
        👉 Tu seguridad es nuestra prioridad.
      </div>
      <div className="flex justify-center gap-4">
        <button
          className="px-6 py-2 border border-gray-400 rounded hover:bg-gray-100"
          onClick={handleSeguir}
        >
          Seguir Desprotegido
        </button>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleActualizar}
        >
          Actualizar Ahora
        </button>
      </div>
    </div>
  );
};

export default AnunciosPage; 