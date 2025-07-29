#!/bin/bash

# Green Givers Nursery - Production Deployment Script
# Domain: greengiversnursery.in

echo "🌱 Green Givers Nursery - Production Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Install dependencies
print_status "Installing frontend dependencies..."
npm install

print_status "Installing backend dependencies..."
cd backend
npm install
cd ..

# Step 2: Build frontend for production
print_status "Building frontend for production..."
npm run build

if [ $? -eq 0 ]; then
    print_status "Frontend build completed successfully!"
else
    print_error "Frontend build failed!"
    exit 1
fi

# Step 3: Test backend
print_status "Testing backend configuration..."
cd backend
node -e "
const fs = require('fs');
const path = require('path');

// Check if production env file exists
if (!fs.existsSync('.env.production')) {
    console.log('❌ .env.production file not found in backend directory');
    process.exit(1);
}

// Check if required environment variables are set
const envContent = fs.readFileSync('.env.production', 'utf8');
const requiredVars = ['MONGODB_URI', 'EMAIL_USER', 'EMAIL_PASS', 'NODE_ENV'];
const missingVars = requiredVars.filter(varName => !envContent.includes(varName));

if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:', missingVars.join(', '));
    process.exit(1);
}

console.log('✅ Backend configuration looks good!');
"

if [ $? -ne 0 ]; then
    print_error "Backend configuration check failed!"
    exit 1
fi

cd ..

# Step 4: Create deployment package
print_status "Creating deployment package..."
mkdir -p dist

# Copy frontend build
cp -r build dist/frontend

# Copy backend files
mkdir -p dist/backend
cp -r backend/* dist/backend/
cp -r backend/.env.production dist/backend/

# Step 5: Generate deployment instructions
print_status "Generating deployment instructions..."

cat > dist/DEPLOYMENT_INSTRUCTIONS.md << EOF
# Green Givers Nursery - Deployment Instructions
Domain: greengiversnursery.in

## Frontend Deployment (Netlify/Vercel)

### Option 1: Netlify
1. Upload the \`frontend\` folder to Netlify
2. Set custom domain: greengiversnursery.in
3. Configure environment variables in Netlify dashboard:
   - REACT_APP_API_URL=https://api.greengiversnursery.in
   - REACT_APP_DOMAIN=https://greengiversnursery.in
   - REACT_APP_NODE_ENV=production

### Option 2: Vercel
1. Upload the \`frontend\` folder to Vercel
2. Set custom domain: greengiversnursery.in
3. Environment variables are configured in vercel.json

## Backend Deployment

### Option 1: VPS/Cloud Server
1. Upload the \`backend\` folder to your server
2. Install Node.js 18+
3. Run: \`npm install --production\`
4. Copy \`.env.production\` to \`.env\`
5. Update environment variables with your production values
6. Run: \`node server.js\`
7. Configure reverse proxy (nginx) for api.greengiversnursery.in

### Option 2: Docker Deployment
1. Upload the \`backend\` folder to your server
2. Run: \`docker-compose up -d\`
3. Configure reverse proxy for api.greengiversnursery.in

### Option 3: Railway/Render/Heroku
1. Connect your GitHub repository
2. Set environment variables from \`.env.production\`
3. Deploy backend to subdomain: api.greengiversnursery.in

## DNS Configuration
1. Point greengiversnursery.in to your frontend hosting (Netlify/Vercel)
2. Point api.greengiversnursery.in to your backend server
3. Add SSL certificates for both domains

## Environment Variables to Update
- MONGODB_URI: Your production MongoDB connection string
- EMAIL_USER: Your production email address
- EMAIL_PASS: Your production email app password
- JWT_SECRET: Generate a secure random string
- SESSION_SECRET: Generate a secure random string

## Post-Deployment Checklist
- [ ] Frontend loads at https://greengiversnursery.in
- [ ] API responds at https://api.greengiversnursery.in/api/health
- [ ] Email functionality works
- [ ] Image uploads work
- [ ] Database connection is stable
- [ ] SSL certificates are valid
- [ ] CORS is properly configured

EOF

print_status "Deployment package created in 'dist' folder!"
print_warning "Please read DEPLOYMENT_INSTRUCTIONS.md for next steps."

echo ""
echo "🎉 Deployment preparation completed!"
echo "📁 Files ready in: ./dist/"
echo "📖 Instructions: ./dist/DEPLOYMENT_INSTRUCTIONS.md"
echo ""
echo "Next steps:"
echo "1. Upload frontend to Netlify/Vercel"
echo "2. Deploy backend to your server"
echo "3. Configure DNS for greengiversnursery.in"
echo "4. Update environment variables"
echo "5. Test the production deployment"
