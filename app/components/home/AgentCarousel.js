// 'use client';

// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { Card, CardHeader, CardBody, Image, Button } from '@heroui/react';
// import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
// import { executeForCRUD } from '@/app/services/frontBack';
// import { UserContext } from '@/app/context/UserContext'; // <--- Ajusta la ruta

// // Función para obtener la URL de la imagen del usuario
// const getImageUrl = (user) => {
//   let url = 'https://pegasus.grupokc.com.mx/img/iconUsuario.png';
//   if (user?.RutaFoto && user?.RutaFoto !== 'null' && user?.RutaFoto.trim() !== '') {
//     const foto = user.RutaFoto.replace(/\\/g, '/');
//     url = `https://pegasus.grupokc.com.mx/${foto}`;
//   }
//   return url;
// };

// const AgentCarousel = ({ selectedPromotoria, promotoriaNombre }) => {
//   const [agents, setAgents] = useState([]);
//   const carouselRef = useRef(null);

//   const { logInAsAgent } = useContext(UserContext);

//   useEffect(() => {
//     if (!selectedPromotoria || selectedPromotoria === 999999999) {
//       setAgents([]); // Asegurarnos de limpiar el estado si la promotoria no es válida
//       return;
//     }

//     const fetchAgents = async () => {
//       const response = await executeForCRUD({
//         ClassName: 'Agentes',
//         Action: 'List',
//         Id_Promotoria: selectedPromotoria,
//       });

//       if (response.success && response.data.length > 0) {
//         setAgents(response.data);
//       } else {
//         setAgents([]);
//       }
//     };

//     fetchAgents();
//   }, [selectedPromotoria]);

//   // Maneja la selección de agente en el carrusel
//   const handleSelectAgent = (agent) => {
//     // Pasa el valor número en vez de un objeto
//     logInAsAgent(agent.Id_Agente);
//   };
  

//   // Si no hay promotoria seleccionada o no hay agentes, no renderizar nada
//   if (!selectedPromotoria || selectedPromotoria === 999999999 || agents.length === 0) {
//     return null;
//   }

//   return (
//     <div className="relative w-full bg-white p-6 shadow-lg rounded-lg">
//       {/* Nombre de la Promotoría en grande y centrado */}
//       <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
//         {promotoriaNombre}
//       </h2>

//       <div className="relative">
//         {/* Botón izquierdo */}
//         <Button
//           variant="bordered"
//           isIconOnly
//           onPress={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
//         >
//           <AiOutlineLeft className="w-6 h-6 text-gray-700" />
//         </Button>

//         {/* Contenedor del carrusel */}
//         <div
//           ref={carouselRef}
//           className="overflow-x-auto flex space-x-6 p-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
//         >
//           {agents.map((agent) => (
//             <Card
//               key={agent.Id_Agente}
//               isPressable
//               onPress={() => handleSelectAgent(agent)}
//               className="w-56 py-6 px-6 rounded-xl shadow-md border border-gray-200 flex-shrink-0 snap-center bg-gray-50 transition-transform duration-300 hover:scale-105 cursor-pointer"
//             >
//               <CardHeader className="flex flex-col items-center">
//                 <Image
//                   alt={agent.Nombre_Agente}
//                   className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-sm"
//                   src={getImageUrl(agent)}
//                 />
//                 <h4 className="mt-3 font-semibold text-gray-900 text-center text-sm leading-tight">
//                   {agent.Nombre_Agente}
//                 </h4>
//                 <small className="text-gray-500 text-xs">
//                   {agent.Cargo || 'Agente'}
//                 </small>
//               </CardHeader>
//             </Card>
//           ))}
//         </div>

//         {/* Botón derecho */}
//         <Button
//           variant="bordered"
//           isIconOnly
//           onPress={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
//         >
//           <AiOutlineRight className="w-6 h-6 text-gray-700" />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AgentCarousel;
