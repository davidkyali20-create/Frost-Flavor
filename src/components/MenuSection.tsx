import { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Clock, Zap, Flame } from 'lucide-react';
import { JuiceItem, JuiceCategory } from '../types/juice';
import { MENU_ITEMS } from '../data/menuData';

interface Props {
  isVerifiedStudent: boolean;
  onSelectJuice: (juice: JuiceItem) => void;
  onOpenLoyalty: () => void;
}

export function MenuSection({ isVerifiedStudent, onSelectJuice, onOpenLoyalty }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<JuiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.campusNickname && item.campusNickname.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'natural-juices', label: 'Fresh Natural Juices' },
    { id: 'drinking-yogurt', label: 'Drinking Yogurt' },
    { id: 'yogurt-cups', label: 'Yogurt Parfait Cups' },
    { id: 'exam-boosters', label: 'CAT & Exam Boosters' },
    { id: 'student-combos', label: 'Student Combos' },
  ];

  return (
    <div className="space-y-8">
      {/* Search and Filters Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Tabs (functional segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as JuiceCategory)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors focus:outline-none ${
                selectedCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mango, ginger, chia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-orange-500 shadow-xs"
          />
        </div>
      </div>

      {/* Student Discount Trust Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-orange-50 border border-orange-200/60 text-xs">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-600 shrink-0" />
          <span className="text-orange-950 font-medium">
            {isVerifiedStudent
              ? 'Zetech Student Special active: 15% discount applied across all items!'
              : 'Zetech University students receive 15% off with student ID verification.'}
          </span>
        </div>
        {!isVerifiedStudent && (
          <button
            type="button"
            onClick={onOpenLoyalty}
            className="text-xs font-bold text-orange-700 hover:text-orange-800 underline focus:outline-none"
          >
            Verify Student ID →
          </button>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const displayPrice = isVerifiedStudent ? item.studentPrice : item.price;

          return (
            <div
              key={item.id}
              className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              {/* Image & Header */}
              <div>
                <div className="relative h-48 sm:h-52 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Campus Tag & Prep time */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                    {item.campusNickname ? (
                      <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md text-orange-200">
                        {item.campusNickname}
                      </span>
                    ) : <span />}

                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.prepTimeMinutes}m</span>
                    </span>
                  </div>

                  {/* Price Banner on Image */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black tabular-nums">
                        KES {displayPrice}
                      </span>
                      {isVerifiedStudent && (
                        <span className="text-xs text-stone-300 line-through tabular-nums">
                          KES {item.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
                    <span>{item.boostEffect}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.calories} kcal</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Ingredients */}
                  <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-[11px] text-stone-400 self-center">
                        +{item.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectJuice(item)}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 focus:outline-none"
                >
                  <Plus className="w-4 h-4" />
                  <span>Customize & Order (KES {displayPrice})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-stone-100/60 border border-stone-200">
          <p className="text-sm font-semibold text-stone-700">No drinks found matching "{searchQuery}"</p>
          <p className="text-xs text-stone-500 mt-1">Try searching for mango, ginger, boba, or reset filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold focus:outline-none"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
