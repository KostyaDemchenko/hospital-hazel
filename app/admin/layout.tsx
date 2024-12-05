"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Отправляем запрос на сервер для проверки сессии
        const response = await fetch(
          "http://localhost:8080/admin-check-session.php",
          {
            method: "GET",
            credentials: "include", // Важно передавать cookie с запросом
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Если пользователь не аутентифицирован, перенаправляем на страницу логина
          if (pathname !== "/admin/login") {
            router.push("/admin/login");
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
    };

    checkSession();
  }, [pathname, router]);

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null; // Пока не получим информацию о сессии, ничего не показываем
  }

  if (pathname === "/admin/login") {
    return <>{children}</>; // Показываем логин страницу, если это она
  }

  return (
    <div className='flex h-screen bg-gray-100'>
      <aside className='w-64 bg-white shadow-md'>
        <nav className='mt-5'>
          <Link
            href='/admin/dashboard'
            className='block py-2 px-4 text-gray-600 hover:bg-gray-200'
          >
            Dashboard
          </Link>
          <Link
            href='/admin/users'
            className='block py-2 px-4 text-gray-600 hover:bg-gray-200'
          >
            Users
          </Link>
          <Link
            href='/admin/appointments'
            className='block py-2 px-4 text-gray-600 hover:bg-gray-200'
          >
            Appointments
          </Link>
          <Link
            href='/admin/appointment-types'
            className='block py-2 px-4 text-gray-600 hover:bg-gray-200'
          >
            Appointment Types
          </Link>
          <Link
            href='/admin/messages'
            className='block py-2 px-4 text-gray-600 hover:bg-gray-200'
          >
            Messages
          </Link>
        </nav>
      </aside>
      <main className='flex-1 p-10 overflow-y-auto'>{children}</main>
    </div>
  );
}
