// src/models/User.js
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  totalPrice: Number,
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: String,
  cartItems: [CartItemSchema]
}, {
  timestamps: true,
  strict: true,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
