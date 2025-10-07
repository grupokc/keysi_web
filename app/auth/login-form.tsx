"use client";
import { useLogIn } from "./forms/LogInForm";
import Image from "next/image";
import { Form, Input, Button, Card, CardHeader, CardBody, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useSystemType } from "@/app/hooks/useSystemType";
import { useState } from "react";
import ResetPasswordPage from "./resetPassword/page";
import { useAppVersionStore, type AppVersionState } from "@/app/store/appVersionStore";

export default function Login() {
  const { formik, error, isLoading } = useLogIn();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = formik;
  const router = useRouter();
  const systemType = useSystemType();
  const appVersion = useAppVersionStore((state: AppVersionState) => state.version);

  const [showResetForm, setShowResetForm] = useState(false);
  const [resetUser, setResetUser] = useState("");

  const logoPath = systemType === 'ss' 
    ? (process.env.NEXT_PUBLIC_SS_LOGO || '/img/logos/GrupoKCLogo300.png')
    : (process.env.NEXT_PUBLIC_TITAN_LOGO || '/img/logos/titan-logo.png');

  const handleShowReset = () => {
    //router.push('/auth/resetPassword');
    window.location.href = "https://sso.gokc.net/reset-password";
  };

  if (showResetForm) {
    return <ResetPasswordPage />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      {/* Logo */}
      <div className="mb-2">
        <Image 
          width={150} 
          height={150} 
          src={logoPath} 
          alt={systemType === 'ss' ? 'SS' : 'Titan'}
          className="max-w-[180px] sm:max-w-[220px] mx-auto"
        />
      </div>

      {/* Formulario */}
      <Card className="w-full max-w-xl p-4 shadow-xl border border-gray-200 rounded-lg bg-white">
        <CardHeader>
          <h2 className="text-center text-xl font-bold text-gray-900">Iniciar sesión</h2>
        </CardHeader>

        <CardBody>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Usuario"
              name="usuario"
              placeholder="Ingresa tu usuario"
              type="text"
              fullWidth
              radius="lg"
              size="md"
              variant="flat"
              value={values.usuario}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.usuario && errors.usuario ? true : false}
              errorMessage={touched.usuario && errors.usuario ? errors.usuario : ""}
            />
            <Input
              label="Contraseña"
              name="password"
              placeholder="Ingresa tu contraseña"
              type="password"
              fullWidth
              radius="lg"
              size="md"
              variant="flat"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && errors.password ? true : false}
              errorMessage={touched.password && errors.password ? errors.password : ""}
            />

            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              color="primary"
              size="lg"
              radius="lg"
              fullWidth
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Iniciar sesión"}
            </Button>
          </Form>

          <p className="text-center text-sm text-gray-500 mt-2">
            ¿Olvidaste tu contraseña?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={handleShowReset}
            >
              Restablecer aquí
            </span>
          </p>
        </CardBody>
      </Card>

      {/* Versión del sistema */}
      <p className="mt-4 text-gray-400 text-xs">Versión {appVersion}</p>
    </div>
  );
}
