document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('password').value.trim();
  const submitBtn = document.querySelector('#login-form button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  if (!name || !password) {
    alert('❌ Please enter your name and password!');
    return;
  }

  try {
    submitBtn.innerHTML = 'Logging in...';
    submitBtn.disabled = true;

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', name);
      alert('✅ Logged in successfully!');
      window.location.href = 'index.html';
    } else {
      alert(data.msg || '❌ Login failed');
    }
  } catch (err) {
    alert('❌ Server error. Please try again later.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});