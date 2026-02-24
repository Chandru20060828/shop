document.addEventListener('DOMContentLoaded', () => {
  // Setup Click to Move interaction
  const enterBtn = document.getElementById('enter-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      document.getElementById('intro-screen').style.display = 'none';
      const mainApp = document.getElementById('main-app');
      mainApp.style.display = 'flex'; // Use flex to maintain sidebar layout
      fetchAndDisplayProducts();
      loadOrders(); // Load dummy or local orders
    });
  }
});

async function fetchAndDisplayProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    displaySampleProducts();
  }
}

function displaySampleProducts() {
  const sampleProducts = [
    {
      _id: '1',
      name: 'Elegant Evening Dress',
      description: 'A stunning black evening gown perfect for special occasions',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '2',
      name: 'Casual Summer Dress',
      description: 'Light and breezy dress ideal for summer outings',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '3',
      name: 'Party Cocktail Dress',
      description: 'Chic cocktail dress with elegant details',
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '4',
      name: 'Vintage Floral Dress',
      description: 'Beautiful vintage-inspired floral print dress',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '5',
      name: 'Professional Work Dress',
      description: 'Elegant dress suitable for office and professional settings',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '6',
      name: 'Bohemian Maxi Dress',
      description: 'Free-spirited bohemian maxi dress with flowing fabric',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '7',
      name: 'Elegant Wrap Dress',
      description: 'Timeless wrap dress that flatters every figure',
      price: 74.99,
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: '8',
      name: 'Romantic Lace Dress',
      description: 'Romantic dress featuring delicate lace details',
      price: 84.99,
      image: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?auto=format&fit=crop&w=600&q=80'
    }
  ];
  displayProducts(sampleProducts);
}

function displayProducts(products) {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No products available</p>';
    return;
  }

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p style="font-size: 1.3rem; color: #f5576c; font-weight: bold;">$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product._id}', '${product.name}')">🛒 Add to Cart</button>      
      <a href="checkout.html?productId=${product._id}" class="buy-now-button">Buy Now</a>
    `;
    productList.appendChild(productDiv);
  });
}

function addToCart(productId, productName) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`✨ ${productName} added to your cart! 🛒`);
}

function loadOrders() {
  // Simple mock or local storage check for display
  const orderList = document.getElementById('order-list');
  // Since we removed login, we can't fetch from server by user ID easily.
  // We'll just show a placeholder or check if there's a 'lastOrder' in local storage if we implemented that.
  // For now, static text as per "simple" request.
  orderList.innerHTML = '<p>• 1x Evening Dress<br>• 2x Summer Dress</p>';
}
