import { useState, useEffect } from 'react';
import { 
  Presentation, 
  ShoppingBag, 
  Award, 
  Calculator, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Coffee, 
  PhoneCall, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { StoreHero } from './components/StoreHero';
import { MenuSection } from './components/MenuSection';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { LoyaltyHub } from './components/LoyaltyHub';
import { PresentationDeck } from './components/PresentationDeck';
import { FinancialCalculator } from './components/FinancialCalculator';
import { JuiceItem, CartItem, OrderRecord, StudentLoyaltyProfile } from './types/juice';
import { MENU_ITEMS } from './data/menuData';

const DEFAULT_LOYALTY: StudentLoyaltyProfile = {
  studentName: 'Zetech Scholar',
  regNumber: 'BCS-01-2041/2024',
  isVerifiedStudent: true,
  points: 240,
  punchCount: 5,
  freeDrinksAvailable: 0,
  totalOrdersCompleted: 5,
  totalKesSpent: 980,
  currentStreakDays: 3,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'store' | 'presentation' | 'loyalty' | 'calculator'>('store');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('frost_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [loyalty, setLoyalty] = useState<StudentLoyaltyProfile>(() => {
    try {
      const saved = localStorage.getItem('frost_loyalty');
      return saved ? JSON.parse(saved) : DEFAULT_LOYALTY;
    } catch {
      return DEFAULT_LOYALTY;
    }
  });

  const [customizingJuice, setCustomizingJuice] = useState<JuiceItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('frost_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('frost_loyalty', JSON.stringify(loyalty));
    } catch (e) {
      console.error(e);
    }
  }, [loyalty]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (customized: {
    juice: JuiceItem;
    customization: any;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }) => {
    const newItem: CartItem = {
      cartItemId: `cart_${Date.now()}_${Math.random()}`,
      juice: customized.juice,
      customization: customized.customization,
      quantity: customized.quantity,
      itemUnitPrice: customized.unitPrice,
      itemTotalPrice: customized.totalPrice,
    };

    setCart((prev) => [...prev, newItem]);
    showToast(`Added ${customized.juice.name} to order!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              itemTotalPrice: item.itemUnitPrice * newQty,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleCompleteOrder = (order: OrderRecord) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);

    // Update loyalty: add points and stamp
    let nextPunch = loyalty.punchCount + 1;
    let nextFree = loyalty.freeDrinksAvailable;
    if (nextPunch >= 8) {
      nextPunch = 0;
      nextFree += 1;
      showToast('🎉 Congratulations! You filled your 8th stamp! Free Jumbo Drink unlocked!');
    } else {
      showToast(`Order placed! +${order.pointsEarned} Frost Points & 1 Stamp earned!`);
    }

    setLoyalty({
      ...loyalty,
      punchCount: nextPunch,
      freeDrinksAvailable: nextFree,
      points: loyalty.points + order.pointsEarned,
      totalOrdersCompleted: loyalty.totalOrdersCompleted + 1,
      totalKesSpent: loyalty.totalKesSpent + order.total,
    });

    setActiveOrder(order);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + item.itemTotalPrice, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      {/* Presentation Switcher Top Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-400">Frost & Flavor Pitch Suite</span>
            <span className="text-stone-600">·</span>
            <span className="text-stone-400 hidden sm:inline">Zetech University Campus Business Presentation</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('presentation')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors focus:outline-none ${
                activeTab === 'presentation'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'text-stone-300 hover:text-white bg-stone-800'
              }`}
            >
              🎓 Pitch Deck Mode
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('store')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors focus:outline-none ${
                activeTab === 'store'
                  ? 'bg-orange-600 text-white font-bold'
                  : 'text-stone-300 hover:text-white bg-stone-800'
              }`}
            >
              🍹 Live Store App
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-10">
        {/* Presentation View */}
        {activeTab === 'presentation' && (
          <PresentationDeck
            onSwitchToStore={() => setActiveTab('store')}
            onOpenLoyalty={() => setActiveTab('loyalty')}
          />
        )}

        {/* Store & Menu View */}
        {activeTab === 'store' && (
          <div className="space-y-10">
            <StoreHero
              onExploreMenu={() => {
                const el = document.getElementById('menu-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenPitch={() => setActiveTab('presentation')}
              onOpenLoyalty={() => setActiveTab('loyalty')}
            />

            <div id="menu-section" className="pt-4">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Fresh Campus Menu</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                  Crafted for Focus, Energy & Flavor
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
                  Order online for instant collection at our Gate A kiosk or runner delivery straight to your hostel or campus lawn.
                </p>
              </div>

              <MenuSection
                isVerifiedStudent={loyalty.isVerifiedStudent}
                onSelectJuice={(juice) => setCustomizingJuice(juice)}
                onOpenLoyalty={() => setActiveTab('loyalty')}
              />
            </div>
          </div>
        )}

        {/* Student Loyalty Hub View */}
        {activeTab === 'loyalty' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider block">
                  Rewards & Perks
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                  Frost Pass Loyalty Program
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('store')}
                className="text-xs font-semibold px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors focus:outline-none"
              >
                Back to Menu
              </button>
            </div>

            <LoyaltyHub
              loyalty={loyalty}
              onUpdateLoyalty={(up) => setLoyalty(up)}
              onRedeemReward={(rewardName, pts) => {
                showToast(`Redeemed ${rewardName}!`);
              }}
            />
          </div>
        )}

        {/* Financial Calculator View */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider block">
                  Presentation Interactive Tool
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
                  Unit Economics & Payback Model
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Simulate daily cup volume, fruit costs from Murang’a farms, Gate A rent, and student barista payroll.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('presentation')}
                className="text-xs font-semibold px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-colors focus:outline-none"
              >
                Return to Pitch Deck
              </button>
            </div>

            <FinancialCalculator isEmbeddedInSlide={false} />
          </div>
        )}
      </main>

      {/* Drink Customizer Modal */}
      {customizingJuice && (
        <DrinkCustomizerModal
          juice={customizingJuice}
          isVerifiedStudent={loyalty.isVerifiedStudent}
          onClose={() => setCustomizingJuice(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        isVerifiedStudent={loyalty.isVerifiedStudent}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        cart={cart}
        loyalty={loyalty}
        onClose={() => setIsCheckoutOpen(false)}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Order Tracker Modal */}
      {activeOrder && (
        <OrderTrackerModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-950 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-stone-800 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white py-10 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-bold text-stone-900 text-sm block font-display">Frost & Flavor</span>
            <span className="text-stone-400 mt-0.5 block">
              Opposite Zetech University Gate A, Ruiru Campus · Open Mon-Sat 7:30 AM - 9:30 PM
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-500">
            <button
              type="button"
              onClick={() => setActiveTab('presentation')}
              className="hover:text-stone-900 transition-colors focus:outline-none"
            >
              Pitch Deck
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('store')}
              className="hover:text-stone-900 transition-colors focus:outline-none"
            >
              Online Ordering
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('loyalty')}
              className="hover:text-stone-900 transition-colors focus:outline-none"
            >
              Frost Pass Rewards
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className="hover:text-stone-900 transition-colors focus:outline-none"
            >
              Financial Model
            </button>
          </div>

          <div className="text-stone-400 text-[11px] text-center md:text-right">
            Lipa na M-Pesa Till: 89201 · Student Runner Hotline: +254 712 345 678
          </div>
        </div>
      </footer>
    </div>
  );
}
