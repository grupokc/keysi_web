import Loading from "@/app/components/Loading";

export default function ListLayout({ children, loading }) {
  return (
    <section className="w-full px-2 pb-12">
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {loading ? <Loading /> : children}
      </div>
    </section>
  );
}
