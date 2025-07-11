fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    window.allProducts = data.products;
    window.currentProducts = data.products; 

    setupCategories(data.products);
    const selected = new URLSearchParams(location.search).get("category");
    const initialProducts = selected
      ? filterByCategory(selected)
      : data.products;

    window.currentProducts = initialProducts; 

    renderProducts(initialProducts);
    if (selected) document.getElementById("categoryFilter").value = selected;
    updateCartCount();
  })
  .catch((err) => {
    console.error("Error loading products:", err);
    document.getElementById("product-container").innerHTML =
      "<p>Failed to load products.</p>";
  });

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart(product, change) {
  const cart = getCart();
  const item = cart.find((p) => p.id === product.id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) cart.splice(cart.indexOf(item), 1);
  } else if (change > 0) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
    alert(`${product.name} added to cart!`);
  }
  saveCart(cart);
  updateCartCount(); 

  renderProducts(window.currentProducts); 
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.getElementById("cart-count");
  if (cartCountSpan) {
    cartCountSpan.textContent = `Cart(${totalItems})`;
  }
}


function renderProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  const cart = getCart();

  products.forEach((product) => {
    const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h4>${product.name}</h4>
      <p>Quantity: ${product.quantity}</p>
      <p>Weight: ${product.grossWeight}</p>
      <p><del>₹${product.originalPrice}</del> <strong>₹${
      product.price
    }</strong></p>
      <div class="product-actions">
        ${
          product.available
            ? quantity
              ? `<div class="qty-controls">
                  <button class="decrease">-</button>
                  <span>${quantity}</span>
                  <button class="increase">+</button>
                </div>`
              : `<button class="add-btn">Add</button>`
            : `<button disabled>Sold Out</button>`
        }
      </div>
    `;

    if (product.available) {
      card
        .querySelector(".add-btn")
        ?.addEventListener("click", () => updateCart(product, 1));
      card
        .querySelector(".increase")
        ?.addEventListener("click", () => updateCart(product, 1));
      card
        .querySelector(".decrease")
        ?.addEventListener("click", () => updateCart(product, -1));
    }

    container.appendChild(card);
  });
}

function setupCategories(products) {
  const filter = document.getElementById("categoryFilter");
  filter.innerHTML = `<option value="all">All</option>`;
  [...new Set(products.map((p) => p.category))].forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat[0].toUpperCase() + cat.slice(1);
    filter.appendChild(opt);
  });

  filter.addEventListener("change", () => {
    const selected = filter.value;
    const filteredProducts =
      selected === "all" ? window.allProducts : filterByCategory(selected);
    window.currentProducts = filteredProducts; // ✅ ADDED: track selected products for consistent re-render
    renderProducts(filteredProducts);
  });
}

function filterByCategory(category) {
  return window.allProducts.filter((p) => p.category === category);
}

document.querySelector(".search-bar").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  const productContainer = document.getElementById("search-container");
  const mainContent = document.getElementById("main-content");

  if (!query) {
    productContainer.innerHTML = "";
    productContainer.style.display = "none";
    mainContent.style.display = "block";
    return;
  }

  mainContent.style.display = "none";
  productContainer.style.display = "block";

  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  productContainer.innerHTML = "";
  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product-card";
      productDiv.style.border = "1px solid #ddd";
      productDiv.style.padding = "10px";
      productDiv.style.margin = "10px";
      productDiv.style.display = "inline-block";
      productDiv.style.width = "200px";

      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:150px; object-fit:cover;">
        <h5>${product.name}</h5>
        <p>₹${product.price}</p>
      `;

      productContainer.appendChild(productDiv);
    });
  } else {
    productContainer.innerHTML = "<p>No products found.</p>";
  }
});


const currentUser = localStorage.getItem("currentUser");

if (currentUser) {
  document.getElementById("loginText").textContent = currentUser;
  document.getElementById("loginLink").href = "#";
  document.getElementById("loginLink").addEventListener("click", () => {
    if (confirm("Do you want to logout?")) {
      localStorage.removeItem("currentUser");
      window.location.reload();
    }
  });
}

function updateArea() {
  const select = document.getElementById("area-select");
  const selectedArea = select.value;
  console.log("Selected area:", selectedArea);
}
