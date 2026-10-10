import { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Bell, Coffee } from 'lucide-react';
import { ActiveOrder } from './OrderStatusTracker';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  activeSection: string;
  activeOrder?: ActiveOrder | null;
}

export function Navbar({
  cartItemCount,
  onOpenCart,
  onOpenReservation,
  activeSection,
  activeOrder,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EBE3D0] shadow-xs py-3'
          : 'bg-[#FDFBF7]/80 backdrop-blur-sm border-b border-[#EBE3D0]/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#382210] hover:text-[#4A2E18] transition-colors whitespace-nowrap shrink-0"
          >
            Urban Brew Café
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C4532]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#24140A] ${
                    isActive ? 'text-[#24140A] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5F7A61] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenReservation}
              className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium text-[#4A2E18] bg-[#F5EBE1] hover:bg-[#EBE0D2] border border-[#DECFBE] rounded-md transition-colors whitespace-nowrap shrink-0"
            >
              Reserve Table
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label={activeOrder ? 'Track active order' : 'View shopping bag'}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 shadow-xs ${
                activeOrder?.status === 'ready'
                  ? 'bg-[#5F7A61] hover:bg-[#4E6B52] text-white ring-2 ring-[#EBF2EC]'
                  : activeOrder?.status === 'preparing'
                  ? 'bg-[#4A2E18] hover:bg-[#382210] text-white'
                  : 'bg-[#4A2E18] hover:bg-[#382210] text-white'
              }`}
            >
              {activeOrder?.status === 'ready' ? (
                <>
                  <Bell className="w-3.5 h-3.5 animate-bounce" />
                  <span>Order Ready for Pickup!</span>
                </>
              ) : activeOrder?.status === 'preparing' ? (
                <>
                  <Coffee className="w-3.5 h-3.5 animate-pulse" />
                  <span>Track Order (Preparing...)</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order Online</span>
                  {cartItemCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 bg-[#5F7A61] text-white text-[11px] font-bold rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A2E18] hover:bg-[#F3EBE1] rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[#EBE3D0] mt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[#4A2E18] hover:bg-[#F5EBE1] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full text-center px-4 py-2.5 text-xs font-medium text-[#4A2E18] bg-[#F5EBE1] rounded-md"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

