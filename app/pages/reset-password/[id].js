import CenterLayout from "@/app/components/layouts/CenterLayout"
import CambiarPassword from "@/app/components/CambiarPassword"
// import { useRouter } from "next/navigation"
export default function CambiarContrasena() {
  // const { query } = useRouter()
  // console.log( query.id)
  return (
    <CenterLayout>
      <CambiarPassword />
    </CenterLayout>
  )
}
