import React from 'react';

const RegistroWA: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className=" p-6  w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hola <span role="img" aria-label="wave">👋</span>,
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Ingresa para retomar tus aplicaciones o administrar tus seguros.
        </p>
        <div className="mb-4">
          <label htmlFor="whatsapp" className="block text-gray-700 font-bold mb-2">
            Whatsapp
          </label>
          <input
            type="text"
            id="whatsapp"
            placeholder="10 Dígitos"
            className="w-full px-3 py-2 border border-pink-400 rounded focus:outline-none focus:border-pink-500"
          />
        </div>
        <div className="text-right mb-6">
          <a href="#" className="text-pink-600 text-sm">
            ¿Problemas con tu cuenta?
          </a>
        </div>
        <div className="text-center">
          <button
            className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded cursor-not-allowed"
            disabled
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">
          Al continuar aceptas los <a href="#" className="text-pink-600">Términos y Condiciones</a> y das tu consentimiento para el tratamiento de los datos personales que proporciones para los fines contenidos en el <a href="#" className="text-pink-600">Aviso de Privacidad</a>.
        </div>
      </div>
    </div>
  );
};

export default RegistroWA;
