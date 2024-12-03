import Link from "next/link"

export function Header() {
  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          KidoHelp.co
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/about" className="hover:text-gray-300">About Us</Link>
          <Link href="/services" className="hover:text-gray-300">Services</Link>
          <Link href="/profile" className="hover:text-gray-300">Profile</Link>
          <Link href="/contacts" className="hover:text-gray-300">Contacts</Link>
        </div>
      </nav>
    </header>
  )
}

