import Image from "next/image";

export default function LoadingScreen({ logoSrc = "https://cdngrupokc.azureedge.net/web/img/logos/GrupoKCLogo300.png", loadingMessage = "Cargando...", subMessage = "Por favor espere un momento..." }) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="w-48 h-48 relative mb-8">
        <Image
          src={logoSrc}
          alt="KC Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full animate-spin absolute top-0 left-0 animate-pulse"></div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-semibold text-gray-700">{loadingMessage}</p>
          <p className="text-sm text-gray-500">{subMessage}</p>
        </div>
      </div>
    </div>
  );
} 