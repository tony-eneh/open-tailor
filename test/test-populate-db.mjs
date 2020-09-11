import Model from "../api/model.mjs";
import database from "../database.mjs";

const measurements = [
  {
    email: "ewo@gmail.com",
    gender: "male",
    measurements: {
      shoulderToShoulderLength: 32,
      highBustCircle: 20,
      bustCircle: 45,
      bustTipsLength: 30,
      shoulderToBicepsLength: 22,
      shoulderToElbowLength: 46,
      shoulderToWristLength: 50,
      wristCircle: 62,
      neckCircle: 30,
      bicepsCircle: 22,
      shoulderArmpitCircle: 10,
      hipCircle: 25,
      waistCircle: 14,
      neckToShoulderLength: 20,
      neckToBustLength: 8,
      neckToBustToWaistLength: 21,
      centerBackLength: 12,
      crossBackLength: 22,
      riseLength: 32,
      ankleCircle: 22,
      waistToAnkleLength: 1,
      thighCircle: null,
      inseamLength: null,
      outseamLength: null,
      elbowCircle: 0,
      kneeCircle: 2,
      waistToKneeLength: 2,
      calfCircle: 4,
      headCircle: 55,
      heightLength: 13,
    },
  },
  {
    email: "ezza@yahoo.com",
    gender: "female",
    measurements: {
      shoulderToShoulderLength: undefined,
      highBustCircle: 22,
      bustCircle: 0,
    },
  },
  {
    email: "hoh@kmail.com",
    gender: "female",
    measurements: {
      shoulderToShoulderLength: 22,
      highBustCircle: 32,
      bustCircle: 12,
      bustTipsLength: 10,
    },
  },
];

database.once("open", () => {
  console.log("successfully connected to the database");
  Model.insertMany(measurements, (err, result) => {
    if (err) console.error`error occured inserting demo data ${err}`;
    console.log`demo data inserted, ${result}`;
  });
});
