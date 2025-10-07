
export default function CenterLayout({ children }) {
  return (
    <main className='flex items-center justify-center text-sm lg:text-lg px-2  bg-white min-h-screen w-screen'>
      {children}

    </main>
  )
}
