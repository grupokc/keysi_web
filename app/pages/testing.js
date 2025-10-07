import FileUpload from "@/app/components/FileUpload"

export default function Testing() {
  return (
    <section className='w-11/12 mx-auto py-2 flex flex-col gap-3'>
      <FileUpload label='INE:' />
      <FileUpload label='INE:' />
    </section>
  )
}
