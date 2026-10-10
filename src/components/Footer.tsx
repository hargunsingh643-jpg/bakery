import { BUSINESS_INFO } from '../data/cafeData';
import { Coffee, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onViewBusinessData: () => void;
}

export function Footer({ onOpenReservation, onViewBusinessData }: FooterProps) {
  return (
    <footer className="bg-[#24140A] text-[#EFE8DC] pt-16 pb-12 border-t border-[#382210]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <span className="font-serif font-bold text-xl text-white block">
              {BUSINESS_INFO.name}
            </span>
            <p className="text-xs text-[#C4B5A5] leading-relaxed">
              {BUSINESS_INFO.tagline}
            </p>
            <p className="text-xs text-[#9D8471] leading-relaxed">
              Artisanal specialty coffee & fresh dawn bakery bakes at 24 Market Street, New Delhi.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-[#D8B48D] bg-[#382210] px-2 py-1 rounded">
                Business ID: {BUSINESS_INFO.id}
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Explore
            </span>
            <ul className="space-y-2 text-xs text-[#C4B5A5]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us & Craft
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">
                  Artisanal Menu
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Gallery & Moments
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Opening Hours
            </span>
            <div className="space-y-1 text-xs text-[#C4B5A5]">
              <p className="font-medium text-white">{BUSINESS_INFO.openingHours}</p>
              <p className="text-[#9D8471]">Breakfast pastries fresh from 7:30 AM</p>
              <p className="text-[#9D8471]">Full espresso bar & kitchen until 9:45 PM</p>
              <p className="text-[#9D8471] font-mono mt-2">Price Range: {BUSINESS_INFO.priceRange}</p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenReservation}
                className="text-xs text-[#D8B48D] hover:underline"
              >
                Book a table in advance &rarr;
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">
              Connect With Us
            </span>
            <div className="space-y-2 text-xs text-[#C4B5A5]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#D8B48D] shrink-0" />
                <span>{BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8B48D] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white font-mono">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D8B48D] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onViewBusinessData}
                className="text-xs text-[#C4B5A5] hover:text-white underline"
              >
                Export / Copy Business Data (JSON)
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright Line */}
        <div className="pt-8 border-t border-[#382210] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7460] gap-4">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name} ({BUSINESS_INFO.id}). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Specialty Coffee</span>
            <span aria-hidden="true">·</span>
            <span>Artisan Bakery</span>
            <span aria-hidden="true">·</span>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
