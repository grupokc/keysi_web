export default function Button({ type = "button", children, ...props }) {
  return (
    <button
      className={`py-2 p-3 bg-blue-900 text-white transform transition-transform border rounded-md focus:outline-none`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
