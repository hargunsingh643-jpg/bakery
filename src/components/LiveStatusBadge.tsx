import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/cafeData';

export function LiveStatusBadge({ className = '' }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(true);
  const [statusText, setStatusText] = useState('Open Now');

  useEffect(() => {
    const checkOpenStatus = () => {
      // Calculate India Standard Time (UTC +5:30)
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + 3600000 * 5.5);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const currentDec = hours + minutes / 60;

      if (currentDec >= BUSINESS_INFO.openHourTime && currentDec < BUSINESS_INFO.closeHourTime) {
        setIsOpen(true);
        if (currentDec >= 21) {
          setStatusText('Open · Closes at 10:00 PM');
        } else {
          setStatusText('Open Now · Closes at 10:00 PM');
        }
      } else {
        setIsOpen(false);
        setStatusText('Closed Now · Opens at 8:00 AM');
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded border ${
        isOpen
          ? 'bg-[#EBF2EC] text-[#29382B] border-[#5F7A61]/30'
          : 'bg-[#F9F4F0] text-[#7A4B3A] border-[#C4A496]/40'
      } ${className}`}
    >
      <Clock className="w-3.5 h-3.5 opacity-80 shrink-0" />
      <span>{statusText}</span>
    </div>
  );
}
