import { Input, Button, Spinner } from "@heroui/react";

interface UserFormProps {
  usuario: string;
  isLoading: boolean;
  onUsuarioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUsuarioBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSendCode: () => void;
  error?: string;
}

export const UserForm = ({
  usuario,
  isLoading,
  onUsuarioChange,
  onUsuarioBlur,
  onSendCode,
  error
}: UserFormProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="mb-4 w-full flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <span className="block text-2xl text-blue-700 font-semibold mb-2 text-center">
            ¿Olvidaste tu contraseña?
          </span>
          <span className="block text-gray-500 text-sm text-center">
            Ingresa tu usuario para enviarte un código de recuperación
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md items-center justify-center">
        <Input
          label="Usuario"
          name="usuario"
          placeholder="Ingresa tu usuario"
          type="text"
          className="w-full sm:w-64 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-200"
          radius="lg"
          size="lg"
          variant="bordered"
          value={usuario}
          onChange={onUsuarioChange}
          onBlur={onUsuarioBlur}
        />
        <Button
          id='btnResend'
          type='button'
          onClick={onSendCode}
          color="secondary"
          size="lg"
          radius="lg"
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold px-6 py-2 shadow-md transition-all duration-200 h-[56px] w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? <Spinner size="sm" /> : "Enviar Código"}
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </div>
  );
}; 