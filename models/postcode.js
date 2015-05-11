var mongoose = require('mongoose');

var postcodeSchema = mongoose.Schema({
      '_id': mongoose.Schema.Types.ObjectId,
      'postcode': {type: String},
      'city': {type: String}
});

module.exports = mongoose.model('Postcode', postcodeSchema);