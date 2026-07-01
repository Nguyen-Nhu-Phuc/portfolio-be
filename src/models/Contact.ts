import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  fullname: string;
  email: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  read: boolean;
  createdAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    fullname: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    projectType: { type: String, trim: true, maxlength: 120 },
    budget: { type: String, trim: true, maxlength: 120 },
    timeline: { type: String, trim: true, maxlength: 120 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>("Contact", contactSchema);
