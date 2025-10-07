"use client";

import RankPage from "@/app/components/kc/rank";
import { useState, useEffect } from "react";

export default function RankKCPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storedUser);
  }, []);

  return <RankPage person={user} />;
}
