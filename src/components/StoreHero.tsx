import { Sparkles, ArrowRight, ShieldCheck, MapPin, Presentation, Clock, MessageCircle, Check } from 'lucide-react';

interface Props {
  onExploreMenu: () => void;
  onOpenPitch: () => void;
  onOpenLoyalty: () => void;
}

export function StoreHero({ onExploreMenu, onOpenPitch, onOpenLoyalty }: Props) {
  return (
    <div className="space-y-6">
      {/* 2-Column Split Hero in signature theme */}
      <div className="rounded-3xl border border-stone-200/90 bg-white overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Story & CTAs (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            {/* Clean unboxed metadata with separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-orange-700 mb-3">
              <span>Zetech Main Gate, Ruiru</span>
              <span aria-hidden="true">·</span>
              <span>Natural Juices & Fresh Yogurt</span>
              <span aria-hidden="true">·</span>
              <span>Express WhatsApp Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.15]">
              Frost & Flavor
            </h1>
            <div className="text-xl sm:text-2xl text-amber-600 font-serif italic font-semibold mt-1">
              The Fresh Bar
            </div>

            <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed max-w-xl">
              Ice-cold natural juices and fresh yogurt with express WhatsApp delivery for students, lecturers, and staff in Ruiru. Prepared fresh in under 90 seconds and delivered in 15-20 minutes.
            </p>

            {/* Value Highlights matching the presentation proposal */}
            <div className="mt-6 space-y-2.5 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                <span><strong>Natural Juices & Drinking Yogurt:</strong> Starting from student-friendly <strong>KSh 70</strong>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span><strong>Frost Pass Loyalty:</strong> Buy 7 cups, get your <strong>8th Drink FREE</strong>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span><strong>Express Campus Delivery:</strong> Delivered directly to lecture halls, offices, and hostels.</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreMenu}
              className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2 focus:outline-none"
            >
              <span>Order Juice & Yogurt (from KSh 70)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenPitch}
              className="px-5 py-3 bg-[#0B2533] hover:bg-[#0F3547] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs focus:outline-none"
            >
              <Presentation className="w-4 h-4 text-amber-400" />
              <span>Interactive Pitch Deck</span>
            </button>

            <button
              type="button"
              onClick={onOpenLoyalty}
              className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors focus:outline-none"
            >
              Frost Pass Rewards (8th Free)
            </button>
          </div>
        </div>

        {/* Right Column: Hero Image (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-stone-100">
          <img
            src="/src/assets/images/hero_frost_juice_bar_1792669804783.jpg"
            alt="Frost and Flavor artisanal fresh juice bar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent lg:hidden" />
          
          <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-xs hidden sm:block">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Zetech Campus Menu</span>
              <span className="text-orange-600 font-bold">KSh 70 – 120</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Fresh Juices · Drinking Yogurt · Granola Parfait Cups
            </p>
          </div>
        </div>
      </div>

      {/* 4-Column KPI Strip matching Presentation Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block">Startup Capital</span>
          <div className="text-2xl font-black text-stone-900 mt-1 tabular-nums">KSh 45,000</div>
          <span className="text-[11px] text-stone-400">Lean, agile rollout</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block">Monthly Net Profit</span>
          <div className="text-2xl font-black text-amber-600 mt-1 tabular-nums">KSh 41,589</div>
          <span className="text-[11px] text-stone-400">Target baseline economics</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block">Starting Price</span>
          <div className="text-2xl font-black text-orange-600 mt-1 tabular-nums">KSh 70</div>
          <span className="text-[11px] text-stone-400">Natural juice vs soda</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 block">Express Delivery</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 tabular-nums">15-20 Min</div>
          <span className="text-[11px] text-stone-400">WhatsApp campus runners</span>
        </div>
      </div>
    </div>
  );
}
