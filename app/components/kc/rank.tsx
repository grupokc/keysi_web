"use client"
import Rank from "@/app/components/agente/rank"

export default function RankPage({ person }: { person: any }) {
  return (
    <div className="relative w-full container mx-auto pb-20 pt-0 lg:pb-28 lg:pt-10 px-0">
      <Rank person={person} />
    </div>
  )
}
