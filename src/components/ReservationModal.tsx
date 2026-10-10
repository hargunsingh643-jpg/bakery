import { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    guests: '2',
    seating: 'Indoor Oak Lounge',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingRef: string;
    date: string;
    time: string;
    guests: string;
    seating: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedBooking({
        bookingRef: `RES-${Math.floor(10000 + Math.random() * 90000)}`,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seating: formData.seating,
      });
    }, 700);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-[#FDFBF7] border border-[#DECFBE] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#FAF7F0] border-b border-[#EBE3D0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5F7A61]" />
            <h3 className="font-serif font-bold text-lg text-[#382210]">
              Reserve a Table
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 text-[#8C7460] hover:text-[#382210] rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {confirmedBooking ? (
          <div className="p-6 text-center space-y-5">
            <div className="w-12 h-12 bg-[#EBF2EC] text-[#3D5440] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-semibold text-[#5F7A61] uppercase tracking-wider">
                Table Reserved
              </span>
              <h4 className="text-2xl font-serif font-bold text-[#382210] mt-1">
                We Can&apos;t Wait to Welcome You!
              </h4>
              <p className="text-xs text-[#6B533F] mt-1">
                Urban Brew Café · 24 Market Street, New Delhi
              </p>
            </div>

            <div className="bg-[#FAF7F0] border border-[#DECFBE] rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#EBE3D0] pb-2">
                <span className="text-[#8C7460]">Reservation Code</span>
                <span className="font-mono font-bold text-[#382210]">
                  #{confirmedBooking.bookingRef}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D0] pb-2">
                <span className="text-[#8C7460]">Date & Time</span>
                <span className="font-medium text-[#382210]">
                  {confirmedBooking.date} at {confirmedBooking.time}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#EBE3D0] pb-2">
                <span className="text-[#8C7460]">Party Size</span>
                <span className="font-medium text-[#382210]">
                  {confirmedBooking.guests} Guests
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7460]">Seating Area</span>
                <span className="font-medium text-[#5F7A61]">
                  {confirmedBooking.seating}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C7460]">
              A confirmation SMS has been prepared for your phone. Tables are held for 15 minutes past reservation time.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] rounded-md transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-[#6B533F]">
              Book your spot for meetings, quiet work sessions, or afternoon pastry tastings. Available between 8:00 AM and 10:00 PM.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Preferred Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                >
                  <option value="08:30">08:30 AM (Morning Brew)</option>
                  <option value="10:00">10:00 AM (Breakfast & Bakes)</option>
                  <option value="11:30">11:30 AM (Pre-Lunch)</option>
                  <option value="13:00">01:00 PM (Lunch Sandwiches)</option>
                  <option value="15:00">03:00 PM (Afternoon Coffee)</option>
                  <option value="17:00">05:00 PM (Sunset Pastry Hour)</option>
                  <option value="19:00">07:00 PM (Evening Bites)</option>
                  <option value="20:30">08:30 PM (Dessert & Decaf)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Party Size
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                >
                  <option value="1">1 Person (Solo Work)</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5-6">5–6 People (Communal Table)</option>
                  <option value="7+">7+ People (Private Corner)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Seating Area
                </label>
                <select
                  value={formData.seating}
                  onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                >
                  <option value="Indoor Oak Lounge">Indoor Oak Lounge</option>
                  <option value="Window Espresso Bar">Window Espresso Bar</option>
                  <option value="Quiet Work Nook">Quiet Work Nook (w/ Power)</option>
                  <option value="Outdoor Street Terrace">Outdoor Street Terrace</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#382210] mb-1">
                Special Requests (Optional)
              </label>
              <input
                type="text"
                placeholder="E.g., birthday celebration, baby chair needed, power plug..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] disabled:opacity-50 rounded-md transition-colors shadow-xs"
              >
                {isSubmitting ? 'Confirming Availability...' : 'Confirm Table Reservation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
