import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink, 
  Sparkles, 
  ShoppingBag,
  Award,
  AlertTriangle,
  Droplets,
  ShieldAlert,
  Clock,
  Home,
  Briefcase,
  Users,
  CheckCircle2,
  DollarSign,
  MessageCircle,
  Layers
} from 'lucide-react';
import { PRESENTATION_SLIDES, SlideData, SlideProblemCard } from '../data/presentationData';
import { FinancialCalculator } from './FinancialCalculator';

interface Props {
  onSwitchToStore: () => void;
  onOpenLoyalty: () => void;
}

export function PresentationDeck({ onSwitchToStore, onOpenLoyalty }: Props) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 min pitch timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev < PRESENTATION_SLIDES.length - 1 ? prev + 1 : prev));
  };

  const goToPrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const currentSlide: SlideData = PRESENTATION_SLIDES[currentSlideIndex];

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const renderProblemIcon = (type: SlideProblemCard['iconType']) => {
    switch (type) {
      case 'unhealthy':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'watered':
        return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'hygiene':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'queues':
        return <Clock className="w-5 h-5 text-orange-400" />;
      case 'hostel':
        return <Home className="w-5 h-5 text-indigo-400" />;
      case 'jobs':
        return <Briefcase className="w-5 h-5 text-emerald-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className={`rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[88vh]'}`}>
      {/* Top Deck Control Toolbar */}
      <div className="bg-stone-950 px-4 sm:px-6 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-amber-400 uppercase tracking-wider">
              Slide {currentSlide.slideNumber} / 0{PRESENTATION_SLIDES.length}
            </span>
            <span className="text-stone-600">·</span>
            <span className="font-semibold text-stone-200">
              {currentSlide.section}: {currentSlide.category}
            </span>
          </div>
        </div>

        {/* Pitch Timer & Interactive Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pitch Timer Widget */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800">
            <span className={`font-mono font-bold tabular-nums ${timerSeconds < 60 ? 'text-rose-400' : 'text-stone-300'}`}>
              {formatTimer(timerSeconds)}
            </span>
            <button
              type="button"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-stone-400 hover:text-white p-1 focus:outline-none"
              title={isTimerRunning ? 'Pause Pitch Timer' : 'Start Pitch Timer'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(300);
              }}
              className="text-stone-500 hover:text-stone-300 p-1 focus:outline-none"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Toggle Presenter Notes */}
          <button
            type="button"
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`px-3 py-1.5 font-medium rounded-lg border transition-colors flex items-center gap-1.5 focus:outline-none ${
              showPresenterNotes
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Script</span>
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors focus:outline-none"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Jump to Live Store button */}
          <button
            type="button"
            onClick={onSwitchToStore}
            className="px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-xs focus:outline-none"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Live Student Shop</span>
          </button>
        </div>
      </div>

      {/* Main Presentation Body with Left Slide Navigator like in User's Screenshot */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Slide Thumbnails Sidebar */}
        <div className="hidden md:flex w-56 lg:w-64 bg-stone-950 border-r border-stone-800 flex-col overflow-y-auto p-3 space-y-4 shrink-0">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2">
            Slides Outline
          </div>

          <div className="space-y-2">
            {PRESENTATION_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex flex-col gap-1 focus:outline-none ${
                    isActive
                      ? 'border-amber-500 bg-[#0B2533] text-white shadow-xs'
                      : 'border-stone-800/80 bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-mono font-bold">Slide {slide.slideNumber}</span>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400/80">{slide.section}</span>
                  </div>
                  <span className={`text-xs font-bold truncate ${isActive ? 'text-amber-300' : 'text-stone-300'}`}>
                    {slide.title}
                  </span>
                  <span className="text-[10px] text-stone-500 truncate">
                    {slide.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Main Slide Stage styled in User's signature dark teal #0B2533 */}
        <div className="flex-1 bg-[#0B2533] text-white p-6 sm:p-10 flex flex-col justify-between overflow-y-auto relative">
          {/* Subtle Decorative Accents matching slide design */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#B83353]/20 blur-2xl pointer-events-none" />

          {/* Slide Content by Type */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            {/* Slide 1: Exact Match of the User's Title Slide */}
            {currentSlide.id === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
                <div className="lg:col-span-7 space-y-6">
                  {/* Top Kicker matching user screenshot */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-xs">
                        F
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                        Frost & Flavor
                      </span>
                    </div>
                    <div className="text-[11px] font-mono tracking-widest text-teal-300/80 uppercase">
                      BUSINESS PROPOSAL · ZETECH UNIVERSITY CAMPUS
                    </div>
                  </div>

                  {/* Main Title & Italic Tagline */}
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none font-display">
                      Frost & Flavor
                    </h1>
                    <div className="text-2xl sm:text-3xl text-amber-400 italic font-serif mt-2">
                      The Fresh Bar
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed max-w-xl">
                    {currentSlide.subtitle}
                  </p>

                  {/* The 3 Exact Metric Cards from User's Screenshot */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#0F3547] border border-teal-700/50">
                      <span className="block text-[10px] font-bold text-teal-300 tracking-wider uppercase">
                        STARTUP CAPITAL
                      </span>
                      <span className="block text-xl font-black text-white mt-1 tabular-nums">
                        KSh 45,000
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0F3547] border border-teal-700/50">
                      <span className="block text-[10px] font-bold text-teal-300 tracking-wider uppercase">
                        MONTHLY NET PROFIT
                      </span>
                      <span className="block text-xl font-black text-amber-400 mt-1 tabular-nums">
                        KSh 41,589
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0F3547] border border-teal-700/50">
                      <span className="block text-[10px] font-bold text-teal-300 tracking-wider uppercase">
                        LOCATION
                      </span>
                      <span className="block text-xs font-bold text-white mt-1 leading-tight">
                        Zetech Main Gate, Ruiru
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Visual matching the circular fruit glass arrangement */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-cyan-300/80 p-2 shadow-2xl overflow-hidden flex items-center justify-center">
                    <img
                      src="/src/assets/images/hero_frost_juice_bar_1792669804783.jpg"
                      alt="Frost and Flavor Natural Juices"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: The Business Idea (Fresh, Cold & Delivered in 15-20 Minutes) */}
            {currentSlide.id === 2 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                    Opportunity · Slide 02
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                  <p className="text-lg text-amber-400 font-semibold mt-1">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {currentSlide.keyPillars?.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/50 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400 block mb-2">
                          0{idx + 1}.
                        </span>
                        <h3 className="text-base font-bold text-white mb-2">{p.heading}</h3>
                        <p className="text-xs text-teal-100/80 leading-relaxed">{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-teal-200">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Direct WhatsApp Bot & Runner dispatch to Zetech lecture blocks</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    Avg Delivery: 15-20 Mins
                  </span>
                </div>
              </div>
            )}

            {/* Slide 3: Problems We Are Solving (The 6 Cards from User's Screenshot) */}
            {currentSlide.id === 3 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                    Opportunity · Slide 03
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm text-teal-200/90 mt-1 max-w-2xl">
                    {currentSlide.subtitle}
                  </p>
                </div>

                {/* 6 Problem Cards Grid matching user's slide */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
                  {currentSlide.problemsGrid?.map((prob, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0F3547]/90 border border-teal-700/60 hover:border-amber-400/60 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-900/50 flex items-center justify-center shrink-0">
                          {renderProblemIcon(prob.iconType)}
                        </div>
                        <h3 className="text-xs font-bold text-white leading-tight">
                          {prob.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-teal-100/80 leading-relaxed">
                        {prob.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 4: Who We Serve & Why We Win */}
            {currentSlide.id === 4 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                    Opportunity · Slide 04
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm text-teal-200/90 mt-1">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  {currentSlide.segments?.map((seg, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/60 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-teal-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-amber-400" />
                          <h3 className="text-sm font-bold text-white">{seg.segment}</h3>
                        </div>
                      </div>

                      <p className="text-xs text-teal-100/80 leading-relaxed">
                        {seg.description}
                      </p>

                      <div className="pt-2 space-y-1.5 text-[11px]">
                        <div>
                          <span className="text-amber-300 font-bold block">Current Pain Point:</span>
                          <span className="text-teal-200/80">{seg.painPoint}</span>
                        </div>
                        <div>
                          <span className="text-emerald-400 font-bold block">Why Frost & Flavor Wins:</span>
                          <span className="text-teal-200/80">{seg.ourAdvantage}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 5: Focused Menu & Pricing Structure */}
            {currentSlide.id === 5 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                    Offer · Slide 05
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm text-teal-200/90 mt-1">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/60">
                    <span className="text-xs font-bold text-amber-400 block uppercase">Product Line 01</span>
                    <h3 className="text-lg font-bold text-white mt-1">Fresh Natural Juice</h3>
                    <div className="text-2xl font-black text-white my-2 tabular-nums">
                      KSh 70 <span className="text-xs text-teal-300 font-normal">/ KSh 100</span>
                    </div>
                    <p className="text-xs text-teal-100/80">
                      Cold-pressed mango-passion, citrus zing, and detox green revivers with crushed frost ice.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/60">
                    <span className="text-xs font-bold text-amber-400 block uppercase">Product Line 02</span>
                    <h3 className="text-lg font-bold text-white mt-1">Fresh Drinking Yogurt</h3>
                    <div className="text-2xl font-black text-white my-2 tabular-nums">
                      KSh 90 <span className="text-xs text-teal-300 font-normal">/ KSh 120</span>
                    </div>
                    <p className="text-xs text-teal-100/80">
                      Locally cultured rich dairy yogurt infused with real strawberry swirl, sweet vanilla, and passion.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/60">
                    <span className="text-xs font-bold text-amber-400 block uppercase">Product Line 03</span>
                    <h3 className="text-lg font-bold text-white mt-1">Fresh Yogurt Parfait Cup</h3>
                    <div className="text-2xl font-black text-white my-2 tabular-nums">
                      KSh 100 <span className="text-xs text-teal-300 font-normal">/ KSh 130</span>
                    </div>
                    <p className="text-xs text-teal-100/80">
                      Layered Greek yogurt cup with crunchy oat granola, seasonal fresh diced fruit, and wild honey.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={onSwitchToStore}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 focus:outline-none"
                  >
                    <span>View Interactive Store Menu & Customizer</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Slide 6: Financial Projections & Startup Capital */}
            {currentSlide.id === 6 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                      Financials · Slide 06
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                      {currentSlide.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-[#0F3547] px-3 py-1.5 rounded-lg border border-teal-700/60 text-amber-400 font-bold font-mono">
                      Startup: KSh 45,000
                    </span>
                    <span className="bg-[#0F3547] px-3 py-1.5 rounded-lg border border-teal-700/60 text-emerald-400 font-bold font-mono">
                      Net: KSh 41,589/mo
                    </span>
                  </div>
                </div>

                <div className="text-stone-900">
                  <FinancialCalculator isEmbeddedInSlide={true} />
                </div>
              </div>
            )}

            {/* Slide 7: Interactive Prototype & WhatsApp Flow */}
            {currentSlide.id === 7 && (
              <div className="space-y-6 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                    Execution · Slide 07
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {currentSlide.title}
                  </h2>
                  <p className="text-sm text-teal-100/90 mt-2">
                    {currentSlide.subtitle}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0F3547] border border-teal-700/60 text-left space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Full Student Menu:</strong> Natural juices from KSh 70 & drinking yogurt from KSh 90.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Loyalty Engine:</strong> 8-stamp digital punch card & Zetech Student ID verification.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-teal-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Instant WhatsApp & M-Pesa:</strong> Generates real-time delivery orders for Zetech Gate A.</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onSwitchToStore}
                    className="px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg focus:outline-none"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Launch Live Student Shop Prototype</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenLoyalty}
                    className="px-5 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-stone-700 focus:outline-none"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Test "Frost Pass" Loyalty Stamp Card</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Presenter Notes Expandable Drawer */}
          {showPresenterNotes && (
            <div className="relative z-10 mt-6 p-4 rounded-2xl bg-black/40 border border-teal-700/60 text-amber-200 text-xs animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-400 mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Presenter Script & Talking Points</span>
              </div>
              <p className="text-teal-100/90 leading-relaxed italic">
                "{currentSlide.presenterNotes}"
              </p>
            </div>
          )}

          {/* Bottom Slide Navigation Bar */}
          <div className="relative z-10 pt-6 mt-6 border-t border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quick slide progress indicator */}
            <div className="flex items-center gap-2">
              {PRESENTATION_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlideIndex(index)}
                  className={`h-2.5 rounded-full transition-all focus:outline-none ${
                    index === currentSlideIndex
                      ? 'w-8 bg-amber-400'
                      : 'w-2.5 bg-teal-900 hover:bg-teal-700'
                  }`}
                  title={`Slide ${slide.slideNumber}: ${slide.title}`}
                  aria-label={`Jump to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentSlideIndex === 0}
                onClick={goToPrev}
                className="px-4 py-2 rounded-xl bg-[#0F3547] border border-teal-700/60 text-teal-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1.5 focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-mono text-teal-400 tabular-nums">
                {currentSlideIndex + 1} of {PRESENTATION_SLIDES.length}
              </span>

              <button
                type="button"
                disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                onClick={goToNext}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-xs focus:outline-none"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
