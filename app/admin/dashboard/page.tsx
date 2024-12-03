// page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";

interface DashboardStats {
  total_users: number;
  total_appointments: number;
  total_messages: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await fetch("http://localhost:8080/admin-profile.php", {
        credentials: "include",
      });
      if (response.status !== 200) {
        router.push("/admin/login");
      }
    };

    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/get-dashboard-stats.php"
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
      }
    };

    checkAdmin();
    fetchStats();
  }, [router]);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/logout.php", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      router.push("/admin/login");
    } else {
      alert("Logout failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats ? stats.total_users : "Loading..."}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats ? stats.total_appointments : "Loading..."}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats ? stats.total_messages : "Loading..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
