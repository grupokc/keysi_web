import { NextResponse } from 'next/server';
import { executeForCRUD } from '@/app/services/frontBack';

export async function POST(request) {
  try {
    const { userId, agentId } = await request.json();

    if (!userId || !agentId) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      );
    }

    // Actualizar el perfil de TuAgente eliminando el ID de documento de foto
    const params = {
      ClassName: "Tu_Agente_Perfiles",
      Action: "Update",
      Id_Agente: agentId,
      Id_Documento_Foto: null,
      UsuarioUMod: userId,
      ReturnTable: 1
    };

    const response = await executeForCRUD(params);

    if (response?.data?.length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Foto eliminada correctamente'
      });
    } else {
      throw new Error('Error al eliminar la foto');
    }

  } catch (error) {
    console.error('Error al eliminar la foto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 