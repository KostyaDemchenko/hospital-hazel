"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className='bg-black text-white py-4'>
      <nav className='container mx-auto px-4 flex items-center justify-between'>
        <Link href='/' className='text-xl font-semibold'>
          KidoHelp.co
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-6'>
          <Link href='/' className='hover:text-gray-300'>
            Home
          </Link>
          <Link href='/about' className='hover:text-gray-300'>
            About Us
          </Link>
          <Link href='/services' className='hover:text-gray-300'>
            Services
          </Link>
          <Link href='/profile' className='hover:text-gray-300'>
            Profile
          </Link>
          <Link href='/contacts' className='hover:text-gray-300'>
            Contacts
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            aria-label='Toggle menu'
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-menu'
            className='focus:outline-none'
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' /> // Использование иконки X из Lucide React
            ) : (
              <Menu className='h-6 w-6' /> // Использование иконки Menu из Lucide React
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id='mobile-menu'
          className='md:hidden bg-black text-white px-4 pb-4'
        >
          <ul className='flex flex-col gap-4 mt-2'>
            <li>
              <Link
                href='/'
                onClick={closeMobileMenu}
                className='block hover:text-gray-300'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/about'
                onClick={closeMobileMenu}
                className='block hover:text-gray-300'
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href='/services'
                onClick={closeMobileMenu}
                className='block hover:text-gray-300'
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href='/profile'
                onClick={closeMobileMenu}
                className='block hover:text-gray-300'
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href='/contacts'
                onClick={closeMobileMenu}
                className='block hover:text-gray-300'
              >
                Contacts
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
