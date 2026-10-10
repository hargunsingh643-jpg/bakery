import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { BUSINESS_INFO, FAQS } from '../data/cafeData';
import { LiveStatusBadge } from './LiveStatusBadge';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: 'general',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-[#FDFBF7] border-t border-[#EBE3D0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-xs font-semibold tracking-wider text-[#5F7A61] uppercase">
            Visit & Connect
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#382210]">
            Find Us in New Delhi
          </h2>
          <p className="text-sm sm:text-base text-[#6B533F]">
            Drop by for freshly brewed specialty coffee, order artisanal bakes for your event, or simply say hello.
          </p>
        </div>

        {/* Contact Info Grid & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Business Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F0] border border-[#EBE3D0] rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EBE3D0]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#382210]">
                    {BUSINESS_INFO.name}
                  </h3>
                  <span className="text-xs text-[#8C7460] font-mono">
                    ID: {BUSINESS_INFO.id} · {BUSINESS_INFO.category}
                  </span>
                </div>
                <LiveStatusBadge />
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#EBF2EC] text-[#3D5440] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#382210] block">Address</span>
                  <p className="text-[#5C4532] text-sm mt-0.5">
                    {BUSINESS_INFO.address}, {BUSINESS_INFO.city}, {BUSINESS_INFO.country}
                  </p>
                  <p className="text-[11px] text-[#8C7460] mt-0.5">
                    Central Market District · Valet & Street Parking Available
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#EBF2EC] text-[#3D5440] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#382210] block">Phone (Orders & Reservations)</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-[#382210] hover:text-[#5F7A61] font-mono font-medium text-sm mt-0.5 inline-block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <p className="text-[11px] text-[#8C7460]">Official telephone inquiry line</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#EBF2EC] text-[#3D5440] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#382210] block">Direct Email</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-[#382210] hover:text-[#5F7A61] font-mono text-sm mt-0.5 inline-block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                  <p className="text-[11px] text-[#8C7460]">For catering, bulk sourdough, & custom bakes</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#EBF2EC] text-[#3D5440] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#382210] block">Opening Hours</span>
                  <p className="text-[#382210] font-medium text-sm mt-0.5">
                    {BUSINESS_INFO.openingHours}
                  </p>
                  <p className="text-[11px] text-[#8C7460]">Fresh breakfast bakes out at 7:30 AM</p>
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-2 border-t border-[#EBE3D0] flex items-center justify-between text-xs text-[#6B533F]">
                <span>Typical Price Range</span>
                <span className="font-semibold text-[#382210] font-mono">{BUSINESS_INFO.priceRange}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact / Catering Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F0] border border-[#EBE3D0] rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#EBF2EC] text-[#3D5440] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#382210]">
                    Thank You for Getting in Touch!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B533F] max-w-md mx-auto leading-relaxed">
                    We have received your message regarding &quot;{formData.inquiryType}&quot;. Dimpy Bhalla and our cafe team will respond to {formData.email} within 2–4 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-4 px-5 py-2.5 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-bold text-lg text-[#382210]">
                      Send Us a Message
                    </h3>
                    <span className="text-[11px] text-[#8C7460]">We reply within 4 hours</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#382210] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Dimpy Bhalla"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#382210] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#382210] mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#382210] mb-1">
                        Inquiry Purpose
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                      >
                        <option value="general">General Coffee & Café Inquiry</option>
                        <option value="custom_cake">Custom Birthday / Celebration Cake</option>
                        <option value="catering">Corporate Breakfast / Catering</option>
                        <option value="feedback">Feedback & Experience</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#382210] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you'd like to ask or preorder..."
                      className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-[#8C7460]">
                      Protected by privacy standard · No spam guaranteed
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] disabled:opacity-50 rounded-md transition-colors shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Interactive Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#382210]">
                Google Maps & Location
              </h3>
              <p className="text-xs text-[#7A634E]">
                24 Market Street, New Delhi, India · 5 mins from central metro transit
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=24+Market+Street+New+Delhi+India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#4A2E18] bg-[#F5EBE1] hover:bg-[#EBE0D2] border border-[#DECFBE] rounded-md transition-colors shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-[#5F7A61]" />
              <span>Open in Google Maps App</span>
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#EBE3D0] shadow-sm bg-[#FAF5EE] h-80 sm:h-96">
            {/* Interactive Map Embed */}
            <iframe
              title="Urban Brew Café Location on Google Maps"
              src="https://maps.google.com/maps?q=24+Market+Street,+New+Delhi,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[25%] contrast-[1.05]"
            />

            {/* In-Map Floating Info Card */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#DECFBE] shadow-md max-w-xs hidden sm:block">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-xs text-[#382210]">
                  {BUSINESS_INFO.name}
                </span>
                <span className="text-[10px] bg-[#EBF2EC] text-[#29382B] px-1.5 py-0.2 rounded font-medium">
                  BUS-1001
                </span>
              </div>
              <p className="text-[11px] text-[#5C4532]">
                24 Market Street, New Delhi, India
              </p>
              <div className="mt-2 pt-2 border-t border-[#EBE3D0] flex items-center justify-between text-[11px] text-[#7A634E]">
                <span>Open: 8 AM - 10 PM</span>
                <span className="text-[#5F7A61] font-semibold">₹100–₹500</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#EBE3D0] space-y-4">
          <div className="text-center mb-6">
            <h3 className="font-serif font-bold text-xl text-[#382210]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-[#7A634E] mt-1">
              Quick answers about visits, orders, and our bakery craft
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="bg-[#FAF7F0] border border-[#EBE3D0] rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#382210] hover:text-[#5F7A61]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8C7460] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8C7460] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-[#5C4532] leading-relaxed border-t border-[#EBE3D0]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
