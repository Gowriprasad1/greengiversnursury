# Green Givers Nursery - Production Deployment Guide
**Domain: greengiversnursery.in**

## 🚀 Quick Deployment Summary

Your Green Givers Nursery application is now ready for production deployment with the domain `greengiversnursery.in`. All necessary configuration files and environment variables have been set up.

## 📁 Files Created for Production

### Environment Configuration
- `.env.production` - Frontend production environment
- `backend/.env.production` - Backend production environment
- `src/config/api.js` - Centralized API configuration

### Deployment Configuration
- `netlify.toml` - Netlify deployment configuration
- `vercel.json` - Vercel deployment configuration
- `backend/Dockerfile` - Docker container configuration
- `backend/docker-compose.yml` - Docker Compose setup
- `deploy.sh` - Automated deployment script

## 🌐 Domain Configuration

**Frontend:** https://greengiversnursery.in
**Backend API:** https://api.greengiversnursery.in

## 🔧 Environment Variables Updated

### Frontend (.env.production)
```
REACT_APP_API_URL=https://api.greengiversnursery.in
REACT_APP_DOMAIN=https://greengiversnursery.in
REACT_APP_NODE_ENV=production
```

### Backend (backend/.env.production)
```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://greengiversnursery.in
API_URL=https://api.greengiversnursery.in
MONGODB_URI=mongodb+srv://gowrigembali944:Gowri123@cluster0.18xjwxd.mongodb.net/greengiversnursery
```

## 🚀 Deployment Options

### Option 1: Netlify + Railway/Render
1. **Frontend (Netlify):**
   - Connect GitHub repository
   - Set custom domain: greengiversnursery.in
   - Auto-deploy from main branch

2. **Backend (Railway/Render):**
   - Connect GitHub repository
   - Set subdomain: api.greengiversnursery.in
   - Add environment variables from backend/.env.production

### Option 2: Vercel + VPS
1. **Frontend (Vercel):**
   - Upload build folder or connect GitHub
   - Configure custom domain
   
2. **Backend (VPS):**
   - Use Docker deployment with provided files
   - Configure nginx reverse proxy

## 📋 Pre-Deployment Checklist

- [x] Environment variables configured
- [x] API endpoints updated to use environment variables
- [x] CORS configured for production domains
- [x] Security headers implemented
- [x] Rate limiting configured
- [x] Docker files created
- [x] Deployment scripts ready

## 🔄 Deployment Steps

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Deploy Frontend:**
   - Upload to Netlify/Vercel
   - Configure domain: greengiversnursery.in

3. **Deploy Backend:**
   - Upload to Railway/Render/VPS
   - Configure subdomain: api.greengiversnursery.in

4. **DNS Configuration:**
   - Point greengiversnursery.in to frontend
   - Point api.greengiversnursery.in to backend

## 🔐 Security Features Implemented

- Helmet.js security headers
- CORS protection
- Rate limiting
- Environment-based configuration
- Input validation
- File upload restrictions

## 📊 Performance Optimizations

- Static asset caching
- Image optimization
- Gzip compression
- CDN-ready configuration
- Lazy loading implemented

## 🧪 Testing Production Build

```bash
# Test frontend build
npm run build
npx serve -s build

# Test backend
cd backend
NODE_ENV=production node server.js
```

## 📞 Support

Your application is now production-ready with:
- ✅ Professional domain configuration
- ✅ Scalable backend architecture
- ✅ Secure environment setup
- ✅ Multiple deployment options
- ✅ Comprehensive documentation

Ready to deploy to **greengiversnursery.in**! 🌱
