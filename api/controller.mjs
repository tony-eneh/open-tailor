import Model from "./model.mjs";
import { measurements } from "../test/demo-data.mjs";

export const getMeasurement = (req, res) => {
  const { filter, skip, limit, sort, projection } = req.query;
  Model.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(projection)
    .exec()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        success: true,
        payload: result || [],
        message: "Operation Successful",
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        success: false,
        payload: [],
        message: err,
      });
    });
};

export const createMeasurement = (req, res) => {
  res.send("got your POST request");
};

export const updateMeasurement = (req, res) => {
  res.send("got your PUT request");
};

export const deleteMeasurement = (req, res) => {
  res.send("got your DELETE request");
};

export const insertDemoMeasurements = (req, res) => {
  Model.insertMany(measurements, (err, result) => {
    if (err) {
      console.error`error occured inserting demo data ${err}`;
      return res.send("Error inserting your demo data. Try again later");
    }
    console.log`demo data inserted, ${result}`;
    res.send("demo data successfully inserted into your db");
  });
};
