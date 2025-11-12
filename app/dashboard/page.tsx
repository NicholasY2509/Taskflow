"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      setUser(response.data?.user);
      console.log("User:", response.data?.user);
    });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Logged in From {user?.app_metadata?.provider}</p>
      <p>Welcome {user?.email}</p>
    </div>
  );
}
