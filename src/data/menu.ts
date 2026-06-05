type Lang = 'fr' | 'nl' | 'en';

export type OptionItem = {
  id: string;
  name: Record<Lang, string>;
  priceCents: number;
};

export type OptionGroup = {
  id: string;
  title: Record<Lang, string>;
  required: boolean;
  multiple: boolean;
  max?: number;
  items: OptionItem[];
};

export type MenuItem = {
  id: string;
  name: Record<Lang, string>;
  priceCents: number;
  category: string;
  description?: Record<Lang, string>;
  image?: string;
  options?: OptionGroup[];
};
export type Category = { id: string; title: Record<Lang, string>; items: MenuItem[] };

const LEGUMES_OPTIONS: OptionGroup = {
  id: 'legumes',
  title: { fr: 'Légumes', nl: 'Groenten', en: 'Vegetables' },
  required: false,
  multiple: true,
  items: [
    { id: 'salade', name: { fr: 'Salade', nl: 'Sla', en: 'Lettuce' }, priceCents: 0 },
    { id: 'tomate', name: { fr: 'Tomate', nl: 'Tomaat', en: 'Tomato' }, priceCents: 0 },
    { id: 'oignon', name: { fr: 'Oignon', nl: 'Ui', en: 'Onion' }, priceCents: 0 },
    { id: 'chou-rouge', name: { fr: 'Chou rouge', nl: 'Rode kool', en: 'Red cabbage' }, priceCents: 0 },
    { id: 'cornichons', name: { fr: 'Cornichons', nl: 'Augurken', en: 'Pickles' }, priceCents: 0 },
    { id: 'piment', name: { fr: 'Piment', nl: 'Peper', en: 'Chili pepper' }, priceCents: 0 },
  ],
};

const SAUCE_OPTIONS: OptionGroup = {
  id: 'sauce',
  title: { fr: 'Sauce', nl: 'Saus', en: 'Sauce' },
  required: false,
  multiple: false,
  items: [
    { id: 'sauce-blanche', name: { fr: 'Sauce blanche maison', nl: 'Huisgemaakte witte saus', en: 'Homemade white sauce' }, priceCents: 0 },
    { id: 'sauce-epice', name: { fr: 'Sauce épicée maison', nl: 'Huisgemaakte pittige saus', en: 'Homemade spicy sauce' }, priceCents: 0 },
    { id: 'sauce-ail', name: { fr: 'Sauce ail', nl: 'Knoflooksaus', en: 'Garlic sauce' }, priceCents: 0 },
    { id: 'sauce-harika', name: { fr: 'Sauce Harika', nl: 'Harika saus', en: 'Harika sauce' }, priceCents: 0 },
  ],
};

const EXTRAS_OPTIONS: OptionGroup = {
  id: 'extras',
  title: { fr: 'Suppléments', nl: "Extra's", en: 'Extras' },
  required: false,
  multiple: true,
  items: [
    { id: 'feta', name: { fr: 'Feta', nl: 'Feta', en: 'Feta' }, priceCents: 150 },
    { id: 'grenade', name: { fr: 'Grenade', nl: 'Granaatappel', en: 'Pomegranate' }, priceCents: 100 },
  ],
};

const SANDWICH_OPTIONS = [LEGUMES_OPTIONS, SAUCE_OPTIONS, EXTRAS_OPTIONS];

export const categories: Category[] = [
  {
    id: 'durums',
    title: { fr: 'Dürüms', nl: 'Dürüms', en: 'Dürüms' },
    items: [
      { id: 'durum-boeuf', name: { fr: 'Dürüm Bœuf', nl: 'Dürüm Rund', en: 'Beef Dürüm' }, priceCents: 1150, category: 'durums', image: '/products/durum-boeuf.jpeg', options: SANDWICH_OPTIONS },
      { id: 'durum-poulet', name: { fr: 'Dürüm Poulet', nl: 'Dürüm Kip', en: 'Chicken Dürüm' }, priceCents: 1050, category: 'durums', image: '/products/durum-poulet.jpeg', options: SANDWICH_OPTIONS },
      { id: 'durum-mix', name: { fr: 'Dürüm Mix', nl: 'Dürüm Mix', en: 'Mixed Dürüm' }, priceCents: 1250, category: 'durums', image: '/products/durum-mix.jpeg', options: SANDWICH_OPTIONS },
      { id: 'durum-falafel', name: { fr: 'Dürüm Falafel', nl: 'Dürüm Falafel', en: 'Falafel Dürüm' }, priceCents: 950, category: 'durums', image: '/products/durum-falafel.jpeg', options: SANDWICH_OPTIONS },
    ],
  },
  {
    id: 'sandwiches',
    title: { fr: 'Sandwichs', nl: 'Broodjes', en: 'Sandwiches' },
    items: [
      { id: 'sandwich-boeuf', name: { fr: 'Sandwich Bœuf', nl: 'Broodje Rund', en: 'Beef Sandwich' }, priceCents: 1150, category: 'sandwiches', image: '/products/sandwich-boeuf.jpeg', options: SANDWICH_OPTIONS },
      { id: 'sandwich-poulet', name: { fr: 'Sandwich Poulet', nl: 'Broodje Kip', en: 'Chicken Sandwich' }, priceCents: 1050, category: 'sandwiches', image: '/products/sandwich-poulet.jpeg', options: SANDWICH_OPTIONS },
      { id: 'sandwich-mix', name: { fr: 'Sandwich Mix', nl: 'Broodje Mix', en: 'Mixed Sandwich' }, priceCents: 1250, category: 'sandwiches', image: '/products/sandwich-mix.jpeg', options: SANDWICH_OPTIONS },
      { id: 'sandwich-falafel', name: { fr: 'Sandwich Falafel', nl: 'Broodje Falafel', en: 'Falafel Sandwich' }, priceCents: 950, category: 'sandwiches', image: '/products/sandwich-falafel.jpeg', options: SANDWICH_OPTIONS },
    ],
  },
  {
    id: 'bowls',
    title: { fr: 'Bowls', nl: 'Bowls', en: 'Bowls' },
    items: [
      { id: 'bowl-boeuf', name: { fr: 'Bowl Bœuf', nl: 'Bowl Rund', en: 'Beef Bowl' }, priceCents: 1550, category: 'bowls', image: '/products/bowl-boeuf.jpeg', options: SANDWICH_OPTIONS },
      { id: 'bowl-poulet', name: { fr: 'Bowl Poulet', nl: 'Bowl Kip', en: 'Chicken Bowl' }, priceCents: 1450, category: 'bowls', image: '/products/bowl-poulet.jpeg', options: SANDWICH_OPTIONS },
      { id: 'bowl-mix', name: { fr: 'Bowl Mix', nl: 'Bowl Mix', en: 'Mixed Bowl' }, priceCents: 1650, category: 'bowls', image: '/products/bowl-mix.jpeg', options: SANDWICH_OPTIONS },
      { id: 'bowl-falafel', name: { fr: 'Bowl Falafel', nl: 'Bowl Falafel', en: 'Falafel Bowl' }, priceCents: 1250, category: 'bowls', image: '/products/bowl-falafel.jpeg', options: SANDWICH_OPTIONS },
    ],
  },
  {
    id: 'sides',
    title: { fr: 'Accompagnements', nl: 'Bijgerechten', en: 'Sides' },
    items: [
      { id: 'chilli-cheese', name: { fr: 'Chilli Cheese (5 pcs)', nl: 'Chilli Cheese (5 st)', en: 'Chilli Cheese (5 pcs)' }, priceCents: 590, category: 'sides', image: '/products/chilli-cheese.jpeg' },
      { id: 'onion-rings', name: { fr: 'Onion Rings (5 pcs)', nl: 'Uienringen (5 st)', en: 'Onion Rings (5 pcs)' }, priceCents: 590, category: 'sides', image: '/products/onion-rings.jpeg' },
      { id: 'mozzarella-stick', name: { fr: 'Mozzarella Sticks (5 pcs)', nl: 'Mozzarella Sticks (5 st)', en: 'Mozzarella Sticks (5 pcs)' }, priceCents: 590, category: 'sides', image: '/products/mozzarella-stick.jpeg' },
      { id: 'falafel', name: { fr: 'Falafel (4 pcs)', nl: 'Falafel (4 st)', en: 'Falafel (4 pcs)' }, priceCents: 490, category: 'sides', image: '/products/falafel.jpeg' },
      { id: 'wings', name: { fr: 'Wings (4 pcs)', nl: 'Wings (4 st)', en: 'Wings (4 pcs)' }, priceCents: 590, category: 'sides', image: '/products/wings.jpeg' },
      { id: 'nuggets-xl', name: { fr: 'Nuggets XL (3 pcs)', nl: 'Nuggets XL (3 st)', en: 'Nuggets XL (3 pcs)' }, priceCents: 490, category: 'sides', image: '/products/nuggets-xl.jpeg' },
    ],
  },
  {
    id: 'fries',
    title: { fr: 'Frites', nl: 'Frieten', en: 'Fries' },
    items: [
      { id: 'frites', name: { fr: 'Frites fraîches', nl: 'Verse frieten', en: 'Fresh Fries' }, priceCents: 450, category: 'fries', image: '/products/frites.jpeg' },
      { id: 'frites-epices', name: { fr: 'Frites fraîches épices piquantes', nl: 'Verse frieten pittige kruiden', en: 'Spicy Fresh Fries' }, priceCents: 450, category: 'fries', image: '/products/frites-epices.jpeg' },
      { id: 'frites-cheddar-jalap', name: { fr: 'Frites cheddar Jalapeños', nl: 'Frieten cheddar Jalapeños', en: 'Cheddar Jalapeño Fries' }, priceCents: 550, category: 'fries', image: '/products/frites-cheddar-jalap.jpeg' },
      { id: 'frites-cheddar-crispy', name: { fr: 'Frites cheddar Crispy', nl: 'Crispy cheddar frieten', en: 'Crispy Cheddar Fries' }, priceCents: 550, category: 'fries', image: '/products/frites-cheddar-crispy.jpeg' },
    ],
  },
  {
    id: 'menus',
    title: { fr: "Menus", nl: "Menu's", en: 'Menus' },
    items: [
      {
        id: 'menu-2-burgers',
        name: { fr: 'Menu 2 burgers', nl: 'Menu 2 burgers', en: '2 Burgers Menu' },
        priceCents: 1500,
        category: 'menus',
        description: { fr: '2 burgers + frites + boisson', nl: '2 burgers + frieten + drank', en: '2 burgers + fries + drink' },
        image: '/products/menu-2-burgers.jpeg',
      },
    ],
  },
  {
    id: 'drinks',
    title: { fr: 'Boissons', nl: 'Dranken', en: 'Drinks' },
    items: [
      { id: 'ayran', name: { fr: 'Ayran', nl: 'Ayran', en: 'Ayran' }, priceCents: 350, category: 'drinks', image: '/products/ayran.jpeg' },
      { id: 'pepsi', name: { fr: 'Pepsi', nl: 'Pepsi', en: 'Pepsi' }, priceCents: 290, category: 'drinks', image: '/products/pepsi.jpeg' },
      { id: 'pepsi-max', name: { fr: 'Pepsi Max', nl: 'Pepsi Max', en: 'Pepsi Max' }, priceCents: 290, category: 'drinks', image: '/products/pepsi-max.jpeg' },
      { id: '7up', name: { fr: '7 Up', nl: '7 Up', en: '7 Up' }, priceCents: 290, category: 'drinks', image: '/products/7up.jpeg' },
      { id: 'mirinda', name: { fr: 'Mirinda', nl: 'Mirinda', en: 'Mirinda' }, priceCents: 290, category: 'drinks', image: '/products/mirinda.jpeg' },
      { id: 'uludag', name: { fr: 'Uludag', nl: 'Uludag', en: 'Uludag' }, priceCents: 290, category: 'drinks', image: '/products/uludag.jpeg' },
      { id: 'schweppes', name: { fr: 'Schweppes Agrumes', nl: 'Schweppes Citrus', en: 'Schweppes Citrus' }, priceCents: 290, category: 'drinks', image: '/products/schweppes.jpeg' },
      { id: 'ice-tea', name: { fr: 'Ice Tea', nl: 'Ice Tea', en: 'Ice Tea' }, priceCents: 290, category: 'drinks', image: '/products/ice-tea.jpeg' },
      { id: 'ice-tea-peach', name: { fr: 'Ice Tea Peach', nl: 'Ice Tea Perzik', en: 'Peach Ice Tea' }, priceCents: 290, category: 'drinks', image: '/products/ice-tea-peach.jpeg' },
      { id: 'oasis-tropical', name: { fr: 'Oasis Tropical', nl: 'Oasis Tropical', en: 'Oasis Tropical' }, priceCents: 290, category: 'drinks', image: '/products/oasis-tropical.jpeg' },
      { id: 'oasis-framboise', name: { fr: 'Oasis Framboise', nl: 'Oasis Framboos', en: 'Oasis Raspberry' }, priceCents: 290, category: 'drinks', image: '/products/oasis-framboise.jpeg' },
      { id: 'oasis-apple', name: { fr: 'Oasis Pomme', nl: 'Oasis Appel', en: 'Oasis Apple' }, priceCents: 290, category: 'drinks', image: '/products/oasis-apple.jpeg' },
      { id: 'evian', name: { fr: 'Evian 50cl', nl: 'Evian 50cl', en: 'Evian 50cl' }, priceCents: 290, category: 'drinks', image: '/products/evian.jpeg' },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);
export const itemById = (id: string) => allItems.find((i) => i.id === id);
