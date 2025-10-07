import FrmCambiarPassword from "@/app/components/forms/FrmCambiarPassword"
import Image from "next/image"

export default function CambiarPassword() {

  return (
    <div className='w-full max-w-[280px] lg:max-w-[360px] mx-auto text-blue-900 flex flex-col justify-center'>
      <Image
        width={150}
        height={150}
        className='object-contain mx-auto'
        src='/img/logos/titan-logo.png'
        alt='titan'
      />

      <div className='bg-blue-100 p-6 rounded-md shadow-blue-900'>
        <FrmCambiarPassword />
      </div>
    </div>
  )
}
