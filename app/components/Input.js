export default function Input({ name, label, error, ...props }) {
  return (
    <div htmlFor={name} className='w-full flex flex-col'>
      <label className='font-medium text-blue-900'>{label}</label>
      <input
        className='py-2 px-3 mt-1 border border-blue-900 rounded-md placeholder-blue-900 placeholder-opacity-40'
        name={name}
        {...props}
      />
      {error ? (
        <span className='text-red-600 mt-1'>
          <small>{error}</small>
        </span>
      ) : null}
    </div>
  )
}
