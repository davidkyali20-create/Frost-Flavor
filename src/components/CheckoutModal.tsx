import { useState } from 'react';
import { X, Check, Smartphone, MapPin, Building, CreditCard, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { CartItem, OrderRecord, DeliveryMethod, StudentLoyaltyProfile } from '../types/juice';
import { CAMPUS_PICKUP_POINTS } from '../data/menuData';

interface Props {
  isOpen: boolean;
  cart: CartItem[];
  loyalty: StudentLoyaltyProfile;
  onClose: () => void;
  onCompleteOrder: (order: OrderRecord) => void;
}

export function CheckoutModal({ isOpen, cart, loyalty, onClose, onCompleteOrder }: Props) {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('campus-pickup');
  const [selectedLocation, setSelectedLocation] = useState(CAMPUS_PICKUP_POINTS[0].name);
  const [roomNote, setRoomNote] = useState('');
  const [studentName, setStudentName] = useState(loyalty.studentName || 'Student Guest');
  const [studentPhone, setStudentPhone] = useState('0712345678');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'whatsapp' | 'cash-on-pickup'>('mpesa');
  const [usePointsDiscount, setUsePointsDiscount] = useState(false);
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [mpesaPromptReceived, setMpesaPromptReceived] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = deliveryMethod === 'hostel-delivery' ? 20 : 0;
  const pointsDiscount = usePointsDiscount && loyalty.points >= 100 ? 50 : 0;
  const total = Math.max(0, rawSubtotal + deliveryFee - pointsDiscount);
  const pointsToEarn = Math.floor(total * 0.2); // 1 point per 5 KES

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'whatsapp') {
      // Build WhatsApp message
      const itemsList = cart.map(i => `• ${i.quantity}x ${i.juice.name} (${i.customization.size}, ${i.customization.iceLevel}) - KSh ${i.itemTotalPrice}`).join('%0A');
      const locationText = deliveryMethod === 'campus-pickup' ? selectedLocation : `${selectedLocation} (${roomNote || 'Direct delivery'})`;
      const waText = `*New Order from Frost & Flavor (The Fresh Bar)*%0A%0A*Customer:* ${encodeURIComponent(studentName)} (${studentPhone})%0A*Delivery Location:* ${encodeURIComponent(locationText)}%0A%0A*Items:*%0A${itemsList}%0A%0A*Total Amount:* KSh ${total}%0A*Payment:* Lipa na M-Pesa Till 89201%0A*Delivery Time:* 15-20 Mins`;
      
      window.open(`https://wa.me/254712345678?text=${waText}`, '_blank');
      finalizeOrder();
    } else if (paymentMethod === 'mpesa') {
      setIsProcessingMpesa(true);
      // Simulate STK Push prompt delay
      setTimeout(() => {
        setMpesaPromptReceived(true);
        setTimeout(() => {
          finalizeOrder();
        }, 1600);
      }, 1000);
    } else {
      finalizeOrder();
    }
  };

  const finalizeOrder = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const mpesaRef = `QHK${randomSuffix}ZET`;
    const newOrder: OrderRecord = {
      id: `ord_${Date.now()}`,
      orderNumber: `#FF-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal: rawSubtotal,
      discount: pointsDiscount,
      deliveryFee,
      total,
      deliveryMethod,
      deliveryLocation: deliveryMethod === 'campus-pickup' ? selectedLocation : `${selectedLocation} (${roomNote || 'Direct handoff'})`,
      studentName,
      studentPhone,
      studentRegNo: loyalty.regNumber,
      paymentMethod,
      mpesaRef: paymentMethod === 'mpesa' ? mpesaRef : undefined,
      status: 'received',
      pointsEarned: pointsToEarn,
    };

    setIsProcessingMpesa(false);
    setMpesaPromptReceived(false);
    onCompleteOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider block">Frost & Flavor Order</span>
            <h2 className="text-lg font-bold text-stone-900">Student Express Checkout</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-stone-900">
          {/* M-Pesa Simulation Overlay */}
          {isProcessingMpesa && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center animate-pulse">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {mpesaPromptReceived ? 'M-Pesa PIN Entered & Verified' : 'Simulating M-Pesa STK Push Prompt'}
                  </h4>
                  <p className="text-xs text-emerald-700">
                    {mpesaPromptReceived
                      ? 'Payment of KES ' + total + ' to Frost & Flavor Till #89201 confirmed.'
                      : 'Please check your phone ' + studentPhone + ' to enter your M-Pesa PIN.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fulfillment Method */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              1. Fulfillment Choice
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod('campus-pickup')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'campus-pickup'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-stone-900">Kiosk Counter Pickup</span>
                </div>
                <span className="text-[11px] text-stone-500 block mt-1">Opposite Zetech Gate A (Free)</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('hostel-delivery')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'hostel-delivery'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-stone-900">Campus / Hostel Drop</span>
                </div>
                <span className="text-[11px] text-stone-500 block mt-1">Direct to your bench or hostel (+KES 30)</span>
              </button>
            </div>
          </div>

          {/* Location Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              2. Pickup Point / Delivery Drop
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-stone-800 focus:outline-none focus:border-orange-500"
            >
              {CAMPUS_PICKUP_POINTS.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name} ({loc.timeEstimate})
                </option>
              ))}
            </select>

            {deliveryMethod === 'hostel-delivery' && (
              <input
                type="text"
                placeholder="Specific room or landmark (e.g. Ruiru Heights Block B, Room 204)"
                value={roomNote}
                onChange={(e) => setRoomNote(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 mt-2"
              />
            )}
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Student Name</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">M-Pesa Phone Number</label>
              <input
                type="tel"
                required
                placeholder="0712345678"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          {/* Loyalty Rewards Checkbox */}
          {loyalty.points >= 100 && (
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-900 block">Redeem Frost Points</span>
                <span className="text-[11px] text-orange-700">Use 100 points for an instant KES 50 discount</span>
              </div>
              <input
                type="checkbox"
                checked={usePointsDiscount}
                onChange={(e) => setUsePointsDiscount(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
            </div>
          )}

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
              3. Payment & Dispatch Method
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'mpesa'
                    ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="font-bold block text-emerald-800">Lipa na M-Pesa</span>
                <span className="text-[10px] text-stone-400">STK Push Till 89201</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'whatsapp'
                    ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="font-bold block text-emerald-700">Express WhatsApp</span>
                <span className="text-[10px] text-stone-400">1-Tap Message Bot</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash-on-pickup')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'cash-on-pickup'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500 text-stone-900'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="font-bold block text-stone-900">Pay on Delivery</span>
                <span className="text-[10px] text-stone-400">Cash / M-Pesa at desk</span>
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
            <div className="flex justify-between text-stone-600">
              <span>Items Total ({cart.length} items)</span>
              <span className="tabular-nums">KES {rawSubtotal}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Campus Hostel Runner</span>
                <span className="tabular-nums">+KES {deliveryFee}</span>
              </div>
            )}
            {pointsDiscount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Frost Points Discount</span>
                <span className="tabular-nums">-KES {pointsDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Amount</span>
              <span className="tabular-nums text-orange-600">KES {total}</span>
            </div>
            <div className="flex justify-between text-[11px] text-amber-700 font-medium pt-1">
              <span>Points Earned on this Order:</span>
              <span className="tabular-nums">+{pointsToEarn} Frost Points</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isProcessingMpesa}
            className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 focus:outline-none"
          >
            <span>{paymentMethod === 'mpesa' ? 'Confirm & Trigger M-Pesa (KES ' + total + ')' : 'Place Order for Collection'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
