import TicketDashboard from "./dashboard/ticket-dashboard"
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export default function Mesa() {
  const [user, setUser] = useLocalStorage("user", {});
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Mesa de Tickets - Dashboard</h1>
      <TicketDashboard user={user} />
    </main>
  )
}

