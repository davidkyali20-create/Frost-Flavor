import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types/juice';
import { BOOSTER_ADDONS } from '../data/menuData';

interface Props {
  isOpen: boolean;
  cart: CartItem[];
  isVerifiedStudent: boolean;
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  cart,
  isVerifiedStudent,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: Props) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.itemTotalPrice, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900">Your Student Order</h2>
                <span className="text-xs text-stone-500">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in bag
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Status Indicator */}
          {isVerifiedStudent ? (
            <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zetech Student Discount Applied</span>
              </span>
              <span className="font-bold text-emerald-700">15% OFF</span>
            </div>
          ) : (
            <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-100 text-xs text-amber-900 flex items-center justify-between">
              <span>Have a Zetech Student ID?</span>
              <span className="font-semibold text-amber-800">Save 15%</span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <ShoppingBag className="w-12 h-12 stroke-1 text-stone-300 mb-3" />
                <h3 className="text-base font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Explore our cold-pressed juices, frosted smoothies, and student combos near Zetech!
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors focus:outline-none"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const addonNames = item.customization.addons
                  .map((aId) => BOOSTER_ADDONS.find((a) => a.id === aId)?.name)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.juice.imageUrl}
                          alt={item.juice.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{item.juice.name}</h4>
                          <span className="text-[11px] text-stone-500 capitalize block">
                            {item.customization.size} ({item.customization.size === 'jumbo' ? '500ml' : '350ml'}) · {item.customization.iceLevel.replace('-', ' ')}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 p-1 rounded-md transition-colors focus:outline-none"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {addonNames && (
                      <div className="text-[11px] text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                        + Boosters: {addonNames}
                      </div>
                    )}

                    {item.customization.specialInstructions && (
                      <div className="text-[11px] text-stone-500 italic">
                        "{item.customization.specialInstructions}"
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5 focus:outline-none"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold w-4 text-center tabular-nums">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-stone-500 hover:text-stone-900 p-0.5 focus:outline-none"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-stone-900 tabular-nums">
                        KES {item.itemTotalPrice}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold tabular-nums">KES {subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Campus Pickup / Hostels</span>
                  <span className="font-semibold text-emerald-700">Free Pickup (or KES 30 Runner)</span>
                </div>
                <div className="flex justify-between text-stone-900 text-sm font-bold pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="tabular-nums text-orange-600">KES {subtotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 focus:outline-none"
              >
                <span>Proceed to Student Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Fast M-Pesa STK push & Campus Pickup opposite Zetech Gate A
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
