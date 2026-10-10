import { Coffee, Wheat, Heart, Award, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, TESTIMONIALS } from '../data/cafeData';

export function AboutSection() {
  const pillars = [
    {
      icon: Coffee,
      title: 'Specialty Coffee Craft',
      description:
        'Sourced from shade-grown estates in South India, freshly roasted in small batches to preserve tasting notes of stone fruit, cacao, and toasted hazelnut.',
    },
    {
      icon: Wheat,
      title: 'Artisan Happy Bakery',
      description:
        'Every croissant, brioche, and rustic loaf is hand-shaped daily at dawn using slow cold fermentation and pure farm-fresh ingredients without artificial additives.',
    },
    {
      icon: Heart,
      title: 'Warm Neighborhood Space',
      description:
        'A thoughtfully designed sanctuary at 24 Market Street with natural oak, calming sage green tones, soothing acoustic music, and attentive, welcoming baristas.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold tracking-wider text-[#5F7A61] uppercase">
              About Urban Brew Café & Bakery
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#382210] leading-tight">
              Rooted in Passion for Slow Coffee & Honest Bakes
            </h2>
            <p className="text-base text-[#5C4532] leading-relaxed">
              {BUSINESS_INFO.aboutText}
            </p>
            <p className="text-sm text-[#6B533F] leading-relaxed">
              Whether you are dropping in for a swift morning flat white on your way to work, meeting an old friend over a buttery chocolate croissant, or spending a slow afternoon immersed in a book, our doors are open every single day from 8:00 AM to 10:00 PM.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#4A2E18]">
              <div className="flex items-center gap-1.5 bg-[#FAF5EE] px-3 py-1.5 rounded border border-[#EBE3D0]">
                <ShieldCheck className="w-4 h-4 text-[#5F7A61]" />
                <span>Govt Food Safety Certified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAF5EE] px-3 py-1.5 rounded border border-[#EBE3D0]">
                <Award className="w-4 h-4 text-[#5F7A61]" />
                <span>100% Single-Origin Arabica</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#EBE3D0] shadow-md bg-[#FAF5EE]">
              <img
                src="/src/assets/images/cafe_interior_ambiance_1791622300244.jpg"
                alt="Urban Brew Café interior with sage green walls, oak tables, and customers enjoying coffee"
                className="w-full h-[340px] sm:h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-white/95 border-t border-[#EBE3D0] flex items-center justify-between text-xs text-[#6B533F]">
                <div>
                  <span className="font-semibold text-[#382210]">Urban Brew Ambiance</span>
                  <p className="text-[11px] text-[#8C7460]">24 Market Street, New Delhi</p>
                </div>
                <span className="font-mono tabular-nums text-[#5F7A61] font-semibold">
                  Open 7 Days a Week
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#FAF7F0] border border-[#EBE3D0] rounded-xl p-6 space-y-3 hover:border-[#C4B5A5] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EBF2EC] flex items-center justify-center text-[#3D5440]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#8C7460] font-mono">0{idx + 1}.</div>
                <h3 className="text-lg font-serif font-bold text-[#382210]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#5C4532] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Customer Proof & Testimonials */}
        <div className="pt-6 border-t border-[#EBE3D0]">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <p className="text-xs font-semibold tracking-wider text-[#5F7A61] uppercase">
              Patron Words
            </p>
            <h3 className="text-2xl font-serif font-bold text-[#382210]">
              Loved by Delhi’s Coffee & Pastry Connoisseurs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.name}
                className="bg-[#FAF7F0] border border-[#EBE3D0] rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <p className="text-xs sm:text-sm text-[#5C4532] italic leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>

                <div className="pt-3 border-t border-[#EBE3D0]/60 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-[#382210]">{item.name}</h4>
                    <p className="text-[#8C7460] text-[11px]">{item.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#5F7A61] font-medium block">
                      Favorite: {item.favoriteItem}
                    </span>
                    <span className="text-[#9D8471] text-[11px]">★★★★★ 5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
