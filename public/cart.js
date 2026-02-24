document.addEventListener('DOMContentLoaded', () => {
  displayCart();
});

async function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; font-size: 1.1rem; color: #666; padding: 2rem;">🛒 Your cart is empty. <a href="index.html" style="color: #667eea; text-decoration: none; font-weight: bold;">Shop now!</a></p>';
    if (totalPriceEl) totalPriceEl.textContent = '$0.00';
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;

  for (const item of cart) {
    try {
      const response = await fetch(`/api/products/${item.id}`);
      const product = await response.json();

      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.style.cssText = 'display: grid; grid-template-columns: 100px 1fr auto; gap: 1.5rem; align-items: center;';
      itemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 8px;">
        <div>
          <h3 style="margin: 0; color: #667eea;">${product.name}</h3>
          <p style="margin: 0.5rem 0; color: #666;">${product.description}</p>
          <div style="margin-top: 1rem;">
            <label style="color: #333; font-weight: bold;">Quantity:</label>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)" style="width: 70px; padding: 0.5rem; margin-left: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          </div>
        </div>
        <div style="text-align: right;">
          <p style="font-size: 1.3rem; color: #f5576c; font-weight: bold; margin: 0;">$${(product.price * item.quantity).toFixed(2)}</p>
          <button onclick="removeFromCart('${item.id}')" style="background: #ff6b6b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; margin-top: 1rem;">🗑️ Remove</button>
        </div>
      `;
      cartItems.appendChild(itemDiv);
      total += product.price * item.quantity;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }

  if (totalPriceEl) totalPriceEl.textContent = '$' + total.toFixed(2);
}

document.getElementById('checkout-btn').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('❌ Please login to checkout.');
    window.location.href = 'login.html';
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('❌ Your cart is empty.');
    return;
  }

  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        products: cart.map(item => ({ product: item.id, quantity: item.quantity })),
        total: await calculateTotal(cart)
      })
    });

    if (response.ok) {
      alert('✅ Order placed successfully! Thank you for your purchase! 🎉');
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    } else {
      alert('❌ Error placing order. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Error placing order. Please check your connection.');
  }
});

async function calculateTotal(cart) {
  let total = 0;
  for (const item of cart) {
    try {
      const response = await fetch(`/api/products/${item.id}`);
      const product = await response.json();
      total += product.price * item.quantity;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  return total;
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  alert('✅ Product removed from cart!');
}

function updateQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const newQuantity = parseInt(quantity);

  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}
