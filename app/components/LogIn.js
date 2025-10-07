import LogInForm from "@/app/components/forms/LogInForm"
import Image from "next/image"

export default function Login() {
  return (
    <div className='w-full bg-white max-w-[280px] lg:max-w-[360px] mx-auto text-blue-900 flex flex-col justify-center'>
      <div className='bg-white p-6  mb-1 h-30 text-center'>
        <Image
          width={150}
          height={150}
          className=' object-contain '
          src='/img/logos/titan-logo.png'
          alt='titan'
        />

      </div>

      <div className='bg-blue-100 p-6 rounded-md shadow shadow-blue-900'>
        
        <LogInForm />

      </div>
    </div>
  )
}
