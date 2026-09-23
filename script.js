/* ===========================================================
   NEBO CAFÉ — PRODUCT DATA
=========================================================== */

const PRODUCTS = [
  {
    id: "espresso",
    name: "Classic Espresso",
    category: "Coffee",
    description: "Rich and bold espresso shot, the perfect foundation for any coffee lover.",
    price: 3.5,
    sku: "AM-001",
    stock: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cappuccino",
    name: "Heritage Cappuccino",
    category: "Coffee",
    description: "Traditional cappuccino with velvety steamed milk and perfect foam.",
    price: 4.5,
    sku: "CP-002",
    stock: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "latte",
    name: "Artisan Latte",
    category: "Coffee",
    description: "Smooth espresso with expertly steamed milk and beautiful latte art.",
    price: 4.75,
    sku: "LT-003",
    stock: 18,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "americano",
    name: "Americano",
    category: "Coffee",
    description: "Bright, balanced espresso softened by silky hot water.",
    price: 3.25,
    sku: "AM-004",
    stock: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1497515114629-f640c541c8f8?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "macchiato",
    name: "Caramel Macchiato",
    category: "Coffee",
    description: "Sweet caramel notes wrapped in espresso and steamed milk.",
    price: 5.0,
    sku: "CM-005",
    stock: 12,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mocha",
    name: "Mocha",
    category: "Coffee",
    description: "Velvety chocolate and espresso in perfect balance.",
    price: 4.75,
    sku: "MO-006",
    stock: 15,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "croissant",
    name: "Croissant",
    category: "Food",
    description: "Buttery, flaky pastry baked fresh each morning.",
    price: 3.25,
    sku: "CR-007",
    stock: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sandwich",
    name: "Club Sandwich",
    category: "Food",
    description: "Triple-decker sandwich with roast chicken, bacon, egg, and fresh greens.",
    price: 6.5,
    sku: "CS-008",
    stock: 10,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Food",
    description: "Smashed avocado on toasted sourdough with chili flakes and lime.",
    price: 5.5,
    sku: "AT-009",
    stock: 8,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    category: "Desserts",
    description: "Dense dark chocolate cake with a silky ganache finish.",
    price: 5.5,
    sku: "CK-010",
    stock: 8,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    category: "Desserts",
    description: "Creamy New York-style cheesecake on a buttery graham crust.",
    price: 5.0,
    sku: "CH-011",
    stock: 10,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    category: "Desserts",
    description: "Espresso-soaked layers with mascarpone cream and cocoa dust.",
    price: 5.5,
    sku: "TM-012",
    stock: 7,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
  },
];

const COFFEE_CATEGORY = "Coffee";
const TAX_RATE = 0.1;
const DELIVERY_FEE = 2.0;
const COUPONS = { NEBO10: 0.1 };

const SIZE_ADJUST = { Small: -0.5, Medium: 0, Large: 0.75 };

/* ===========================================================
   STATE (persisted to localStorage)
=========================================================== */

let stockLevels = loadStock();
let cart = JSON.parse(localStorage.getItem("nebo-cart") || "[]");
let theme = localStorage.getItem("nebo-theme") || "light";
let appliedCoupon = JSON.parse(localStorage.getItem("nebo-coupon") || "null");
let orders = JSON.parse(localStorage.getItem("nebo-orders") || "[]");

let activeCategory = "all";
let searchQuery = "";
let selectedProduct = null;
let modalQty = 1;
let modalOptions = { size: "Medium", temperature: "Hot", sugar: "25%", ice: "Normal" };
let pendingBuyNow = false;

function loadStock() {
  const saved = JSON.parse(localStorage.getItem("nebo-stock") || "null");
  if (saved) return saved;
  const initial = {};
  PRODUCTS.forEach((p) => (initial[p.id] = p.stock));
  localStorage.setItem("nebo-stock", JSON.stringify(initial));
  return initial;
}

function saveStock() {
  localStorage.setItem("nebo-stock", JSON.stringify(stockLevels));
}

function saveCart() {
  localStorage.setItem("nebo-cart", JSON.stringify(cart));
}

function saveOrders() {
  localStorage.setItem("nebo-orders", JSON.stringify(orders));
}

function saveCoupon() {
  localStorage.setItem("nebo-coupon", JSON.stringify(appliedCoupon));
}

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getStock(id) {
  return stockLevels[id] ?? 0;
}

/* ===========================================================
   DOM REFERENCES
=========================================================== */

const productGrid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const filterButtons = document.querySelectorAll(".filter-btn");

const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("searchClose");

const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const deliveryEl = document.getElementById("delivery");
const discountRowEl = document.getElementById("discountRow");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grandTotal");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCoupon");
const couponMsg = document.getElementById("couponMsg");
const checkoutBtn = document.getElementById("checkoutBtn");

const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const productModalClose = productModal.querySelector(".modal-close");

const checkoutModal = document.getElementById("checkoutModal");
const checkoutClose = document.getElementById("checkoutClose");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutItemsEl = document.getElementById("checkoutItems");
const checkoutSubtotalEl = document.getElementById("checkoutSubtotal");
const checkoutTaxEl = document.getElementById("checkoutTax");
const checkoutDeliveryEl = document.getElementById("checkoutDelivery");
const checkoutDiscountRowEl = document.getElementById("checkoutDiscountRow");
const checkoutDiscountEl = document.getElementById("checkoutDiscount");
const checkoutTotalEl = document.getElementById("checkoutTotal");
const checkoutError = document.getElementById("checkoutError");

const successModal = document.getElementById("successModal");
const successClose = document.getElementById("successClose");
const successOrderNumber = document.getElementById("successOrderNumber");
const viewOrdersBtn = document.getElementById("viewOrdersBtn");

const ordersToggle = document.getElementById("ordersToggle");
const ordersModal = document.getElementById("ordersModal");
const ordersClose = document.getElementById("ordersClose");
const ordersList = document.getElementById("ordersList");

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const builderImage = document.getElementById("builderImage");
const builderPrice = document.getElementById("builderPrice");
const builderBase = document.getElementById("builderBase");
const builderSize = document.getElementById("builderSize");
const builderTemp = document.getElementById("builderTemp");
const builderSugar = document.getElementById("builderSugar");
const builderIce = document.getElementById("builderIce");
const builderQtyEl = document.getElementById("builderQty");
const builderQtyMinus = document.getElementById("builderQtyMinus");
const builderQtyPlus = document.getElementById("builderQtyPlus");
const builderAdd = document.getElementById("builderAdd");

const reservationForm = document.getElementById("reservationForm");
const reservationMsg = document.getElementById("reservationMsg");
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

/* ===========================================================
   INIT
=========================================================== */

function init() {
  applyTheme(theme);
  renderProducts();
  renderCart();
  setupBuilder();
  attachEvents();
}

function attachEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeCategory = button.dataset.category;
      renderProducts();
    });
  });

  searchToggle.addEventListener("click", () => {
    searchBar.classList.toggle("open");
    if (searchBar.classList.contains("open")) searchInput.focus();
  });
  searchClose.addEventListener("click", () => {
    searchBar.classList.remove("open");
    searchInput.value = "";
    searchQuery = "";
    renderProducts();
  });
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  cartToggle.addEventListener("click", openCart);
  closeCart.addEventListener("click", closeCartPanel);
  cartOverlay.addEventListener("click", closeCartPanel);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCartPanel();
      closeModal();
      closeCheckout();
      closeSuccess();
      closeOrders();
    }
  });

  productModalClose.addEventListener("click", closeModal);
  productModal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeModal();
  });

  checkoutClose.addEventListener("click", closeCheckout);
  checkoutModal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeCheckout();
  });
  checkoutBtn.addEventListener("click", openCheckout);
  checkoutForm.addEventListener("submit", handlePlaceOrder);

  successClose.addEventListener("click", closeSuccess);
  successModal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeSuccess();
  });
  viewOrdersBtn.addEventListener("click", () => {
    closeSuccess();
    openOrders();
  });

  ordersToggle.addEventListener("click", openOrders);
  ordersClose.addEventListener("click", closeOrders);
  ordersModal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) closeOrders();
  });

  applyCouponBtn.addEventListener("click", handleApplyCoupon);
  couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyCoupon();
    }
  });

  themeToggle.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("nebo-theme", theme);
  });

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    reservationMsg.hidden = false;
    reservationMsg.classList.remove("error");
    reservationMsg.textContent = "Reservation confirmed! We'll see you soon.";
    reservationForm.reset();
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactMsg.hidden = false;
    contactMsg.classList.remove("error");
    contactMsg.textContent = "Message sent! We'll reply within 24 hours.";
    contactForm.reset();
  });
}

function applyTheme(nextTheme) {
  document.body.classList.toggle("dark", nextTheme === "dark");
  const icon = themeToggle.querySelector("i");
  icon.className = nextTheme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

/* ===========================================================
   PRODUCT GRID
=========================================================== */

function ratingStars(rating) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

function renderProducts() {
  let filtered =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === activeCategory);

  if (searchQuery) {
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.sku.toLowerCase().includes(searchQuery),
    );
  }

  productGrid.innerHTML = "";
  noResults.hidden = filtered.length !== 0;

  filtered.forEach((product, index) => {
    const stock = getStock(product.id);
    const outOfStock = stock <= 0;

    const card = document.createElement("article");
    card.className = "product-card" + (outOfStock ? " out-of-stock" : "");
    card.innerHTML = `
      <div class="card-image-wrap">
        <img src="${product.image}" alt="${product.name}" />
        ${outOfStock ? '<span class="out-of-stock-badge">Out of Stock</span>' : ""}
      </div>
      <div class="card-body">
        <div class="card-top">
          <h3>${product.name}</h3>
          <span class="price-tag">$${product.price.toFixed(2)}</span>
        </div>
        <div class="card-meta">
          <span>${product.category} · SKU ${product.sku}</span>
          <span class="stars">${ratingStars(product.rating)}</span>
        </div>
        <p class="description">${product.description}</p>
        <p class="card-meta"><span>Stock: ${stock}</span></p>
        <div class="card-actions">
          <button class="add-btn" data-id="${product.id}" ${outOfStock ? "disabled" : ""}>Add to Cart</button>
          <button class="buy-btn" data-id="${product.id}" ${outOfStock ? "disabled" : ""}>Buy Now</button>
        </div>
      </div>
    `;

    card.style.animation = `fadeIn 0.35s ease both`;
    card.style.animationDelay = `${index * 60}ms`;

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      openModal(product);
    });

    card.querySelector(".add-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      if (product.category === COFFEE_CATEGORY) {
        openModal(product);
      } else {
        addToCart(product, 1, null);
        openCart();
      }
    });

    card.querySelector(".buy-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      if (product.category === COFFEE_CATEGORY) {
        pendingBuyNow = true;
        openModal(product);
      } else {
        addToCart(product, 1, null);
        openCheckout();
      }
    });

    productGrid.appendChild(card);
  });
}

/* ===========================================================
   PRODUCT MODAL (with options for Coffee)
=========================================================== */

function computeUnitPrice(product, options) {
  let price = product.price;
  if (options) {
    price += SIZE_ADJUST[options.size] || 0;
  }
  return Math.max(price, 0.5);
}

function openModal(product) {
  selectedProduct = product;
  modalQty = 1;
  modalOptions = { size: "Medium", temperature: "Hot", sugar: "25%", ice: "Normal" };
  const stock = getStock(product.id);
  const isCoffee = product.category === COFFEE_CATEGORY;

  modalContent.innerHTML = `
    <div class="modal-content-layout">
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <p class="eyebrow">${product.category}</p>
        <h3 id="modalTitle">${product.name}</h3>
        <div class="modal-meta">
          <span>SKU ${product.sku}</span>
          <span>Stock: ${stock}</span>
          <span class="stars">${ratingStars(product.rating)}</span>
        </div>
        <p>${product.description}</p>

        ${
          isCoffee
            ? `
        <div class="option-group">
          <label>Size</label>
          <div class="chip-row" id="modalSize">
            <button class="chip" data-value="Small">Small</button>
            <button class="chip active" data-value="Medium">Medium</button>
            <button class="chip" data-value="Large">Large</button>
          </div>
        </div>
        <div class="option-group">
          <label>Temperature</label>
          <div class="chip-row" id="modalTemp">
            <button class="chip active" data-value="Hot">Hot</button>
            <button class="chip" data-value="Iced">Iced</button>
          </div>
        </div>
        <div class="option-group">
          <label>Sugar</label>
          <div class="chip-row" id="modalSugar">
            <button class="chip" data-value="0%">0%</button>
            <button class="chip active" data-value="25%">25%</button>
            <button class="chip" data-value="50%">50%</button>
            <button class="chip" data-value="75%">75%</button>
            <button class="chip" data-value="100%">100%</button>
          </div>
        </div>
        <div class="option-group">
          <label>Ice</label>
          <div class="chip-row" id="modalIce">
            <button class="chip" data-value="None">None</button>
            <button class="chip active" data-value="Normal">Normal</button>
            <button class="chip" data-value="Less">Less</button>
            <button class="chip" data-value="Extra">Extra</button>
          </div>
        </div>
        `
            : ""
        }

        <p class="price-tag" id="modalPrice" style="font-size: 1.25rem; margin-top: 0.6rem;">
          $${computeUnitPrice(product, isCoffee ? modalOptions : null).toFixed(2)}
        </p>

        <div class="quantity-row">
          <label for="modalQty">Quantity</label>
          <button type="button" id="modalQtyMinus" class="stepper-btn">−</button>
          <input id="modalQty" type="number" min="1" max="${Math.max(stock, 1)}" value="1" ${stock <= 0 ? "disabled" : ""} />
          <button type="button" id="modalQtyPlus" class="stepper-btn">+</button>
        </div>

        ${stock <= 0 ? '<p class="out-of-stock-text">Out of Stock</p>' : ""}

        <div class="modal-actions">
          <button class="add-btn" id="modalAddBtn" ${stock <= 0 ? "disabled" : ""}>Add to Cart</button>
          <button class="buy-btn" id="modalBuyBtn" ${stock <= 0 ? "disabled" : ""}>Buy Now</button>
        </div>
      </div>
    </div>
  `;

  const qtyInput = document.getElementById("modalQty");
  const priceEl = document.getElementById("modalPrice");

  function refreshPrice() {
    const unit = computeUnitPrice(product, isCoffee ? modalOptions : null);
    priceEl.textContent = `$${unit.toFixed(2)}`;
  }

  if (isCoffee) {
    ["Size", "Temp", "Sugar", "Ice"].forEach((groupName) => {
      const key = groupName.toLowerCase() === "temp" ? "temperature" : groupName.toLowerCase();
      const group = document.getElementById(`modal${groupName}`);
      group.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
          group.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          modalOptions[key] = chip.dataset.value;
          refreshPrice();
        });
      });
    });
  }

  document.getElementById("modalQtyMinus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });
  document.getElementById("modalQtyPlus").addEventListener("click", () => {
    qtyInput.value = Math.min(stock, Number(qtyInput.value) + 1);
  });

  document.getElementById("modalAddBtn").addEventListener("click", () => {
    const qty = Math.min(Number(qtyInput.value) || 1, stock);
    addToCart(product, qty, isCoffee ? { ...modalOptions } : null);
    closeModal();
    openCart();
  });

  document.getElementById("modalBuyBtn").addEventListener("click", () => {
    const qty = Math.min(Number(qtyInput.value) || 1, stock);
    addToCart(product, qty, isCoffee ? { ...modalOptions } : null);
    closeModal();
    openCheckout();
  });

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  pendingBuyNow = false;
}

/* ===========================================================
   CART LOGIC
=========================================================== */

function optionsKey(options) {
  return options ? JSON.stringify(options) : "none";
}

function addToCart(product, quantity, options) {
  const stock = getStock(product.id);
  if (stock <= 0) return;

  const cartId = `${product.id}::${optionsKey(options)}`;
  const unitPrice = computeUnitPrice(product, options);
  const existing = cart.find((item) => item.cartId === cartId);
  const currentQtyForProduct = cart
    .filter((item) => item.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const allowedToAdd = Math.max(0, stock - currentQtyForProduct);
  const qtyToAdd = Math.min(quantity, allowedToAdd);
  if (qtyToAdd <= 0) return;

  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    cart.push({
      cartId,
      id: product.id,
      name: product.name,
      image: product.image,
      unitPrice,
      quantity: qtyToAdd,
      options,
    });
  }

  saveCart();
  renderCart();
}

function updateCartQuantity(cartId, action) {
  const entry = cart.find((item) => item.cartId === cartId);
  if (!entry) return;
  const stock = getStock(entry.id);

  if (action === "increase") {
    const currentQtyForProduct = cart
      .filter((item) => item.id === entry.id)
      .reduce((sum, item) => sum + item.quantity, 0);
    if (currentQtyForProduct < stock) entry.quantity += 1;
  } else if (action === "decrease") {
    entry.quantity -= 1;
  } else if (action === "remove") {
    cart = cart.filter((item) => item.cartId !== cartId);
  }

  if (entry.quantity <= 0) {
    cart = cart.filter((item) => item.cartId !== cartId);
  }

  saveCart();
  renderCart();
}

function optionsSummary(options) {
  if (!options) return "";
  return `${options.size} • ${options.temperature} • ${options.sugar} Sugar • ${options.ice} Ice`;
}

function cartTotals(orderType) {
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const delivery = orderType === "Delivery" && subtotal > 0 ? DELIVERY_FEE : 0;
  const discountRate = appliedCoupon ? COUPONS[appliedCoupon] || 0 : 0;
  const discount = subtotal * discountRate;
  const total = Math.max(subtotal + tax + delivery - discount, 0);
  return { subtotal, tax, delivery, discount, total };
}

function renderCart() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;
  cartCountEl.style.display = totalCount > 0 ? "grid" : "none";

  if (!cart.length) {
    cartItemsEl.innerHTML =
      '<div class="empty-state">Your cart is delightfully empty. Add a drink or pastry to begin.</div>';
  } else {
    cartItemsEl.innerHTML = "";
    cart.forEach((item) => {
      const line = document.createElement("div");
      line.className = "cart-item";
      line.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div style="flex:1;">
          <div class="cart-item-name">${item.name}</div>
          ${item.options ? `<div class="cart-item-options">${optionsSummary(item.options)}</div>` : ""}
          <div>$${item.unitPrice.toFixed(2)}</div>
          <div class="quantity-controls">
            <button data-action="decrease" data-id="${item.cartId}">−</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${item.cartId}">+</button>
            <button class="remove-btn" data-action="remove" data-id="${item.cartId}">Remove</button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(line);
    });

    cartItemsEl.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () =>
        updateCartQuantity(button.dataset.id, button.dataset.action),
      );
    });
  }

  const { subtotal, tax, delivery, discount, total } = cartTotals(getSelectedOrderType());
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  taxEl.textContent = `$${tax.toFixed(2)}`;
  deliveryEl.textContent = `$${delivery.toFixed(2)}`;
  if (discount > 0) {
    discountRowEl.hidden = false;
    discountEl.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRowEl.hidden = true;
  }
  grandTotalEl.textContent = `$${total.toFixed(2)}`;

  checkoutBtn.disabled = cart.length === 0;
}

function getSelectedOrderType() {
  const checked = document.querySelector('input[name="orderType"]:checked');
  return checked ? checked.value : "Dine In";
}

function openCart() {
  cartOverlay.classList.add("open");
  cartSidebar.classList.add("open");
}

function closeCartPanel() {
  cartOverlay.classList.remove("open");
  cartSidebar.classList.remove("open");
}

/* ===========================================================
   COUPON
=========================================================== */

function handleApplyCoupon() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) return;

  if (COUPONS[code]) {
    appliedCoupon = code;
    saveCoupon();
    couponMsg.hidden = false;
    couponMsg.classList.remove("error");
    couponMsg.textContent = `Coupon Applied ✓ (${COUPONS[code] * 100}% off)`;
  } else {
    appliedCoupon = null;
    saveCoupon();
    couponMsg.hidden = false;
    couponMsg.classList.add("error");
    couponMsg.textContent = "Invalid coupon code.";
  }
  renderCart();
  renderCheckoutSummary();
}

/* ===========================================================
   BUILD YOUR DRINK
=========================================================== */

function setupBuilder() {
  const coffeeProducts = PRODUCTS.filter((p) => p.category === COFFEE_CATEGORY);
  builderBase.innerHTML = coffeeProducts
    .map((p) => `<option value="${p.id}">${p.name} — $${p.price.toFixed(2)}</option>`)
    .join("");

  const state = {
    base: coffeeProducts[0].id,
    size: "Small",
    temperature: "Hot",
    sugar: "25%",
    ice: "Normal",
    qty: 1,
  };

  function refresh() {
    const product = getProduct(state.base);
    builderImage.src = product.image;
    builderImage.alt = product.name;
    const unit = computeUnitPrice(product, { size: state.size });
    builderPrice.textContent = `$${(unit * state.qty).toFixed(2)}`;
    builderQtyEl.textContent = state.qty;
  }

  builderBase.addEventListener("change", () => {
    state.base = builderBase.value;
    refresh();
  });

  function wireChipRow(el, key) {
    el.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        el.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state[key] = chip.dataset.value;
        refresh();
      });
    });
  }

  wireChipRow(builderSize, "size");
  wireChipRow(builderTemp, "temperature");
  wireChipRow(builderSugar, "sugar");
  wireChipRow(builderIce, "ice");

  builderQtyMinus.addEventListener("click", () => {
    state.qty = Math.max(1, state.qty - 1);
    refresh();
  });
  builderQtyPlus.addEventListener("click", () => {
    state.qty = Math.min(10, state.qty + 1);
    refresh();
  });

  builderAdd.addEventListener("click", () => {
    const product = getProduct(state.base);
    const stock = getStock(product.id);
    if (stock <= 0) {
      alert(`${product.name} is currently out of stock.`);
      return;
    }
    addToCart(product, state.qty, {
      size: state.size,
      temperature: state.temperature,
      sugar: state.sugar,
      ice: state.ice,
    });
    openCart();
  });

  refresh();
}

/* ===========================================================
   CHECKOUT
=========================================================== */

function renderCheckoutSummary() {
  checkoutItemsEl.innerHTML = cart
    .map(
      (item) => `
      <div class="checkout-line">
        <span>${item.name} x${item.quantity}${item.options ? `<br><small>${optionsSummary(item.options)}</small>` : ""}</span>
        <span>$${(item.unitPrice * item.quantity).toFixed(2)}</span>
      </div>
    `,
    )
    .join("");

  const orderType = getSelectedOrderType();
  const { subtotal, tax, delivery, discount, total } = cartTotals(orderType);
  checkoutSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  checkoutTaxEl.textContent = `$${tax.toFixed(2)}`;
  checkoutDeliveryEl.textContent = `$${delivery.toFixed(2)}`;
  if (discount > 0) {
    checkoutDiscountRowEl.hidden = false;
    checkoutDiscountEl.textContent = `-$${discount.toFixed(2)}`;
  } else {
    checkoutDiscountRowEl.hidden = true;
  }
  checkoutTotalEl.textContent = `$${total.toFixed(2)}`;
}

function openCheckout() {
  if (!cart.length) return;
  closeCartPanel();
  closeModal();
  checkoutError.hidden = true;
  renderCheckoutSummary();

  document.querySelectorAll('input[name="orderType"]').forEach((radio) => {
    radio.addEventListener("change", renderCheckoutSummary);
  });

  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden", "true");
}

function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = String(orders.length + 1).padStart(3, "0");
  return `NEBO-${y}${m}${d}-${seq}`;
}

function handlePlaceOrder(event) {
  event.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const orderType = getSelectedOrderType();
  const payment = document.querySelector('input[name="payment"]:checked')?.value;

  if (!name || !phone || !email || !address) {
    checkoutError.hidden = false;
    checkoutError.textContent = "Please complete all customer information fields.";
    return;
  }
  if (!payment) {
    checkoutError.hidden = false;
    checkoutError.textContent = "Please select a payment method.";
    return;
  }
  if (!cart.length) {
    checkoutError.hidden = false;
    checkoutError.textContent = "Your cart is empty.";
    return;
  }

  // Validate stock one more time
  for (const item of cart) {
    if (item.quantity > getStock(item.id)) {
      checkoutError.hidden = false;
      checkoutError.textContent = `Not enough stock for ${item.name}.`;
      return;
    }
  }

  checkoutError.hidden = true;

  const { subtotal, tax, delivery, discount, total } = cartTotals(orderType);
  const orderNumber = generateOrderNumber();

  const order = {
    orderNumber,
    date: new Date().toISOString(),
    customer: { name, phone, email, address },
    orderType,
    payment,
    items: cart.map((item) => ({
      name: item.name,
      options: item.options,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    })),
    subtotal,
    tax,
    delivery,
    discount,
    total,
    status: "Completed",
  };

  // Reduce stock
  cart.forEach((item) => {
    stockLevels[item.id] = Math.max(0, getStock(item.id) - item.quantity);
  });
  saveStock();

  orders.unshift(order);
  saveOrders();

  cart = [];
  saveCart();
  appliedCoupon = null;
  saveCoupon();

  renderCart();
  renderProducts();
  closeCheckout();
  checkoutForm.reset();

  successOrderNumber.textContent = order.orderNumber;
  openSuccess();
}

function openSuccess() {
  successModal.classList.add("open");
  successModal.setAttribute("aria-hidden", "false");
}

function closeSuccess() {
  successModal.classList.remove("open");
  successModal.setAttribute("aria-hidden", "true");
}

/* ===========================================================
   MY ORDERS
=========================================================== */

function openOrders() {
  renderOrders();
  ordersModal.classList.add("open");
  ordersModal.setAttribute("aria-hidden", "false");
}

function closeOrders() {
  ordersModal.classList.remove("open");
  ordersModal.setAttribute("aria-hidden", "true");
}

function renderOrders() {
  if (!orders.length) {
    ordersList.innerHTML = '<div class="empty-state">No orders yet. Place your first order from the menu!</div>';
    return;
  }

  ordersList.innerHTML = orders
    .map((order) => {
      const dateStr = new Date(order.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const productsStr = order.items
        .map((item) => `${item.name} x${item.quantity}`)
        .join(", ");
      return `
        <div class="order-card">
          <div class="order-card-top">
            <span class="order-number">${order.orderNumber}</span>
            <span class="order-status">${order.status}</span>
          </div>
          <div class="order-date">${dateStr}</div>
          <div class="order-products">${productsStr}</div>
          <div class="order-total">Total: $${order.total.toFixed(2)}</div>
        </div>
      `;
    })
    .join("");
}

/* ===========================================================
   START
=========================================================== */

init();
