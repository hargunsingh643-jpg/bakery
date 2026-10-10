import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Ticket, Coffee } from 'lucide-react';
import { ProductItem, BUSINESS_INFO } from '../data/cafeData';
import { OrderStatusTracker, ActiveOrder } from './OrderStatusTracker';

export interface CartItem {
  id: string; // unique cart entry id
  product: ProductItem;
  quantity: number;
  unitPrice: number;
  customizations?: {
    milk?: string;
    sugar?: string;
    served?: string;
    note?: string;
  };
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  activeOrder: ActiveOrder | null;
  onOrderCompleted: (order: ActiveOrder) => void;
  onUpdateOrderStatus: (status: 'preparing' | 'ready' | 'completed') => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  activeOrder,
  onOrderCompleted,
  onUpdateOrderStatus,
}: CartDrawerProps) {
  const [orderType, setOrderType] = useState<'pickup' | 'table'>('pickup');
  const [tableNumber, setTableNumber] = useState('12');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const taxes = Math.round((subtotal - discountAmount) * 0.05); // 5% GST on F&B
  const finalTotal = Math.max(0, subtotal - discountAmount + taxes);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'HAPPYBAKE10' || couponCode.trim().toUpperCase() === 'COFFEE10') {
      setAppliedDiscount(0.1);
      setDiscountMsg('10% happy bakery discount applied!');
    } else {
      setDiscountMsg('Invalid code. Try "HAPPYBAKE10"');
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const generatedId = `UB-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: ActiveOrder = {
        orderId: generatedId,
        status: 'preparing',
        itemsCount: cartItems.length,
        itemsSummary: cartItems.map((item) => `${item.quantity}x ${item.product.name}`),
        totalPaid: finalTotal,
        orderType,
        tableNumber: orderType === 'table' ? tableNumber : undefined,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        createdAt: Date.now(),
        prepDurationSeconds: 12, // 12-second interactive realistic demo countdown
        readyAt: Date.now() + 12000,
      };

      onOrderCompleted(newOrder);
      onClearCart();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#DECFBE]">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EBE3D0] flex items-center justify-between bg-[#FAF7F0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#4A2E18]" />
            <h3 className="font-serif font-bold text-base text-[#382210]">
              {activeOrder ? 'Live Order Status' : 'Your Order Bag'}
            </h3>
            {!activeOrder && (
              <span className="text-xs text-[#8C7460] font-mono">({cartItems.length})</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#8C7460] hover:text-[#382210] hover:bg-[#EBE3D0] rounded-md transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Content */}
        {activeOrder ? (
          /* Live Order Status Tracker View */
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            <OrderStatusTracker
              order={activeOrder}
              onUpdateStatus={onUpdateOrderStatus}
              onDismiss={onClose}
            />

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] rounded-md transition-colors"
            >
              Continue Browsing Menu
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border border-[#DECFBE] flex items-center justify-center text-[#8C7460]">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#382210]">Your Bag is Empty</h4>
            <p className="text-xs text-[#7A634E] max-w-xs leading-relaxed">
              Explore our freshly brewed coffees, warm buttery croissants, and artisan grilled sandwiches.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] rounded-md transition-colors"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          /* Items List & Checkout Form */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Order Mode Toggle */}
              <div className="bg-[#EFE8DC] p-1 rounded-lg flex gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                    orderType === 'pickup'
                      ? 'bg-[#4A2E18] text-white shadow-xs'
                      : 'text-[#6B533F] hover:text-[#382210]'
                  }`}
                >
                  Counter Pickup (15m)
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('table')}
                  className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
                    orderType === 'table'
                      ? 'bg-[#4A2E18] text-white shadow-xs'
                      : 'text-[#6B533F] hover:text-[#382210]'
                  }`}
                >
                  Dine-In Table Order
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 divide-y divide-[#EBE3D0]/60">
                {cartItems.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-md object-cover bg-[#EFE8DC] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-serif font-bold text-[#382210] truncate">
                          {item.product.name}
                        </h5>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#9D8471] hover:text-[#B23B2B] p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customizations && (
                        <div className="text-[11px] text-[#8C7460] mt-0.5 space-y-0.5">
                          {item.customizations.milk && <div>Milk: {item.customizations.milk}</div>}
                          {item.customizations.sugar && <div>Sweetness: {item.customizations.sugar}</div>}
                          {item.customizations.served && <div>Serve: {item.customizations.served}</div>}
                          {item.customizations.note && <div className="italic">&quot;{item.customizations.note}&quot;</div>}
                        </div>
                      )}

                      {/* Price and Quantity Stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-mono font-bold text-[#382210]">
                          ₹{item.unitPrice * item.quantity}
                        </span>
                        <div className="flex items-center border border-[#DECFBE] rounded bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#4A2E18] hover:bg-[#FAF7F0]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#4A2E18] hover:bg-[#FAF7F0]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-3 border-t border-[#EBE3D0]">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C7460]" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code (HAPPYBAKE10)"
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] uppercase placeholder:normal-case placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 text-xs font-medium text-[#4A2E18] bg-[#F5EBE1] hover:bg-[#EBE0D2] border border-[#DECFBE] rounded-md"
                  >
                    Apply
                  </button>
                </div>
                {discountMsg && (
                  <p
                    className={`text-[11px] mt-1 ${
                      appliedDiscount > 0 ? 'text-[#3D5440]' : 'text-[#8C7460]'
                    }`}
                  >
                    {discountMsg}
                  </p>
                )}
              </div>

              {/* Customer Contact Details */}
              <div className="pt-3 border-t border-[#EBE3D0] space-y-3">
                <span className="block text-xs font-semibold text-[#382210]">
                  Contact & Order Details
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] placeholder-[#9D8471] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                  />
                </div>

                {orderType === 'table' && (
                  <div>
                    <label className="block text-[11px] text-[#8C7460] mb-1">
                      Table Number (marked on wooden stand)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="E.g., 12"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#DECFBE] rounded-md text-[#382210] focus:outline-none focus:ring-1 focus:ring-[#5F7A61]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Summary & Order Button */}
            <div className="p-4 sm:p-5 bg-[#FAF7F0] border-t border-[#EBE3D0] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6B533F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₹{subtotal}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#3D5440]">
                    <span>Discount (10%)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST & Service (5%)</span>
                  <span className="font-mono tabular-nums">₹{taxes}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#382210] pt-1 border-t border-[#EBE3D0]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums">₹{finalTotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProcessOrder}
                disabled={isCheckingOut || !customerName.trim() || !customerPhone.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-white bg-[#4A2E18] hover:bg-[#382210] disabled:opacity-50 rounded-md transition-colors shadow-xs"
              >
                <span>
                  {isCheckingOut
                    ? 'Transmitting Order...'
                    : !customerName.trim() || !customerPhone.trim()
                    ? 'Enter Name & Phone to Confirm'
                    : `Confirm & Pay ₹${finalTotal}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

