import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const antipastiSchema = new Schema(
  {
    name: { type: String, required: true },
    name_english: { type: String },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const contorniSchema = new Schema(
  {
    name: { type: String, required: true },
    name_english: { type: String },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const letempureSchema = new Schema(
  {
    name: { type: String, required: true },
    name_english: { type: String },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const secondiSchema = new Schema(
  {
    name: { type: String, required: true },
    name_english: { type: String },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const dessertsSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const gourmetPizzaSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    ingredients: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const pizzasSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    ingredients: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const cantinaSchema = new Schema(
  {
    subtitle: { type: String, required: true },
    types: [
      {
        name: { type: String },
        bottiglia: { type: String },
        Calice: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const biancheSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    ingredients: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const Antipasti =
  mongoose.models.Antipasti || mongoose.model("Antipasti", antipastiSchema);
export const Contorni =
  mongoose.models.Contorni || mongoose.model("Contorni", contorniSchema);
export const Letempure =
  mongoose.models.Letempure || mongoose.model("Letempure", letempureSchema);
export const Secondi =
  mongoose.models.Secondi || mongoose.model("Secondi", secondiSchema);
export const Desserts =
  mongoose.models.Desserts || mongoose.model("Desserts", dessertsSchema);
export const GourmetPizza =
  mongoose.models.GourmetPizza ||
  mongoose.model("GourmetPizza", gourmetPizzaSchema);
export const Pizzas =
  mongoose.models.Pizzas || mongoose.model("Pizzas", pizzasSchema);
export const Cantina =
  mongoose.models.Cantina || mongoose.model("Cantina", cantinaSchema);
export const Bianche =
  mongoose.models.Bianche || mongoose.model("Bianche", biancheSchema);
