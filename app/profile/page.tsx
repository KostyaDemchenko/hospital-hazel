"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:8080/profile.php", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setAppointments(data.appointments);
      } else if (response.status === 401) {
        router.push("/sign-in");
      } else {
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/logout.php", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      router.push("/sign-in");
    } else {
      alert("Logout failed");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-[#FFF5EE] mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-xl font-semibold">{user.username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>{user.phone}</span>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
              >
                <LogOut className="h-5 w-5" />
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-6 mt-6">Your appointments</h2>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <Card key={index} className="bg-[#FFF5EE]">
              <CardContent className="p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-full">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{appointment.title}</h3>
                    <p className="text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {new Date(
                      appointment.appointment_date
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    {new Date(
                      appointment.appointment_date
                    ).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
