import { Button, Input, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useState } from "react";

interface PasswordFormProps {
  values: {
    codigo: string;
    password: string;
    confirmacion_password: string;
  };
  errors: {
    codigo?: string;
    password?: string;
    confirmacion_password?: string;
  };
  touched: {
    codigo?: boolean;
    password?: boolean;
    confirmacion_password?: boolean;
  };
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export const PasswordForm = ({
  values,
  errors,
  touched,
  isLoading,
  onChange,
  onBlur,
  onSubmit
}: PasswordFormProps) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <Input
        label="Código de recuperación"
        name="codigo"
        placeholder="Ingresa el código"
        type="text"
        fullWidth
        radius="lg"
        size="md"
        variant="flat"
        value={values.codigo}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={touched.codigo && errors.codigo ? true : false}
        errorMessage={touched.codigo && errors.codigo ? errors.codigo : ""}
      />
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4 rounded-r">
        <p className="text-sm text-blue-700 font-medium mb-1">Requisitos de la contraseña:</p>
        <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
          <li>Al menos una letra mayúscula</li>
          <li>Al menos una letra minúscula</li>
          <li>Al menos un número</li>
          <li>Al menos un carácter especial (!@#$*())</li>
          <li>Mínimo 9 caracteres</li>
        </ul>
      </div>
      <Input
        label="Nueva contraseña"
        name="password"
        placeholder="Ingresa nueva contraseña"
        type={isPasswordVisible ? "text" : "password"}
        fullWidth
        radius="lg"
        size="md"
        variant="flat"
        value={values.password}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={touched.password && errors.password ? true : false}
        errorMessage={touched.password && errors.password ? errors.password : ""}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <EyeOffIcon className="h-8 w-8 text-gray-400" />
            ) : (
              <EyeIcon className="h-8 w-8 text-gray-400" />
            )}
          </button>
        }
      />
      <Input
        label="Confirmar contraseña"
        name="confirmacion_password"
        placeholder="Confirma tu contraseña"
        type={isConfirmPasswordVisible ? "text" : "password"}
        fullWidth
        radius="lg"
        size="md"
        variant="flat"
        value={values.confirmacion_password}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={touched.confirmacion_password && errors.confirmacion_password ? true : false}
        errorMessage={touched.confirmacion_password && errors.confirmacion_password ? errors.confirmacion_password : ""}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            {isConfirmPasswordVisible ? (
              <EyeOffIcon className="h-8 w-8 text-gray-400" />
            ) : (
              <EyeIcon className="h-8 w-8 text-gray-400" />
            )}
          </button>
        }
      />
      <div className="flex justify-end mt-6 space-x-4">
        <Button
          type="button"
          color="danger"
          size="lg"
          radius="lg"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 transition"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          color="primary"
          size="lg"
          radius="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 transition"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Restablecer contraseña"}
        </Button>
      </div>
    </form>
  );
}; 