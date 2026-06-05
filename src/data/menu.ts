type Lang = 'fr' | 'nl' | 'en';

export type OptionItem = {
  id: string;
  name: Record<Lang, string>;
  priceCents: number; // 0 = free
};

export type OptionGroup = {
  id: string;
  title: Record<Lang, string>;
  required: boolean;
  multiple: boolean; // true = checkbox, false = radio
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
      {
        id: 'durum-boeuf',
        name: { fr: 'Dürüm Bœuf', nl: 'Dürüm Rund', en: 'Beef Dürüm' },
        priceCents: 1150,
        category: 'durums',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'durum-poulet',
        name: { fr: 'Dürüm Poulet', nl: 'Dürüm Kip', en: 'Chicken Dürüm' },
        priceCents: 1050,
        category: 'durums',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'durum-mix',
        name: { fr: 'Dürüm Mix', nl: 'Dürüm Mix', en: 'Mixed Dürüm' },
        priceCents: 1250,
        category: 'durums',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'durum-falafel',
        name: { fr: 'Dürüm Falafel', nl: 'Dürüm Falafel', en: 'Falafel Dürüm' },
        priceCents: 950,
        category: 'durums',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
    ],
  },
  {
    id: 'sandwiches',
    title: { fr: 'Sandwichs', nl: 'Broodjes', en: 'Sandwiches' },
    items: [
      {
        id: 'sandwich-boeuf',
        name: { fr: 'Sandwich Bœuf', nl: 'Broodje Rund', en: 'Beef Sandwich' },
        priceCents: 1150,
        category: 'sandwiches',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'sandwich-poulet',
        name: { fr: 'Sandwich Poulet', nl: 'Broodje Kip', en: 'Chicken Sandwich' },
        priceCents: 1050,
        category: 'sandwiches',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'sandwich-mix',
        name: { fr: 'Sandwich Mix', nl: 'Broodje Mix', en: 'Mixed Sandwich' },
        priceCents: 1250,
        category: 'sandwiches',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'sandwich-falafel',
        name: { fr: 'Sandwich Falafel', nl: 'Broodje Falafel', en: 'Falafel Sandwich' },
        priceCents: 950,
        category: 'sandwiches',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
    ],
  },
  {
    id: 'bowls',
    title: { fr: 'Bowls', nl: 'Bowls', en: 'Bowls' },
    items: [
      {
        id: 'bowl-boeuf',
        name: { fr: 'Bowl Bœuf', nl: 'Bowl Rund', en: 'Beef Bowl' },
        priceCents: 1550,
        category: 'bowls',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'bowl-poulet',
        name: { fr: 'Bowl Poulet', nl: 'Bowl Kip', en: 'Chicken Bowl' },
        priceCents: 1450,
        category: 'bowls',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'bowl-mix',
        name: { fr: 'Bowl Mix', nl: 'Bowl Mix', en: 'Mixed Bowl' },
        priceCents: 1650,
        category: 'bowls',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
      {
        id: 'bowl-falafel',
        name: { fr: 'Bowl Falafel', nl: 'Bowl Falafel', en: 'Falafel Bowl' },
        priceCents: 1250,
        category: 'bowls',
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
        options: SANDWICH_OPTIONS,
      },
    ],
  },
  {
    id: 'sides',
    title: { fr: 'Accompagnements', nl: 'Bijgerechten', en: 'Sides' },
    items: [
      {
        id: 'chilli-cheese',
        name: { fr: 'Chilli Cheese (5 pcs)', nl: 'Chilli Cheese (5 st)', en: 'Chilli Cheese (5 pcs)' },
        priceCents: 590,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80',
      },
      {
        id: 'onion-rings',
        name: { fr: 'Onion Rings (5 pcs)', nl: 'Uienringen (5 st)', en: 'Onion Rings (5 pcs)' },
        priceCents: 590,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80',
      },
      {
        id: 'mozzarella-stick',
        name: { fr: 'Mozzarella Sticks (5 pcs)', nl: 'Mozzarella Sticks (5 st)', en: 'Mozzarella Sticks (5 pcs)' },
        priceCents: 590,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?w=400&q=80',
      },
      {
        id: 'falafel',
        name: { fr: 'Falafel (4 pcs)', nl: 'Falafel (4 st)', en: 'Falafel (4 pcs)' },
        priceCents: 490,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1593001874117-c99d7fb8e5a3?w=400&q=80',
      },
      {
        id: 'wings',
        name: { fr: 'Wings (4 pcs)', nl: 'Wings (4 st)', en: 'Wings (4 pcs)' },
        priceCents: 590,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80',
      },
      {
        id: 'nuggets-xl',
        name: { fr: 'Nuggets XL (3 pcs)', nl: 'Nuggets XL (3 st)', en: 'Nuggets XL (3 pcs)' },
        priceCents: 490,
        category: 'sides',
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80',
      },
    ],
  },
  {
    id: 'fries',
    title: { fr: 'Frites', nl: 'Frieten', en: 'Fries' },
    items: [
      {
        id: 'frites',
        name: { fr: 'Frites fraîches', nl: 'Verse frieten', en: 'Fresh Fries' },
        priceCents: 450,
        category: 'fries',
        image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=400&q=80',
      },
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
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
      },
    ],
  },
  {
    id: 'drinks',
    title: { fr: 'Boissons', nl: 'Dranken', en: 'Drinks' },
    items: [
      {
        id: 'ayran',
        name: { fr: 'Ayran', nl: 'Ayran', en: 'Ayran' },
        priceCents: 350,
        category: 'drinks',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80',
      },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);
export const itemById = (id: string) => allItems.find((i) => i.id === id);
