import { ChevronLeftIcon } from '@heroicons/react/solid';

export default function BonosPDF({ selectedBono, handleBackClick }) {
  const getUrl = () => {
    return '/bonopdf/128.pdf'; 
  };

  const handleButtonClick = () => {
    window.open(getUrl(), '_blank');
  };

  if (!selectedBono) {
    return (
      <button
        className="bg-blue-600 hover:bg-indigo-500 text-white font-semibold rounded-md py-2 px-4"
        onClick={handleButtonClick}
      >
        Abrir PDF
      </button>
    );
  }

  return (
    <div className="flex flex-col w-11/12 m-5">
      <div className="flex items-center mb-3">
        <button
          className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Regresar
        </button>
        <h1 className="text-lg ml-4">Bonos PDF</h1>
      </div>
      <div className="w-full">
        <iframe className="w-full h-screen" src={getUrl()}></iframe>
      </div>
    </div>
  );
}
