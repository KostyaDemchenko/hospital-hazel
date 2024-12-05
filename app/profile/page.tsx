"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Спиннер компонент
function Spinner() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'></div>
    </div>
  );
}

interface Appointment {
  title: string;
  type: string;
  appointment_date: string;
}

interface UserProfile {
  username: string;
  email: string;
  phone: string;
  user_photo: string | null;
  appointments: Appointment[];
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true); // Начало загрузки
      setError(null); // Сброс ошибки

      try {
        const response = await fetch("http://localhost:8080/profile.php", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setAppointments(data.appointments);
        } else if (response.status === 401) {
          router.push("/sign-in");
          return; // Прекращаем выполнение после перенаправления
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Не удалось загрузить профиль.");
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Не удалось загрузить профиль. Пожалуйста, попробуйте позже.");
      } finally {
        setIsLoading(false); // Завершение загрузки
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    setIsLoading(true); // Начало загрузки при выходе
    setError(null); // Сброс ошибки

    try {
      const response = await fetch("http://localhost:8080/logout.php", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/sign-in");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Не удалось выйти из системы.");
      }
    } catch (err: any) {
      console.error("Error during logout:", err);
      setError("Не удалось выйти из системы. Пожалуйста, попробуйте позже.");
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };

  // Определяем URL фотографии профиля, используя дефолтное изображение при необходимости
  const profilePhoto =
    user && user.user_photo && user.user_photo.trim() !== ""
      ? user.user_photo
      : "/profile-def.png";

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    // Если пользователь не авторизован и уже произошло перенаправление, ничего не рендерим
    return null;
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='container mx-auto px-4 py-8'>
        {error && (
          <div className='mb-4 p-4 bg-red-100 text-red-700 rounded'>
            {error}
          </div>
        )}
        <Card className='bg-[#FFF5EE] mb-8'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='relative w-32 h-32 rounded-full overflow-hidden'>
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt='Profile picture'
                    className='object-cover w-full h-full'
                  />
                ) : (
                  <div className='flex items-center justify-center bg-gray-200 w-full h-full'>
                    <User className='h-16 w-16 text-gray-400' />
                  </div>
                )}
              </div>
              <div className='space-y-2 flex-1'>
                <div className='flex items-center gap-2'>
                  <User className='h-5 w-5' />
                  <span className='text-xl font-semibold'>{user.username}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='h-5 w-5' />
                  <span>{user.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-5 w-5' />
                  <span>{user.phone}</span>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className='bg-red-500 hover:bg-red-600 text-white flex items-center gap-2'
                disabled={isLoading} // Отключаем кнопку при загрузке
              >
                <LogOut className='h-5 w-5' />
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
        <h2 className='text-2xl font-bold mb-6 mt-6'>Your appointments</h2>
        <div className='space-y-4'>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <Card key={index} className='bg-[#FFF5EE]'>
                <CardContent className='p-6 flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <div className='p-2 bg-white rounded-full'>
                      <User className='h-6 w-6' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>{appointment.title}</h3>
                      <p className='text-gray-600'>{appointment.type}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold'>
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString()}
                    </p>
                    <p className='text-gray-600'>
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
