// demo data for Tomsk MVP — not affiliated with listed venues

import type { Category, LiveUpdate, MenuItem, Restaurant } from "./types";

export const categories: Category[] = [
  { id: "1", label: "Все", icon: "✦" },
  { id: "2", label: "Завтраки", icon: "☀" },
  { id: "3", label: "Азия", icon: "◈" },
  { id: "4", label: "Вино", icon: "◇" },
  { id: "5", label: "Кофе", icon: "◎" },
  { id: "6", label: "Десерты", icon: "◐" },
];

export const restaurants: Restaurant[] = [
  {
    id: "bulanzhe",
    name: "Буланже",
    cuisine: "Кафе · завтраки · десерты",
    description: "Уютное кафе с круассанами, сырниками и авторским кофе у Набережной.",
    district: "Кировский · ул. Набережная реки Ушайки",
    rating: 4.8,
    averageCheck: 950,
    distance: "380 м",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    liveStatus: "open",
    menuUpdatedAt: "2 мин назад",
    tags: ["живое меню", "бронь", "предзаказ"],
  },
  {
    id: "prokofe",
    name: "ПроКофе",
    cuisine: "Кофейня · авторский кофе",
    description: "Спешелти-кофе и лёгкие завтраки в пешей доступности от центра.",
    district: "Ленинский · пр. Ленина",
    rating: 4.7,
    averageCheck: 650,
    distance: "520 м",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    liveStatus: "busy",
    menuUpdatedAt: "4 мин назад",
    tags: ["live", "предзаказ"],
  },
  {
    id: "reka-827",
    name: "Река 827",
    cuisine: "Ресторан · средиземноморская",
    description: "Ужины у воды: паста, морепродукты и вино. Бронь столиков онлайн.",
    district: "Кировский · Набережная Томи",
    rating: 4.9,
    averageCheck: 2800,
    distance: "1.1 км",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    liveStatus: "open",
    menuUpdatedAt: "1 мин назад",
    tags: ["живое меню", "бронь", "вино"],
  },
  {
    id: "stroganina-bar",
    name: "Строганина-бар",
    cuisine: "Бар · гриль · сибирская",
    description: "Строганина, гриль и локальные закуски — формат вечернего ужина.",
    district: "Советский · ул. Гоголя",
    rating: 4.6,
    averageCheck: 2200,
    distance: "890 м",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    liveStatus: "busy",
    menuUpdatedAt: "6 мин назад",
    tags: ["стоп-лист", "бронь"],
  },
  {
    id: "pryanyj-timyan",
    name: "Пряный Тимьян",
    cuisine: "Кафе · обеды · завтраки",
    description: "Домашние обеды, супы и десерты — удобно зайти до визита в театр.",
    district: "Октябрьский · пл. Ленина",
    rating: 4.7,
    averageCheck: 1100,
    distance: "640 м",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    liveStatus: "open",
    menuUpdatedAt: "3 мин назад",
    tags: ["скидки", "предзаказ"],
  },
  {
    id: "make-love-pizza",
    name: "Make Love Pizza",
    cuisine: "Пицца · паста · салаты",
    description: "Неаполитанская пицца и паста — предзаказ к времени без доставки.",
    district: "Ленинский · ул. Красноармейская",
    rating: 4.8,
    averageCheck: 1400,
    distance: "750 м",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    liveStatus: "open",
    menuUpdatedAt: "только что",
    tags: ["живое меню", "предзаказ"],
  },
  {
    id: "intort",
    name: "Инторт",
    cuisine: "Кафе-кондитерская · торты",
    description: "Торты на заказ, эклеры и кофе — актуальная витрина десертов дня.",
    district: "Советский · пр. Фрунзе",
    rating: 4.9,
    averageCheck: 800,
    distance: "1.3 км",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    liveStatus: "closing",
    menuUpdatedAt: "9 мин назад",
    tags: ["антифуд-вейст", "скидки"],
  },
  {
    id: "khachapuri-mariko",
    name: "Хачапури Марико",
    cuisine: "Грузинская · хачапури",
    description: "Хачапури, хинкали и горячие блюда — меню обновляется в течение дня.",
    district: "Октябрьский · ул. Алтайская",
    rating: 4.8,
    averageCheck: 1300,
    distance: "1.5 км",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    liveStatus: "open",
    menuUpdatedAt: "5 мин назад",
    tags: ["живое меню", "бронь", "стоп-лист"],
  },
];

export const menuItems: MenuItem[] = [
  // Буланже
  {
    id: "b1",
    restaurantId: "bulanzhe",
    name: "Сырники",
    description: "Сметана, варенье · в наличии",
    price: 390,
    category: "Завтраки",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291770?w=400&q=80",
    isAvailable: true,
    updatedAt: "2 мин назад",
  },
  {
    id: "b2",
    restaurantId: "bulanzhe",
    name: "Круассан миндальный",
    description: "Заканчивается · осталось 5 шт.",
    price: 280,
    category: "Выпечка",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
    isAvailable: true,
    updatedAt: "4 мин назад",
  },
  {
    id: "b3",
    restaurantId: "bulanzhe",
    name: "Раф фисташковый",
    description: "350 мл · в наличии",
    price: 320,
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d930?w=400&q=80",
    isAvailable: true,
    updatedAt: "1 мин назад",
  },
  {
    id: "b4",
    restaurantId: "bulanzhe",
    name: "Чизкейк Нью-Йорк",
    description: "Стоп-лист до завтра",
    price: 420,
    category: "Десерты",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    isAvailable: false,
    updatedAt: "15 мин назад",
  },
  // ПроКофе
  {
    id: "p1",
    restaurantId: "prokofe",
    name: "Капучино",
    description: "Эфиопия · single origin",
    price: 240,
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668e64e21d?w=400&q=80",
    isAvailable: true,
    updatedAt: "3 мин назад",
  },
  {
    id: "p2",
    restaurantId: "prokofe",
    name: "Матча латте",
    description: "Овсяное молоко · в наличии",
    price: 310,
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1515823064-29b1a42a8318?w=400&q=80",
    isAvailable: true,
    updatedAt: "5 мин назад",
  },
  {
    id: "p3",
    restaurantId: "prokofe",
    name: "Омлет с зеленью",
    description: "Завтрак до 12:00",
    price: 360,
    category: "Завтраки",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80",
    isAvailable: true,
    isDiscount: true,
    discountPercent: 25,
    updatedAt: "8 мин назад",
  },
  // Река 827
  {
    id: "r1",
    restaurantId: "reka-827",
    name: "Том ям с креветками",
    description: "Острый · в наличии",
    price: 890,
    category: "Супы",
    image:
      "https://images.unsplash.com/photo-1548943487-a2e4e8a163c0?w=400&q=80",
    isAvailable: true,
    updatedAt: "1 мин назад",
  },
  {
    id: "r2",
    restaurantId: "reka-827",
    name: "Салат с бурратой",
    description: "Томаты, руккола, оливковое масло",
    price: 720,
    category: "Салаты",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    isAvailable: true,
    updatedAt: "6 мин назад",
  },
  {
    id: "r3",
    restaurantId: "reka-827",
    name: "Паста с морепродуктами",
    description: "Блюдо дня · −25% до конца дня",
    price: 980,
    category: "Основные",
    image:
      "https://images.unsplash.com/photo-1473093295047-4dd240c4d878?w=400&q=80",
    isAvailable: true,
    isDiscount: true,
    discountPercent: 25,
    updatedAt: "4 мин назад",
  },
  {
    id: "r4",
    restaurantId: "reka-827",
    name: "Дорадо на гриле",
    description: "Стоп-лист · нет поставки",
    price: 1450,
    category: "Основные",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    isAvailable: false,
    updatedAt: "20 мин назад",
  },
  // Строганина-бар
  {
    id: "s1",
    restaurantId: "stroganina-bar",
    name: "Строганина из муксуна",
    description: "Классическая подача · в наличии",
    price: 890,
    category: "Закуски",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    isAvailable: true,
    updatedAt: "7 мин назад",
  },
  {
    id: "s2",
    restaurantId: "stroganina-bar",
    name: "Шашлык из свинины",
    description: "Заканчивается · 3 порции",
    price: 680,
    category: "Гриль",
    image:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80",
    isAvailable: true,
    updatedAt: "5 мин назад",
  },
  {
    id: "s3",
    restaurantId: "stroganina-bar",
    name: "Кедровые орехи с мёдом",
    description: "Стоп-лист",
    price: 420,
    category: "Закуски",
    image:
      "https://images.unsplash.com/photo-1604908176997-431d6221c2f3?w=400&q=80",
    isAvailable: false,
    updatedAt: "11 мин назад",
  },
  // Пряный Тимьян
  {
    id: "t1",
    restaurantId: "pryanyj-timyan",
    name: "Борщ с пампушками",
    description: "Обеденное меню · в наличии",
    price: 450,
    category: "Супы",
    image:
      "https://images.unsplash.com/photo-1547592160-23ac45744acd?w=400&q=80",
    isAvailable: true,
    updatedAt: "3 мин назад",
  },
  {
    id: "t2",
    restaurantId: "pryanyj-timyan",
    name: "Куриный суп с лапшой",
    description: "Заканчивается · 6 порций",
    price: 380,
    category: "Супы",
    image:
      "https://images.unsplash.com/photo-1604908177525-4724fdbecaa0?w=400&q=80",
    isAvailable: true,
    updatedAt: "6 мин назад",
  },
  {
    id: "t3",
    restaurantId: "pryanyj-timyan",
    name: "Медовик",
    description: "−25% до конца дня",
    price: 320,
    category: "Десерты",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    isAvailable: true,
    isDiscount: true,
    discountPercent: 25,
    updatedAt: "2 мин назад",
  },
  // Make Love Pizza
  {
    id: "m1",
    restaurantId: "make-love-pizza",
    name: "Пицца Маргарита",
    description: "Неаполитанское тесто · 32 см",
    price: 590,
    category: "Пицца",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    isAvailable: true,
    updatedAt: "только что",
  },
  {
    id: "m2",
    restaurantId: "make-love-pizza",
    name: "Пицца пепперони",
    description: "В наличии · предзаказ +30 мин",
    price: 690,
    category: "Пицца",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
    isAvailable: true,
    updatedAt: "2 мин назад",
  },
  {
    id: "m3",
    restaurantId: "make-love-pizza",
    name: "Паста карбонара",
    description: "Стоп-лист до вечера",
    price: 520,
    category: "Паста",
    image:
      "https://images.unsplash.com/photo-1473093295047-4dd240c4d878?w=400&q=80",
    isAvailable: false,
    updatedAt: "10 мин назад",
  },
  {
    id: "m4",
    restaurantId: "make-love-pizza",
    name: "Салат Цезарь",
    description: "Курица, пармезан · в наличии",
    price: 480,
    category: "Салаты",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&q=80",
    isAvailable: true,
    updatedAt: "4 мин назад",
  },
  // Инторт
  {
    id: "i1",
    restaurantId: "intort",
    name: "Эклер ванильный",
    description: "Витрина · в наличии",
    price: 180,
    category: "Десерты",
    image:
      "https://images.unsplash.com/photo-1528736235302-52922df5c9e8?w=400&q=80",
    isAvailable: true,
    updatedAt: "5 мин назад",
  },
  {
    id: "i2",
    restaurantId: "intort",
    name: "Торт «Прага»",
    description: "Порционный · заканчивается",
    price: 290,
    category: "Торты",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    isAvailable: true,
    isDiscount: true,
    discountPercent: 30,
    updatedAt: "7 мин назад",
  },
  {
    id: "i3",
    restaurantId: "intort",
    name: "Капучино",
    description: "К десерту · в наличии",
    price: 220,
    category: "Кофе",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668e64e21d?w=400&q=80",
    isAvailable: true,
    updatedAt: "3 мин назад",
  },
  {
    id: "i4",
    restaurantId: "intort",
    name: "Наполеон",
    description: "Стоп-лист · распродан",
    price: 310,
    category: "Торты",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
    isAvailable: false,
    updatedAt: "12 мин назад",
  },
  // Хачапури Марико
  {
    id: "k1",
    restaurantId: "khachapuri-mariko",
    name: "Хачапури по-аджарски",
    description: "Яйцо, сыр сулугуни · в наличии",
    price: 620,
    category: "Горячие блюда",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568fa7098?w=400&q=80",
    isAvailable: true,
    updatedAt: "4 мин назад",
  },
  {
    id: "k2",
    restaurantId: "khachapuri-mariko",
    name: "Хинкали с мясом (5 шт.)",
    description: "Классические · в наличии",
    price: 480,
    category: "Горячие блюда",
    image:
      "https://images.unsplash.com/photo-1606491956689-2ea613886b97?w=400&q=80",
    isAvailable: true,
    updatedAt: "2 мин назад",
  },
  {
    id: "k3",
    restaurantId: "khachapuri-mariko",
    name: "Хачапури по-мегрельски",
    description: "Заканчивается · 4 порции",
    price: 580,
    category: "Горячие блюда",
    image:
      "https://images.unsplash.com/photo-1604908176997-431d6221c2f3?w=400&q=80",
    isAvailable: true,
    updatedAt: "6 мин назад",
  },
  {
    id: "k4",
    restaurantId: "khachapuri-mariko",
    name: "Чахохбили",
    description: "Стоп-лист",
    price: 720,
    category: "Горячие блюда",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    isAvailable: false,
    updatedAt: "18 мин назад",
  },
];

export const liveUpdates: LiveUpdate[] = [
  {
    id: "u1",
    restaurantId: "bulanzhe",
    restaurantName: "Буланже",
    message: "Добавлены сырники с малиной в меню",
    time: "2 мин",
    type: "menu",
  },
  {
    id: "u2",
    restaurantId: "khachapuri-mariko",
    restaurantName: "Хачапури Марико",
    message: "Чахохбили — в стоп-листе",
    time: "5 мин",
    type: "stop",
  },
  {
    id: "u3",
    restaurantId: "intort",
    restaurantName: "Инторт",
    message: "Торт «Прага» −30% до закрытия",
    time: "7 мин",
    type: "discount",
  },
  {
    id: "u4",
    restaurantId: "make-love-pizza",
    restaurantName: "Make Love Pizza",
    message: "Паста карбонара временно недоступна",
    time: "10 мин",
    type: "stop",
  },
  {
    id: "u5",
    restaurantId: "reka-827",
    restaurantName: "Река 827",
    message: "Паста с морепродуктами — блюдо дня −25%",
    time: "12 мин",
    type: "discount",
  },
  {
    id: "u6",
    restaurantId: "prokofe",
    restaurantName: "ПроКофе",
    message: "Омлет с зеленью −25% до 12:00",
    time: "15 мин",
    type: "discount",
  },
  {
    id: "u7",
    restaurantId: "stroganina-bar",
    restaurantName: "Строганина-бар",
    message: "Шашлык — осталось 3 порции",
    time: "8 мин",
    type: "menu",
  },
  {
    id: "u8",
    restaurantId: "pryanyj-timyan",
    restaurantName: "Пряный Тимьян",
    message: "Медовик −25% до конца дня",
    time: "14 мин",
    type: "discount",
  },
];

export const antiWasteDeals = [
  {
    id: "aw1",
    title: "Круассан миндальный",
    venue: "Буланже",
    discount: "−25%",
    until: "до 20:00",
  },
  {
    id: "aw2",
    title: "Торт «Прага»",
    venue: "Инторт",
    discount: "−30%",
    until: "4 шт.",
  },
  {
    id: "aw3",
    title: "Медовик",
    venue: "Пряный Тимьян",
    discount: "−25%",
    until: "до конца дня",
  },
];

/** Featured venue on the global /menu screen */
export const featuredMenuVenue = {
  restaurantId: "bulanzhe",
  get name() {
    return restaurants.find((r) => r.id === this.restaurantId)?.name ?? "Буланже";
  },
  get menuUpdatedAt() {
    return (
      restaurants.find((r) => r.id === this.restaurantId)?.menuUpdatedAt ??
      "2 мин назад"
    );
  },
};

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getMenuItemsByRestaurantId(restaurantId: string): MenuItem[] {
  return menuItems.filter((item) => item.restaurantId === restaurantId);
}
