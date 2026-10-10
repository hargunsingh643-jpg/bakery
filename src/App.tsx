/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { JsonDataModal } from './components/JsonDataModal';
import { OrderStatusTracker, ActiveOrder } from './components/OrderStatusTracker';
import { ProductItem } from './data/cafeData';
import { ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isTrackerDismissed, setIsTrackerDismissed] = useState(false);

  // Active Order state with localStorage persistence
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(() => {
    try {
      const saved = localStorage.getItem('ub_active_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem('ub_active_order', JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem('ub_active_order');
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [activeOrder]);

  // Cart state initialized with sensible localStorage fallback
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ub_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ub_cart_items', JSON.stringify(cartItems));
    } catch {
      // Ignore localStorage errors
    }
  }, [cartItems]);

  // Track active section on scroll for smooth top bar highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle web audio chime for "Ready for Pickup"
  const playReadyChime = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Update order status handler
  const handleUpdateOrderStatus = useCallback(
    (newStatus: 'preparing' | 'ready' | 'completed') => {
      if (newStatus === 'completed') {
        setActiveOrder(null);
        setIsTrackerDismissed(false);
      } else {
        if (newStatus === 'ready' && activeOrder?.status === 'preparing') {
          playReadyChime();
        }
        setActiveOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    },
    [activeOrder?.status, playReadyChime]
  );

  const handleOrderCompleted = (newOrder: ActiveOrder) => {
    setActiveOrder(newOrder);
    setIsTrackerDismissed(false);
    setIsCartOpen(true);
  };

  // Cart Handlers
  const handleQuickAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.customizations);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity: 1,
          unitPrice: product.price,
        },
      ];
    });
  };

  const handleAddWithCustomization = (
    product: ProductItem,
    quantity: number,
    customizations: { milk?: string; sugar?: string; served?: string; note?: string }
  ) => {
    let unitExtra = 0;
    if (customizations.milk?.includes('+₹40')) unitExtra += 40;
    if (customizations.served?.includes('+₹30')) unitExtra += 30;

    const unitPrice = product.price + unitExtra;

    setCartItems((prev) => [
      ...prev,
      {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity,
        unitPrice,
        customizations,
      },
    ]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2C2117]">
      {/* Top Bar Navigation */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        activeSection={activeSection}
        activeOrder={activeOrder}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onViewBusinessData={() => setIsJsonModalOpen(true)}
        />
        <AboutSection />
        <MenuSection
          onAddToCart={handleQuickAddToCart}
          onOpenProductModal={(product) => setSelectedProduct(product)}
        />
        <GallerySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onViewBusinessData={() => setIsJsonModalOpen(true)}
      />

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartWithCustomization={handleAddWithCustomization}
      />

      {/* Cart & Checkout Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        activeOrder={activeOrder}
        onOrderCompleted={handleOrderCompleted}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Business JSON Export / Copy Modal */}
      <JsonDataModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
      />

      {/* Floating Active Order Status Toast Bar */}
      {activeOrder && !isCartOpen && !isTrackerDismissed && (
        <OrderStatusTracker
          order={activeOrder}
          compact={true}
          onUpdateStatus={handleUpdateOrderStatus}
          onDismiss={() => setIsTrackerDismissed(true)}
          onOpenFullView={() => setIsCartOpen(true)}
        />
      )}

      {/* Floating Mobile Cart Trigger if items present and no tracker active */}
      {totalCartCount > 0 && !isCartOpen && (!activeOrder || isTrackerDismissed) && (
        <aside
          aria-label="Order summary floating bar"
          className="md:hidden fixed bottom-4 right-4 z-30"
        >
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`View order bag with ${totalCartCount} items`}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#4A2E18] text-white rounded-full shadow-lg text-xs font-semibold hover:bg-[#382210] active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Bag</span>
            <span className="bg-[#5F7A61] px-1.5 py-0.5 rounded-full text-[11px] font-bold">
              {totalCartCount}
            </span>
          </button>
        </aside>
      )}
    </div>
  );
}

