import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    unit: {
      type: String,
      enum: ["cm", "inch"],
      default: "cm",
    },
    measurements: {
      shoulderToShoulderLength: { type: Number, min: 0 },
      highBustCircle: { type: Number, min: 0 },
      bustCircle: { type: Number, min: 0 },
      bustTipsLength: { type: Number, min: 0 },
      shoulderToBicepsLength: { type: Number, min: 0 },
      shoulderToElbowLength: { type: Number, min: 0 },
      shoulderToWristLength: { type: Number, min: 0 },
      wristCircle: { type: Number, min: 0 },
      neckCircle: { type: Number, min: 0 },
      bicepsCircle: { type: Number, min: 0 },
      shoulderArmpitCircle: { type: Number, min: 0 },
      hipCircle: { type: Number, min: 0 },
      waistCircle: { type: Number, min: 0 },
      neckToShoulderLength: { type: Number, min: 0 },
      neckToBustLength: { type: Number, min: 0 },
      neckToBustToWaistLength: { type: Number, min: 0 },
      centerBackLength: { type: Number, min: 0 },
      crossBackLength: { type: Number, min: 0 },
      riseLength: { type: Number, min: 0 },
      ankleCircle: { type: Number, min: 0 },
      waistToAnkleLength: { type: Number, min: 0 },
      thighCircle: { type: Number, min: 0 },
      inseamLength: { type: Number, min: 0 },
      outseamLength: { type: Number, min: 0 },
      elbowCircle: { type: Number, min: 0 },
      kneeCircle: { type: Number, min: 0 },
      waistToKneeLength: { type: Number, min: 0 },
      calfCircle: { type: Number, min: 0 },
      headCircle: { type: Number, min: 0 },
      heightLength: { type: Number, min: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("Measurement", measurementSchema);
export default Model;
