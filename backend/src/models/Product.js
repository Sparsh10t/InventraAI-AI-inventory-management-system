import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: true,
    },

    supplier: {
      type: String,
      default: "Unknown",
    },

    reorderThreshold: {
      type: Number,
      default: 10,
    },

    predictedDemand: {
      type: Number,
      default: 0,
    },

    salesHistory: [
      {
        date: Date,
        quantitySold: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);