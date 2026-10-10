import { ArrowRight, MapPin, Coffee, UtensilsCrossed, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';
import { LiveStatusBadge } from './LiveStatusBadge';

interface HeroProps {
  onOpenReservation: () => void;
  onViewBusinessData: () => void;
}

export function Hero({ onOpenReservation, onViewBusinessData }: HeroProps) {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <LiveStatusBadge />
              <div className="text-xs text-[#7A634E] flex items-center gap-2">
                <span>{BUSINESS_INFO.address}, {BUSINESS_INFO.city}</span>
                <span aria-hidden="true">·</span>
                <span>ID: {BUSINESS_INFO.id}</span>
              </div>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#382210] tracking-tight leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Your Daily Dose of Good Coffee.
            </h1>

            <p className="text-base sm:text-lg text-[#5C4532] leading-relaxed max-w-2xl">
              {BUSINESS_INFO.aboutText}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] rounded-md transition-colors shadow-xs"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#382210] bg-[#F5EBE1] hover:bg-[#EBE0D2] border border-[#DECFBE] rounded-md transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#5F7A61]" />
                <span>Reserve a Table</span>
              </button>

              <button
                type="button"
                onClick={onViewBusinessData}
                className="inline-flex items-center gap-1.5 px-3.5 py-3 text-xs font-medium text-[#7A634E] hover:text-[#382210] hover:bg-[#FAF5EE] rounded-md transition-colors"
              >
                <span>View Details (JSON)</span>
              </button>
            </div>

            {/* Quiet metadata strip with typographic separators */}
            <div className="pt-6 border-t border-[#EBE3D0] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#6B533F]">
              <div>
                <span className="block text-[#8C7460]">Hours</span>
                <span className="font-semibold text-[#382210]">{BUSINESS_INFO.openingHours}</span>
              </div>
              <div>
                <span className="block text-[#8C7460]">Price Range</span>
                <span className="font-semibold text-[#382210]">{BUSINESS_INFO.priceRange}</span>
              </div>
              <div>
                <span className="block text-[#8C7460]">Bakery</span>
                <span className="font-semibold text-[#382210]">Fresh Baked at 6:30 AM</span>
              </div>
              <div>
                <span className="block text-[#8C7460]">Coffee Origin</span>
                <span className="font-semibold text-[#382210]">100% Single Estate Arabica</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#EBE3D0] bg-[#FAF5EE]">
              <img
                src="/src/assets/images/hero_urban_brew_cafe_1791622243654.jpg"
                alt="Urban Brew Café interior with artisanal bread shelves, espresso machine and morning patrons"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover hover:scale-102 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              
              {/* Contextual overlay caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs text-white/90 mb-1">
                  <Coffee className="w-3.5 h-3.5 text-[#E8EFE9]" />
                  <span>Artisanal Roast & Bakehouse</span>
                  <span aria-hidden="true">·</span>
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#E8EFE9]" />
                  <span>New Delhi</span>
                </div>
                <p className="text-sm font-medium text-white/95 leading-snug">
                  Slow-fermented sourdoughs and hand-poured specialty roasts every single day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
