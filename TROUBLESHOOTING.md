# 🔧 TROUBLESHOOTING GUIDE - Fix Login/Register Issues

## 🎯 The Problem You're Having

```
❌ Login shows "Invalid credentials"
❌ Register shows "not a function" error
❌ Can't authenticate
```

## ✅ The Solution

The issue is most likely:
1. **MongoDB is NOT running** ⚠️
2. **Server didn't start properly** ⚠️
3. **No users in database** ⚠️

---

## 🔍 STEP-BY-STEP DEBUGGING

### Step 1: Check if MongoDB is Running

Open PowerShell and run:
```powershell
mongod
```

**Expected output:**
```
waiting for connections on port 27017
```

**If you see ERROR:**
- MongoDB might not be installed
- Download from: https://www.mongodb.com/try/download/community
- Or install via: `choco install mongodb-community` (if you have Chocolatey)

---

### Step 2: Check if Server Starts Properly

Open another PowerShell and run:
```powershell
node server.js
```

**Expected output:**
```
MongoDB connected
Server running on port 3000
```

**If you see ERROR about MongoDB:**
- Go back to Step 1 - MongoDB is not running!

**If you see ERROR about missing dependencies:**
- Run: `npm install`

---

### Step 3: Run Database Seeding

Open another PowerShell and run:
```powershell
node seed.js
```

**Expected output:**
```
✅ Connected to MongoDB
🗑️ Cleared existing products
✅ 8 beautiful dress products added successfully!
🎉 Your Dress Collections store is ready to go!
```

**If you see ERROR:**
- Make sure `mongod` is running in Step 1
- Make sure `node server.js` is running in Step 2

---

### Step 4: Test Registration in Browser

1. Go to: `http://localhost:3000`
2. Click **Register**
3. Fill in:
   - Username: `testuser123`
   - Email: `test@example.com`
   - Password: `password123`
4. Click **Create Account**

**Expected result:** ✅ "Registration successful! Please login."

**If you see ERROR:**
- Check Step 1 - MongoDB running?
- Check Step 2 - Server running?
- Open browser console (F12) and check for errors
- Check server console in PowerShell for errors

---

### Step 5: Test Login in Browser

1. Click **Login**
2. Fill in:
   - Email: `test@example.com`
   - Password: `password123`
3. Click **Login Now**

**Expected result:** ✅ "Login successful! Welcome back! 🎉"

**If you see "Invalid credentials":**
- Make sure you registered FIRST (Step 4)
- Check you're using the SAME email and password
- Try a NEW email/password combination
- Check server console for errors

---

## 📋 Complete Testing Checklist

Run through this in order:

### ✅ Terminal Setup
- [ ] Terminal 1: `mongod` (running and waiting for connections)
- [ ] Terminal 2: `node server.js` (MongoDB connected, Server running on port 3000)
- [ ] Terminal 3: `node seed.js` (products added successfully)

### ✅ Browser Testing
- [ ] Go to http://localhost:3000
- [ ] Home page loads beautifully
- [ ] NO products visible yet (correct!)
- [ ] Register button visible
- [ ] Login button visible

### ✅ Registration Test
- [ ] Click Register
- [ ] Enter unique email (like: `newuser@test.com`)
- [ ] Click Create Account
- [ ] See success message
- [ ] See "Login here" link

### ✅ Login Test
- [ ] Click Login (or go to http://localhost:3000/login.html)
- [ ] Enter the email you just registered
- [ ] Enter the password you registered with
- [ ] Click Login Now
- [ ] See success message
- [ ] **Products now appear on page**
- [ ] Logout button appears in navbar

### ✅ Products Test
- [ ] 8 dress products are visible
- [ ] Each has a price
- [ ] Can click "Add to Cart"
- [ ] Get confirmation message

### ✅ Cart Test
- [ ] Click Cart in navbar
- [ ] See products you added
- [ ] Can change quantity
- [ ] Can remove items

### ✅ Logout Test
- [ ] Click Logout (red button in navbar)
- [ ] See logout message
- [ ] Products disappear
- [ ] Login/Register buttons come back

---

## 🐛 Common Errors & Solutions

### Error: "Cannot find module 'express'"
**Solution:**
```powershell
npm install
```

### Error: "MongoDB not connected"
**Solution:**
- Open new PowerShell
- Run `mongod`
- Wait 3 seconds
- Then run `node server.js`

### Error: "Port 3000 is already in use"
**Solution:**
Edit `.env`:
```
PORT=3001
```
Then restart server

### Error: "Invalid credentials" at login
**Solution:**
1. Make sure you registered first
2. Use EXACT same email/password from registration
3. Try registering with a brand new email
4. Check if MongoDB is running

### Error: "not a function" at register
**Solution:**
- MongoDB is not running
- Run `mongod` in a terminal
- Restart server
- Restart browser

### Error: Products not showing after login
**Solution:**
1. Refresh page (Ctrl+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Run `node seed.js` again
4. Logout and login again

---

## 📝 Quick Reference

### Three Terminals Needed

**Terminal 1:**
```powershell
mongod
```
Keep running always! Shows: `waiting for connections on port 27017`

**Terminal 2:**
```powershell
node server.js
```
Keep running while testing! Shows: `MongoDB connected` and `Server running on port 3000`

**Terminal 3:**
```powershell
node seed.js
```
Run once to load products. Shows successful messages.

---

## ✨ What Should Happen

### BEFORE Login:
- Home page with beautiful design
- "Why Choose Us" section
- Testimonials section
- **NO PRODUCTS** visible
- Login and Register buttons visible

### AFTER Login:
- Same beautiful home page
- "Why Choose Us" section
- Testimonials section
- **8 DRESS PRODUCTS** visible with prices
- Logout button visible
- No Login/Register buttons

---

## 🆘 Still Having Issues?

Tell me:
1. **What error do you see?** (Copy the exact error message)
2. **Where do you see it?** (Browser? Server console?)
3. **Did you follow all steps?**
4. **Are all 3 terminals running?**

Once you tell me, I can fix it! 🚀

---

## 🎯 Expected Success

When everything works:

```
✅ Registration: "Registration successful! Please login."
✅ Login: "Login successful! Welcome back! 🎉"
✅ Products appear after login
✅ Can add to cart
✅ Can logout
✅ Products disappear after logout
```

---

**Follow these steps EXACTLY and it will work! 💯**
