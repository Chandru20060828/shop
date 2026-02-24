# 🚀 COMPLETE SETUP - STEP BY STEP

## ⚠️ IMPORTANT: You MUST do this EXACTLY in this order!

---

## 🔧 STEP 1: Create .env File

Create a file named `.env` in your project root (same folder as server.js):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=secret_key_2025
NODE_ENV=development
```

---

## 🔧 STEP 2: Install All Dependencies

Run this command in your project folder:

```bash
npm install
```

Wait for it to finish. You should see ✅ success message.

---

## 🔧 STEP 3: Start MongoDB (IMPORTANT!)

**Open a NEW terminal window** and run:

```bash
mongod
```

**KEEP THIS WINDOW OPEN!** You should see:
```
waiting for connections on port 27017
```

---

## 🔧 STEP 4: Start the Server

**Open another NEW terminal window** and run:

```bash
node server.js
```

You should see:
```
MongoDB connected
Server running on port 3000
```

**If you see "MongoDB not connected", go back to Step 3!**

---

## 🔧 STEP 5: Seed the Database

**Open another NEW terminal window** and run:

```bash
node seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️ Cleared existing products
✅ 8 beautiful dress products added successfully!
🎉 Your Dress Collections store is ready to go!
```

---

## 🔧 STEP 6: Open Your Browser

Go to: **http://localhost:3000**

You should see:
- ✨ Beautiful home page with hero section
- 💎 Why Choose Us section
- ⭐ Testimonials section
- 🔵 Login button
- 🟢 Register button
- **NO PRODUCTS** showing yet (correct!)

---

## ✅ NOW TEST IT!

### Test 1️⃣: Register a New Account

1. Click **"Register"** button
2. Fill in:
   - Username: `myusername`
   - Email: `myemail@test.com`
   - Password: `mypassword123`
3. Click **"Create Account"**

You should see: ✅ **"Registration successful! Please login."**

### Test 2️⃣: Login

1. Click **"Login"** button
2. Fill in:
   - Email: `myemail@test.com`
   - Password: `mypassword123`
3. Click **"Login Now"**

You should see: ✅ **"Login successful! Welcome back! 🎉"**

Then the page reloads and shows:
- 🛍️ **8 DRESS PRODUCTS** with prices
- 🔴 **LOGOUT** button in navigation (red)
- No more Login/Register buttons

### Test 3️⃣: Add to Cart

1. Click **"Add to Cart"** on any dress
2. You should see: ✅ **"Product added to your cart!"**

### Test 4️⃣: Go to Cart

1. Click **"Cart"** in navigation
2. See your product in the cart
3. Can change quantity or remove items

### Test 5️⃣: Logout

1. Click **"Logout"** button (red in navbar)
2. You should see: ✅ **"You have been logged out!"**
3. Products disappear
4. Login/Register buttons come back

---

## 🎯 Expected Behavior

### NOT Logged In:
- ✅ Beautiful home page
- ✅ Why Choose Us section
- ✅ Testimonials
- ❌ NO products showing
- ✅ Login/Register buttons visible

### After Login:
- ✅ Home page
- ✅ Why Choose Us section
- ✅ Testimonials
- ✅ **8 DRESS PRODUCTS** showing with prices
- ✅ Logout button visible
- ❌ Login/Register buttons hidden

---

## ❌ IF SOMETHING GOES WRONG

### Problem: "Cannot connect to MongoDB"
**Solution:**
- Stop all terminals
- Run `mongod` first in a new terminal
- Then run `node server.js` in another terminal
- Wait 5 seconds before testing

### Problem: "Invalid credentials" when logging in
**Solution:**
1. Make sure you registered first!
2. Use the SAME email and password you registered with
3. Check browser console (F12) for errors
4. Check server console for errors

### Problem: "Register not working" or "not a function"
**Solution:**
1. Make sure MongoDB is running (`mongod`)
2. Make sure server is running (`node server.js`)
3. Close browser and reopen it fresh
4. Try registering with a new email address

### Problem: Products not showing after login
**Solution:**
1. Make sure you ran `node seed.js`
2. Refresh the page (F5)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try logging out and logging back in

### Problem: Port 3000 already in use
**Solution:**
Edit `.env` file:
```
PORT=3001
```
Then restart server

---

## 📝 Checklist Before Starting

- [ ] Created `.env` file
- [ ] Ran `npm install`
- [ ] MongoDB is running (`mongod`)
- [ ] Server is running (`node server.js`)
- [ ] Seeded database (`node seed.js`)
- [ ] Opened http://localhost:3000

---

## 🎉 YOU'RE READY!

If you followed all steps correctly, everything should work perfectly!

**Three terminals should be running:**

| Terminal 1 | Terminal 2 | Terminal 3 |
|-----------|-----------|-----------|
| `mongod` (running) | `node server.js` (running) | (available) |

---

**If you're still having issues, check the server console (Terminal 2) for error messages and tell me what it says! 🚀**
