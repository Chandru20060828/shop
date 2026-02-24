document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');
  const productSummary = document.getElementById('product-summary');

  if (!productId) {
    productSummary.innerHTML = '<p>No product selected.</p>';
    return;
  }

  let product;

  // Fetch Product Details
  try {
    const response = await fetch(`/api/products/${productId}`);
    product = await response.json();

    if (product) {
      productSummary.innerHTML = `
        <div style="text-align: center;">
          <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;">
          <h4>${product.name}</h4>
          <p style="color: #666;">${product.description}</p>
          <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold;">
            <span>Total Amount:</span>
            <span style="color: #f5576c;">$${product.price.toFixed(2)}</span>
          </div>
        </div>
      `;
    } else {
      productSummary.innerHTML = '<p>Product not found.</p>';
    }
  } catch (err) {
    console.error(err);
    productSummary.innerHTML = '<p>Error loading product details. Please try again.</p>';
  }

  // Handle Form Submission
  document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to place an order.');
      window.location.href = 'login.html';
      return;
    }

    if (!product) {
      alert('Product details not loaded. Please refresh the page.');
      return;
    }

    const phone = document.getElementById('phone').value;
    const name = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const btn = e.target.querySelector('button');

    // Simulate Payment Processing
    const originalText = btn.innerText;
    btn.innerText = 'Processing Payment...';
    btn.disabled = true;

    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          products: [{ product: productId, quantity: 1 }],
          total: product.price
        })
      });

      if (orderResponse.ok) {
        // Show notification
        alert(`✅ Your order is placed!\n\nDress: ${product.name}\nDescription: ${product.description}\nTotal: $${product.price.toFixed(2)}\n\nThank you for your purchase!`);

        // Redirect to confirmation
        window.location.href = `order_confirmation.html?name=${encodeURIComponent(name)}`;
      } else {
        alert('Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order. Please check your connection.');
    } finally {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  });
});
