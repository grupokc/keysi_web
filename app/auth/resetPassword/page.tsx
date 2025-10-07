"use client";

import { useState } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Card, CardBody } from "@heroui/react";
import { UserForm } from './components/UserForm';
import { PasswordForm } from './components/PasswordForm';
import { ResetPasswordService } from '@/app/services/resetPasswordService';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
  const [userError, setUserError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(1);

  const validationSchema = Yup.object({
    usuario: Yup.string().required('El usuario es requerido'),
    codigo: Yup.string().required('El código es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    confirmacion_password: Yup.string()
      .required('La confirmación de contraseña es requerida')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
  });

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      usuario: '',
      password: '',
      confirmacion_password: '',
      codigo: '',
    },
    validationSchema,
    onSubmit: async (data) => {
      setIsLoading(true);

      try {
        const response = await ResetPasswordService.changePassword(data);
        if (response.success) {
          toast.success('Contraseña actualizada correctamente');
          setTimeout(() => {
            router.back();
          }, 2000);
        } else {
          console.error('❌ Error en el cambio de contraseña:', response.errorMessage);
          toast.error(response.errorMessage || 'Error al cambiar la contraseña');
        }
      } catch (error: any) {
        console.error('❌ Error inesperado:', error);
        toast.error(error.message || 'Error inesperado al cambiar la contraseña');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSendResetCode = async () => {
    if (!values.usuario) {
      toast.error("Por favor ingrese su usuario");
      return;
    }
    setIsLoading(true);
    setUserError("");
    try {
      const response = await ResetPasswordService.sendResetCode(values.usuario);
      if (!response.success) {
        console.error('❌ Error al enviar código:', response.errorMessage);
        toast.error(response.errorMessage || "Error al enviar el código de recuperación");
      } else {
        toast.success("Código de recuperación enviado correctamente");
        setStep(2);
      }
    } catch (error) {
      console.error('❌ Error inesperado al enviar código:', error);
      toast.error("Error inesperado al enviar el código");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="mb-2">
        <Image 
          width={150} 
          height={150} 
          src={'/img/logos/GrupoKCLogo300.png'} 
          alt={'Titan'}
          className="max-w-[180px] sm:max-w-[220px] mx-auto"
        />
      </div>
      <Card className="w-full max-w-2xl p-4 shadow-xl border border-gray-200 rounded-lg bg-white">
        <CardBody>
          {step === 1 ? (
            <UserForm
              usuario={values.usuario}
              isLoading={isLoading}
              onUsuarioChange={handleChange}
              onUsuarioBlur={handleBlur}
              onSendCode={handleSendResetCode}
              error={userError}
            />
          ) : (
            <PasswordForm
              values={values}
              errors={errors}
              touched={touched}
              isLoading={isLoading}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
            />
          )}


        </CardBody>
      </Card>
      <p className="mt-4 text-gray-400 text-xs">
          SSO version 1.0.1</p>
    </div>
  );
};

export default ResetPasswordPage; 