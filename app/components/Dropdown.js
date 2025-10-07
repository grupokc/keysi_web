import useGetData from "@/app/hooks/useGetData"
import { useState } from "react"

const example = [
  { id: 1, description: "Mensual" },
  { id: 2, description: "Diario" },
  { id: 3, description: "Ferrocarril" }
]

export default function Dropdown({
  label = "Label:",
  value = 0,
  name,
  string,
  error,
  comboName,
  placeholder = "",
  disabled = false,
  onChange = () => {}
}) {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState({ id: 0 })
  const [open, setOpen] = useState(false)
  const { data } = useGetData({
    ClassName: comboName,
    Action: "Combo"
  })

  const listAnimation = open ? "dropdown-animation-open" : "hidden"

  const iconHoverAnimation = disabled
    ? " "
    : "hover:text-primary hover:scale-125 "

  const textValueColor = selected.id === 0 ? "text-gray-600" : "text-blue-900"

  const iconAnimation = open ? "text-blue-600 rotate-180" : "text-blue-900"

  const clearDefault = (key) => {
    const optionDef = key === 0
    if (optionDef) return "hidden"
    return "block"
  }

  const isActiveOption = (key) => {
    const active = key === selected.Key
    return active
      ? "bg-blue-900 text-white font-bold"
      : "bg-white text-blue-900 hover:bg-blue-900 hover:text-white"
  }

  return (
    <div className='relative min-w-[200px]'>
      <p className='text-blue-900 mb-2 font-medium'>{label}</p>
      <div className='flex items-center bg-white rounded-md border border-blue-900 p-2 px-4 w-full text-blue-900 transition-all'>
        <div
          className='flex items-center justify-between w-full'
          onClick={() => {
            if (disabled) return
            setOpen(!open)
          }}
        >
          <p
            className={`${textValueColor} overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            {selected.Value || placeholder}
          </p>
          <i
            className={`${iconAnimation} ${iconHoverAnimation} fas fa-angle-down transform text-sm transition-transform duration-500`}
          />
        </div>
      </div>
      {error ? (
        <span className='text-red-600 text-placeholder'>{error}</span>
      ) : null}
      <ul
        className={`${listAnimation} max-w-58 break-all absolute top-[69px] z-[100] block max-h-32 min-w-full w-10 transform overflow-y-auto overflow-x-hidden border border-blue-900 bg-white transition-all duration-100 lg:max-w-max`}
      >
        {data.map((item, key) => (
          <li
            key={item.Key}
            id={item.Key}
            className={` break-all  ${isActiveOption(item.Key)} ${clearDefault(item.Key)} ${key === items.length - 1 ? "" : ""
            } animate-show-opacity flex h-10 items-center py-2 px-4 text-sm transition-all`}
            onClick={() => {
              const structure = {
                  type: "dropdown",
                  key: string ? item.Key : parseFloat(item.Key),
                  value: item.Value,
                  name
              }
              setOpen(false)
              setSelected(item)
              onChange(structure)
            }}
          >
            {item.Value}
          </li>
        ))}
      </ul>
    </div>
  )
}
