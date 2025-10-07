import { useState } from "react"
import { tabsSolicitudes } from "@/app/utils/schemas/TabsSolicitudes"

import Tab from "./Tab"

export default function Tabs({ data = tabsSolicitudes, handleChange }) {
  const [selected, setSelected] = useState(0)

  return (
    <ul className='flex items-center justify-center gap-3 my-3'>
      {data.map((tab, idx) => (
        <Tab
          key={tab.Key}
          isActive={idx === selected}
          onClick={() => {
            handleChange(tab.Key)
            setSelected(idx)
          }}
        >
          {tab.Value}
        </Tab>
      ))}
    </ul>
  )
}
