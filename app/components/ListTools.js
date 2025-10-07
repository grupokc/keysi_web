export default function ListTools({
  name,
  placeholder,
  handleAdd,
  handleFilter
}) {
  return (
    <section className='col-span-1 md:col-span-3 flex items-center text-blue-900'>
      {handleAdd ? (
        <i className='fas fa-plus-circle mr-2 text-3xl' onClick={handleAdd} />
      ) : null}
      <div className='flex items-center bg-white w-full p-2 border rounded-md border-blue-900'>
        <i className='fas fa-search text-base text-opacity-50 text-blue-900' />
        <input
          className='px-2 border-0 outline-none w-full'
          placeholder={placeholder}
          onKeyUp={handleFilter}
          name={name}
          type='text'
          autoComplete='off'
        />
      </div>
    </section>
  )
}
