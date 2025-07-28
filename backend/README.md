# Green Givers Nursery Backend

A clean and modern Node.js backend API for the Green Givers Nursery application with MongoDB integration.

## 🚀 Features

- **Product Management**: Full CRUD operations for plant products
- **MongoDB Integration**: Mongoose ODM with proper schemas and validation
- **Email Service**: Contact form and purchase inquiry emails
- **RESTful API**: Clean and consistent API endpoints
- **Security**: Helmet, CORS, and rate limiting
- **Error Handling**: Comprehensive error handling and validation
- **Database Seeding**: Sample data for quick setup

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── productController.js # Product CRUD operations
├── models/
│   └── Product.js           # Product schema
├── routes/
│   ├── productRoutes.js     # Product API routes
│   └── emailRoutes.js       # Email API routes
├── scripts/
│   └── seedData.js          # Database seeding
├── .env                     # Environment variables
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## 🛠️ Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   - Copy `.env` file and update with your configurations
   - Set your MongoDB URI (local or Atlas)
   - Configure email credentials for Gmail

4. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

6. **Start the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/stats` - Get product statistics

### Email
- `POST /api/email/visit` - Send visit schedule email
- `POST /api/email/purchase` - Send purchase inquiry email

### Health
- `GET /api/health` - Health check endpoint
- `GET /` - API information

## 🗄️ Database Schema

### Product Model
```javascript
{
  name: String (required, max 100 chars)
  category: String (required, enum)
  price: Number (required, min 0)
  originalPrice: Number (optional, min 0)
  image: String (required)
  description: String (required, max 1000 chars)
  features: [String]
  inStock: Boolean (default: true)
  stockQuantity: Number (default: 0, min 0)
  badge: String (enum: 'Top Selling', 'Top Trending', '')
  isActive: Boolean (default: true)
  createdAt: Date
  updatedAt: Date
}
```

## 🔧 Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/green-givers-nursery

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Configuration
ADMIN_EMAIL=admin@greengivers.com
ADMIN_PASSWORD=admin123
```

## 🧪 Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3001/api/health

# Get all products
curl http://localhost:3001/api/products

# Create a product (POST request)
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Plant","category":"Indoor Plants","price":100,"description":"Test description","image":"/test.jpg"}'
```

## 🚀 Deployment

1. **Environment**: Set `NODE_ENV=production`
2. **Database**: Use MongoDB Atlas for production
3. **Security**: Update CORS origins for your domain
4. **Process Manager**: Use PM2 for production deployment

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request limiting
- **Input Validation**: Mongoose schema validation
- **Error Handling**: Secure error responses

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Update documentation
5. Test API endpoints

## 📞 Support

For support and questions, contact the Green Givers Nursery development team.
