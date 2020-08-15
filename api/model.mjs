import mongoose from "mongoose";

const schema = {
  email: { type: String, required: true },
  gender: { type: String, required: true },
  measurements: {
    shoulderToShoulderLength: { type: Number },
    highBustCircle: { type: Number },
    bustCircle: { type: Number },
    bustTipsLength: { type: Number },
    shoulderToBicepsLength: { type: Number },
    shoulderToElbowLength: { type: Number },
    shoulderToWristLength: { type: Number },
    wristCircle: { type: Number },
    neckCircle: { type: Number },
    bicepsCircle: { type: Number },
    shoulderArmpitCircle: { type: Number },
    hipCircle: { type: Number },
    waistCircle: { type: Number },
    neckToShoulderLength: { type: Number },
    neckToBustLength: { type: Number },
    neckToBustToWaistLength: { type: Number },
    centerBackLength: { type: Number },
    crossBackLength: { type: Number },
    riseLength: { type: Number },
    ankleCircle: { type: Number },
    waistToAnkleLength: { type: Number },
    thighCircle: { type: Number },
    inseamLength: { type: Number },
    outseamLength: { type: Number },
    elbowCircle: { type: Number },
    kneeCircle: { type: Number },
    waistToKneeLength: { type: Number },
    calfCircle: { type: Number },
    headCircle: { type: Number },
    heightLength: { type: Number },
  },
};

const Model = mongoose.model("Measurement", schema);
export default Model;
