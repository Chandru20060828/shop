# 📌 REFERENCE CARD - Keep This Handy!

## 🚀 3 Terminal Commands

### Terminal 1 - MongoDB
```
mongod
```
✅ Keep running. Shows: `waiting for connections on port 27017`

### Terminal 2 - Server
```
node server.js
```
✅ Keep running. Shows: `MongoDB connected` and `Server running on port 3000`

### Terminal 3 - Setup
```
npm install
node seed.js
```
✅ Run once. Shows: `8 beautiful dress products added successfully!`

---

## 🌐 Browser
```
http://localhost:3000
```

---

## 🧪 Test Steps

1. **Register**
   - Click "Register"
   - Fill: Username, Email, Password
   - See success message

2. **Login**
   - Click "Login"
   - Use same email & password
   - See success message

3. **Products**
   - See 8 dresses with prices
   - Click "Add to Cart"

4. **Cart**
   - Click "Cart" button
   - Manage products

5. **Logout**
   - Click "Logout" button
   - Products disappear

---

## ❌ If Error: "Invalid credentials"
- Make sure you registered FIRST
- Use SAME email/password from registration
- Check MongoDB is running
- Check server is running

---

## ❌ If Error: "Cannot find module"
- Run: `npm install`
- Then: `node server.js`

---

## ❌ If Error: "Port 3000 already in use"
- Edit `.env` file
- Change: `PORT=3001`
- Restart server

---

## 📊 Expected Results

| Step | Result |
|------|--------|
| Home page | Beautiful design, no products |
| Register | Success message |
| Login | Success message + products appear |
| Add to Cart | Confirmation message |
| Cart | Items displayed |
| Logout | Logout message + products hidden |

---

## 📁 Important Files

- **routes/users.js** - Login/Register backend
- **public/index.html** - Home page
- **public/script.js** - Product visibility
- **seed.js** - Database seeding

---

## 📚 Documentation

| File | Use |
|------|-----|
| `00_START_HERE.md` | Overview |
| `FIX_LOGIN_REGISTER.md` | Setup steps |
| `TROUBLESHOOTING.md` | Fix problems |
| `QUICK_REFERENCE.md` | Commands |

---

**Start with: FIX_LOGIN_REGISTER.md** 🚀

Everything is fixed and ready! 👗✨
