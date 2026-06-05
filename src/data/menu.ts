type Lang = 'fr' | 'nl' | 'en';
export type MenuItem = {
  id: string;
  name: Record<Lang, string>;
  priceCents: number;
  category: string;
  description?: Record<Lang, string>;
  image?: string;
};
export type Category = { id: string; title: Record<Lang, string>; items: MenuItem[] };

export const categories: Category[] = [
  {
    id: 'durums',
    title: { fr: 'Dürüms', nl: 'Dürüms', en: 'Dürüms' },
    items: [
      { id: 'durum-boeuf', name: { fr: 'Dürüm Bœuf', nl: 'Dürüm Rund', en: 'Beef Dürüm' }, priceCents: 1150, category: 'durums' },
      { id: 'durum-poulet', name: { fr: 'Dürüm Poulet', nl: 'Dürüm Kip', en: 'Chicken Dürüm' }, priceCents: 1050, category: 'durums' },
      { id: 'durum-mix', name: { fr: 'Dürüm Mix', nl: 'Dürüm Mix', en: 'Mixed Dürüm' }, priceCents: 1250, category: 'durums' },
      { id: 'durum-falafel', name: { fr: 'Dürüm Falafel', nl: 'Dürüm Falafel', en: 'Falafel Dürüm' }, priceCents: 950, category: 'durums' },
    ],
  },
  {
    id: 'sandwiches',
    title: { fr: 'Sandwichs', nl: 'Broodjes', en: 'Sandwiches' },
    items: [
      { id: 'sandwich-boeuf', name: { fr: 'Sandwich Bœuf', nl: 'Broodje Rund', en: 'Beef Sandwich' }, priceCents: 1150, category: 'sandwiches' },
      { id: 'sandwich-poulet', name: { fr: 'Sandwich Poulet', nl: 'Broodje Kip', en: 'Chicken Sandwich' }, priceCents: 1050, category: 'sandwiches' },
      { id: 'sandwich-mix', name: { fr: 'Sandwich Mix', nl: 'Broodje Mix', en: 'Mixed Sandwich' }, priceCents: 1250, category: 'sandwiches' },
      { id: 'sandwich-falafel', name: { fr: 'Sandwich Falafel', nl: 'Broodje Falafel', en: 'Falafel Sandwich' }, priceCents: 950, category: 'sandwiches' },
    ],
  },
  {
    id: 'bowls',
    title: { fr: 'Bowls', nl: 'Bowls', en: 'Bowls' },
    items: [
      { id: 'bowl-boeuf', name: { fr: 'Bowl Bœuf', nl: 'Bowl Rund', en: 'Beef Bowl' }, priceCents: 1550, category: 'bowls' },
      { id: 'bowl-poulet', name: { fr: 'Bowl Poulet', nl: 'Bowl Kip', en: 'Chicken Bowl' }, priceCents: 1450, category: 'bowls' },
      { id: 'bowl-mix', name: { fr: 'Bowl Mix', nl: 'Bowl Mix', en: 'Mixed Bowl' }, priceCents: 1650, category: 'bowls' },
      { id: 'bowl-falafel', name: { fr: 'Bowl Falafel', nl: 'Bowl Falafel', en: 'Falafel Bowl' }, priceCents: 1250, category: 'bowls' },
    ],
  },
  {
    id: 'sides',
    title: { fr: 'Accompagnements', nl: 'Bijgerechten', en: 'Sides' },
    items: [
      { id: 'chilli-cheese', name: { fr: 'Chilli Cheese (5 pcs)', nl: 'Chilli Cheese (5 st)', en: 'Chilli Cheese (5 pcs)' }, priceCents: 590, category: 'sides' },
      { id: 'onion-rings', name: { fr: 'Onion Rings (5 pcs)', nl: 'Uienringen (5 st)', en: 'Onion Rings (5 pcs)' }, priceCents: 590, category: 'sides' },
      { id: 'mozzarella-stick', name: { fr: 'Mozzarella Sticks (5 pcs)', nl: 'Mozzarella Sticks (5 st)', en: 'Mozzarella Sticks (5 pcs)' }, priceCents: 590, category: 'sides' },
      { id: 'falafel', name: { fr: 'Falafel (4 pcs)', nl: 'Falafel (4 st)', en: 'Falafel (4 pcs)' }, priceCents: 490, category: 'sides' },
      { id: 'wings', name: { fr: 'Wings (4 pcs)', nl: 'Wings (4 st)', en: 'Wings (4 pcs)' }, priceCents: 590, category: 'sides' },
      { id: 'nuggets-xl', name: { fr: 'Nuggets XL (3 pcs)', nl: 'Nuggets XL (3 st)', en: 'Nuggets XL (3 pcs)' }, priceCents: 490, category: 'sides' },
    ],
  },
  {
    id: 'fries',
    title: { fr: 'Frites', nl: 'Frieten', en: 'Fries' },
    items: [
      { id: 'frites', name: { fr: 'Frites fraîches', nl: 'Verse frieten', en: 'Fresh Fries' }, priceCents: 450, category: 'fries' },
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
      },
    ],
  },
  {
    id: 'drinks',
    title: { fr: 'Boissons', nl: 'Dranken', en: 'Drinks' },
    items: [
      { id: 'ayran', name: { fr: 'Ayran', nl: 'Ayran', en: 'Ayran' }, priceCents: 350, category: 'drinks' },
    ],
  },
];

export const allItems = categories.flatMap((c) => c.items);
export const itemById = (id: string) => allItems.find((i) => i.id === id);
