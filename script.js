/**
 * Uzum Market Frontend Logic (Vanilla JavaScript ES6+)
 */

// --- Глобальное состояние приложения ---
const state = {
  cart: JSON.parse(localStorage.getItem('uzum_cart')) || [],
  favorites: JSON.parse(localStorage.getItem('uzum_favorites')) || [],
  selectedCategory: 'all',
  priceMin: null,
  priceMax: null,
  discountOnly: false,
  ratingMin: 0,
  sortBy: 'popular',
  searchQuery: '',
  itemsPerPage: 12,
  currentPage: 1,
  currentCity: localStorage.getItem('uzum_city') || 'Ташкент',
  currentLang: localStorage.getItem('uzum_lang') || 'ru',
  currentTheme: localStorage.getItem('uzum_theme') || 'light',
  promoCodeDiscount: 0,
  currentUser: JSON.parse(localStorage.getItem('uzum_user')) || null,
  activeDetailQty: 1,
  activeDetailInstallmentTerm: 12,
  sliderCurrentIndex: 0,
  sliderTimer: null
};

// --- Вспомогательные функции форматирования ---
function formatPrice(num) {
  if (num === undefined || num === null) return '0 сум';
  const currency = state.currentLang === 'uz' ? "so'm" : "сум";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + currency;
}

function calculateInstallment(price, months = 12) {
  const perMonth = Math.round(price / months);
  const textFrom = state.currentLang === 'uz' ? 'oyiga' : 'от';
  const textPerMonth = state.currentLang === 'uz' ? "so'm/oy" : "сум/мес";
  return `${textFrom} ${perMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${textPerMonth}`;
}

// --- Инициализация при загрузке страницы ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initCity();
  initUserAuth();
  
  renderQuickCategories();
  renderMegaMenu();
  renderCategoryPills();
  renderFilterCategoriesRadio();
  renderPopularCategoriesGrid();
  
  renderDayDeals();
  renderBestsellers();
  renderNewArrivals();
  renderCatalogProducts();
  
  updateCartBadges();
  updateFavoritesBadges();
  
  initHeroSlider();
  initCountdownTimer();
  setupEventListeners();
});

// ==========================================================================
// ТЕМА (СВЕТЛАЯ / ТЕМНАЯ)
// ==========================================================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  updateThemeButtonUI();
}

function toggleTheme() {
  state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  localStorage.setItem('uzum_theme', state.currentTheme);
  updateThemeButtonUI();
  showToast(state.currentTheme === 'dark' ? 'Тёмная тема включена' : 'Светлая тема включена', 'info');
}

function updateThemeButtonUI() {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const text = btn.querySelector('.theme-name');
  if (state.currentTheme === 'dark') {
    icon.className = 'fa-solid fa-sun';
    text.textContent = state.currentLang === 'uz' ? 'Yorug‘' : 'Светлая';
  } else {
    icon.className = 'fa-solid fa-moon';
    text.textContent = state.currentLang === 'uz' ? 'Qorong‘i' : 'Темная';
  }
}

// ==========================================================================
// ЛОКАЛИЗАЦИЯ (РУССКИЙ / UZBEKCHA)
// ==========================================================================
function initLanguage() {
  setLanguage(state.currentLang, false);
}

function setLanguage(lang, triggerToast = true) {
  state.currentLang = lang;
  localStorage.setItem('uzum_lang', lang);

  // Обновление кнопок переключателя
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Замена текстов по data-i18n
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Замена placeholder по data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  updateThemeButtonUI();
  renderCatalogProducts();
  renderDayDeals();
  renderBestsellers();
  renderNewArrivals();
  updateCartDrawerUI();

  if (triggerToast) {
    showToast(lang === 'uz' ? "Til o'zbek tiliga o'zgartirildi" : "Язык изменен на русский", "info");
  }
}

// ==========================================================================
// ГОРОД
// ==========================================================================
function initCity() {
  const el = document.getElementById('current-city-name');
  if (el) el.textContent = state.currentCity;
}

function openCityModal() {
  renderCitiesList();
  openModal('city-modal', 'city-modal-backdrop');
}

function renderCitiesList(filter = '') {
  const container = document.getElementById('cities-modal-list');
  if (!container) return;
  const filtered = CITIES_DATA.filter(c => c.toLowerCase().includes(filter.toLowerCase()));
  container.innerHTML = filtered.map(city => `
    <button class="city-select-btn ${city === state.currentCity ? 'active' : ''}" onclick="selectCity('${city}')">
      <i class="fa-solid fa-location-dot" style="margin-right: 6px;"></i>
      ${city}
    </button>
  `).join('');
}

function selectCity(city) {
  state.currentCity = city;
  localStorage.setItem('uzum_city', city);
  initCity();
  closeModal('city-modal', 'city-modal-backdrop');
  showToast(`Город доставки изменен на: ${city}`, 'info');
}

// ==========================================================================
// АВТОРИЗАЦИЯ (UZUM ID DEMO)
// ==========================================================================
function initUserAuth() {
  updateUserAuthUI();
}

function updateUserAuthUI() {
  const label = document.getElementById('auth-label');
  const user = state.currentUser;
  if (user && user.isLoggedIn) {
    if (label) label.textContent = user.name || 'Профиль';
    document.getElementById('auth-step-phone').style.display = 'none';
    document.getElementById('auth-step-code').style.display = 'none';
    document.getElementById('auth-step-logged').style.display = 'block';
    document.getElementById('auth-user-name').textContent = user.name;
    document.getElementById('auth-user-phone').textContent = user.phone;
  } else {
    if (label) label.textContent = state.currentLang === 'uz' ? 'Kirish' : 'Войти';
    document.getElementById('auth-step-phone').style.display = 'block';
    document.getElementById('auth-step-code').style.display = 'none';
    document.getElementById('auth-step-logged').style.display = 'none';
  }
}

function openAuthModal() {
  updateUserAuthUI();
  openModal('auth-modal', 'auth-modal-backdrop');
}

function handleSendAuthCode() {
  const input = document.getElementById('auth-phone-input');
  const val = input.value.trim().replace(/\D/g, '');
  if (val.length < 9) {
    showToast('Пожалуйста, введите 9 цифр номера телефона', 'error');
    return;
  }
  document.getElementById('auth-step-phone').style.display = 'none';
  document.getElementById('auth-step-code').style.display = 'block';
  showToast('Код подтверждения отправлен по SMS: 1234', 'info');
  document.getElementById('auth-code-input').focus();
}

function handleVerifyAuthCode() {
  const code = document.getElementById('auth-code-input').value.trim();
  if (code.length < 4) {
    showToast('Введите 4-значный код подтверждения', 'error');
    return;
  }
  const phoneVal = document.getElementById('auth-phone-input').value.trim();
  state.currentUser = {
    name: 'Алишер Узумов',
    phone: `+998 ${phoneVal}`,
    isLoggedIn: true
  };
  localStorage.setItem('uzum_user', JSON.stringify(state.currentUser));
  updateUserAuthUI();
  closeModal('auth-modal', 'auth-modal-backdrop');
  showToast('Вы успешно вошли в Uzum ID!', 'success');
}

function handleLogout() {
  state.currentUser = null;
  localStorage.removeItem('uzum_user');
  updateUserAuthUI();
  closeModal('auth-modal', 'auth-modal-backdrop');
  showToast('Вы вышли из профиля', 'info');
}

// ==========================================================================
// КАТЕГОРИИ & МЕГА-МЕНЮ
// ==========================================================================
function renderQuickCategories() {
  const list = document.getElementById('quick-categories-list');
  if (!list) return;
  list.innerHTML = CATEGORIES_DATA.map(cat => `
    <li>
      <a href="#all-products-section" class="cat-nav-link ${state.selectedCategory === cat.id ? 'active' : ''}" onclick="filterByCategory('${cat.id}')">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
      </a>
    </li>
  `).join('');
}

function renderCategoryPills() {
  const container = document.getElementById('category-pills');
  if (!container) return;
  container.innerHTML = CATEGORIES_DATA.map(cat => `
    <button class="category-pill ${state.selectedCategory === cat.id ? 'active' : ''}" onclick="filterByCategory('${cat.id}')">
      <i class="fa-solid ${cat.icon}" style="margin-right: 6px;"></i>
      ${cat.name}
    </button>
  `).join('');
}

function renderFilterCategoriesRadio() {
  const container = document.getElementById('filter-categories-radio');
  if (!container) return;
  container.innerHTML = CATEGORIES_DATA.map(cat => {
    const count = cat.id === 'all' ? PRODUCTS_DATA.length : PRODUCTS_DATA.filter(p => p.category === cat.id).length;
    return `
      <label class="custom-radio">
        <input type="radio" name="sidebar-category" value="${cat.id}" ${state.selectedCategory === cat.id ? 'checked' : ''} onchange="filterByCategory('${cat.id}')">
        <span class="radio-circle"></span>
        <span class="radio-text" style="display: flex; justify-content: space-between; width: 100%;">
          <span>${cat.name}</span>
          <span style="color: var(--text-muted); font-size: 11px;">(${count})</span>
        </span>
      </label>
    `;
  }).join('');
}

function renderPopularCategoriesGrid() {
  const grid = document.getElementById('popular-categories-grid');
  if (!grid) return;
  const popularCatIds = ['smartphones', 'laptops', 'headphones', 'clothing', 'shoes', 'perfume', 'appliances'];
  const popularCats = CATEGORIES_DATA.filter(c => popularCatIds.includes(c.id));

  grid.innerHTML = popularCats.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.id}'); scrollToCatalog();">
      <div class="category-card__icon">
        <i class="fa-solid ${cat.icon}"></i>
      </div>
      <div class="category-card__title">${cat.name}</div>
    </div>
  `).join('');
}

function renderMegaMenu() {
  const sidebar = document.getElementById('mega-menu-categories');
  const content = document.getElementById('mega-menu-content');
  if (!sidebar || !content) return;

  const validCats = CATEGORIES_DATA.filter(c => c.id !== 'all');
  sidebar.innerHTML = validCats.map((cat, idx) => `
    <div class="mega-cat-item ${idx === 0 ? 'active' : ''}" data-cat="${cat.id}" onmouseenter="showMegaSubcategories('${cat.id}')">
      <div class="mega-cat-item__left">
        <i class="fa-solid ${cat.icon} mega-cat-item__icon"></i>
        <span>${cat.name}</span>
      </div>
      <i class="fa-solid fa-chevron-right" style="font-size: 10px; color: var(--text-muted);"></i>
    </div>
  `).join('');

  showMegaSubcategories(validCats[0].id);
}

function showMegaSubcategories(catId) {
  document.querySelectorAll('.mega-cat-item').forEach(el => {
    el.classList.toggle('active', el.dataset.cat === catId);
  });
  const content = document.getElementById('mega-menu-content');
  if (!content) return;

  const cat = CATEGORIES_DATA.find(c => c.id === catId);
  const productsInCat = PRODUCTS_DATA.filter(p => p.category === catId);

  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 20px; font-weight: 800; color: var(--text-main);">${cat ? cat.name : 'Категория'}</h3>
      <p style="font-size: 13px; color: var(--text-muted);">Всего товаров: ${productsInCat.length}</p>
    </div>
    <div class="mega-subcat-grid">
      <div class="mega-subcat-col">
        <h4 class="mega-subcat-col__title">Популярные бренды</h4>
        <ul>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Apple & Samsung</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Xiaomi & Redmi</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Премиум линейка</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Бюджетные варианты</a></li>
        </ul>
      </div>
      <div class="mega-subcat-col">
        <h4 class="mega-subcat-col__title">Подобрать по параметрам</h4>
        <ul>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Новинки этого месяца</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Товары с рассрочкой 0-0-12</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Хиты продаж недели</a></li>
          <li><a href="#all-products-section" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Специальные скидки дня</a></li>
        </ul>
      </div>
      <div class="mega-subcat-col">
        <h4 class="mega-subcat-col__title">Сервис и доставка</h4>
        <div style="background-color: var(--primary-light); padding: 14px; border-radius: var(--radius-sm);">
          <strong style="color: var(--primary); font-size: 13px; display: block; margin-bottom: 4px;">Доставка за 1 день</strong>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px;">Закажите сегодня до 23:00 и получите уже завтра утром!</p>
          <button class="btn btn-primary btn-sm btn-block" onclick="filterByCategory('${catId}'); closeCatalogMegaMenu();">Смотреть все (${productsInCat.length})</button>
        </div>
      </div>
    </div>
  `;
}

function toggleCatalogMegaMenu() {
  const menu = document.getElementById('catalog-mega-menu');
  const backdrop = document.getElementById('catalog-backdrop');
  const btn = document.getElementById('catalog-toggle-btn');
  const isOpen = menu.classList.contains('show');

  if (isOpen) {
    closeCatalogMegaMenu();
  } else {
    menu.classList.add('show');
    backdrop.classList.add('show');
    btn.classList.add('active');
  }
}

function closeCatalogMegaMenu() {
  const menu = document.getElementById('catalog-mega-menu');
  const backdrop = document.getElementById('catalog-backdrop');
  const btn = document.getElementById('catalog-toggle-btn');
  if (menu) menu.classList.remove('show');
  if (backdrop) backdrop.classList.remove('show');
  if (btn) btn.classList.remove('active');
}

// ==========================================================================
// ГЕНЕРАЦИЯ HTML КАРТОЧКИ ТОВАРА
// ==========================================================================
function createProductCardHTML(product) {
  const isFav = state.favorites.includes(product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  let badgeHTML = '';
  if (product.discount > 0) {
    badgeHTML += `<span class="product-badge product-badge--discount">-${product.discount}%</span>`;
  }
  if (product.badge === 'Хит') {
    badgeHTML += `<span class="product-badge product-badge--hit"><i class="fa-solid fa-fire"></i> Хит</span>`;
  } else if (product.isNew) {
    badgeHTML += `<span class="product-badge product-badge--new">New</span>`;
  }

  const oldPriceHTML = product.oldPrice ? `<span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>` : '';

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card__media" onclick="openProductDetail(${product.id})">
        <div class="product-card__badge-wrap">
          ${badgeHTML}
        </div>
        <button class="product-fav-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${product.id})" title="В избранное">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <img 
          src="${product.images[0]}" 
          alt="${product.title}" 
          class="product-card__img" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80'"
        >
      </div>
      <div class="product-card__body">
        <div class="product-card__title" onclick="openProductDetail(${product.id})" title="${product.title}">
          ${product.title}
        </div>
        <div class="product-card__rating">
          <i class="fa-solid fa-star star-icon"></i>
          <span class="rating-score">${product.rating}</span>
          <span>(${product.reviewsCount} ${state.currentLang === 'uz' ? 'ta sharh' : 'отзывов'})</span>
        </div>
        <div class="product-card__installment">
          ${calculateInstallment(product.price)}
        </div>
        <div class="product-card__bottom">
          <div class="product-card__prices">
            ${oldPriceHTML}
            <span class="product-card__current-price">${formatPrice(product.price)}</span>
          </div>
          <button 
            class="product-buy-btn ${isInCart ? 'in-cart' : ''}" 
            onclick="event.stopPropagation(); handleQuickBuyClick(${product.id})" 
            title="${isInCart ? 'Уже в корзине' : 'Добавить в корзину'}"
          >
            <i class="fa-solid ${isInCart ? 'fa-check' : 'fa-basket-shopping'}"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// РЕНДЕРИНГ СЕКЦИЙ НА ГЛАВНОЙ СТРАНИЦЕ
// ==========================================================================
function renderDayDeals() {
  const container = document.getElementById('day-deals-products');
  if (!container) return;
  const deals = PRODUCTS_DATA.filter(p => p.isDayDeal);
  container.innerHTML = deals.map(p => createProductCardHTML(p)).join('');
}

function renderBestsellers() {
  const container = document.getElementById('bestsellers-products');
  if (!container) return;
  const bestsellers = PRODUCTS_DATA.filter(p => p.isPopular);
  container.innerHTML = bestsellers.map(p => createProductCardHTML(p)).join('');
}

function renderNewArrivals() {
  const container = document.getElementById('new-products');
  if (!container) return;
  const newItems = PRODUCTS_DATA.filter(p => p.isNew);
  container.innerHTML = newItems.map(p => createProductCardHTML(p)).join('');
}

function scrollContainer(containerId, direction) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const scrollAmount = 300 * direction;
  el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// ==========================================================================
// КАТАЛОГ С ФИЛЬТРАМИ, СОРТИРОВКОЙ И ПАГИНАЦИЕЙ
// ==========================================================================
function filterByCategory(catId) {
  state.selectedCategory = catId;
  state.currentPage = 1;

  // Обновляем визуальное состояние кнопок
  document.querySelectorAll('.cat-nav-link').forEach(el => {
    el.classList.toggle('active', el.textContent.includes(catId) || (catId === 'all' && el.textContent.includes('Все')));
  });
  renderCategoryPills();
  renderFilterCategoriesRadio();
  renderCatalogProducts();
}

function applyPriceFilter() {
  const minVal = parseInt(document.getElementById('price-min-input').value);
  const maxVal = parseInt(document.getElementById('price-max-input').value);
  state.priceMin = isNaN(minVal) ? null : minVal;
  state.priceMax = isNaN(maxVal) ? null : maxVal;
  state.currentPage = 1;
  renderCatalogProducts();
  showToast('Фильтр цен применен', 'info');
}

function resetAllFilters() {
  state.selectedCategory = 'all';
  state.priceMin = null;
  state.priceMax = null;
  state.discountOnly = false;
  state.ratingMin = 0;
  state.searchQuery = '';
  state.currentPage = 1;

  document.getElementById('price-min-input').value = '';
  document.getElementById('price-max-input').value = '';
  document.getElementById('filter-discount-only').checked = false;
  document.querySelector('input[name="rating-filter"][value="0"]').checked = true;
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear-btn').style.display = 'none';

  renderCategoryPills();
  renderFilterCategoriesRadio();
  renderCatalogProducts();
  showToast('Все фильтры сброшены', 'info');
}

function renderCatalogProducts() {
  const grid = document.getElementById('main-products-grid');
  const emptyBox = document.getElementById('empty-catalog-box');
  const loadMoreBtn = document.getElementById('load-more-container');
  const counter = document.getElementById('total-products-counter');
  const activeFiltersBar = document.getElementById('active-filters-bar');

  if (!grid) return;

  // 1. Фильтрация
  let filtered = PRODUCTS_DATA.filter(p => {
    // Категория
    if (state.selectedCategory !== 'all' && p.category !== state.selectedCategory) {
      return false;
    }
    // Цена
    if (state.priceMin !== null && p.price < state.priceMin) return false;
    if (state.priceMax !== null && p.price > state.priceMax) return false;
    // Только скидки
    if (state.discountOnly && (!p.discount || p.discount <= 0)) return false;
    // Рейтинг
    if (state.ratingMin > 0 && p.rating < state.ratingMin) return false;
    // Поиск
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchDesc) return false;
    }
    return true;
  });

  // 2. Сортировка
  if (state.sortBy === 'cheap') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'expensive') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'discount') {
    filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  } else {
    // popular
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  // Обновление счетчика
  if (counter) counter.textContent = filtered.length;

  // Активные плашки фильтров
  renderActiveFilterChips(activeFiltersBar);

  // Пустой результат
  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyBox.style.display = 'block';
    loadMoreBtn.style.display = 'none';
    return;
  } else {
    emptyBox.style.display = 'none';
  }

  // 3. Пагинация (Показать еще)
  const totalToShow = state.currentPage * state.itemsPerPage;
  const pagedProducts = filtered.slice(0, totalToShow);

  grid.innerHTML = pagedProducts.map(p => createProductCardHTML(p)).join('');

  if (totalToShow >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'flex';
  }
}

function renderActiveFilterChips(container) {
  if (!container) return;
  const chips = [];

  if (state.selectedCategory !== 'all') {
    const cat = CATEGORIES_DATA.find(c => c.id === state.selectedCategory);
    chips.push(`
      <span class="filter-chip">
        Категория: ${cat ? cat.name : state.selectedCategory}
        <i class="fa-solid fa-xmark" onclick="filterByCategory('all')"></i>
      </span>
    `);
  }

  if (state.priceMin !== null || state.priceMax !== null) {
    chips.push(`
      <span class="filter-chip">
        Цена: ${state.priceMin || 0} - ${state.priceMax || '∞'}
        <i class="fa-solid fa-xmark" onclick="clearPriceFilter()"></i>
      </span>
    `);
  }

  if (state.discountOnly) {
    chips.push(`
      <span class="filter-chip">
        Только со скидкой
        <i class="fa-solid fa-xmark" onclick="document.getElementById('filter-discount-only').click()"></i>
      </span>
    `);
  }

  if (state.searchQuery) {
    chips.push(`
      <span class="filter-chip">
        Поиск: "${state.searchQuery}"
        <i class="fa-solid fa-xmark" onclick="clearSearch()"></i>
      </span>
    `);
  }

  container.innerHTML = chips.join('');
}

function clearPriceFilter() {
  state.priceMin = null;
  state.priceMax = null;
  document.getElementById('price-min-input').value = '';
  document.getElementById('price-max-input').value = '';
  renderCatalogProducts();
}

function clearSearch() {
  state.searchQuery = '';
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear-btn').style.display = 'none';
  renderCatalogProducts();
}

function scrollToCatalog() {
  const el = document.getElementById('all-products-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================================================
// ПОИСК В РЕАЛЬНОМ ВРЕМЕНИ
// ==========================================================================
function setupSearch() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const dropdown = document.getElementById('search-dropdown');
  const list = document.getElementById('search-dropdown-list');
  const empty = document.getElementById('search-dropdown-empty');
  const countTag = document.getElementById('search-results-count');

  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    clearBtn.style.display = val.length > 0 ? 'block' : 'none';

    if (val.length < 2) {
      dropdown.classList.remove('show');
      return;
    }

    const matches = PRODUCTS_DATA.filter(p => 
      p.title.toLowerCase().includes(val.toLowerCase()) || 
      p.categoryName.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 6);

    countTag.textContent = `${matches.length} товаров`;

    if (matches.length === 0) {
      list.innerHTML = '';
      empty.style.display = 'block';
      dropdown.classList.add('show');
    } else {
      empty.style.display = 'none';
      list.innerHTML = matches.map(p => `
        <div class="search-dropdown-item" onclick="openProductDetail(${p.id}); closeSearchDropdown();">
          <img src="${p.images[0]}" alt="${p.title}" class="search-dropdown-item__img">
          <div class="search-dropdown-item__info">
            <div class="search-dropdown-item__title">${p.title}</div>
            <div class="search-dropdown-item__price">${formatPrice(p.price)}</div>
          </div>
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 11px; color: var(--text-muted);"></i>
        </div>
      `).join('');
      dropdown.classList.add('show');
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    dropdown.classList.remove('show');
    state.searchQuery = '';
    renderCatalogProducts();
  });

  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    state.searchQuery = val;
    state.currentPage = 1;
    dropdown.classList.remove('show');
    renderCatalogProducts();
    scrollToCatalog();
  });

  // Закрытие дропдауна при клике вне
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      closeSearchDropdown();
    }
  });
}

function closeSearchDropdown() {
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.classList.remove('show');
}

// ==========================================================================
// КОРЗИНА (CART)
// ==========================================================================
function addToCart(productId, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({ id: productId, quantity: quantity });
  }

  saveCart();
  updateCartBadges();
  updateCartDrawerUI();
  renderCatalogProducts();
  renderDayDeals();
  renderBestsellers();
  renderNewArrivals();

  showToast(`«${product.title.substring(0, 30)}...» добавлен в корзину`, 'success');
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart();
    updateCartBadges();
    updateCartDrawerUI();
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadges();
  updateCartDrawerUI();
  renderCatalogProducts();
  showToast('Товар удален из корзины', 'info');
}

function handleQuickBuyClick(productId) {
  const isInCart = state.cart.some(i => i.id === productId);
  if (isInCart) {
    openCartDrawer();
  } else {
    addToCart(productId, 1);
  }
}

function saveCart() {
  localStorage.setItem('uzum_cart', JSON.stringify(state.cart));
}

function updateCartBadges() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartBadge = document.getElementById('cart-badge');
  const mobCartBadge = document.getElementById('mob-cart-badge');
  const drawerCount = document.getElementById('drawer-items-count');
  const headerTotal = document.getElementById('header-cart-total');

  if (cartBadge) cartBadge.textContent = totalCount;
  if (mobCartBadge) mobCartBadge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = `${totalCount} шт`;

  const subtotal = state.cart.reduce((sum, item) => {
    const p = PRODUCTS_DATA.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  if (headerTotal) headerTotal.textContent = formatPrice(subtotal);
}

function updateCartDrawerUI() {
  const container = document.getElementById('cart-drawer-items');
  const emptyBox = document.getElementById('cart-drawer-empty');
  const footer = document.getElementById('cart-drawer-footer');
  const tracker = document.getElementById('free-delivery-tracker');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  const totalEl = document.getElementById('cart-total-price');
  const discountRow = document.getElementById('cart-discount-row');
  const discountVal = document.getElementById('cart-discount-value');

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = '';
    emptyBox.style.display = 'flex';
    footer.style.display = 'none';
    tracker.style.display = 'none';
    return;
  }

  emptyBox.style.display = 'none';
  footer.style.display = 'block';
  tracker.style.display = 'block';

  let subtotal = 0;

  container.innerHTML = state.cart.map(item => {
    const prod = PRODUCTS_DATA.find(p => p.id === item.id);
    if (!prod) return '';
    const itemTotal = prod.price * item.quantity;
    subtotal += itemTotal;

    return `
      <div class="cart-item">
        <img src="${prod.images[0]}" alt="${prod.title}" class="cart-item__img" onclick="openProductDetail(${prod.id}); closeCartDrawer();" style="cursor: pointer;">
        <div class="cart-item__details">
          <div class="cart-item__title" onclick="openProductDetail(${prod.id}); closeCartDrawer();" style="cursor: pointer;">
            ${prod.title}
          </div>
          <div class="cart-item__price">${formatPrice(itemTotal)}</div>
          <div class="cart-item__controls">
            <div class="qty-control">
              <button class="qty-btn" onclick="updateCartQuantity(${prod.id}, ${item.quantity - 1})">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${prod.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="cart-item__delete-btn" onclick="removeFromCart(${prod.id})" title="Удалить">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Расчет доставки и прогресс-бара (Бесплатная доставка от 200 000 сум)
  const freeDeliveryThreshold = 200000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const diff = freeDeliveryThreshold - subtotal;
  const progressEl = document.getElementById('free-delivery-progress');
  const freeTextEl = document.getElementById('free-delivery-text');

  if (progressEl) progressEl.style.width = `${progressPercent}%`;

  if (freeTextEl) {
    if (diff <= 0) {
      freeTextEl.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <strong>У вас бесплатная доставка курьером!</strong>`;
    } else {
      freeTextEl.innerHTML = `<i class="fa-solid fa-truck-ramp-box"></i> <span>До бесплатной доставки осталось: <strong>${formatPrice(diff)}</strong></span>`;
    }
  }

  // Расчет скидки по промокоду
  let discountAmount = 0;
  if (state.promoCodeDiscount > 0) {
    discountAmount = Math.round(subtotal * (state.promoCodeDiscount / 100));
    discountRow.style.display = 'flex';
    discountVal.textContent = `-${formatPrice(discountAmount)}`;
  } else {
    discountRow.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);
}

function openCartDrawer() {
  updateCartDrawerUI();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-drawer-backdrop').classList.add('show');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-drawer-backdrop').classList.remove('show');
}

function applyPromoCode() {
  const input = document.getElementById('cart-promo-input');
  const msg = document.getElementById('promo-message');
  const code = input.value.trim().toUpperCase();

  if (code === 'UZUM10' || code === 'UZUM2026') {
    state.promoCodeDiscount = 10;
    msg.className = 'promo-message success';
    msg.textContent = 'Промокод успешно применен! Скидка 10%';
    updateCartDrawerUI();
    showToast('Промокод применил скидку 10%', 'success');
  } else {
    state.promoCodeDiscount = 0;
    msg.className = 'promo-message error';
    msg.textContent = 'Неверный промокод. Попробуйте UZUM10';
    updateCartDrawerUI();
  }
}

// ==========================================================================
// ИЗБРАННОЕ (FAVORITES)
// ==========================================================================
function toggleFavorite(productId) {
  const index = state.favorites.indexOf(productId);
  const product = PRODUCTS_DATA.find(p => p.id === productId);

  if (index > -1) {
    state.favorites.splice(index, 1);
    showToast('Удалено из избранного', 'info');
  } else {
    state.favorites.push(productId);
    showToast(`«${product.title.substring(0, 30)}...» добавлено в избранное`, 'success');
  }

  saveFavorites();
  updateFavoritesBadges();
  renderCatalogProducts();
  renderDayDeals();
  renderBestsellers();
  renderNewArrivals();

  if (document.getElementById('favorites-modal').classList.contains('open')) {
    renderFavoritesModal();
  }
}

function saveFavorites() {
  localStorage.setItem('uzum_favorites', JSON.stringify(state.favorites));
}

function updateFavoritesBadges() {
  const badge = document.getElementById('favorites-badge');
  const mobBadge = document.getElementById('mob-fav-badge');
  const pill = document.getElementById('fav-items-count-pill');
  const count = state.favorites.length;

  if (badge) badge.textContent = count;
  if (mobBadge) mobBadge.textContent = count;
  if (pill) pill.textContent = `${count}`;
}

function openFavoritesModal() {
  renderFavoritesModal();
  openModal('favorites-modal', 'favorites-modal-backdrop');
}

function renderFavoritesModal() {
  const container = document.getElementById('favorites-modal-body');
  if (!container) return;

  const favProducts = PRODUCTS_DATA.filter(p => state.favorites.includes(p.id));

  if (favProducts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <i class="fa-regular fa-heart" style="font-size: 48px; color: var(--text-muted); margin-bottom: 16px;"></i>
        <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;" data-i18n="empty_favorites">В избранном пока ничего нет</h4>
        <p style="color: var(--text-secondary); margin-bottom: 20px;" data-i18n="empty_favorites_desc">Сохраняйте понравившиеся товары, нажимая на сердечко на карточке</p>
        <button class="btn btn-primary" onclick="closeModal('favorites-modal', 'favorites-modal-backdrop'); scrollToCatalog();">К покупкам</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="products-grid" style="grid-template-columns: repeat(3, 1fr);">
      ${favProducts.map(p => createProductCardHTML(p)).join('')}
    </div>
  `;
}

// ==========================================================================
// ДЕТАЛЬНОЕ ОКНО ТОВАРА (PRODUCT DETAIL MODAL)
// ==========================================================================
function openProductDetail(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  state.activeDetailQty = 1;
  state.activeDetailInstallmentTerm = 12;

  const container = document.getElementById('product-detail-content');
  const isFav = state.favorites.includes(product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  // Спецификации
  const specsRows = Object.entries(product.specs || {}).map(([key, val]) => `
    <tr>
      <td>${key}</td>
      <td>${val}</td>
    </tr>
  `).join('');

  // Галерея миниатюр
  const thumbsHTML = product.images.map((img, idx) => `
    <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="switchDetailImage('${img}', this)">
      <img src="${img}" alt="${product.title}">
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Левая колонка: Галерея -->
    <div class="product-gallery">
      <div class="product-gallery__main">
        <img src="${product.images[0]}" alt="${product.title}" id="detail-main-img" class="product-gallery__main-img">
      </div>
      <div class="product-gallery__thumbs">
        ${thumbsHTML}
      </div>
    </div>

    <!-- Правая колонка: Описание и покупка -->
    <div class="product-detail-info">
      <div class="product-detail-category">${product.categoryName}</div>
      <h2 class="product-detail-title">${product.title}</h2>
      
      <div class="product-detail-rating-row">
        <span style="display: flex; align-items: center; gap: 4px; color: var(--star-gold);">
          <i class="fa-solid fa-star"></i> <strong>${product.rating}</strong>
        </span>
        <span style="color: var(--text-muted);">${product.reviewsCount} отзывов покупателей</span>
        <span style="color: var(--badge-new); margin-left: auto;"><i class="fa-solid fa-circle-check"></i> В наличии</span>
      </div>

      <!-- Цена -->
      <div class="product-detail-price-box">
        <div class="detail-price-row">
          <span class="detail-current-price" id="detail-total-price-display">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="detail-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          ${product.discount ? `<span class="detail-discount-tag">-${product.discount}%</span>` : ''}
        </div>

        <!-- Рассрочка Uzum Nasiya -->
        <div class="detail-installment-box">
          <div>
            <div style="font-size: 11px; opacity: 0.8;">В рассрочку Uzum Nasiya:</div>
            <strong id="detail-installment-val">${calculateInstallment(product.price, 12)}</strong>
          </div>
          <div class="detail-installment-plan">
            <button class="term-btn" onclick="switchInstallmentPlan(${product.price}, 3, this)">3 мес</button>
            <button class="term-btn" onclick="switchInstallmentPlan(${product.price}, 6, this)">6 мес</button>
            <button class="term-btn active" onclick="switchInstallmentPlan(${product.price}, 12, this)">12 мес</button>
          </div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="detail-actions-row">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeDetailQty(-1, ${product.price})">-</button>
          <span class="qty-value" id="detail-qty-display">1</span>
          <button class="qty-btn" onclick="changeDetailQty(1, ${product.price})">+</button>
        </div>
        <button class="btn btn-primary detail-add-cart-btn" onclick="addToCart(${product.id}, state.activeDetailQty); closeModal('product-detail-modal', 'product-detail-backdrop');">
          <i class="fa-solid fa-basket-shopping"></i>
          <span>Добавить в корзину</span>
        </button>
        <button class="btn btn-secondary" onclick="buyNowFromDetail(${product.id})">
          <span>Купить сейчас</span>
        </button>
        <button class="detail-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${product.id}); this.classList.toggle('active');">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>

      <!-- Вкладки Описание / Характеристики -->
      <div class="product-tabs-wrapper">
        <div class="product-tabs-header">
          <button class="tab-btn active" onclick="switchDetailTab('desc', this)">Описание</button>
          <button class="tab-btn" onclick="switchDetailTab('specs', this)">Характеристики</button>
        </div>
        <div class="tab-pane active" id="tab-pane-desc">
          <p>${product.description}</p>
        </div>
        <div class="tab-pane" id="tab-pane-specs">
          <table class="specs-table">
            <tbody>
              ${specsRows}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  openModal('product-detail-modal', 'product-detail-backdrop');
}

function switchDetailImage(src, thumbEl) {
  const mainImg = document.getElementById('detail-main-img');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

function switchInstallmentPlan(price, months, btn) {
  state.activeDetailInstallmentTerm = months;
  document.querySelectorAll('.detail-installment-plan button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const disp = document.getElementById('detail-installment-val');
  if (disp) disp.textContent = calculateInstallment(price, months);
}

function changeDetailQty(delta, unitPrice) {
  const newQty = Math.max(1, state.activeDetailQty + delta);
  state.activeDetailQty = newQty;
  document.getElementById('detail-qty-display').textContent = newQty;
  document.getElementById('detail-total-price-display').textContent = formatPrice(unitPrice * newQty);
}

function switchDetailTab(tabName, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`tab-pane-${tabName}`).classList.add('active');
}

function buyNowFromDetail(productId) {
  addToCart(productId, state.activeDetailQty);
  closeModal('product-detail-modal', 'product-detail-backdrop');
  openCheckoutModal();
}

// ==========================================================================
// ОФОРМЛЕНИЕ ЗАКАЗА (CHECKOUT)
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Добавьте товары в корзину для оформления заказа', 'error');
    return;
  }
  closeCartDrawer();

  // Расчет общей суммы
  let subtotal = state.cart.reduce((sum, item) => {
    const p = PRODUCTS_DATA.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  if (state.promoCodeDiscount > 0) {
    subtotal = Math.round(subtotal * (1 - state.promoCodeDiscount / 100));
  }

  document.getElementById('checkout-final-sum').textContent = formatPrice(subtotal);

  // Предзаполнение данных пользователя
  if (state.currentUser && state.currentUser.isLoggedIn) {
    document.getElementById('checkout-name').value = state.currentUser.name;
    document.getElementById('checkout-phone').value = state.currentUser.phone;
  }

  openModal('checkout-modal', 'checkout-modal-backdrop');
}

function handleOrderSubmit() {
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();

  if (!name || !phone) {
    showToast('Пожалуйста, заполните имя и номер телефона', 'error');
    return;
  }

  const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
  const isPickup = deliveryMethod === 'pickup';

  // Итоговая сумма для квитанции
  let finalTotal = state.cart.reduce((sum, item) => {
    const p = PRODUCTS_DATA.find(prod => prod.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
  if (state.promoCodeDiscount > 0) {
    finalTotal = Math.round(finalTotal * (1 - state.promoCodeDiscount / 100));
  }

  const randomOrderId = 'UZ-' + Math.floor(10000 + Math.random() * 90000);

  // Заполнение квитанции
  document.getElementById('receipt-order-id').textContent = randomOrderId;
  document.getElementById('receipt-order-sum').textContent = formatPrice(finalTotal);
  document.getElementById('receipt-customer-name').textContent = name;
  document.getElementById('receipt-delivery-type').textContent = isPickup 
    ? 'Самовывоз из пункта выдачи Uzum' 
    : 'Курьерская доставка до двери';

  // Очистка корзины
  state.cart = [];
  saveCart();
  updateCartBadges();
  updateCartDrawerUI();
  renderCatalogProducts();

  closeModal('checkout-modal', 'checkout-modal-backdrop');
  openModal('order-success-modal', 'order-success-backdrop');
}

// ==========================================================================
// СЛАЙДЕР БАННЕРОВ (HERO SLIDER)
// ==========================================================================
function initHeroSlider() {
  const track = document.getElementById('hero-slider-track');
  const dots = document.querySelectorAll('.hero-slider__dots .dot');
  const slides = document.querySelectorAll('.hero-slide');
  if (!track || slides.length === 0) return;

  function goToSlide(index) {
    state.sliderCurrentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${state.sliderCurrentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.sliderCurrentIndex);
    });
  }

  document.getElementById('slider-prev-btn').addEventListener('click', () => {
    goToSlide(state.sliderCurrentIndex - 1);
    resetSliderTimer();
  });

  document.getElementById('slider-next-btn').addEventListener('click', () => {
    goToSlide(state.sliderCurrentIndex + 1);
    resetSliderTimer();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      goToSlide(parseInt(e.target.dataset.slide));
      resetSliderTimer();
    });
  });

  function startSliderTimer() {
    state.sliderTimer = setInterval(() => {
      goToSlide(state.sliderCurrentIndex + 1);
    }, 5000);
  }

  function resetSliderTimer() {
    clearInterval(state.sliderTimer);
    startSliderTimer();
  }

  startSliderTimer();

  const slider = document.getElementById('hero-slider');
  slider.addEventListener('mouseenter', () => clearInterval(state.sliderTimer));
  slider.addEventListener('mouseleave', () => startSliderTimer());
}

// ==========================================================================
// ТАЙМЕР ОБРАТНОГО ОТСЧЕТА (СКИДКИ ДНЯ)
// ==========================================================================
function initCountdownTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  if (!hoursEl) return;

  function update() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = Math.max(0, midnight - now);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ МОДАЛОК
// ==========================================================================
function openModal(modalId, backdropId) {
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById(backdropId);
  if (modal) modal.classList.add('open');
  if (backdrop) backdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId, backdropId) {
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById(backdropId);
  if (modal) modal.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

// ==========================================================================
// ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ (TOASTS)
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' 
    ? 'fa-solid fa-circle-check' 
    : type === 'error' 
    ? 'fa-solid fa-circle-exclamation' 
    : 'fa-solid fa-circle-info';

  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================================================
// ОБРАБОТЧИКИ СОБЫТИЙ И СВЯЗКИ КНОПОК
// ==========================================================================
function setupEventListeners() {
  // Кнопка каталога
  const catalogBtn = document.getElementById('catalog-toggle-btn');
  if (catalogBtn) {
    catalogBtn.addEventListener('click', toggleCatalogMegaMenu);
  }
  const catalogBackdrop = document.getElementById('catalog-backdrop');
  if (catalogBackdrop) {
    catalogBackdrop.addEventListener('click', closeCatalogMegaMenu);
  }

  // Смена темы
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Переключение языка
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setLanguage(e.target.dataset.lang);
    });
  });

  // Город
  document.getElementById('city-selector-btn').addEventListener('click', openCityModal);
  document.getElementById('city-modal-close-btn').addEventListener('click', () => closeModal('city-modal', 'city-modal-backdrop'));
  document.getElementById('city-modal-backdrop').addEventListener('click', () => closeModal('city-modal', 'city-modal-backdrop'));
  document.getElementById('city-search-input').addEventListener('input', (e) => renderCitiesList(e.target.value));

  // Авторизация
  document.getElementById('auth-btn').addEventListener('click', openAuthModal);
  document.getElementById('auth-modal-close-btn').addEventListener('click', () => closeModal('auth-modal', 'auth-modal-backdrop'));
  document.getElementById('auth-modal-backdrop').addEventListener('click', () => closeModal('auth-modal', 'auth-modal-backdrop'));
  document.getElementById('auth-send-code-btn').addEventListener('click', handleSendAuthCode);
  document.getElementById('auth-verify-code-btn').addEventListener('click', handleVerifyAuthCode);
  document.getElementById('auth-back-to-phone-btn').addEventListener('click', () => {
    document.getElementById('auth-step-code').style.display = 'none';
    document.getElementById('auth-step-phone').style.display = 'block';
  });
  document.getElementById('auth-logout-btn').addEventListener('click', handleLogout);

  // Корзина
  document.getElementById('cart-btn').addEventListener('click', openCartDrawer);
  document.getElementById('cart-drawer-close-btn').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-backdrop').addEventListener('click', closeCartDrawer);
  document.getElementById('apply-promo-btn').addEventListener('click', applyPromoCode);
  document.getElementById('start-checkout-btn').addEventListener('click', openCheckoutModal);

  // Избранное
  document.getElementById('favorites-btn').addEventListener('click', openFavoritesModal);
  document.getElementById('favorites-modal-close-btn').addEventListener('click', () => closeModal('favorites-modal', 'favorites-modal-backdrop'));
  document.getElementById('favorites-modal-backdrop').addEventListener('click', () => closeModal('favorites-modal', 'favorites-modal-backdrop'));

  // Детали товара
  document.getElementById('product-detail-close-btn').addEventListener('click', () => closeModal('product-detail-modal', 'product-detail-backdrop'));
  document.getElementById('product-detail-backdrop').addEventListener('click', () => closeModal('product-detail-modal', 'product-detail-backdrop'));

  // Оформление заказа
  document.getElementById('checkout-modal-close-btn').addEventListener('click', () => closeModal('checkout-modal', 'checkout-modal-backdrop'));
  document.getElementById('checkout-modal-backdrop').addEventListener('click', () => closeModal('checkout-modal', 'checkout-modal-backdrop'));
  document.getElementById('submit-order-btn').addEventListener('click', handleOrderSubmit);
  document.getElementById('close-success-modal-btn').addEventListener('click', () => closeModal('order-success-modal', 'order-success-backdrop'));
  document.getElementById('order-success-backdrop').addEventListener('click', () => closeModal('order-success-modal', 'order-success-backdrop'));

  // Переключение способа доставки в чекауте
  document.querySelectorAll('input[name="delivery-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.delivery-option-card').forEach(card => card.classList.remove('active'));
      e.target.closest('.delivery-option-card').classList.add('active');
      const isPickup = e.target.value === 'pickup';
      document.getElementById('address-field-group').style.display = isPickup ? 'none' : 'block';
      document.getElementById('pickup-field-group').style.display = isPickup ? 'block' : 'none';
    });
  });

  // Переключение способа оплаты в чекауте
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.payment-method-item').forEach(item => item.classList.remove('active'));
      e.target.closest('.payment-method-item').classList.add('active');
    });
  });

  // Фильтры и сортировка
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderCatalogProducts();
  });
  document.getElementById('apply-price-filter-btn').addEventListener('click', applyPriceFilter);
  document.getElementById('filters-reset-btn').addEventListener('click', resetAllFilters);
  document.getElementById('filter-discount-only').addEventListener('change', (e) => {
    state.discountOnly = e.target.checked;
    renderCatalogProducts();
  });
  document.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.ratingMin = parseFloat(e.target.value);
      renderCatalogProducts();
    });
  });

  // Кнопка "Показать еще"
  document.getElementById('load-more-btn').addEventListener('click', () => {
    state.currentPage++;
    renderCatalogProducts();
  });

  // Кнопка Наверх
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Мобильная нижняя навигация
  const mobCatalog = document.getElementById('mob-nav-catalog');
  if (mobCatalog) mobCatalog.addEventListener('click', toggleCatalogMegaMenu);

  const mobCart = document.getElementById('mob-nav-cart');
  if (mobCart) mobCart.addEventListener('click', openCartDrawer);

  const mobFav = document.getElementById('mob-nav-fav');
  if (mobFav) mobFav.addEventListener('click', openFavoritesModal);

  const mobProfile = document.getElementById('mob-nav-profile');
  if (mobProfile) mobProfile.addEventListener('click', openAuthModal);

  // Настройка поиска
  setupSearch();
}
