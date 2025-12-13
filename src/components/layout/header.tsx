"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/#products" },
    { name: "About", href: "/#mission" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm animate-slide-up">
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-text hover:no-underline transition-transform hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="ITEDA Solutions Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.map((item, idx) => (
            <li key={item.name} className="animate-fade-in" style={{animationDelay: `${idx * 50}ms`}}>
              <Link
                href={item.href}
                className="relative text-text-light transition-all hover:text-primary hover:no-underline after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden transition-transform hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden animate-slide-up">
          <ul className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navigation.map((item, idx) => (
              <li key={item.name} className="animate-slide-in-left" style={{animationDelay: `${idx * 50}ms`}}>
                <Link
                  href={item.href}
                  className="block text-lg text-text hover:text-primary hover:no-underline transition-all hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;