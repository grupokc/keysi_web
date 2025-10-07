export default function Modal({ children, title, okLabel, cancelLabel, handleOk, handleCancel, isOpen }) {
  const isShow = isOpen ? "grid" : "hidden"
  const cancelIsPresent  =  handleCancel ? "":"hidden"
  const okIsPresent  =  handleOk ? "":"hidden"
  return (
    <section
      className={`${isShow} place-content-center z-[80] fixed top-0 left-0 right-0 bottom-0 w-screen h-screen  bg-black bg-opacity-60`}
    >
      <div className='w-11/12 ml-3 sticky top-0 flex flex-col bg-gray-100 min-w-[90vw] h-full min-h-[80vh] max-h-[90vh]  rounded-md  pt-0'>
        <div className="bg-white text-gray-900 border-collapse w-full shadow-lg rounded-md  ">
          {title ? <p className='bg-blue-700 text-white p-2  rounded-md '>{title}</p> : null}
        </div>
        <div className="flex-grow overflow-y-auto ">
        {children}
        </div>
        <div className="flex justify-end sm:mt-0 sm:ml-4 p-3  w-full bg-blue-200">
          <button
            type="button"
            onClick={handleOk}
            className={`${okIsPresent} px-3 py-2   w-1/3 flex-end
            border border-transparent shadow-sm text-sm 
            leading-4 font-medium rounded-md text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {okLabel?okLabel: "Aceptar"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className={`${cancelIsPresent} px-3 py-2   w-1/3 flex-end
            border border-transparent shadow-sm text-sm 
            leading-4 font-medium rounded-md text-white 
            bg-blue-600 hover:bg-blue-700 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {cancelLabel?cancelLabel: "Cancelar"}
          </button>
        </div>
      </div>
    </section>
  )
}
