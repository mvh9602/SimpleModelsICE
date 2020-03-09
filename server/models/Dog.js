const mongoose = require('mongoose');

let DogModel = {};

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DogSchema.statics.findDogByName = (name, callback) => {
  return DogModel.findOne({name}, callback);
};

DogModel = mongoose.model('Dog', DogSchema);

module.exports = {
  DogModel,
  DogSchema
}





