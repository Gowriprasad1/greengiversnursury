require('dotenv').config();

const Product = require('../models/Product');
const connectDB = require('../config/database');

// Sample products data
const sampleProducts = [
  {
    name: "Royal Palm Tree",
    category: "Avenue Trees",
    price: 2500,
    originalPrice: 3000,
    image: "/images/royal-palm.jpg",
    description: "Majestic royal palm tree perfect for landscaping and creating tropical ambiance in your garden.",
    features: ["Fast growing", "Drought resistant", "Low maintenance", "Tropical appearance"],
    inStock: true,
    stockQuantity: 15,
    badge: "Top Selling"
  },
  {
    name: "Neem Tree",
    category: "Avenue Trees",
    price: 800,
    originalPrice: 1000,
    image: "/images/neem-tree.jpg",
    description: "Traditional neem tree known for its medicinal properties and natural pest control benefits.",
    features: ["Medicinal properties", "Natural pest control", "Air purifying", "Hardy tree"],
    inStock: true,
    stockQuantity: 25,
    badge: "Top Trending"
  },
  {
    name: "Rose Plant",
    category: "Flower Plants",
    price: 150,
    originalPrice: 200,
    image: "/images/rose-plant.jpg",
    description: "Beautiful rose plant with fragrant blooms in various colors. Perfect for garden decoration.",
    features: ["Fragrant flowers", "Multiple colors", "Long blooming", "Easy care"],
    inStock: true,
    stockQuantity: 50,
    badge: "Top Trending"
  },
  {
    name: "Jasmine Plant",
    category: "Flower Plants",
    price: 120,
    originalPrice: 150,
    image: "/images/jasmine-plant.jpg",
    description: "Aromatic jasmine plant with white fragrant flowers. Ideal for gardens and balconies.",
    features: ["Highly fragrant", "Night blooming", "Compact size", "Easy to grow"],
    inStock: true,
    stockQuantity: 30,
    badge: ""
  },
  {
    name: "Mango Tree",
    category: "Fruit Plants",
    price: 1200,
    originalPrice: 1500,
    image: "/images/mango-tree.jpg",
    description: "Premium mango tree variety that produces sweet and juicy mangoes. Great for home gardens.",
    features: ["Sweet fruit", "High yield", "Disease resistant", "Fast growing"],
    inStock: true,
    stockQuantity: 20,
    badge: "Top Trending"
  },
  {
    name: "Lemon Tree",
    category: "Fruit Plants",
    price: 600,
    originalPrice: 750,
    image: "/images/lemon-tree.jpg",
    description: "Dwarf lemon tree perfect for containers. Produces fresh lemons year-round.",
    features: ["Container friendly", "Year-round fruit", "Compact size", "Easy maintenance"],
    inStock: true,
    stockQuantity: 35,
    badge: ""
  },
  {
    name: "Money Plant",
    category: "Indoor Plants",
    price: 80,
    originalPrice: 100,
    image: "/images/money-plant.jpg",
    description: "Popular indoor plant known for bringing good luck and prosperity. Very easy to maintain.",
    features: ["Air purifying", "Low light tolerant", "Easy propagation", "Lucky plant"],
    inStock: true,
    stockQuantity: 100,
    badge: "Top Trending"
  },
  {
    name: "Snake Plant",
    category: "Indoor Plants",
    price: 200,
    originalPrice: 250,
    image: "/images/snake-plant.jpg",
    description: "Hardy indoor plant with striking vertical leaves. Excellent air purifier and low maintenance.",
    features: ["Air purifying", "Low maintenance", "Drought tolerant", "Modern look"],
    inStock: true,
    stockQuantity: 40,
    badge: ""
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🗑️ Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('🌱 Seeding products...');
    const products = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Successfully seeded ${products.length} products`);
    
    // Display seeded products
    console.log('\n📋 Seeded Products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.category}) - ₹${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = { sampleProducts, seedDatabase };
