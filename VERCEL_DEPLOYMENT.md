# 🚀 Vercel Deployment Guide for Green Givers Nursery
**Domain: greengiversnursery.in**

## 📋 Frontend Deployment (Vercel)

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   vercel --prod
   ```

4. **Configure custom domain:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add: `greengiversnursery.in`
   - Add: `www.greengiversnursery.in` (redirect to main)

### Method 2: Vercel Dashboard

1. **Upload build folder:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Upload the `build` folder (created by npm run build)

2. **Or connect GitHub:**
   - Connect your GitHub repository
   - Vercel will auto-detect React app
   - Set build command: `npm run build`
   - Set output directory: `build`

## 🔧 Environment Variables in Vercel

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

```
REACT_APP_API_URL = https://api.greengiversnursery.in
REACT_APP_DOMAIN = https://greengiversnursery.in
REACT_APP_NODE_ENV = production
GENERATE_SOURCEMAP = false
```

## 🖥️ Backend Deployment (VPS with Docker)

### Prerequisites
- VPS server (DigitalOcean, Linode, AWS EC2, etc.)
- Docker and Docker Compose installed
- Domain `api.greengiversnursery.in` pointing to your VPS IP

### Deployment Steps

1. **Upload backend folder to your VPS:**
   ```bash
   scp -r backend/ user@your-server-ip:/home/user/green-givers-backend/
   ```

2. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   cd /home/user/green-givers-backend
   ```

3. **Update environment variables:**
   ```bash
   cp .env.production .env
   nano .env  # Update with your production values
   ```

4. **Run with Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Configure Nginx reverse proxy:**
   ```nginx
   # /etc/nginx/sites-available/api.greengiversnursery.in
   server {
       listen 80;
       server_name api.greengiversnursery.in;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable site and restart Nginx:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.greengiversnursery.in /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Install SSL certificate:**
   ```bash
   sudo certbot --nginx -d api.greengiversnursery.in
   ```

## 🌐 DNS Configuration

### For your domain registrar:

**A Records:**
- `greengiversnursery.in` → Vercel IP (auto-configured when you add domain)
- `api.greengiversnursery.in` → Your VPS IP address

**CNAME Records:**
- `www.greengiversnursery.in` → `greengiversnursery.in`

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads: https://greengiversnursery.in
- [ ] API health check: https://api.greengiversnursery.in/api/health
- [ ] Email functionality works
- [ ] Image uploads work
- [ ] Plant data loads correctly
- [ ] Purchase inquiries work
- [ ] SSL certificates are valid

## 🔧 Troubleshooting

### Common Issues:

1. **CORS errors:**
   - Ensure backend .env has correct FRONTEND_URL
   - Check CORS_ORIGINS includes your domain

2. **API not accessible:**
   - Verify DNS propagation
   - Check firewall rules (port 5000)
   - Ensure Docker container is running

3. **Images not loading:**
   - Check image upload directory permissions
   - Verify GridFS connection

## 📞 Quick Commands

**Check backend status:**
```bash
docker-compose ps
docker-compose logs -f
```

**Restart backend:**
```bash
docker-compose restart
```

**Update backend:**
```bash
git pull
docker-compose build
docker-compose up -d
```

## 🎉 You're Ready!

Your Green Givers Nursery will be live at:
- **Frontend:** https://greengiversnursery.in
- **Backend:** https://api.greengiversnursery.in

Happy deploying! 🌱
