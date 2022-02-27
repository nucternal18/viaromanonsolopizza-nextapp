import mongoose from "mongoose";

const PictureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Picture =
  mongoose.models.Picture || mongoose.model("Picture", PictureSchema);

export default Picture;
