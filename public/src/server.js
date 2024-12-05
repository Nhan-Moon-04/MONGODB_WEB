const express = require('express');
const connectDB = require('./db');
const Product = require('./models/Product');
const Category = require('./models/Category');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.static('public'));

// API endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Category removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});