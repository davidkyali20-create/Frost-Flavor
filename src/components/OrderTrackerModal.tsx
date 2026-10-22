import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { OrderRecord } from '../types/juice';

interface Props {
  order: OrderRecord;
  onClose: () => void;
  onUpdateStatus?: (status: OrderRecord['status']) => void;
}

export function OrderTrackerModal({ order, onClose }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180);

  useEffect(() => {
    // Auto step simulator
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const stepTimer = setTimeout(() => {
      setCurrentStep(2);
    }, 3500);

    const stepTimer2 = setTimeout(() => {
      setCurrentStep(3);
    }, 8500);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
      clearTimeout(stepTimer2);
    };
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { title: 'Order Verified', desc: order.mpesaRef ? `M-Pesa ${order.mpesaRef} Received` : 'Cash payment on collection' },
    { title: 'Cold Press & Blending', desc: 'Fresh farm fruits freshly crushed' },
    { title: 'Chilled with Frost', desc: 'Sealed with bamboo eco-straw' },
    { title: order.deliveryMethod === 'campus-pickup' ? 'Ready at Gate A Counter' : 'En Route with Runner', desc: order.deliveryLocation },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-200 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Student Order Tracker</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight mt-0.5">Order {order.orderNumber}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-stone-900">
          {/* Estimated Time Card */}
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <span className="text-xs text-stone-500 block">Estimated Prep & Delivery Time</span>
                <span className="text-xl font-black text-stone-900 tabular-nums">
                  {formatTimer(secondsRemaining)} mins
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-500 block">Order Total</span>
              <span className="text-sm font-bold text-orange-700 tabular-nums">KES {order.total}</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Preparation Progress</h3>
            <div className="relative pl-6 space-y-6 border-l-2 border-stone-200 ml-3">
              {steps.map((st, i) => {
                const isPassed = i <= currentStep;
                const isCurrent = i === currentStep;

                return (
                  <div key={i} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isPassed
                          ? 'border-orange-600 bg-orange-600 text-white'
                          : 'border-stone-300 bg-white text-stone-300'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="text-[10px]">{i + 1}</span>}
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-orange-600' : 'text-stone-900'}`}>
                        {st.title} {isCurrent && '(In Progress)'}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Details */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-stone-700">
              <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span className="font-medium truncate">{order.deliveryLocation}</span>
            </div>
            <div className="text-[11px] text-stone-500 flex justify-between pt-1 border-t border-stone-200/60">
              <span>Customer: {order.studentName}</span>
              <span>Earned: +{order.pointsEarned} Frost Points</span>
            </div>
          </div>

          {/* Simulation fast-forward */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
              className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors focus:outline-none"
            >
              Advance Kitchen Step Demo
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors focus:outline-none"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
