'use client'

import React, { useState } from 'react'
import { User } from 'lucide-react'
import List01 from './list-01'
import List02 from './list-02'
import Search from '@/app/components/Grid/search'
import ComboZonaPromotoria from '@/app/components/home/comboZonaPromotoria'

interface FilterValues {
  Id_Zona_Comercial: number
  Id_Promotoria: number
  Id_Agente: number
}

export default function Content() {
  // Keep the selected combo values in state
  const [filterValues, setFilterValues] = useState<FilterValues>({
    Id_Zona_Comercial: 999999999,
    Id_Promotoria: 999999999,
    Id_Agente: 999999999,
  })

  const [searchTerm, setSearchTerm] = useState<string>('')

  // This function is called whenever the user selects a new value in ComboZonaPromotoria
  const handleSelectionChange = (newValues: FilterValues) => {
    setFilterValues(newValues)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className="space-y-4">
      {/* Combo component at the top */}
      {/* <ComboZonaPromotoria
        onSelectionChange={handleSelectionChange}
        filterValues={filterValues}
      /> */}

      <Search filterValue={searchTerm} setFilterValue={setSearchTerm} onClear={handleClearSearch}/>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Promotores
          </h2>
          <div className="flex-1">
            <List02 className="h-full" filterValues={filterValues} searchTerm={searchTerm}/>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
            <User className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Agentes
          </h2>
          <div className="flex-1">
            {/* Pass the combo selections so List01 can filter accordingly */}
            <List01 className="h-full" filterValues={filterValues} searchTerm={searchTerm}/>
          </div>
        </div>
      </div>
    </div>
  )
}
