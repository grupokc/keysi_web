"use client";
import { useState } from "react";
import ComunicadosModal from "@/app/components/ComunicadosModal";

export default function ComunicadosPage() {
  const [open, setOpen] = useState(true);
  return (
    <ComunicadosModal open={open} onClose={() => setOpen(false)} />
  );
}
