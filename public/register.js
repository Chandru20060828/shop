document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const submitBtn = document.querySelector('#register-form button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Validation
  if (!name || !password) {
    alert('❌ Please fill in all fields!');
    return;
  }

  if (!name.includes('@')) {
    alert('❌ Username must contain "@" symbol!');
    return;
  }

  if (password.length < 6) {
    alert('❌ Password must be at least 6 characters long!');
    return;
  }

  try {
    submitBtn.innerHTML = 'Creating Account...';
    submitBtn.disabled = true;

    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();
    
    if (response.ok) {
      const messageDiv = document.getElementById('message');
      messageDiv.style.display = 'block';
      messageDiv.innerHTML = '<div style="color: green; font-weight: bold;">✅ Registration successful!</div>';
      setTimeout(() => {
        window.location.href = './login.html';
      }, 2000);
    } else {
      const messageDiv = document.getElementById('message');
      messageDiv.style.display = 'block';
      messageDiv.innerHTML = '<div style="color: red; font-weight: bold;">❌ ' + (data.message || 'Registration failed.') + '</div>';
    }
  } catch (err) {
    alert('❌ Something went wrong. Please try again.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});