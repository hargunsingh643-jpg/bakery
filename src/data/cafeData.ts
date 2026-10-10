export interface ProductItem {
  id: string;
  name: string;
  category: 'coffee' | 'bakery' | 'savory' | 'dessert';
  price: number;
  description: string;
  detailedDescription: string;
  image: string;
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Eggless')[];
  isPopular?: boolean;
  calories?: string;
  prepTime?: string;
  customizationOptions?: {
    milk?: string[];
    sugar?: string[];
    served?: string[];
  };
}

export interface BusinessDetails {
  id: string;
  name: string;
  tagline: string;
  category: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  openingHours: string;
  openHourTime: number; // 8 (8 AM)
  closeHourTime: number; // 22 (10 PM)
  priceRange: string;
  aboutText: string;
}

export const BUSINESS_INFO: BusinessDetails = {
  id: 'BUS-1001',
  name: 'Urban Brew Café',
  tagline: 'Your Daily Dose of Good Coffee.',
  category: 'Food & Beverage · Specialty Coffee & Artisan Bakery',
  address: '24 Market Street',
  city: 'New Delhi',
  country: 'India',
  phone: '+91 9220486272',
  email: 'bhalladimpy68@gmail.com',
  openingHours: 'Monday–Sunday, 8 AM–10 PM',
  openHourTime: 8,
  closeHourTime: 22,
  priceRange: '₹100–₹500',
  aboutText:
    'Urban Brew Café is a cozy café concept focused on quality coffee, fresh food, and friendly service. Nestled on Market Street, we slow-roast small-batch Arabica beans and knead pure French butter into fresh morning croissants, wholesome sourdough loaves, and decadent confectionery treats every single dawn.',
};

export const MENU_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 110,
    description: 'Fresh espresso with steamed milk',
    detailedDescription:
      'Double shot of 100% single-origin Chikmagalur Arabica espresso, enveloped in micro-foamed velvety whole milk and finished with artisanal tulip latte art.',
    image: '/src/assets/images/specialty_cappuccino_1791622256443.jpg',
    dietary: ['Vegetarian'],
    isPopular: true,
    calories: '120 kcal',
    prepTime: '4-5 mins',
    customizationOptions: {
      milk: ['Whole Milk', 'Oat Milk (+₹40)', 'Almond Milk (+₹40)', 'Skimmed Milk'],
      sugar: ['No Sugar', 'Less Sweet', 'Regular Cane Sugar', 'Brown Sugar'],
      served: ['Hot (Standard)', 'Extra Hot'],
    },
  },
  {
    id: 'prod-cold-coffee',
    name: 'Cold Coffee',
    category: 'coffee',
    price: 160,
    description: 'Chilled coffee with milk',
    detailedDescription:
      'Our signature house espresso shaken with chilled milk, raw cane sugar syrup, and poured over crystal ice spheres for a rich, silky texture.',
    image: '/src/assets/images/specialty_cappuccino_1791622256443.jpg',
    dietary: ['Vegetarian'],
    isPopular: true,
    calories: '180 kcal',
    prepTime: '3-4 mins',
    customizationOptions: {
      milk: ['Regular Milk', 'Oat Milk (+₹40)', 'Almond Milk (+₹40)'],
      sugar: ['Unsweetened', 'Light Sweet', 'Classic Sweet'],
      served: ['On the Rocks', 'Blended Frappe style'],
    },
  },
  {
    id: 'prod-chocolate-croissant',
    name: 'Chocolate Croissant',
    category: 'bakery',
    price: 120,
    description: 'Buttery chocolate pastry',
    detailedDescription:
      'Traditional French pain au chocolat laminated with 84% butterfat Normandy butter, folded 27 times and filled with twin batons of 64% Valrhona dark chocolate.',
    image: '/src/assets/images/chocolate_croissant_1791622268328.jpg',
    dietary: ['Vegetarian'],
    isPopular: true,
    calories: '280 kcal',
    prepTime: 'Fresh from oven',
    customizationOptions: {
      served: ['Warmed & Flaky (Recommended)', 'Room Temperature'],
    },
  },
  {
    id: 'prod-grilled-sandwich',
    name: 'Grilled Sandwich',
    category: 'savory',
    price: 220,
    description: 'Vegetable and cheese sandwich',
    detailedDescription:
      'Oven-roasted zucchini, bell peppers, slow-cooked red onion confit, and melted aged English cheddar pressed between fresh house-baked multigrain sourdough.',
    image: '/src/assets/images/grilled_artisan_sandwich_1791622289913.jpg',
    dietary: ['Vegetarian'],
    isPopular: true,
    calories: '340 kcal',
    prepTime: '8-10 mins',
    customizationOptions: {
      served: ['Crisp Pressed Panini', 'Soft Grilled'],
      sugar: ['With Herb Potato Crisps', 'With Fresh Green Salad'],
    },
  },
  {
    id: 'prod-blueberry-cheesecake',
    name: 'Blueberry Cheesecake',
    category: 'dessert',
    price: 250,
    description: 'Creamy cheesecake slice',
    detailedDescription:
      'Classic New York style slow-baked cream cheese on a crushed honey-graham biscuit crust, topped with house-made wild blueberry compote and organic mint.',
    image: '/src/assets/images/blueberry_cheesecake_1791622279549.jpg',
    dietary: ['Vegetarian', 'Eggless'],
    isPopular: true,
    calories: '310 kcal',
    prepTime: 'Ready to serve',
    customizationOptions: {
      served: ['Chilled Slice', 'With Extra Berry Compote (+₹30)'],
    },
  },
  {
    id: 'prod-sourdough-loaf',
    name: 'Country Sourdough Loaf',
    category: 'bakery',
    price: 210,
    description: '36-hour slow fermented country bread',
    detailedDescription:
      'Naturally leavened with our 6-year-old wild yeast mother culture, organic stoneground whole wheat, blistered caramelized crust, and an airy, custardy crumb.',
    image: '/src/assets/images/hero_urban_brew_cafe_1791622243654.jpg',
    dietary: ['Vegetarian', 'Vegan', 'Eggless'],
    calories: '160 kcal / 100g',
    prepTime: 'Baked at 6:30 AM',
    customizationOptions: {
      served: ['Whole Loaf (Uncut)', 'Pre-sliced for Toasting'],
    },
  },
  {
    id: 'prod-cinnamon-brioche',
    name: 'Cinnamon Swirl Brioche',
    category: 'bakery',
    price: 140,
    description: 'Ceylon cinnamon roll with cream cheese drizzle',
    detailedDescription:
      'Pillowy enriched brioche dough generously swirled with fragrant Ceylon organic cinnamon, brown butter, and finished with warm cream cheese glaze.',
    image: '/src/assets/images/chocolate_croissant_1791622268328.jpg',
    dietary: ['Vegetarian'],
    calories: '260 kcal',
    prepTime: 'Fresh daily',
    customizationOptions: {
      served: ['Warm & Gooey', 'Packed to Go'],
    },
  },
  {
    id: 'prod-spanish-latte',
    name: 'Spanish Caramel Latte',
    category: 'coffee',
    price: 210,
    description: 'Ristretto with textured milk and dulce condensed milk',
    detailedDescription:
      'Double shot of bold medium-dark roast layered gently over artisanal condensed milk, steamed milk ribbon, and a dash of organic Ceylon cinnamon dust.',
    image: '/src/assets/images/specialty_cappuccino_1791622256443.jpg',
    dietary: ['Vegetarian'],
    calories: '220 kcal',
    prepTime: '4 mins',
    customizationOptions: {
      milk: ['Whole Milk', 'Oat Milk (+₹40)'],
      sugar: ['Balanced (Standard)', 'Extra Sweet'],
      served: ['Hot Latte', 'Iced Spanish Latte'],
    },
  },
  {
    id: 'prod-avocado-sourdough',
    name: 'Avocado & Goat Feta Toast',
    category: 'savory',
    price: 280,
    description: 'Chunky Hass avocado with crumbled goat feta & chili flakes',
    detailedDescription:
      'Thick cut toasted country sourdough smeared with lime-infused Hass avocado, topped with cherry tomato confit, crumbled goat feta, and toasted pumpkin seeds.',
    image: '/src/assets/images/grilled_artisan_sandwich_1791622289913.jpg',
    dietary: ['Vegetarian'],
    calories: '290 kcal',
    prepTime: '6-8 mins',
    customizationOptions: {
      served: ['Standard Goat Feta', 'Vegan (Without Feta, Extra Seeds)'],
    },
  },
  {
    id: 'prod-focaccia-genovese',
    name: 'Rosemary & Tomato Focaccia',
    category: 'savory',
    price: 170,
    description: 'Ligurian focaccia with extra virgin olive oil',
    detailedDescription:
      'Airy Italian flatbread dimpled by hand, bathed in Sicilian extra virgin olive oil, sweet blistered cherry tomatoes, fresh garden rosemary, and Maldon sea salt flakes.',
    image: '/src/assets/images/hero_urban_brew_cafe_1791622243654.jpg',
    dietary: ['Vegetarian', 'Vegan', 'Eggless'],
    calories: '240 kcal',
    prepTime: 'Ready to serve',
    customizationOptions: {
      served: ['Warmed with Olive Oil Dip', 'Room Temperature'],
    },
  },
  {
    id: 'prod-matcha-latte',
    name: 'Ceremonial Matcha Latte',
    category: 'coffee',
    price: 240,
    description: 'First-harvest Uji matcha with steamed oat milk',
    detailedDescription:
      'Whisked ceremonial stone-ground Japanese matcha from Kyoto, layered with creamy oat milk and lightly sweetened with organic agave nectar.',
    image: '/src/assets/images/specialty_cappuccino_1791622256443.jpg',
    dietary: ['Vegetarian', 'Vegan', 'Eggless'],
    calories: '110 kcal',
    prepTime: '4 mins',
    customizationOptions: {
      milk: ['Oat Milk (Included)', 'Almond Milk', 'Whole Milk'],
      sugar: ['Unsweetened', 'Light Agave', 'Vanilla Infused'],
      served: ['Warm Green Velvet', 'Iced Matcha'],
    },
  },
  {
    id: 'prod-almond-tart',
    name: 'Almond Frangipane Tart',
    category: 'dessert',
    price: 190,
    description: 'Crisp sablé shell with roasted almond cream',
    detailedDescription:
      'Buttery French sweet pastry crust filled with velvety almond cream, baked golden brown, topped with sliced toasted almonds and an apricot glaze shimmer.',
    image: '/src/assets/images/blueberry_cheesecake_1791622279549.jpg',
    dietary: ['Vegetarian'],
    calories: '295 kcal',
    prepTime: 'Ready to serve',
    customizationOptions: {
      served: ['Room Temperature', 'Warm with Vanilla Bean Cream'],
    },
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Morning Golden Hour at the Espresso Bar',
    category: 'Ambiance',
    image: '/src/assets/images/hero_urban_brew_cafe_1791622243654.jpg',
    caption: 'Our baristas handcrafting the first morning espresso pours at 8:00 AM.',
  },
  {
    id: 'g2',
    title: 'Handcrafted Latte Art & Single Origin Beans',
    category: 'Specialty Coffee',
    image: '/src/assets/images/specialty_cappuccino_1791622256443.jpg',
    caption: 'Velvety micro-foam poured over Chikmagalur Arabica.',
  },
  {
    id: 'g3',
    title: 'Fresh Laminated Viennoiserie',
    category: 'Bakery',
    image: '/src/assets/images/chocolate_croissant_1791622268328.jpg',
    caption: '27-fold golden chocolate croissants coming out of our stone deck ovens.',
  },
  {
    id: 'g4',
    title: 'Artisan Melt Panini on Sourdough',
    category: 'Savory',
    image: '/src/assets/images/grilled_artisan_sandwich_1791622289913.jpg',
    caption: 'Grilled vegetable and melted farmhouse cheese on 36-hr sourdough.',
  },
  {
    id: 'g5',
    title: 'New York Style Wild Blueberry Cheesecake',
    category: 'Desserts',
    image: '/src/assets/images/blueberry_cheesecake_1791622279549.jpg',
    caption: 'Creamy cheesecake slice topped with wild blueberry reduction.',
  },
  {
    id: 'g6',
    title: 'Cozy Sage & Oak Community Lounge',
    category: 'Ambiance',
    image: '/src/assets/images/cafe_interior_ambiance_1791622300244.jpg',
    caption: 'Natural oak tables, indoor olive greens, and tranquil work/meeting corners.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Architect & Daily Regular',
    text: 'Urban Brew Café has completely elevated the specialty coffee culture on Market Street. The Cappuccino is velvety perfection and the Chocolate Croissant tastes straight out of Paris.',
    rating: 5,
    favoriteItem: 'Cappuccino & Croissant',
  },
  {
    name: 'Rohan Mehra',
    role: 'Product Designer',
    text: 'My absolute go-to workspace and weekend sanctuary. Fast Wi-Fi, incredible natural light, and the Grilled Sandwich with sourdough is hands down the best lunch in Delhi.',
    rating: 5,
    favoriteItem: 'Grilled Sandwich',
  },
  {
    name: 'Dr. Priya Singhania',
    role: 'Food Stylist & Writer',
    text: 'Their Blueberry Cheesecake has that authentic creamy balance without being overly sugary. The attention to detail—from bean provenance to sourdough crumb—is exceptional.',
    rating: 5,
    favoriteItem: 'Blueberry Cheesecake',
  },
];

export const FAQS = [
  {
    question: 'Where is Urban Brew Café located and what are your opening hours?',
    answer:
      'We are located at 24 Market Street, New Delhi, India. We are open 7 days a week, Monday through Sunday from 8:00 AM to 10:00 PM.',
  },
  {
    question: 'Do you offer vegan and gluten-friendly options?',
    answer:
      'Yes! We offer oat and almond milk substitutions for all coffee drinks, along with naturally vegan bakes like our Country Sourdough Loaf and Rosemary Focaccia.',
  },
  {
    question: 'Can I place an online pickup or table order?',
    answer:
      'Absolutely! Use our built-in online ordering system on this website to select items, customize your milk and roast preferences, and choose either quick express counter pickup or dine-in table service.',
  },
  {
    question: 'Can I reserve a table for meetings or group gatherings?',
    answer:
      'Yes, you can click "Reserve Table" in the top bar to secure indoor or outdoor patio seating. For large groups over 10 or catering inquiries, contact us directly at bhalladimpy68@gmail.com.',
  },
];
