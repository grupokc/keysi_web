import { executeForCRUD } from '@/app/services/frontBack';

export interface ResetPasswordRequest {
  usuario: string;
  password: string;
  confirmacion_password: string;
  codigo: string;
}

export class ResetPasswordService {
  static async sendResetCode(login: string) {
    const response = await executeForCRUD({
      ClassName: "Usuarios_Codigo_Recuperacion",
      Action: "Enviar",
      Login: login,
    });
    return response;
  }

  static async changePassword(data: ResetPasswordRequest) {
    
    const response = await executeForCRUD({
      ClassName: 'Password',
      Action: 'Update',
      Usuario: data.usuario,
      PasswordNuevo: data.password,
      PasswordConfirmacion: data.confirmacion_password,
      CodigoRecuperacion: data.codigo,
    });
    
    return response;
  }
} 