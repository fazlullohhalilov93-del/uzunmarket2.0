// База данных товаров для Uzum Market
// 55+ детально проработанных товаров в 13 категориях

const PRODUCTS_DATA = [
  // --- 1. Смартфоны ---
  {
    id: 1,
    title: "Смартфон Apple iPhone 15 Pro Max 256GB, Titanium",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 15490000,
    oldPrice: 17800000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 342,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Флагманский смартфон Apple с титановым корпусом, мощнейшим чипом A17 Pro и революционной камерой 48 Мп с 5-кратным оптическим зумом. Дисплей Super Retina XDR с частотой 120 Гц и функцией Always-On.",
    specs: {
      "Диагональ экрана": "6.7 дюйма",
      "Процессор": "Apple A17 Pro (3 нм)",
      "Встроенная память": "256 ГБ",
      "Основная камера": "48 + 12 + 12 Мп, 5x зум",
      "Материал корпуса": "Титан аэрокосмического класса",
      "Вес": "221 г"
    }
  },
  {
    id: 2,
    title: "Смартфон Samsung Galaxy S24 Ultra 12/512GB, Titanium Gray",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 14200000,
    oldPrice: 16500000,
    discount: 14,
    rating: 4.8,
    reviewsCount: 215,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Инновационный Galaxy S24 Ultra с искусственным интеллектом Galaxy AI, встроенным стилусом S Pen, титановой рамкой и 200-мегапиксельной камерой профессионального уровня.",
    specs: {
      "Экран": "6.8\" Dynamic AMOLED 2X, 120 Гц",
      "Процессор": "Snapdragon 8 Gen 3 for Galaxy",
      "Оперативная память": "12 ГБ",
      "Память": "512 ГБ",
      "Аккумулятор": "5000 мАч"
    }
  },
  {
    id: 3,
    title: "Смартфон Xiaomi 14 Pro 12/256GB Leica Camera, Black",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 9890000,
    oldPrice: 11500000,
    discount: 14,
    rating: 4.7,
    reviewsCount: 168,
    badge: "Скидка",
    isPopular: false,
    isDayDeal: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Премиальный смартфон с оптикой Leica Summilux, переменной диафрагмой f/1.42–f/4.0 и сверхбыстрой зарядкой 120 Вт HyperCharge.",
    specs: {
      "Экран": "6.73\" LTPO AMOLED, WQHD+",
      "Процессор": "Snapdragon 8 Gen 3",
      "Камера": "50 Мп Leica + 50 Мп + 50 Мп",
      "Зарядка": "120 Вт проводная, 50 Вт беспроводная"
    }
  },
  {
    id: 4,
    title: "Смартфон Google Pixel 8 Pro 128GB, Obsidian",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 9200000,
    oldPrice: 10400000,
    discount: 12,
    rating: 4.8,
    reviewsCount: 94,
    badge: "Новинка",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Чистый Android с поддержкой 7 лет обновлений, фирменный процессор Google Tensor G3 и лучшие алгоритмы мобильной вычислительной фотографии.",
    specs: {
      "Экран": "6.7\" Super Actua Display, 1-120 Гц",
      "Процессор": "Google Tensor G3",
      "ОЗУ": "12 ГБ LPDDR5X",
      "Особенности": "Встроенный датчик температуры, Best Take"
    }
  },
  {
    id: 5,
    title: "Смартфон OnePlus 12 16/512GB, Emerald Green",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 8850000,
    oldPrice: 9900000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 130,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Мощнейший флагман с 4-м поколением камер Hasselblad, аккумулятором 5400 мАч и феноменальной яркостью дисплея до 4500 нит.",
    specs: {
      "Экран": "6.82\" 2K 120Hz ProXDR",
      "Процессор": "Snapdragon 8 Gen 3",
      "Быстрая зарядка": "100W SUPERVOOC"
    }
  },

  // --- 2. Ноутбуки ---
  {
    id: 6,
    title: "Ноутбук Apple MacBook Air 15\" M2 8/256GB, Midnight",
    category: "laptops",
    categoryName: "Ноутбуки",
    price: 14700000,
    oldPrice: 16900000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 187,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Невероятно тонкий и легкий ноутбук с просторным 15.3-дюймовым экраном Liquid Retina, энергоэффективным чипом M2 и автономностью до 18 часов без подзарядки.",
    specs: {
      "Экран": "15.3\" Liquid Retina 2880x1864",
      "Процессор": "Apple M2 (8 CPU / 10 GPU)",
      "ОЗУ": "8 ГБ объединенной памяти",
      "Накопитель": "256 ГБ SSD",
      "Автономность": "До 18 часов"
    }
  },
  {
    id: 7,
    title: "Игровой ноутбук ASUS ROG Zephyrus G16 Intel i9 / RTX 4070 / 32GB",
    category: "laptops",
    categoryName: "Ноутбуки",
    price: 24500000,
    oldPrice: 28000000,
    discount: 12,
    rating: 4.8,
    reviewsCount: 65,
    badge: "Премиум",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Ультратонкий алюминиевый корпус, OLED дисплей ROG Nebula 240 Гц, новейшая видеокарта GeForce RTX 4070 и звук высокой четкости с 6 динамиками.",
    specs: {
      "Экран": "16\" OLED 2.5K 240Hz 0.2ms",
      "Процессор": "Intel Core Ultra 9 185H",
      "Видеокарта": "NVIDIA GeForce RTX 4070 8GB",
      "ОЗУ": "32 ГБ LPDDR5X",
      "SSD": "1 ТБ PCIe 4.0"
    }
  },
  {
    id: 8,
    title: "Ноутбук Lenovo ThinkPad E16 Gen 1 AMD Ryzen 5 / 16GB / 512GB",
    category: "laptops",
    categoryName: "Ноутбуки",
    price: 7600000,
    oldPrice: 8900000,
    discount: 15,
    rating: 4.7,
    reviewsCount: 89,
    badge: "Выгодно",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Надежный бизнес-ноутбук с легендарной клавиатурой ThinkPad, прочным корпусом по военному стандарту MIL-STD-810H и быстрой зарядкой Rapid Charge.",
    specs: {
      "Экран": "16\" IPS WUXGA (1920x1200)",
      "Процессор": "AMD Ryzen 5 7530U (6 ядер / 12 потоков)",
      "ОЗУ": "16 ГБ DDR4",
      "SSD": "512 ГБ NVMe M.2"
    }
  },
  {
    id: 9,
    title: "Ноутбук Apple MacBook Pro 16\" M3 Pro 18/512GB, Space Black",
    category: "laptops",
    categoryName: "Ноутбуки",
    price: 29900000,
    oldPrice: 34000000,
    discount: 12,
    rating: 5.0,
    reviewsCount: 112,
    badge: "Топ",
    isPopular: true,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Профессиональная станция для видеомонтажа, 3D-графики и разработки. Новый цвет Space Black с анодированным покрытием против отпечатков пальцев.",
    specs: {
      "Экран": "16.2\" Liquid Retina XDR 120Hz ProMotion",
      "Процессор": "Apple M3 Pro (12 CPU / 18 GPU)",
      "ОЗУ": "18 ГБ",
      "SSD": "512 ГБ"
    }
  },

  // --- 3. Телевизоры ---
  {
    id: 10,
    title: "Телевизор LG OLED evo C3 55\" 4K Smart TV Cinema HDR",
    category: "tv",
    categoryName: "Телевизоры",
    price: 16900000,
    oldPrice: 19800000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Идеальный черный цвет и бесконечная контрастность благодаря самоподсвечивающимся пикселям OLED evo. Процессор α9 4K Gen6, поддержка Dolby Vision и 4 порта HDMI 2.1.",
    specs: {
      "Диагональ": "55 дюймов (139 см)",
      "Тип матрицы": "OLED evo 4K 120Hz",
      "Звук": "Dolby Atmos 40W 2.2",
      "Smart TV": "webOS 23 с голосовым пультом Magic Remote"
    }
  },
  {
    id: 11,
    title: "Телевизор Samsung The Frame 65\" QLED 4K с режимом картины",
    category: "tv",
    categoryName: "Телевизоры",
    price: 18500000,
    oldPrice: 22000000,
    discount: 16,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Дизайн",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Телевизор, который превращается в произведение искусства в режиме ожидания. Матовый экран без бликов и сменные рамки под любой интерьер.",
    specs: {
      "Диагональ": "65 дюймов",
      "Матрица": "QLED Quantum 4K 120Hz",
      "Покрытие": "Matte Display (антибликовое)",
      "Особенность": "Art Mode, тонкий настенный кронштейн"
    }
  },
  {
    id: 12,
    title: "Телевизор Xiaomi TV A Pro 43\" 4K HDR Google TV",
    category: "tv",
    categoryName: "Телевизоры",
    price: 3650000,
    oldPrice: 4200000,
    discount: 13,
    rating: 4.7,
    reviewsCount: 310,
    badge: "Топ цена",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1577975882846-431adc8c2009?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Стильный безрамочный металлический корпус, потрясающее разрешение 4K Ultra HD с поддержкой Dolby Audio и удобная система Google TV с голосовым поиском.",
    specs: {
      "Диагональ": "43 дюйма (108 см)",
      "Разрешение": "3840x2160 4K UHD",
      "Аудио": "24 Вт DTS-HD & Dolby Audio",
      "ОС": "Google TV"
    }
  },

  // --- 4. Наушники ---
  {
    id: 13,
    title: "Беспроводные наушники Apple AirPods Pro 2 (USB-C)",
    category: "headphones",
    categoryName: "Наушники",
    price: 2950000,
    oldPrice: 3500000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 520,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Улучшенное активное шумоподавление в 2 раза эффективнее, режим прозрачности, адаптивное аудио и футляр MagSafe с разъемом USB-C и динамиком для поиска.",
    specs: {
      "Тип": "Внутриканальные TWS",
      "Чип": "Apple H2",
      "Автономность": "До 6 часов (до 30 часов с кейсом)",
      "Шумоподавление": "Активное ANC + Adaptive Audio"
    }
  },
  {
    id: 14,
    title: "Беспроводные наушники Sony WH-1000XM5 Black Hi-Res ANC",
    category: "headphones",
    categoryName: "Наушники",
    price: 4350000,
    oldPrice: 5100000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 230,
    badge: "Премиум",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Эталонное шумоподавление с двумя процессорами и 8 микрофонами, поддержка кодека LDAC для звука высокой четкости и сверхкомфортная мягкая посадка.",
    specs: {
      "Тип": "Полноразмерные беспроводные",
      "Время работы": "До 30 часов с ANC",
      "Кодеки": "LDAC, AAC, SBC",
      "Функции": "Speak-to-Chat, быстрая зарядка"
    }
  },
  {
    id: 15,
    title: "Беспроводные накладные наушники Marshall Major IV Bluetooth",
    category: "headphones",
    categoryName: "Наушники",
    price: 1750000,
    oldPrice: 2200000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 380,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Культовый рок-дизайн Marshall, феноменальные 80+ часов беспроводного воспроизведения, беспроводная зарядка и удобная многопозиционная кнопка управления.",
    specs: {
      "Время работы": "80+ часов",
      "Динамики": "40 мм с фирменным басом",
      "Зарядка": "Быстрая + Беспроводная Qi"
    }
  },
  {
    id: 16,
    title: "Беспроводные наушники Samsung Galaxy Buds2 Pro, Graphite",
    category: "headphones",
    categoryName: "Наушники",
    price: 1850000,
    oldPrice: 2300000,
    discount: 20,
    rating: 4.7,
    reviewsCount: 195,
    badge: "Скидка",
    isPopular: false,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80"
    ],
    description: "24-битный Hi-Fi звук, эргономичная посадка, интеллектуальное активное шумоподавление и объемное аудио 360 Audio с отслеживанием положения головы.",
    specs: {
      "Звук": "24-битный Hi-Fi Samsung Seamless Codec",
      "Влагозащита": "IPX7",
      "Автономность": "До 29 часов с кейсом"
    }
  },

  // --- 5. Смарт-часы ---
  {
    id: 17,
    title: "Смарт-часы Apple Watch Series 9 GPS 45mm, Midnight Aluminum",
    category: "smartwatches",
    categoryName: "Смарт-часы",
    price: 4950000,
    oldPrice: 5800000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 210,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Новый мощный процессор S9 SiP, инновационный жест Double Tap (двойное смыкание пальцев), экран яркостью до 2000 нит и точные датчики ЭКГ и кислорода.",
    specs: {
      "Размер корпуса": "45 мм",
      "Дисплей": "Always-On Retina OLED до 2000 нит",
      "Датчики": "ЭКГ, SpO2, температура тела, падения",
      "Водонепроницаемость": "До 50 метров (WR50)"
    }
  },
  {
    id: 18,
    title: "Смарт-часы Samsung Galaxy Watch 6 Classic 47mm, Black",
    category: "smartwatches",
    categoryName: "Смарт-часы",
    price: 3890000,
    oldPrice: 4600000,
    discount: 15,
    rating: 4.8,
    reviewsCount: 140,
    badge: "Скидка",
    isPopular: false,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Вращающийся механический безель из нержавеющей стали, сапфировое стекло, глубокий анализ сна и состава тела BIA (жир, мышцы, вода).",
    specs: {
      "Корпус": "Нержавеющая сталь 47 мм",
      "Стекло": "Сапфировое Sapphire Crystal",
      "Датчики": "Биоактивный датчик Samsung BioActive",
      "ОС": "Wear OS powered by Samsung"
    }
  },
  {
    id: 19,
    title: "Фитнес-браслет Xiaomi Smart Band 8 с AMOLED экраном",
    category: "smartwatches",
    categoryName: "Смарт-часы",
    price: 450000,
    oldPrice: 580000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 680,
    badge: "Топ продаж",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Яркий AMOLED экран 60 Гц с автояркостью, быстрая смена ремешков, более 150 спортивных режимов и автономная работа до 16 дней на одном заряде.",
    specs: {
      "Экран": "1.62\" AMOLED 60 Гц",
      "Батарея": "До 16 дней",
      "Защита": "5 ATM (погружение до 50 м)"
    }
  },

  // --- 6. Одежда ---
  {
    id: 20,
    title: "Худи оверсайз базовое с теплым начесом, графит",
    category: "clothing",
    categoryName: "Одежда",
    price: 289000,
    oldPrice: 399000,
    discount: 28,
    rating: 4.8,
    reviewsCount: 420,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Уютное теплое худи свободного кроя оверсайз из плотного футера с начесом пенье. Держит форму, не скатывается и отлично согревает в прохладную погоду.",
    specs: {
      "Состав": "80% хлопок, 20% полиэстер",
      "Плотность": "340 г/м²",
      "Крой": "Oversize unisex",
      "Страна производства": "Узбекистан"
    }
  },
  {
    id: 21,
    title: "Куртка мужская демисезонная ветрозащитная с капюшоном",
    category: "clothing",
    categoryName: "Одежда",
    price: 590000,
    oldPrice: 850000,
    discount: 31,
    rating: 4.7,
    reviewsCount: 165,
    badge: "Скидка",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Стильная куртка из мембранной ткани с влагоотталкивающей пропиткой DWR. Удобные глубокие карманы на молнии и регулируемый капюшон.",
    specs: {
      "Материал": "100% влагостойкий полиэстер",
      "Утеплитель": "Холлофайбер 150 г/м²",
      "Температурный режим": "от +15°C до 0°C"
    }
  },
  {
    id: 22,
    title: "Футболка базовая премиальный хлопок 100% плотная, белая",
    category: "clothing",
    categoryName: "Одежда",
    price: 119000,
    oldPrice: 160000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 740,
    badge: "Топ цена",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Классическая футболка прямого кроя из натурального дышащего узбекского хлопка высшего качества. Идеальная посадка, не просвечивает.",
    specs: {
      "Состав": "100% гребенной хлопок",
      "Плотность": "220 г/м²",
      "Стирка": "Машинная при 30°C"
    }
  },
  {
    id: 23,
    title: "Тренч женский классический двубортный миди, бежевый",
    category: "clothing",
    categoryName: "Одежда",
    price: 680000,
    oldPrice: 950000,
    discount: 28,
    rating: 4.8,
    reviewsCount: 110,
    badge: "Новинка",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Элегантный двубортный плащ с поясом, подчеркивающим талию. Идеально сочетается как с деловыми костюмами, так и с джинсами и кроссовками.",
    specs: {
      "Ткань": "Хлопок 65%, полиэстер 35%",
      "Длина": "Миди (ниже колена)",
      "Особенности": "Пояс в комплекте, шлица сзади"
    }
  },

  // --- 7. Обувь ---
  {
    id: 24,
    title: "Кроссовки Nike Air Force 1 '07 Low White Classic",
    category: "shoes",
    categoryName: "Обувь",
    price: 1450000,
    oldPrice: 1850000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 512,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Легендарные кроссовки из натуральной кожи с фирменной амортизацией Nike Air в подошве. Нестареющая классика уличного стиля на каждый день.",
    specs: {
      "Материал верха": "100% натуральная кожа",
      "Подошва": "Резина с капсулой Air",
      "Сезон": "Мультисезон"
    }
  },
  {
    id: 25,
    title: "Кроссовки New Balance 574 Grey Lifestyle Iconic",
    category: "shoes",
    categoryName: "Обувь",
    price: 1290000,
    oldPrice: 1600000,
    discount: 19,
    rating: 4.8,
    reviewsCount: 290,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Икона комфорта. Сочетание замши и сетки, промежуточная подошва ENCAP для превосходной поддержки стопы при длительной ходьбе.",
    specs: {
      "Верх": "Натуральная замша + текстиль",
      "Технология": "ENCAP амортизация",
      "Колодка": "Стандартная (D)"
    }
  },
  {
    id: 26,
    title: "Кроссовки Adidas Ultraboost Light Running Shoes",
    category: "shoes",
    categoryName: "Обувь",
    price: 1690000,
    oldPrice: 2150000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 175,
    badge: "Спорт",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Самый легкий Boost в истории. Невероятный возврат энергии при каждом шаге, подошва из резины Continental для безупречного сцепления.",
    specs: {
      "Материал": "Текстиль adidas PRIMEKNIT+",
      "Подошва": "Continental Better Rubber",
      "Назначение": "Бег, тренировки, город"
    }
  },
  {
    id: 27,
    title: "Кеды Converse Chuck Taylor All Star High Top Black",
    category: "shoes",
    categoryName: "Обувь",
    price: 790000,
    oldPrice: 990000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 410,
    badge: "Выгодно",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Культовые высокие кеды из плотного парусинового канваса с узнаваемым круглым логотипом со звездой. Прочная резиновая подошва.",
    specs: {
      "Верх": "Хлопковый канвас 100%",
      "Подошва": "Вулканизированная резина",
      "Стиль": "Streetwear"
    }
  },

  // --- 8. Парфюмерия ---
  {
    id: 28,
    title: "Парфюмерная вода Bleu de Chanel Eau de Parfum, 100 мл",
    category: "perfume",
    categoryName: "Парфюмерия",
    price: 2100000,
    oldPrice: 2600000,
    discount: 19,
    rating: 5.0,
    reviewsCount: 340,
    badge: "Премиум",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Благородный древесно-фужерный аромат свободы. Ноты грейпфрута, кедра и сандалового дерева создают притягательный и стойкий шлейф.",
    specs: {
      "Объем": "100 мл",
      "Семейство ароматов": "Древесные фужерные",
      "Стойкость": "До 12 часов",
      "Страна бренда": "Франция"
    }
  },
  {
    id: 29,
    title: "Парфюм Dior Sauvage Elixir Concentrated, 60 мл",
    category: "perfume",
    categoryName: "Парфюмерия",
    price: 2350000,
    oldPrice: 2800000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 220,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Экстремально концентрированный и пряный эликсир. Ноты корицы, кардамона, лаванды и насыщенного древесного ликера.",
    specs: {
      "Объем": "60 мл",
      "Концентрация": "Parfum Elixir",
      "Шлейф": "Очень сильный, шлейфовый"
    }
  },
  {
    id: 30,
    title: "Парфюмерная вода Tom Ford Lost Cherry Unisex, 50 мл",
    category: "perfume",
    categoryName: "Парфюмерия",
    price: 3600000,
    oldPrice: 4200000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 190,
    badge: "Топ",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Пьянящий восточный аромат спелой черной вишни, ликера и горького миндаля. Роскошное гурманское искушение.",
    specs: {
      "Объем": "50 мл",
      "Группа": "Восточные цветочные",
      "Для кого": "Унисекс"
    }
  },
  {
    id: 31,
    title: "Парфюмерная вода Yves Saint Laurent Libre EDP, 90 мл",
    category: "perfume",
    categoryName: "Парфюмерия",
    price: 1980000,
    oldPrice: 2450000,
    discount: 19,
    rating: 4.9,
    reviewsCount: 310,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Гимн свободе: чувственная лаванда из Прованса в сочетании с пламенным флердоранжем из Марокко и чувственной ванилью.",
    specs: {
      "Объем": "90 мл",
      "Тип": "Eau de Parfum",
      "Страна": "Франция"
    }
  },

  // --- 9. Косметика ---
  {
    id: 32,
    title: "Сыворотка для лица The Ordinary Niacinamide 10% + Zinc 1%, 60 мл",
    category: "cosmetics",
    categoryName: "Косметика",
    price: 155000,
    oldPrice: 210000,
    discount: 26,
    rating: 4.8,
    reviewsCount: 890,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Бестселлер по уходу за проблемной и комбинированной кожей. Сужает поры, регулирует выработку себума и выравнивает тон лица.",
    specs: {
      "Объем": "60 мл",
      "Активные компоненты": "Ниацинамид 10%, Цинк 1%",
      "Тип кожи": "Жирная, проблемная, комбинированная"
    }
  },
  {
    id: 33,
    title: "Увлажняющий крем для лица CeraVe Facial Moisturising Lotion, 52 мл",
    category: "cosmetics",
    categoryName: "Косметика",
    price: 189000,
    oldPrice: 240000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 430,
    badge: "Совет дерматолога",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Ультралегкая формула с 3 незаменимыми церамидами и гиалуроновой кислотой. Восстанавливает защитный барьер кожи на 24 часа.",
    specs: {
      "Объем": "52 мл",
      "Формула": "Без отдушек, некомедогенно",
      "Действие": "Увлажнение и укрепление барьера"
    }
  },
  {
    id: 34,
    title: "Солнцезащитный крем флюид La Roche-Posay Anthelios SPF 50+, 50 мл",
    category: "cosmetics",
    categoryName: "Косметика",
    price: 245000,
    oldPrice: 310000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 520,
    badge: "Хит",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Невидимый солнцезащитный флюид с максимальной защитой от UVA/UVB лучей. Не оставляет белых следов, ультраводостойкий.",
    specs: {
      "SPF фактор": "SPF 50+ / PPD 46",
      "Текстура": "Невидимый невесомый флюид",
      "Особенность": "Безопасен для области вокруг глаз"
    }
  },
  {
    id: 35,
    title: "Подарочный бьюти-бокс корейской косметики Glow Set 7 в 1",
    category: "cosmetics",
    categoryName: "Косметика",
    price: 490000,
    oldPrice: 750000,
    discount: 35,
    rating: 4.8,
    reviewsCount: 280,
    badge: "Скидка 35%",
    isPopular: true,
    isDayDeal: true,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Комплексный набор для сияния кожи: пенка с центеллой, тонер с муцином улитки, ампульная сыворотка, крем с коллагеном и гидрогелевые патчи.",
    specs: {
      "Комплектация": "7 полноразмерных средств",
      "Страна": "Южная Корея",
      "Упаковка": "Подарочная брендовая коробка"
    }
  },

  // --- 10. Мебель ---
  {
    id: 36,
    title: "Эргономичное офисное кресло с поддержкой поясницы и сеткой",
    category: "furniture",
    categoryName: "Мебель",
    price: 1850000,
    oldPrice: 2400000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 165,
    badge: "Комфорт",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a8a37f714c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Анатомическое кресло для долгой работы за компьютером. Дышащая корейская сетка, регулируемый 3D-подголовник и синхромеханизм качания.",
    specs: {
      "Максимальная нагрузка": "До 140 кг",
      "Материал обивки": "Армированная дышащая сетка",
      "Регулировки": "Высота, наклон спинки, подлокотники 3D"
    }
  },
  {
    id: 37,
    title: "Письменный компьютерный стол в стиле лофт с полками 120 см",
    category: "furniture",
    categoryName: "Мебель",
    price: 890000,
    oldPrice: 1200000,
    discount: 26,
    rating: 4.7,
    reviewsCount: 140,
    badge: "Хит",
    isPopular: false,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Прочный стол на цельносварном металлическом каркасе с порошковой покраской. Столешница из ЛДСП под дуб вотан с устойчивостью к царапинам.",
    specs: {
      "Размеры (ДхШхВ)": "120 x 60 x 75 см",
      "Каркас": "Сталь профильная 40х20 мм",
      "Нагрузка": "До 100 кг"
    }
  },
  {
    id: 38,
    title: "Кресло-мешок оксфорд XXL трансформер, графитовый велюр",
    category: "furniture",
    categoryName: "Мебель",
    price: 390000,
    oldPrice: 550000,
    discount: 29,
    rating: 4.9,
    reviewsCount: 230,
    badge: "Уют",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Мягкое пуф-кресло максимального размера. Съемный внешний чехол из износостойкого микровелюра, внутренний наполнитель из гипоаллергенного пенополистирола.",
    specs: {
      "Размер": "XXL (135 х 95 см)",
      "Объем": "350 литров",
      "Съемный чехол": "Да, можно стирать в машинке"
    }
  },

  // --- 11. Бытовая техника ---
  {
    id: 39,
    title: "Робот-пылесос Roborock S8 Pro Ultra со станцией самоочистки",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 13900000,
    oldPrice: 16500000,
    discount: 16,
    rating: 4.9,
    reviewsCount: 180,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Флагман умной уборки: двойная турбощетка DuoRoller Riser, сила всасывания 6000 Па, автоматическая мойка и сушка тряпки горячим воздухом.",
    specs: {
      "Сила всасывания": "6000 Па",
      "Навигация": "PreciSense LiDAR + 3D структурированный свет",
      "База": "Автослив пыли, залив воды, сушка швабры"
    }
  },
  {
    id: 40,
    title: "Автоматическая кофемашина De'Longhi Magnifica S ECAM 22.110.B",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 5200000,
    oldPrice: 6500000,
    discount: 20,
    rating: 4.9,
    reviewsCount: 420,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Итальянский кофе идеальной экстракции. Встроенная стальная кофемолка с 13 степенями помола, ручной капучинатор для плотной молочной пенки.",
    specs: {
      "Давление помпы": "15 бар",
      "Емкость для зерен": "250 г",
      "Резервуар для воды": "1.8 л",
      "Страна бренда": "Италия"
    }
  },
  {
    id: 41,
    title: "Фен для волос Dyson Supersonic HD08 Nickel/Copper с насадками",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 5490000,
    oldPrice: 6400000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 380,
    badge: "Премиум",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Быстрая сушка без экстремальных температур. Цифровой мотор V9, интеллектуальный контроль нагрева более 40 раз в секунду и 5 магнитных насадок.",
    specs: {
      "Мощность": "1600 Вт",
      "Насадки в комплекте": "5 штук (включая насадку Flyaway для пушащихся волос)",
      "Ионизация": "Есть"
    }
  },
  {
    id: 42,
    title: "Умный электрический чайник Xiaomi Smart Kettle Pro OLED",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 520000,
    oldPrice: 650000,
    discount: 20,
    rating: 4.8,
    reviewsCount: 510,
    badge: "Топ продаж",
    isPopular: false,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1570535608479-2a2971212499?auto=format&fit=crop&w=700&q=80"
    ],
    description: "OLED-экран с отображением температуры воды в реальном времени, 5 режимов поддержания тепла и управление через приложение Mi Home.",
    specs: {
      "Объем": "1.5 л",
      "Мощность": "1800 Вт",
      "Колба": "Нержавеющая сталь AISI 304"
    }
  },
  {
    id: 43,
    title: "Аэрогриль мультипечь Philips Airfryer XXL Smart Sensing",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 3400000,
    oldPrice: 4200000,
    discount: 19,
    rating: 4.8,
    reviewsCount: 160,
    badge: "Здоровье",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Приготовление хрустящих блюд с уменьшением жира до 90% благодаря технологии Rapid Air и циркуляции горячего воздуха Fat Removal.",
    specs: {
      "Объем чаши": "7.3 л (1.4 кг картофеля фри)",
      "Мощность": "2225 Вт",
      "Программы": "Автоматические режимы Smart Chef"
    }
  },

  // --- 12. Игрушки и детские товары ---
  {
    id: 44,
    title: "Конструктор LEGO Technic Porsche 911 RSR спортивный суперкар",
    category: "toys",
    categoryName: "Игрушки",
    price: 1890000,
    oldPrice: 2400000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 240,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Детализированная коллекционная модель с независимой подвеской, 6-цилиндровым оппозитным двигателем с движущимися поршнями и работающим рулевым управлением.",
    specs: {
      "Количество деталей": "1580 шт",
      "Возраст": "10+ лет",
      "Размер модели": "50 х 20 х 13 см"
    }
  },
  {
    id: 45,
    title: "Радиоуправляемый внедорожник монстр-трак 4WD Rock Crawler",
    category: "toys",
    categoryName: "Игрушки",
    price: 380000,
    oldPrice: 520000,
    discount: 27,
    rating: 4.7,
    reviewsCount: 310,
    badge: "Скидка",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Полноприводный краулер с пружинными амортизаторами и большими резиновыми колесами для преодоления любых препятствий и бездорожья.",
    specs: {
      "Масштаб": "1:16",
      "Привод": "Полный 4WD",
      "Аккумулятор": "Li-Ion в комплекте, время игры 30 мин"
    }
  },
  {
    id: 46,
    title: "Мягкая плюшевая игрушка Кот Басик в зимнем шарфе 30 см",
    category: "toys",
    categoryName: "Игрушки",
    price: 195000,
    oldPrice: 260000,
    discount: 25,
    rating: 5.0,
    reviewsCount: 650,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Любимый породистый шотландский кот с мягкой серебристой шерсткой и трогательными глазами. Поставляется в фирменной крафтовой коробке с бантом.",
    specs: {
      "Высота": "30 см",
      "Материал": "Искусственный шелковистый мех, холлофайбер",
      "Гипоаллергенно": "Да"
    }
  },
  {
    id: 47,
    title: "Настольная игра Монополия Классическая с металлическими фишками",
    category: "toys",
    categoryName: "Игрушки",
    price: 290000,
    oldPrice: 380000,
    discount: 24,
    rating: 4.8,
    reviewsCount: 420,
    badge: "Топ",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Главная экономическая стратегия в мире для всей семьи и друзей. Покупайте недвижимость, стройте отели и приведите соперников к банкротству!",
    specs: {
      "Игроки": "2-6 человек",
      "Время партии": "от 60 минут",
      "Язык": "Русский"
    }
  },

  // --- 13. Спортивные товары ---
  {
    id: 48,
    title: "Набор разборных гантелей 20 кг в прочном чемодане (2 шт по 10 кг)",
    category: "sport",
    categoryName: "Спортивные товары",
    price: 680000,
    oldPrice: 890000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 380,
    badge: "Хит",
    isPopular: true,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Хромированные чугунные диски, эргономичные грифы с противоскользящей насечкой и надежные гайки Вейдера. Компактное хранение в кейсе.",
    specs: {
      "Общий вес": "20 кг",
      "Комплектация": "2 грифа, 4 замка, набор блинов 0.5, 1.25, 2.5 кг",
      "Материал": "Хромированная сталь"
    }
  },
  {
    id: 49,
    title: "Коврик для йоги и фитнеса двухслойный нескользящий TPE 6 мм",
    category: "sport",
    categoryName: "Спортивные товары",
    price: 189000,
    oldPrice: 260000,
    discount: 27,
    rating: 4.8,
    reviewsCount: 510,
    badge: "Топ продаж",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Экологичный упругий материал TPE с лазерной разметкой позиций для правильной отстройки асан. Не скользит на любой поверхности пола.",
    specs: {
      "Размеры": "183 х 61 см",
      "Толщина": "6 мм (оптимальная амортизация)",
      "Ремешок для переноски": "В комплекте"
    }
  },
  {
    id: 50,
    title: "Горный велосипед Trinx M100 Pro 27.5\" алюминиевая рама Shimano",
    category: "sport",
    categoryName: "Спортивные товары",
    price: 2990000,
    oldPrice: 3800000,
    discount: 21,
    rating: 4.8,
    reviewsCount: 95,
    badge: "Хит",
    isPopular: false,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Надежный горный хардтейл с трансмиссией Shimano 21 скорость, дисковыми механическими тормозами и амортизационной вилкой с блокировкой.",
    specs: {
      "Размер колес": "27.5 дюймов",
      "Рама": "Алюминиевый сплав 6061",
      "Навесное оборудование": "Shimano Tourney 3x7",
      "Тормоза": "Дисковые 160 мм"
    }
  },
  {
    id: 51,
    title: "Спортивная бутылка для воды 1000 мл с мотивационной шкалой",
    category: "sport",
    categoryName: "Спортивные товары",
    price: 79000,
    oldPrice: 110000,
    discount: 28,
    rating: 4.8,
    reviewsCount: 790,
    badge: "Выгодно",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Ударопрочный матовый пластик Tritan (BPA Free), откидная крышка с замком-фиксатором от протекания и съемная трубочка для питья.",
    specs: {
      "Объем": "1000 мл",
      "Материал": "Tritan без бисфенола А",
      "Температура": "от -10°C до +90°C"
    }
  },
  {
    id: 52,
    title: "Тканевые фитнес-резинки набор эспандеров для тренировок 3 шт",
    category: "sport",
    categoryName: "Спортивные товары",
    price: 99000,
    oldPrice: 150000,
    discount: 34,
    rating: 4.9,
    reviewsCount: 460,
    badge: "Скидка 34%",
    isPopular: false,
    isDayDeal: true,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Широкие тканевые эспандеры с антискользящими латексными полосками внутри. Не скручиваются и не врезаются в кожу во время приседаний и махов.",
    specs: {
      "Нагрузка": "Light (6-11 кг), Medium (11-16 кг), Heavy (16-22 кг)",
      "Материал": "Хлопок + полиэстер + латексные нити",
      "Чехол": "Мешочек для хранения в комплекте"
    }
  },
  {
    id: 53,
    title: "Смартфон Apple iPhone 13 128GB, Starlight",
    category: "smartphones",
    categoryName: "Смартфоны",
    price: 7990000,
    oldPrice: 9400000,
    discount: 15,
    rating: 4.9,
    reviewsCount: 610,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Народный любимец: великолепный OLED дисплей Super Retina XDR, процессор A15 Bionic, отличная автономность и съемка в кинематографическом режиме.",
    specs: {
      "Экран": "6.1\" Super Retina XDR",
      "Процессор": "Apple A15 Bionic",
      "Память": "128 ГБ"
    }
  },
  {
    id: 54,
    title: "Погружной блендер Braun MultiQuick 9 1200W с технологией ActiveBlade",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 1690000,
    oldPrice: 2100000,
    discount: 20,
    rating: 4.9,
    reviewsCount: 290,
    badge: "Топ",
    isPopular: false,
    isDayDeal: false,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Флагманский блендер с подвижными лезвиями ActiveBlade, которые измельчают даже самые твердые орехи и замороженные фрукты без усилий.",
    specs: {
      "Мощность": "1200 Вт",
      "Насадки": "Измельчитель 500 мл, венчик, мерный стакан",
      "Управление": "SmartSpeed плавная регулировка скорости"
    }
  },
  {
    id: 55,
    title: "Увлажнитель воздуха ультразвуковой Xiaomi Smart Humidifier 2",
    category: "appliances",
    categoryName: "Бытовая техника",
    price: 620000,
    oldPrice: 790000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 370,
    badge: "Хит",
    isPopular: true,
    isDayDeal: false,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=700&q=80"
    ],
    description: "Ультразвуковой увлажнитель с УФ-стерилизацией воды UV-C. Резервуар 4.5 литра обеспечивает до 32 часов непрерывной работы.",
    specs: {
      "Производительность": "350 мл/ч",
      "Объем бака": "4.5 л",
      "Площадь обслуживания": "До 35 м²",
      "Управление": "Приложение Mi Home, голосовые помощники"
    }
  }
];

// Категории маркетплейса с иконками Font Awesome
const CATEGORIES_DATA = [
  { id: "all", name: "Все товары", icon: "fa-th-large" },
  { id: "smartphones", name: "Смартфоны", icon: "fa-mobile-screen-button" },
  { id: "laptops", name: "Ноутбуки", icon: "fa-laptop" },
  { id: "tv", name: "Телевизоры", icon: "fa-tv" },
  { id: "headphones", name: "Наушники", icon: "fa-headphones" },
  { id: "smartwatches", name: "Смарт-часы", icon: "fa-stopwatch" },
  { id: "clothing", name: "Одежда", icon: "fa-shirt" },
  { id: "shoes", name: "Обувь", icon: "fa-shoe-prints" },
  { id: "perfume", name: "Парфюмерия", icon: "fa-spray-can-sparkles" },
  { id: "cosmetics", name: "Косметика", icon: "fa-wand-magic-sparkles" },
  { id: "furniture", name: "Мебель", icon: "fa-couch" },
  { id: "appliances", name: "Бытовая техника", icon: "fa-blender" },
  { id: "toys", name: "Игрушки", icon: "fa-gamepad" },
  { id: "sport", name: "Спортивные товары", icon: "fa-dumbbell" }
];

// Города Узбекистана
const CITIES_DATA = [
  "Ташкент",
  "Самарканд",
  "Бухара",
  "Андижан",
  "Фергана",
  "Наманган",
  "Карши",
  "Нукус",
  "Ургенч",
  "Навои",
  "Джизак",
  "Термез"
];
