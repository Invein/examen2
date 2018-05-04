const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = Schema({
  model: String,
  description: String,
  status: String,
  color: String  
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Car', schema);
