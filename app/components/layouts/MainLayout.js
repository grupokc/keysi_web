

export default function MainLayout({ children }) {
  return (
    <main className="relative min-h-screen max-w-[100vw] overflow-hidden py-1 text-sm lg:text-lg flex flex-col pt-[50px] w-full mx-auto bg-gray-100">

      <section className="flex-grow overflow-auto p-2">
        {children}
      </section>

    </main>
  );
}
