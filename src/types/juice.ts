export type JuiceCategory = 
  | 'all'
  | 'natural-juices'
  | 'drinking-yogurt'
  | 'yogurt-cups'
  | 'exam-boosters'
  | 'student-combos';

export interface JuiceItem {
  id: string;
  name: string;
  campusNickname?: string;
  category: 'natural-juices' | 'drinking-yogurt' | 'yogurt-cups' | 'exam-boosters' | 'student-combos';
  price: number; // in KES (Kenyan Shillings)

  studentPrice: number; // with student ID discount
  calories: number;
  description: string;
  ingredients: string[];
  imageUrl: string;
  prepTimeMinutes: number;
  isBestseller?: boolean;
  isExamSpecial?: boolean;
  boostEffect: string; // e.g., "Sustained Mental Focus & Alertness"
  flavorProfile: string; // e.g., "Tangy & Refreshingly Sweet"
}

export type CupSize = 'regular' | 'jumbo';
export type IceLevel = 'crushed-frost' | 'light-chill' | 'no-ice';
export type SweetnessOption = 'raw-honey' | 'sugarcane' | 'light-natural' | 'zero-sugar';

export interface BoosterAddon {
  id: string;
  name: string;
  price: number;
  benefit: string;
}

export interface CustomizationSelection {
  size: CupSize;
  iceLevel: IceLevel;
  sweetness: SweetnessOption;
  addons: string[]; // addon IDs
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  juice: JuiceItem;
  customization: CustomizationSelection;
  quantity: number;
  itemUnitPrice: number;
  itemTotalPrice: number;
}

export type DeliveryMethod = 'campus-pickup' | 'hostel-delivery';

export interface OrderRecord {
  id: string;
  orderNumber: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: DeliveryMethod;
  deliveryLocation: string;
  studentName: string;
  studentPhone: string;
  studentRegNo?: string;
  paymentMethod: 'mpesa' | 'whatsapp' | 'cash-on-pickup' | 'frost-points';
  mpesaRef?: string;
  status: 'received' | 'blending' | 'chilled' | 'ready-or-delivering' | 'completed';
  pointsEarned: number;
}

export interface StudentLoyaltyProfile {
  studentName: string;
  regNumber: string;
  isVerifiedStudent: boolean;
  points: number;
  punchCount: number; // 0 to 8
  freeDrinksAvailable: number;
  totalOrdersCompleted: number;
  totalKesSpent: number;
  currentStreakDays: number;
  lastSpinDate?: string;
}
