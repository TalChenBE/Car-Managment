require('console-stamp')(console, {
  format: ':date(yyyy/mm/dd HH:MM:ss.l) :label',
});
const dbs = require('../database/mongodb');
const { ObjectId } = require('mongodb');

const name = '_id';

const getAllTreatments = async (req, res) => {
  const allTreatments = await dbs.treatmentsCollection.find();
  const treatments = [];
  const treatmentsIterator = (doc) => {
    const { [name]: removedProperty, ...treatment } = doc;
    treatments.push(treatment);
  };
  await allTreatments.forEach(treatmentsIterator);

  return res.status(200).json({
    success: true,
    message: 'All treatments data has been fetched',
    data: treatments,
  });
};

const editTreatment = async (req, res) => {
  const treatment = req.body;
  const treatmentNumber = req.query['treatmentNumber'];

  if (!treatment || !treatmentNumber) {
    return res.status(404).json({
      success: false,
      message: 'You must provide a treatment',
    });
  }

  const isExist = await dbs.treatmentsCollection.findOne({
    Treatment_Number: ObjectId(treatmentNumber),
  });

  if (!isExist) {
    return res.status(404).json({
      success: false,
      message: `Treatment doesn't exist`,
    });
  }

  dbs.treatmentsCollection
    .updateOne({ _id: ObjectId(treatmentNumber) }, { $set: treatment })
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: `A new treatment with id ${treatmentNumber} has been successfully updated`,
      });
    })
    .catch((e) => {
      return res.status(200).json({
        success: false,
        message: `Couldn't update treatment id ${treatmentNumber}`,
      });
    });
};

const deleteTreatment = async (req, res) => {
  const treatmentNumber = req.query['treatmentNumber'];

  const isExist = await dbs.treatmentsCollection.findOne({
    Treatment_Number: ObjectId(treatmentNumber),
  });

  if (!isExist) {
    return res.status(404).json({
      success: false,
      message: `Treatment doesn't exist`,
    });
  }

  dbs.treatmentsCollection
    .deleteOne({ _id: ObjectId(treatmentNumber) })
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        success: true,
        message: `Successfully deleted treatment with id ${treatmentNumber}`,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(200).json({
        success: false,
        message: `Unsuccessful in deleting treatment with id ${treatmentNumber}`,
      });
    });
};

const addTreatment = async (req, res) => {
  const treatment = req.body;

  if (!treatment) {
    return res.status(404).json({
      success: false,
      message: 'You must provide a treatment',
    });
  }

  const isExist = await dbs.treatmentsCollection.findOne({
    Treatment_Information: treatment.Treatment_Information,
    Date: treatment.Date,
    Worker_email: treatment.Worker_email,
    Car_Number: treatment.Car_Number,
  });

  if (isExist) {
    return res.status(404).json({
      success: false,
      message: 'Treatment already exist',
    });
  }

  dbs.treatmentsCollection
    .insertOne(treatment)
    .then((result) => {
      console.log(result);
      dbs.treatmentsCollection.updateOne(
        { _id: result.insertedId },
        { $set: { Treatment_Number: result.insertedId } }
      );
      return res.status(201).json({
        success: true,
        message: 'A new treatment has been registered',
        result,
      });
    })
    .catch((e) => {
      return res.status(201).json({
        success: false,
        message: `Couldn't insert new treatment`,
        treatment: treatment,
        e,
      });
    });
};

module.exports = {
  getAllTreatments,
  editTreatment,
  addTreatment,
  deleteTreatment,
};
