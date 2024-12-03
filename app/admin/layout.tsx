"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuthenticated")
    if (!adminAuth && pathname !== "/admin/login") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [pathname, router])

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link href="/admin/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Users
          </Link>
          <Link href="/admin/appointments" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Appointments
          </Link>
          <Link href="/admin/appointment-types" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Appointment Types
          </Link>
          <Link href="/admin/messages" className="block py-2 px-4 text-gray-600 hover:bg-gray-200">
            Messages
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

