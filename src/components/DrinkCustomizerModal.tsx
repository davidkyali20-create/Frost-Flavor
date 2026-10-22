import { useState } from 'react';
import { X, Plus, Minus, Sparkles, Check, Flame, ShieldAlert } from 'lucide-react';
import { JuiceItem, CustomizationSelection, CupSize, IceLevel, SweetnessOption, BoosterAddon } from '../types/juice';
import { BOOSTER_ADDONS } from '../data/menuData';

interface Props {
  juice: JuiceItem;
  isVerifiedStudent: boolean;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    juice: JuiceItem;
    customization: CustomizationSelection;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }) => void;
}

export function DrinkCustomizerModal({ juice, isVerifiedStudent, onClose, onAddToCart }: Props) {
  const [size, setSize] = useState<CupSize>('regular');
  const [iceLevel, setIceLevel] = useState<IceLevel>('crushed-frost');
  const [sweetness, setSweetness] = useState<SweetnessOption>('light-natural');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  const basePrice = isVerifiedStudent ? juice.studentPrice : juice.price;

  const calculateUnitCost = () => {
    let price = basePrice;
    if (size === 'jumbo') price += 50;
    if (sweetness === 'raw-honey') price += 20;

    selectedAddons.forEach((addonId) => {
      const addon = BOOSTER_ADDONS.find((a) => a.id === addonId);
      if (addon) price += addon.price;
    });

    return price;
  };

  const unitPrice = calculateUnitCost();
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart({
      juice,
      customization: {
        size,
        iceLevel,
        sweetness,
        addons: selectedAddons,
        specialInstructions: instructions.trim() || undefined,
      },
      quantity,
      unitPrice,
      totalPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="relative h-44 sm:h-52 w-full bg-stone-100 overflow-hidden shrink-0">
          <img
            src={juice.imageUrl}
            alt={juice.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition-colors focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-300">
              <span>{juice.boostEffect}</span>
              <span aria-hidden="true">·</span>
              <span>{juice.calories} kcal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{juice.name}</h2>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-900">
          {/* Price Banner */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-100">
            <div>
              <span className="text-xs font-semibold text-orange-950 block">Zetech Student Special</span>
              <span className="text-[11px] text-orange-800">
                {isVerifiedStudent ? '15% Student Discount Applied' : 'Verify ID in Loyalty Hub for student discount'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-400 line-through mr-1.5 tabular-nums">
                KES {isVerifiedStudent ? juice.price : juice.price + 30}
              </span>
              <span className="text-lg font-bold text-orange-700 tabular-nums">
                KES {basePrice}
              </span>
            </div>
          </div>

          {/* Cup Size */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              1. Choose Cup Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSize('regular')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  size === 'regular'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-900">Regular (350ml)</span>
                  {size === 'regular' && <Check className="w-4 h-4 text-orange-600" />}
                </div>
                <span className="text-xs text-stone-500 mt-0.5 block">Standard Study Fuel</span>
              </button>

              <button
                type="button"
                onClick={() => setSize('jumbo')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  size === 'jumbo'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-900">Jumbo Frost (500ml)</span>
                  <span className="text-xs font-bold text-orange-600">+KES 50</span>
                </div>
                <span className="text-xs text-stone-500 mt-0.5 block">All-Day Exam Size</span>
              </button>
            </div>
          </div>

          {/* Ice & Frost Level */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              2. Ice & Frost Texture
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'crushed-frost', label: 'Crushed Frost', sub: 'Signature Chill' },
                { id: 'light-chill', label: 'Light Chill', sub: 'Smooth Slush' },
                { id: 'no-ice', label: 'No Ice', sub: '100% Pure Juice' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setIceLevel(lvl.id as IceLevel)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    iceLevel === lvl.id
                      ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs block font-bold">{lvl.label}</span>
                  <span className="text-[10px] text-stone-400 block">{lvl.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness Preference */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              3. Sweetness & Base
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'light-natural', label: 'Light Natural', sub: 'Natural fruit sugars only' },
                { id: 'sugarcane', label: 'Raw Sugarcane Juice', sub: 'Pressed local cane' },
                { id: 'raw-honey', label: 'Wild Forest Honey (+KES 20)', sub: 'Immunity booster' },
                { id: 'zero-sugar', label: 'Zero Added Sweetener', sub: 'Strictly tart & fresh' },
              ].map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  onClick={() => setSweetness(sw.id as SweetnessOption)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    sweetness === sw.id
                      ? 'border-orange-500 bg-orange-50/50 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <span className="block font-bold">{sw.label}</span>
                  <span className="text-[10px] text-stone-400">{sw.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Power Add-ons */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              4. Power Boosters (Optional)
            </label>
            <div className="space-y-2">
              {BOOSTER_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/40 text-stone-900'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">{addon.name}</span>
                        <span className="text-[11px] text-orange-600 font-semibold tabular-nums">+KES {addon.price}</span>
                      </div>
                      <span className="text-[11px] text-stone-400">{addon.benefit}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isSelected ? 'bg-orange-600 border-orange-600 text-white' : 'border-stone-300'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">
              Delivery or Prep Notes (e.g. "Deliver to Gate A Bench" or "Extra cold")
            </label>
            <input
              type="text"
              placeholder="Any specific note for the barista..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-xl border border-stone-200">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-40 focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold w-6 text-center tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-lg text-stone-600 hover:bg-stone-100 focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-between focus:outline-none"
          >
            <span>Add to Order</span>
            <span className="tabular-nums">KES {totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
