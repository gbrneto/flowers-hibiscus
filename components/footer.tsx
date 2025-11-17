export function Footer() {
  const quickLinks = [
    { label: "Legal Notice", href: "https://www.beversia.com/policies/legal-notice" },
    { label: "Contact Information", href: "https://www.beversia.com/policies/contact-information" },
    { label: "Privacy Policy", href: "https://www.beversia.com/policies/privacy-policy" },
    { label: "Refund Policy", href: "https://www.beversia.com/policies/refund-policy" },
    { label: "Shipping Policy", href: "https://www.beversia.com/policies/shipping-policy" },
    { label: "Terms of Service", href: "https://www.beversia.com/policies/terms-of-service" },
  ]

  const paymentMethods = [
    { name: "American Express", icon: "💳" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Bancontact", icon: "💳" },
    { name: "Google Pay", icon: "G" },
    { name: "Maestro", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "MB", icon: "MB" },
    { name: "Shop Pay", icon: "S" },
    { name: "Visa", icon: "💳" },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Quick Links Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-center md:text-center">Quick links</h3>
          <nav className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-4 md:gap-x-8 md:gap-y-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-white/80 transition-colors text-sm md:text-base"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6">
          {/* Payment Methods */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white rounded px-2 py-1 flex items-center justify-center min-w-[40px] h-[26px]"
                title={method.name}
              >
                <span className="text-xs font-semibold text-gray-700">{method.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-white/70">© 2025, Versia Powered by Shrina</div>
      </div>
    </footer>
  )
}
