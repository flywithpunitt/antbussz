const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { protect } = require('./middleware/auth');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://mail:s86niRqhQgFjZIgZ@cluster0.gantx4j.mongodb.net/antbus?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please check your internet connection and MongoDB Atlas cluster status');
});

// Operator Schema
const operatorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    emails: [{
        email: { type: String, required: true },
        alternate: String
    }],
    phoneNumbers: [{
        primary: { type: String, required: true },
        alternate: String
    }],
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    officeLocation: String,
    buses: [{
        busType: { type: String, required: true },
        busModel: { type: String, required: true }
    }],
    hasGSTIN: { type: String, enum: ['yes', 'no'], required: true },
    gstinNumber: String,
    gstinFile: String,
    aadharCards: [String],
    panCards: [String],
    addressProof: String,
    accountNumber: String,
    ifscCode: String,
    cancelCheque: String,
    photo1: String,
    photo2: String,
    digitalSignature: String,
    officePhotos: [String],
    createdAt: { type: Date, default: Date.now }
});

const Operator = mongoose.model('Operator', operatorSchema);

// Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.get('/api/operators', protect, async (req, res) => {
    try {
        const operators = await Operator.find();
        res.json(operators);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/operators/:id', protect, async (req, res) => {
    try {
        const operator = await Operator.findById(req.params.id);
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.json(operator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/operators', protect, async (req, res) => {
    try {
        const operator = new Operator(req.body);
        await operator.save();
        res.status(201).json(operator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/operators/:id', protect, async (req, res) => {
    try {
        const operator = await Operator.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.json(operator);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 