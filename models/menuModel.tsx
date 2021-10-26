import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MenuSchema = new Schema(
  {
    Antipasti: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
      },
    ],
    Contorni: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
      },
    ],
    LETEMPURE: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
      },
    ],
    Secondi: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
      },
    ],
    desserts: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
      },
    ],
    gourmetpizza: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
        ingredients: { type: [String] },
      },
    ],
    pizzas: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
        ingredients: { type: [String] },
      },
    ],
    cantina: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
        ingredients: { type: [String] },
      },
    ],
    bianche: [
      {
        name: { type: String, required: true },
        name_english: { type: String },
        price: { type: String, required: true },
        ingredients: { type: [String] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.models.Menu || mongoose.model("Menu", MenuSchema);

export default Menu;
