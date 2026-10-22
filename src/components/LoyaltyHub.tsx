import { useState } from 'react';
import { Award, Sparkles, Check, Gift, Zap, ShieldCheck, RefreshCw, Trophy, Coffee } from 'lucide-react';
import { StudentLoyaltyProfile } from '../types/juice';

interface Props {
  loyalty: StudentLoyaltyProfile;
  onUpdateLoyalty: (updated: StudentLoyaltyProfile) => void;
  onRedeemReward?: (rewardName: string, pointsCost: number) => void;
  onClose?: () => void;
}

export function LoyaltyHub({ loyalty, onUpdateLoyalty, onRedeemReward, onClose }: Props) {
  const [studentInputReg, setStudentInputReg] = useState(loyalty.regNumber || '');
  const [studentInputName, setStudentInputName] = useState(loyalty.studentName || '');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleVerifyStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentInputReg.trim() || !studentInputName.trim()) return;

    const updated: StudentLoyaltyProfile = {
      ...loyalty,
      studentName: studentInputName,
      regNumber: studentInputReg.toUpperCase(),
      isVerifiedStudent: true,
      points: loyalty.points + 200, // Welcome gift
    };

    onUpdateLoyalty(updated);
    setVerificationSuccess(true);
    setTimeout(() => setVerificationSuccess(false), 4000);
  };

  const handleManualStampDemo = () => {
    let nextPunch = loyalty.punchCount + 1;
    let nextFree = loyalty.freeDrinksAvailable;
    let bonusPoints = loyalty.points + 25;

    if (nextPunch >= 8) {
      nextPunch = 0;
      nextFree += 1;
    }

    onUpdateLoyalty({
      ...loyalty,
      punchCount: nextPunch,
      freeDrinksAvailable: nextFree,
      points: bonusPoints,
      totalOrdersCompleted: loyalty.totalOrdersCompleted + 1,
    });
  };

  const handleSpinDailyWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);

    const rewards = [
      { text: '+50 Bonus Frost Points!', pts: 50 },
      { text: 'Free Chia Seed Booster on your next order!', pts: 20 },
      { text: '+100 Exam Week Points!', pts: 100 },
      { text: 'Free Warm Mandazi Voucher with next Juice!', pts: 30 },
      { text: '+75 Student Hydration Points!', pts: 75 },
    ];

    setTimeout(() => {
      const picked = rewards[Math.floor(Math.random() * rewards.length)];
      setSpinResult(picked.text);
      setIsSpinning(false);
      onUpdateLoyalty({
        ...loyalty,
        points: loyalty.points + picked.pts,
        lastSpinDate: new Date().toISOString(),
      });
    }, 1200);
  };

  const rewardsCatalog = [
    { id: 'kes-50-off', name: 'KES 50 Discount Voucher', pointsCost: 100, desc: 'Deducted directly at checkout' },
    { id: 'free-booster', name: 'Free Power Booster (Chia/Ginger/Boba)', pointsCost: 180, desc: 'Add extra punch to any juice' },
    { id: 'free-regular-juice', name: 'Free Regular 350ml Frost Juice', pointsCost: 350, desc: 'Any flavor from the campus menu' },
    { id: 'free-jumbo-combo', name: 'Free Jumbo 500ml + Mandazi Combo', pointsCost: 550, desc: 'The ultimate student fuel pack' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 p-6 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-200">
              <Sparkles className="w-4 h-4" />
              <span>Zetech Campus Rewards Club</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">Frost Pass</h2>
            <p className="text-sm text-orange-100 max-w-xl mt-1">
              Drink fresh, study energized, and earn free juices with every sip near Zetech University Ruiru.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-center min-w-[120px]">
              <span className="block text-xs text-orange-100 font-medium">Frost Points</span>
              <span className="text-2xl font-black tabular-nums">{loyalty.points}</span>
            </div>

            {loyalty.freeDrinksAvailable > 0 && (
              <div className="bg-amber-400 text-stone-900 px-4 py-3 rounded-xl font-bold text-center min-w-[110px] shadow-sm animate-bounce">
                <span className="block text-[10px] uppercase tracking-wider">Free Drinks</span>
                <span className="text-xl font-black">{loyalty.freeDrinksAvailable} Ready</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 8-Stamp Punch Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
              <Award className="w-4 h-4" />
              <span>Digital Punch Card</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">Buy 7 Juices, Get the 8th FREE</h3>
            <p className="text-xs text-stone-500 mt-0.5">Every juice purchase adds 1 stamp. Collect 8 to claim any Jumbo 500ml cooler on the house.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleManualStampDemo}
              className="text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-lg transition-colors focus:outline-none"
            >
              + Test Stamp Demo
            </button>
          </div>
        </div>

        {/* Stamps Row */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-6">
          {Array.from({ length: 8 }).map((_, index) => {
            const isFilled = index < loyalty.punchCount;
            const isEighth = index === 7;

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isFilled
                    ? 'border-orange-500 bg-orange-500 text-white shadow-xs'
                    : isEighth
                    ? 'border-dashed border-amber-400 bg-amber-50/70 text-amber-800'
                    : 'border-dashed border-stone-300 bg-stone-50/50 text-stone-400'
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1">
                  {isFilled ? (
                    <Check className="w-5 h-5 stroke-[3]" />
                  ) : isEighth ? (
                    <Gift className="w-5 h-5 text-amber-600 animate-pulse" />
                  ) : (
                    <Coffee className="w-4 h-4 text-stone-300" />
                  )}
                </div>
                <span className="text-[11px] font-bold">
                  {isEighth ? 'FREE!' : `Cup #${index + 1}`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
          <span>Current progress: <strong>{loyalty.punchCount} of 8 stamps</strong> filled</span>
          <span>{8 - loyalty.punchCount} more cups until your next free Jumbo Frost!</span>
        </div>
      </div>

      {/* Two Column Grid: Student ID Verification + Daily Flavor Wheel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Verification */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant 15% Student Discount</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-1">Zetech Student Verification</h3>
            <p className="text-xs text-stone-500 mt-1">
              Verify your Zetech Student admission number to unlock automatic 15% student pricing on all juices and 200 welcome points.
            </p>

            {loyalty.isVerifiedStudent ? (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-900 block">Verified Zetech Student</span>
                  <span className="text-xs text-emerald-700 block font-mono mt-0.5">{loyalty.regNumber} · {loyalty.studentName}</span>
                  <span className="text-[11px] text-emerald-600 block mt-1">15% discount active automatically on all cart orders.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifyStudent} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Mwangi"
                    value={studentInputName}
                    onChange={(e) => setStudentInputName(e.target.value)}
                    className="mt-1 w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700">Zetech Reg Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BCS-01-0892/2024"
                    value={studentInputReg}
                    onChange={(e) => setStudentInputReg(e.target.value)}
                    className="mt-1 w-full text-xs px-3 py-2 rounded-lg border border-stone-300 uppercase font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-xs font-semibold py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors focus:outline-none"
                >
                  Verify & Claim 200 Bonus Points
                </button>
              </form>
            )}

            {verificationSuccess && (
              <p className="mt-2 text-xs font-medium text-emerald-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Verified successfully! +200 Frost Points credited.</span>
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
            Valid for all Zetech Main Campus (Ruiru) and Technology Park students.
          </div>
        </div>

        {/* Daily Flavor Wheel / Brain Freeze Perk */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
              <Zap className="w-4 h-4" />
              <span>Daily Student Perk</span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-1">Daily Campus Flavor Spin</h3>
            <p className="text-xs text-stone-500 mt-1">
              Spin once per day for a surprise study booster perk, bonus points, or free add-ons!
            </p>

            <div className="mt-4 text-center p-6 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col items-center justify-center">
              <div className={`w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-sm mb-3 ${isSpinning ? 'animate-spin' : ''}`}>
                <RefreshCw className="w-6 h-6" />
              </div>

              {spinResult ? (
                <div className="space-y-1">
                  <span className="text-xs text-stone-500">Today’s Win:</span>
                  <div className="text-sm font-bold text-orange-600">{spinResult}</div>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-xs font-medium text-stone-700">Ready to test your luck?</span>
                  <p className="text-[11px] text-stone-400">Guaranteed prize on every daily spin.</p>
                </div>
              )}

              <button
                type="button"
                disabled={isSpinning}
                onClick={handleSpinDailyWheel}
                className="mt-4 text-xs font-semibold px-5 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-lg transition-colors focus:outline-none"
              >
                {isSpinning ? 'Spinning...' : 'Spin Daily Wheel'}
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
            Resets daily at 00:00 EAT. Points apply instantly to your balance.
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-700">
              <Trophy className="w-4 h-4" />
              <span>Rewards Marketplace</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">Redeem Your Frost Points</h3>
          </div>
          <span className="text-xs font-semibold text-stone-500 tabular-nums">
            Available: {loyalty.points} pts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {rewardsCatalog.map((r) => {
            const canAfford = loyalty.points >= r.pointsCost;
            return (
              <div
                key={r.id}
                className="p-4 rounded-xl border border-stone-200/90 bg-stone-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span>{r.name}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">{r.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600 tabular-nums">{r.pointsCost} Pts</span>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      if (canAfford) {
                        onUpdateLoyalty({
                          ...loyalty,
                          points: loyalty.points - r.pointsCost,
                        });
                        if (onRedeemReward) {
                          onRedeemReward(r.name, r.pointsCost);
                        }
                      }
                    }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors focus:outline-none ${
                      canAfford
                        ? 'bg-stone-900 hover:bg-stone-800 text-white'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem' : 'Need More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
