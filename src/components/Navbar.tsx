import { ShoppingBag, Presentation, Sparkles } from 'lucide-react';

interface Props {
  activeTab: 'store' | 'presentation' | 'loyalty' | 'calculator';
  onSelectTab: (tab: 'store' | 'presentation' | 'loyalty' | 'calculator') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export function Navbar({
  activeTab,
  onSelectTab,
  cartCount,
  cartTotal,
  onOpenCart,
}: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button
          type="button"
          onClick={() => onSelectTab('store')}
          className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-orange-600 transition-colors focus:outline-none flex items-center gap-1.5"
        >
          <span className="font-display">Frost & Flavor</span>
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            type="button"
            onClick={() => onSelectTab('presentation')}
            className={`transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
              activeTab === 'presentation'
                ? 'text-orange-600 font-bold'
                : 'hover:text-stone-900'
            }`}
          >
            Pitch Deck
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('store')}
            className={`transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
              activeTab === 'store'
                ? 'text-orange-600 font-bold'
                : 'hover:text-stone-900'
            }`}
          >
            Juice Menu
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('loyalty')}
            className={`transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
              activeTab === 'loyalty'
                ? 'text-orange-600 font-bold'
                : 'hover:text-stone-900'
            }`}
          >
            Student Rewards
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('calculator')}
            className={`transition-colors whitespace-nowrap shrink-0 focus:outline-none ${
              activeTab === 'calculator'
                ? 'text-orange-600 font-bold'
                : 'hover:text-stone-900'
            }`}
          >
            Unit Economics
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeTab === 'presentation' ? (
            <button
              type="button"
              onClick={() => onSelectTab('store')}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs focus:outline-none flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Launch Store App</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenCart}
              className="px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs focus:outline-none flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-orange-400" />
              <span>Bag ({cartCount})</span>
              {cartTotal > 0 && (
                <span className="tabular-nums text-stone-300 border-l border-stone-700 pl-2">
                  KES {cartTotal}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
