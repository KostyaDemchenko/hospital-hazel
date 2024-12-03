import Link from "next/link"
import { Twitter, Facebook, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-semibold">
              KidoHelp.co
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/about" className="hover:text-gray-300">About Us</Link>
            <Link href="/services" className="hover:text-gray-300">Services</Link>
            <Link href="/contacts" className="hover:text-gray-300">Contacts</Link>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gray-300">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="hover:text-gray-300">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8">
          © 2024 Children's Development and Recreation Center. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

