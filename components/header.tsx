"use client"

import { useState } from "react"
import { Menu, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { openCart, getTotalItems } = useCart()

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Get in touch", href: "#" },
    { label: "Collections", href: "#" },
    { label: "Orders", href: "#" },
  ]

  return (
    <header className="sticky top-[76px] z-40 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:justify-start lg:gap-8">
          {/* Mobile: Hamburger Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop: Left Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Logo - Centered on mobile, centered on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:flex-1 lg:flex lg:justify-center">
            <a href="#" className="flex items-center">
              <img src="/images/design-mode/Group%201087.png" alt="Logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={openCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              <span className="sr-only">Cart ({getTotalItems()} items)</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
