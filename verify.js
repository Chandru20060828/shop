document.addEventListener('DOMContentLoaded', () => {
    const verifyForm = document.getElementById('verify-form');
    const messageDiv = document.getElementById('message');
    
    const urlParams = new URLSearchParams(window.location.search);
    const phone = urlParams.get('phone');
    const otpParam = urlParams.get('otp');

    if (!phone) {
        messageDiv.textContent = 'Error: Phone number not found. Please go back to the registration page.';
        messageDiv.style.color = 'red';
        verifyForm.style.display = 'none';
        return;
    }

    if (otpParam) {
        document.getElementById('otp').value = otpParam;
    }

    verifyForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const otp = document.getElementById('otp').value;

        try {
            const res = await fetch('/api/users/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone, otp })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || 'Verification failed');
            }

            messageDiv.textContent = data.msg + ' Redirecting to login...';
            messageDiv.style.color = 'green';

            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);

        } catch (err) {
            messageDiv.textContent = `Error: ${err.message}`;
            messageDiv.style.color = 'red';
        }
    });

    // Auto-submit if OTP is present in URL
    if (otpParam) {
        setTimeout(() => {
            verifyForm.querySelector('button[type="submit"]').click();
        }, 500);
    }
});