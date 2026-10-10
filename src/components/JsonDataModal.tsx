import { useState } from 'react';
import { X, Copy, Check, FileCode } from 'lucide-react';
import { BUSINESS_INFO, MENU_PRODUCTS } from '../data/cafeData';

interface JsonDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JsonDataModal({ isOpen, onClose }: JsonDataModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullData = {
    business: {
      businessId: BUSINESS_INFO.id,
      name: BUSINESS_INFO.name,
      tagline: BUSINESS_INFO.tagline,
      category: BUSINESS_INFO.category,
      address: `${BUSINESS_INFO.address}, ${BUSINESS_INFO.city}, ${BUSINESS_INFO.country}`,
      phone: BUSINESS_INFO.phone,
      email: BUSINESS_INFO.email,
      openingHours: BUSINESS_INFO.openingHours,
      priceRange: BUSINESS_INFO.priceRange,
      aboutUs: BUSINESS_INFO.aboutText,
    },
    menu: MENU_PRODUCTS.map((p) => ({
      name: p.name,
      category: p.category,
      price: `₹${p.price}`,
      description: p.description,
      dietary: p.dietary,
    })),
  };

  const jsonString = JSON.stringify(fullData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-[#1E1B18] text-[#EFE8DC] border border-[#3D352E] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-[#26211C] border-b border-[#3D352E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#D8B48D]" />
            <span className="font-mono text-xs font-semibold text-white">
              urban_brew_cafe_bus1001.json
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-[#4A2E18] hover:bg-[#5F3C20] text-white rounded font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#769779]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON Data</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#9D8471] hover:text-white rounded"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <pre className="font-mono text-[11px] leading-relaxed text-[#D2C5B4] bg-[#141210] p-4 rounded-lg overflow-x-auto">
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
}
