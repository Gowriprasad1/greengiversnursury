# 🔧 Complete Vercel Environment Variables Configuration
**For: greengiversnursery.in**

## 📋 Add These in Vercel Dashboard → Settings → Environment Variables

### 🌐 **Frontend Environment Variables (REACT_APP_*)**
```
REACT_APP_API_URL = https://greengiversnursery.in
REACT_APP_DOMAIN = https://greengiversnursery.in
REACT_APP_NODE_ENV = production
GENERATE_SOURCEMAP = false
```

### 🔧 **Backend Environment Variables**
```
NODE_ENV = production
PORT = 3000
FRONTEND_URL = https://greengiversnursery.in
API_URL = https://greengiversnursery.in

MONGODB_URI = mongodb+srv://gowrigembali944:Gowri123@cluster0.18xjwxd.mongodb.net/greengiversnursery?retryWrites=true&w=majority

EMAIL_SERVICE = gmail
EMAIL_USER = gowrigembali944@gmail.com
EMAIL_PASS = txyx kyin jpmx ohck
ADMIN_EMAIL = gowrigembali944@gmail.com

JWT_SECRET = 2de9e49f3211a5ba2a1c7a5f5157ba0bc18f9874392f5bd9e3d75607b0ca5f16fd45d967cabaf07cf4e16181405fbbbaa62d9fd72508a0f2594aa94b1a0ae929
SESSION_SECRET = f63aaa6494e12aefa8dc8ba201345f451fdec9c15ca4eafadcd0fabfc1907537e234455d19ce0988ef13d60c873a1dd8f0fec1b8ee6d0bc55334531029a72a73

RATE_LIMIT_WINDOW_MS = 900000
RATE_LIMIT_MAX_REQUESTS = 100

MAX_FILE_SIZE = 5242880
ALLOWED_FILE_TYPES = image/jpeg,image/jpg,image/png,image/webp,image/gif

CORS_ORIGINS = https://greengiversnursery.in,https://www.greengiversnursery.in
```

## 📝 **How to Add in Vercel:**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add each variable one by one:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://gowrigembali944:Gowri123@cluster0.18xjwxd.mongodb.net/greengiversnursery?retryWrites=true&w=majority`
   - Environment: `Production` (select this)

5. **Repeat for all variables above**

## 🎯 **Important Notes:**

### ✅ **Frontend Variables (REACT_APP_*):**
- Must start with `REACT_APP_` to be accessible in React
- Will be embedded in the build (public)
- Safe to expose (no secrets)

### 🔐 **Backend Variables:**
- Server-side only (private)
- Not exposed to frontend
- Contains sensitive data (database, email, secrets)

### 🚀 **Single Domain Benefits:**
- Frontend: `https://greengiversnursery.in`
- Backend API: `https://greengiversnursery.in/api/*`
- No CORS issues
- Simplified configuration

## 🔄 **After Adding Variables:**
1. **Redeploy** your project (Vercel will auto-redeploy)
2. **Test** the deployed application
3. **Verify** API endpoints work

## ✅ **Complete Environment Setup:**
- ✅ All frontend variables configured
- ✅ All backend variables configured  
- ✅ Security keys included
- ✅ Database connection ready
- ✅ Email service configured
- ✅ Single domain setup

**Your Green Givers Nursery will have complete environment configuration!** 🌱
