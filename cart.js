const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");

if (cart.length === 0) {
  cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
    <div class="cart-item-details">
      <h3>${item.name}</h3>
      <p>Qty: ${item.quantity}</p>
    </div>
    <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(
      2
    )}</div>
  `;
  
    cartItemsDiv.appendChild(itemDiv);
  });
  
  

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.18;
  const deliveryCharge = 40;
  const grandTotal = total + tax + deliveryCharge;
  const summaryDiv = document.createElement("div");
  summaryDiv.classList.add("cart-summary");

  summaryDiv.innerHTML = `
  <p>Subtotal: ₹${total.toFixed(2)}</p>
  <p>Tax (18%): ₹${tax.toFixed(2)}</p>
  <p>Delivery Charge: ₹${deliveryCharge}</p>
  <div class="cart-total">Grand Total: ₹${grandTotal.toFixed(2)}</div>
`;

  cartItemsDiv.appendChild(summaryDiv);


}

function clearCart() {
  localStorage.removeItem("cart");
  location.reload();
}
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }
  localStorage.removeItem("cart");
  alert("Thank you for your purchase!");
  location.reload();
}

    