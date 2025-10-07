"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Avatar,
  Divider,
  Badge,
  CardFooter
} from "@heroui/react";
import { 
  X, 
  ArrowRight, 
  Megaphone, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Star, 
  TrendingUp,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useComunicados } from "@/app/hooks/useComunicados";

const settings = {
  dots: true, // Activar los dots para indicar que es un carrusel
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  swipeToSlide: true,
  draggable: true,
  touchMove: true,
  swipe: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

interface ComunicadosModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ComunicadosModal({ open, onClose }: ComunicadosModalProps) {
  const sliderRef = React.useRef<Slider>(null);
  const { comunicados, loading, marcarComoLeido } = useComunicados(open);

  const handleComunicadoClick = (comunicadoId: number, url?: string) => {
    // Marcar como leído
    marcarComoLeido(comunicadoId);
    
    // Abrir URL si existe
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Modal 
      isOpen={open} 
      onClose={onClose}
      size="5xl"
      classNames={{
        base: "bg-white/80 backdrop-blur-sm",
        backdrop: "bg-black/40",
        header: "border-b border-gray-200 pb-4",
        body: "py-6",
        footer: "border-t border-gray-200 pt-4"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Avatar 
              className="bg-gradient-to-br from-blue-500 to-purple-600"
              icon={<Megaphone size={20} />}
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Comunicados</h2>
              <p className="text-sm text-gray-500">Mantente informado con las últimas novedades</p>
            </div>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <div className="w-full">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <span className="text-gray-400">Cargando comunicados...</span>
              </div>
            ) : (
              comunicados.length === 1 ? (
                <div className="flex justify-center">
                  <Card 
                    className="w-[420px] max-w-[420px] h-[520px] min-h-[520px] max-h-[520px] flex flex-col justify-between border border-gray-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer relative z-50"
                    shadow="sm"
                    isPressable
                    onPress={(e) => handleComunicadoClick(comunicados[0].id, comunicados[0].url)}
                  >
                    <CardHeader className="flex justify-between items-start pb-2 pt-4 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {comunicados[0].fecha}
                        </span>
                      </div>
                      {!comunicados[0].leido && (
                        <Chip
                          size="sm"
                          color="primary"
                          variant="solid"
                          className="font-semibold"
                        >
                          Nuevo
                        </Chip>
                      )}
                    </CardHeader>
                    <CardBody className="flex-1 px-4 py-0 flex flex-col justify-center">
                      {comunicados[0].guidDocumento && (
                        <div className="mb-4">
                          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${comunicados[0].guidDocumento}`}
                              alt="Documento del comunicado"
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="flex flex-col items-center text-gray-400">
                                <ImageIcon size={32} />
                                <span className="text-sm mt-2">Imagen no disponible</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                        {comunicados[0].titulo}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {comunicados[0].descripcion}
                      </p>
                    </CardBody>
                    <CardFooter className="px-4 pb-4 pt-2 flex justify-start">
                      <Chip 
                        size="sm" 
                        variant="flat"
                        color={comunicados[0].leido ? "success" : "default"}
                        startContent={comunicados[0].leido ? <CheckCircle2 size={12} /> : null}
                        className="font-medium"
                      >
                        {comunicados[0].leido ? "Leído" : "No leído"}
                      </Chip>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div>
                  <Slider ref={sliderRef} {...settings}>
                    {comunicados.map((comunicado) => (
                      <div key={comunicado.id} className="mx-8">
                        <Card 
                          className="w-[420px] max-w-[420px] h-[520px] min-h-[520px] max-h-[520px] flex flex-col justify-between border border-gray-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer relative z-10"
                          shadow="sm"
                          isPressable
                          onPress={(e) => handleComunicadoClick(comunicado.id, comunicado.url)}
                        >
                            <CardHeader className="flex justify-between items-start pb-2 pt-4 px-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <Clock size={12} /> {comunicado.fecha}
                                </span>
                              </div>
                              {!comunicado.leido && (
                                <Chip
                                  size="sm"
                                  color="primary"
                                  variant="flat"
                                  className="font-semibold bg-blue-100 text-blue-600"
                                >
                                  Nuevo
                                </Chip>
                              )}
                            </CardHeader>
                            <CardBody className="flex-1 px-4 py-0 flex flex-col justify-center">
                              {comunicado.guidDocumento && (
                                <div className="mb-4">
                                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                      src={`https://fb.grupokc.com.mx/api/Nf_File/getFile/?Id_Documento=${comunicado.guidDocumento}`}
                                      alt="Documento del comunicado"
                                      fill
                                      className="object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                      }}
                                    />
                                    <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                                      <div className="flex flex-col items-center text-gray-400">
                                        <ImageIcon size={32} />
                                        <span className="text-sm mt-2">Imagen no disponible</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2">
                                {comunicado.titulo}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {comunicado.descripcion}
                              </p>
                            </CardBody>
                            <CardFooter className="px-4 pb-4 pt-2 flex justify-start">
                              <Chip 
                                size="sm" 
                                variant="flat"
                                color={comunicado.leido ? "success" : "default"}
                                startContent={comunicado.leido ? <CheckCircle2 size={12} /> : null}
                                className="font-medium"
                              >
                                {comunicado.leido ? "Leído" : "No leído"}
                              </Chip>
                            </CardFooter>
                          </Card>
                      </div>
                    ))}
                  </Slider>
                </div>
              )
            )}
          </div>
        </ModalBody>
        

      </ModalContent>
    </Modal>
  );
} 