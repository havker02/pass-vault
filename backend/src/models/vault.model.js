import mongoose from "mongoose"

const vaultSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true })

export const Vault = mongoose.model("Vault", vaultSchema)