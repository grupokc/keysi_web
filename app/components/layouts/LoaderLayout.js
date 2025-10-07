import Loading from "@/app/components/Loading"
export default function LoaderLayout({ loading, children }) {
  if (loading) return <Loading />

  return (
    <main className='max-w-[100vw] min-h-screen overflow-x-hidden py-1 text-sm lg:text-lg md:flex pt-[50px] w-full mx-auto'>

      <div className='w-full'>{children}</div>

    </main>
  )
}
