import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  isEmbeddedInSlide?: boolean;
}

export function FinancialCalculator({ isEmbeddedInSlide = false }: Props) {
  // Calibrated to user's exact slide: KSh 45,000 startup capital, KSh 41,589 monthly net profit
  const [dailyCups, setDailyCups] = useState(50);
  const [avgPrice, setAvgPrice] = useState(85);
  const [cogsPercent, setCogsPercent] = useState(32);
  const [monthlyRent, setMonthlyRent] = useState(12000);
  const [staffWages, setStaffWages] = useState(15000);
  const [utilities, setUtilities] = useState(6551);
  const initialCapEx = 45000;

  const calculations = useMemo(() => {
    const tradingDaysPerMonth = 26;
    const monthlyCups = dailyCups * tradingDaysPerMonth;
    const monthlyRevenue = monthlyCups * avgPrice;
    const fruitAndCupCostPerCup = (avgPrice * cogsPercent) / 100;
    const monthlyCogs = monthlyCups * fruitAndCupCostPerCup;
    const monthlyGrossProfit = monthlyRevenue - monthlyCogs;
    const grossMarginPercent = Math.round((monthlyGrossProfit / monthlyRevenue) * 100);

    const totalOpex = monthlyRent + staffWages + utilities;
    const netMonthlyProfit = Math.round(monthlyGrossProfit - totalOpex);
    const netMarginPercent = Math.round((netMonthlyProfit / monthlyRevenue) * 100);
    const annualizedNetProfit = netMonthlyProfit * 12;

    const paybackMonths = netMonthlyProfit > 0 
      ? Math.max(0.5, (initialCapEx / netMonthlyProfit)).toFixed(1)
      : 'N/A';

    const breakevenCupsPerDay = Math.ceil(
      totalOpex / (tradingDaysPerMonth * (avgPrice - fruitAndCupCostPerCup))
    );

    return {
      monthlyCups,
      monthlyRevenue,
      monthlyGrossProfit,
      grossMarginPercent,
      totalOpex,
      netMonthlyProfit,
      netMarginPercent,
      annualizedNetProfit,
      paybackMonths,
      breakevenCupsPerDay,
    };
  }, [dailyCups, avgPrice, cogsPercent, monthlyRent, staffWages, utilities]);

  const applyPreset = (preset: 'slide-target' | 'conservative' | 'exam-rush') => {
    if (preset === 'slide-target') {
      setDailyCups(50);
      setAvgPrice(85);
      setCogsPercent(32);
      setMonthlyRent(12000);
      setStaffWages(15000);
      setUtilities(6551);
    } else if (preset === 'conservative') {
      setDailyCups(35);
      setAvgPrice(80);
      setCogsPercent(34);
      setMonthlyRent(12000);
      setStaffWages(12000);
      setUtilities(6000);
    } else {
      setDailyCups(90);
      setAvgPrice(95);
      setCogsPercent(30);
      setMonthlyRent(12000);
      setStaffWages(20000);
      setUtilities(8000);
    }
  };

  return (
    <div className={`rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm ${isEmbeddedInSlide ? 'max-w-4xl mx-auto' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Calculator className="w-4 h-4" />
            <span>Unit Economics & Startup Capital Model</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mt-1">Zetech Main Gate Financial Simulator</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Startup Capital: <strong className="text-stone-900 font-mono">KSh 45,000</strong> · Baseline Target: <strong className="text-emerald-700 font-mono">KSh 41,589 Net Profit</strong>
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
          <button
            type="button"
            onClick={() => applyPreset('slide-target')}
            className="px-2.5 py-1 text-xs font-bold rounded-md bg-white text-stone-900 shadow-xs focus:outline-none"
          >
            Proposal Baseline (KSh 41,589)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('conservative')}
            className="px-2.5 py-1 text-xs font-medium rounded-md transition-colors text-stone-600 hover:text-stone-900 focus:outline-none"
          >
            Conservative (35 cups)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('exam-rush')}
            className="px-2.5 py-1 text-xs font-medium rounded-md transition-colors text-stone-600 hover:text-stone-900 focus:outline-none"
          >
            Exam Rush (90 cups)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Sliders Area (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Daily Cups Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-stone-700">
              <span>Daily Cups Sold (Near Zetech Main Gate)</span>
              <span className="font-bold text-stone-900 tabular-nums">{dailyCups} cups / day</span>
            </div>
            <input
              type="range"
              min="20"
              max="150"
              step="2"
              value={dailyCups}
              onChange={(e) => setDailyCups(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>20 cups</span>
              <span className="text-amber-800 font-semibold">Breakeven: {calculations.breakevenCupsPerDay} cups/day</span>
              <span>150 cups (High rush)</span>
            </div>
          </div>

          {/* Average Selling Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-stone-700">
              <span>Average Drink Price (Juice KSh 70-100 / Yogurt KSh 90-120)</span>
              <span className="font-bold text-stone-900 tabular-nums">KSh {avgPrice}</span>
            </div>
            <input
              type="range"
              min="70"
              max="140"
              step="5"
              value={avgPrice}
              onChange={(e) => setAvgPrice(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>KSh 70 (Regular Juice)</span>
              <span>KSh 140 (Combo Pack)</span>
            </div>
          </div>

          {/* Fruit, Yogurt & Packaging COGS */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-stone-700">
              <span>Raw Materials COGS (%)</span>
              <span className="font-bold text-stone-900 tabular-nums">{cogsPercent}% (KSh {Math.round((avgPrice * cogsPercent) / 100)}/cup)</span>
            </div>
            <input
              type="range"
              min="24"
              max="42"
              step="1"
              value={cogsPercent}
              onChange={(e) => setCogsPercent(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>24% (Kiambu Farm gate)</span>
              <span>42% (Supermarket retail)</span>
            </div>
          </div>

          {/* Fixed Monthly Costs Grid */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <label className="block text-[11px] text-stone-500 font-medium truncate">Gate A Space Rent</label>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xs text-stone-400">KSh</span>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Math.max(3000, Number(e.target.value)))}
                  className="w-full bg-transparent text-sm font-semibold text-stone-800 tabular-nums focus:outline-none"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <label className="block text-[11px] text-stone-500 font-medium truncate">Student Runners</label>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xs text-stone-400">KSh</span>
                <input
                  type="number"
                  value={staffWages}
                  onChange={(e) => setStaffWages(Math.max(5000, Number(e.target.value)))}
                  className="w-full bg-transparent text-sm font-semibold text-stone-800 tabular-nums focus:outline-none"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <label className="block text-[11px] text-stone-500 font-medium truncate">Ice & Utilities</label>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xs text-stone-400">KSh</span>
                <input
                  type="number"
                  value={utilities}
                  onChange={(e) => setUtilities(Math.max(1000, Number(e.target.value)))}
                  className="w-full bg-transparent text-sm font-semibold text-stone-800 tabular-nums focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results / Pitch Metrics Box (5 cols) matching User's Presentation */}
        <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-[#0B2533] text-white shadow-md border border-teal-900/40">
          <div>
            <div className="flex items-center justify-between text-xs text-teal-300 border-b border-teal-800/60 pb-3">
              <span>Monthly Volume (26 Days)</span>
              <span className="font-semibold text-white tabular-nums">{calculations.monthlyCups.toLocaleString()} cups</span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-xs text-teal-300">Projected Monthly Revenue</span>
                <div className="text-2xl font-black text-amber-400 tabular-nums">
                  KSh {calculations.monthlyRevenue.toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[11px] text-teal-300">Gross Margin</span>
                  <div className="text-lg font-bold text-emerald-400 tabular-nums">
                    {calculations.grossMarginPercent}%
                  </div>
                  <span className="text-[10px] text-teal-400">KSh {calculations.monthlyGrossProfit.toLocaleString()} GP</span>
                </div>

                <div>
                  <span className="text-[11px] text-teal-300">Total Monthly Opex</span>
                  <div className="text-lg font-bold text-stone-200 tabular-nums">
                    KSh {calculations.totalOpex.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-teal-400">Rent + Staff + Power</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-teal-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-teal-200 font-semibold uppercase tracking-wider">Monthly Net Profit</span>
              <span className={`text-2xl font-black tabular-nums ${calculations.netMonthlyProfit >= 0 ? 'text-amber-400' : 'text-red-400'}`}>
                KSh {calculations.netMonthlyProfit.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-teal-300">
              <span>Startup Capital Payback</span>
              <span className="font-bold text-white tabular-nums">
                {calculations.paybackMonths} Months ({initialCapEx.toLocaleString()} KSh)
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-teal-300">
              <span>Annualized Net Return</span>
              <span className="font-bold text-stone-200 tabular-nums">
                KSh {calculations.annualizedNetProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Calibrated for Zetech University Main Gate kiosk operations</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-600" />
          <span>Startup Capital Requirement: <strong>KSh {initialCapEx.toLocaleString()}</strong></span>
        </div>
      </div>
    </div>
  );
}
