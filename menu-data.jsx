// menu-data.jsx — Kimochi everyday menu, transcribed faithfully from the menu board.
// Asterisk (*) on a flavor means it contains caffeine.

const MENU_SECTIONS = [
  {
    id: "classic-milk-tea",
    name: "Classic Milk Tea",
    sub: "Real brewed tea — sweetened just right.",
    items: ["Earl Grey Black Tea", "Jasmine Green Tea"],
    hot: false,
  },
  {
    id: "milk-tea",
    name: "Milk Tea",
    sub: "Black tea & non-dairy creamer.",
    pickHint: "Pick 1 – 2 flavors",
    note: "Make it a slush",
    items: [
      "Banana", "Brown Sugar", "Cafe Mocha*", "Coconut", "Coffee*",
      "Hibiscus", "Honeydew", "Mango", "Matcha*", "Rose",
      "Strawberry", "Taro", "Thai Tea*",
    ],
  },
  {
    id: "iced-or-hot-tea",
    name: "Iced or Hot Tea",
    sub: "Just tea — sweetened or unsweetened.",
    items: ["Earl Grey Black Tea", "Jasmine Green Tea"],
  },
  {
    id: "hot-cocoa",
    name: "Hot Cocoa",
    sub: "Made from scratch.",
    items: ["Original", "Caramel", "Peppermint", "Vanilla"],
    hot: true,
  },
  {
    id: "tea-latte",
    name: "Tea Latte",
    sub: "Made with milk over black milk tea.",
    note: "Upgrade to oat milk",
    items: [
      "Brown Sugar", "Cafe Mocha*", "Chai*", "Mango",
      "Matcha*", "Strawberry", "Taro", "Thai Tea*",
    ],
  },
  {
    id: "fruit-tea",
    name: "Fruit Tea",
    sub: "Made with green tea.",
    pickHint: "Pick 1 – 2 flavors",
    items: [
      "Green Apple", "Hibiscus", "Honeydew", "Lychee",
      "Mango", "Peach", "Passion Fruit", "Pomegranate", "Strawberry",
    ],
  },
  {
    id: "lemonade",
    name: "Lemonade",
    sub: "House-made · Caffeine free.",
    items: [
      "Blue Raspberry", "Green Apple", "Lavender", "Mango", "Passion Fruit",
      "Original", "Peach", "Pomegranate", "Strawberry", "Watermelon",
    ],
  },
];

// Seasonal "Specialty Drink Series" — signature builds + espresso bar.
// Distinct from the everyday flavor lists: these are named, photographed,
// rotate with the season. Asterisk semantics preserved (* = caffeine).
const SPECIALTY = {
  season: "Spring / Summer ’26",
  series: [
    { id: "pbj",               name: "PB & J",            base: "Earl Grey milk tea",       build: ["Peanut butter · Strawberry", "Strawberry cream top · PB crumbles"], caffeine: true },
    { id: "strawberry-fields", name: "Strawberry Fields", base: "Earl Grey or Jasmine tea", build: ["Strawberry · Basil", "Strawberry popping boba"],                    caffeine: true },
    { id: "orange-creamsicle", name: "Orange Creamsicle", base: "Earl Grey milk tea",       build: ["Orange · Vanilla", "Whipped cream · Sugar crystals"],               caffeine: true },
    { id: "razz-biscus",       name: "Razz-biscus",       base: "Earl Grey or Jasmine tea", build: ["Raspberry · Hibiscus", "Lychee jelly"],                             caffeine: true },
    { id: "cookie-monster",    name: "Cookie Monster",    base: "Cookies & cream slush",    build: ["Mocha · Whipped cream", "Oreo"],                                    caffeine: true },
    { id: "mango-shirley",     name: "Mango Shirley",     base: "House lemonade",           build: ["Mango · Grenadine", "Mango popping boba"],                          caffeine: false },
  ],
  specialtyEspresso: [
    { name: "Honey Bee",    build: "Honey · Lavender · Vanilla cream top" },
    { name: "Salty Bee",    build: "Honey · Flake sea salt · Vanilla cream top" },
    { name: "Dirty PB & J", build: "Peanut butter sauce · Strawberry · Strawberry cream top · PB crumbles" },
  ],
  espresso: [
    { name: "Daily Grind Latte",     build: "Vanilla · Caramel · Mocha" },
    { name: "Brown Sugar Shaken",    build: "Brown sugar syrup" },
    { name: "Cinnamon Toast Crunch", build: "White mocha · Brown sugar · Cinnamon" },
    { name: "Coconut Taro Shaken",   build: "Coconut · Taro milk" },
    { name: "Dirty Caramel Chai",    build: "Chai · Caramel" },
    { name: "Dirty Horchata",        build: "Horchata" },
    { name: "Vietnamese Iced Coffee",build: "Phin brewed · Sweetened condensed milk" },
  ],
};

// Category filter groupings for the chip rail (variation A & B)
const MENU_FILTERS = [
  { id: "all",     label: "All",         sections: MENU_SECTIONS.map((s) => s.id) },
  { id: "milk",    label: "Milk tea",    sections: ["classic-milk-tea", "milk-tea", "tea-latte"] },
  { id: "fruit",   label: "Fruit tea",   sections: ["fruit-tea"] },
  { id: "lemonade",label: "Lemonade",    sections: ["lemonade"] },
  { id: "hot",     label: "Hot drinks",  sections: ["iced-or-hot-tea", "hot-cocoa"] },
];

const TOPPINGS = {
  base: {
    name: "Toppings",
    items: [
      { name: "Flavor Swirls", note: "Caramel · Mocha · White Chocolate" },
      { name: "Tapioca Pearls" },
      { name: "Crystal Boba" },
      { name: "Aloe Vera" },
      { name: "Oreo Crumbles" },
      { name: "Whipped Cream" },
      { name: "Espresso Shot*" },
    ],
  },
  jelly: {
    name: "Jelly",
    items: ["Coffee*", "Coconut", "Lychee", "Mango", "Strawberry"].map((n) => ({ name: n })),
  },
  popping: {
    name: "Popping Boba",
    items: ["Blueberry", "Peach", "Green Apple", "Passion Fruit", "Lychee", "Pomegranate", "Mango", "Strawberry"].map((n) => ({ name: n })),
  },
};

// Flavor → swatch color (drawn from the design system's flavor palette + neutral fallbacks)
const FLAVOR_SWATCH = {
  "Earl Grey Black Tea":    "linear-gradient(180deg, #C4A082 0%, #5B3A24 100%)",
  "Jasmine Green Tea":      "linear-gradient(180deg, #E6EDD6 0%, #8AA866 100%)",
  "Brown Sugar":            "linear-gradient(180deg, #F0DCC2 0%, #8B5E3C 100%)",
  "Matcha*":                "linear-gradient(180deg, #D0E4E0 0%, #4B8A95 100%)",
  "Matcha":                 "linear-gradient(180deg, #D0E4E0 0%, #4B8A95 100%)",
  "Taro":                   "linear-gradient(180deg, #EBD9F4 0%, #8B6BA8 100%)",
  "Mango":                  "linear-gradient(180deg, #FAE8B0 0%, #F0C060 100%)",
  "Strawberry":             "linear-gradient(180deg, #FFE0E5 0%, #E87394 100%)",
  "Rose":                   "linear-gradient(180deg, #F8E0E0 0%, #C87878 100%)",
  "Thai Tea*":              "linear-gradient(180deg, #FFD8B5 0%, #E0782E 100%)",
  "Coffee*":                "linear-gradient(180deg, #C8A07F 0%, #4A2E1F 100%)",
  "Cafe Mocha*":            "linear-gradient(180deg, #C0A088 0%, #3A2418 100%)",
  "Chai*":                  "linear-gradient(180deg, #E5BC8A 0%, #9C6B3F 100%)",
  "Coconut":                "linear-gradient(180deg, #F8F4ED 0%, #D9C8B1 100%)",
  "Banana":                 "linear-gradient(180deg, #FFF3B5 0%, #E6C24B 100%)",
  "Hibiscus":               "linear-gradient(180deg, #FAD2D2 0%, #C84A6B 100%)",
  "Honeydew":               "linear-gradient(180deg, #E0F0CC 0%, #88B870 100%)",
  "Lychee":                 "linear-gradient(180deg, #FFF0F0 0%, #F0C0C0 100%)",
  "Peach":                  "linear-gradient(180deg, #FFE4CB 0%, #F0A06E 100%)",
  "Passion Fruit":          "linear-gradient(180deg, #FFEAA0 0%, #E0A030 100%)",
  "Pomegranate":            "linear-gradient(180deg, #F8D0D5 0%, #B03050 100%)",
  "Green Apple":            "linear-gradient(180deg, #E8F4C8 0%, #88B848 100%)",
  "Blue Raspberry":         "linear-gradient(180deg, #C8E0FF 0%, #2A6FBF 100%)",
  "Lavender":               "linear-gradient(180deg, #E8DCF4 0%, #9080C8 100%)",
  "Watermelon":             "linear-gradient(180deg, #FFCED0 0%, #E04050 50%, #88C870 100%)",
  "Original":               "linear-gradient(180deg, #FFF4DC 0%, #D8B070 100%)",
  "Caramel":                "linear-gradient(180deg, #F4D8B0 0%, #A07040 100%)",
  "Peppermint":             "linear-gradient(180deg, #E0F4E8 0%, #4AAA8A 100%)",
  "Vanilla":                "linear-gradient(180deg, #FFF6E0 0%, #E8C880 100%)",
};

function flavorColor(name) {
  return FLAVOR_SWATCH[name] || "linear-gradient(180deg, var(--color-blush) 0%, var(--color-blush-deep) 100%)";
}

// Helper: strip the asterisk for display, return {label, caffeine}
function parseItem(raw) {
  const caffeine = raw.endsWith("*");
  return { label: caffeine ? raw.slice(0, -1) : raw, caffeine };
}

Object.assign(window, { MENU_SECTIONS, MENU_FILTERS, TOPPINGS, FLAVOR_SWATCH, flavorColor, parseItem, SPECIALTY });
