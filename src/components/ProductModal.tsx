import { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { ProductItem } from '../data/cafeData';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCartWithCustomization: (
    product: ProductItem,
    quantity: number,
    customizations: { milk?: string; sugar?: string; served?: string; note?: string }
  ) => void;
}

export function ProductModal({ product, onClose, onAddToCartWithCustomization }: ProductModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState(product.customizationOptions?.milk?.[0] || '');
  const [selectedSugar, setSelectedSugar] = useState(product.customizationOptions?.sugar?.[0] || '');
  const [selectedServed, setSelectedServed] = useState(product.customizationOptions?.served?.[0] || '');
  const [specialNote, setSpecialNote] = useState('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Price calculations
  let unitExtra = 0;
  if (selectedMilk.includes('+₹40')) unitExtra += 40;
  if (selectedServed.includes('+₹30')) unitExtra += 30;

  const itemTotal = (product.price + unitExtra) * quantity;

  const handleAdd = () => {
    onAddToCartWithCustomization(product, quantity, {
      milk: selectedMilk || undefined,
      sugar: selectedSugar || undefined,
      served: selectedServed || undefined,
      note: specialNote.trim() || undefined,
    });
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-[#FDFBF7] border border-[#DECFBE] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-60 bg-[#EFE8DC]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-[#382210] rounded-full shadow-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-wider text-[#E8EFE9] font-medium">
              {product.category}
            </span>
            <h3 className="text-2xl font-serif font-bold text-white leading-tight">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C7460] mb-2">
              <div className="flex items-center gap-2">
                {product.prepTime && <span>Prep: {product.prepTime}</span>}
                {product.calories && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.calories}</span>
                  </>
                )}
              </div>
              <span>{product.dietary.join(' · ')}</span>
            </div>
            <p className="text-sm text-[#5C4532] leading-relaxed">
              {product.detailedDescription || product.description}
            </p>
          </div>

          {/* Customization Options */}
          {product.customizationOptions && (
            <div className="space-y-4 pt-2 border-t border-[#EBE3D0]">
              {/* Milk Option */}
              {product.customizationOptions.milk && (
                <div>
                  <label className="block text-xs font-semibold text-[#382210] mb-1.5">
                    Choose Milk
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.customizationOptions.milk.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedMilk(opt)}
                        className={`px-3 py-2 text-xs rounded-md border text-left transition-colors ${
                          selectedMilk === opt
                            ? 'border-[#5F7A61] bg-[#EBF2EC] text-[#29382B] font-medium'
                            : 'border-[#DECFBE] bg-white text-[#5C4532] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness */}
              {product.customizationOptions.sugar && (
                <div>
                  <label className="block text-xs font-semibold text-[#382210] mb-1.5">
                    Sweetness / Accompaniment
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.customizationOptions.sugar.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedSugar(opt)}
                        className={`px-3 py-2 text-xs rounded-md border text-left transition-colors ${
                          selectedSugar === opt
                            ? 'border-[#5F7A61] bg-[#EBF2EC] text-[#29382B] font-medium'
                            : 'border-[#DECFBE] bg-white text-[#5C4532] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Serving style */}
              {product.customizationOptions.served && (
                <div>
                  <label className="block text-xs font-semibold text-[#382210] mb-1.5">
                    Preparation & Serving Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.customizationOptions.served.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedServed(opt)}
                        className={`px-3 py-2 text-xs rounded-md border text-left transition-colors ${
                          selectedServed === opt
                            ? 'border-[#5F7A61] bg-[#EBF2EC] text-[#29382B] font-medium'
                            : 'border-[#DECFBE] bg-white text-[#5C4532] hover:bg-[#FAF7F0]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-xs font-semibold text-[#382210] mb-1.5">
                  Special Instructions
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="E.g., extra hot, less ice, warm lightly..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#FAF7F0] border-t border-[#EBE3D0] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#DECFBE] rounded-md bg-white">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-2 text-[#4A2E18] hover:bg-[#FAF7F0] disabled:opacity-40 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-bold text-[#382210] font-mono tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-[#4A2E18] hover:bg-[#FAF7F0] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Total & Add Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 inline-flex items-center justify-between px-5 py-2.5 text-xs font-semibold rounded-md shadow-xs transition-colors ${
              isAddedSuccess
                ? 'bg-[#5F7A61] text-white'
                : 'bg-[#4A2E18] hover:bg-[#382210] text-white'
            }`}
          >
            <span>{isAddedSuccess ? 'Added to Order!' : 'Add to Order'}</span>
            <span className="font-mono tabular-nums">₹{itemTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
