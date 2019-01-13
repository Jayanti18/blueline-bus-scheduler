var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var BusSchema = new mongoose.Schema({
    busNum: String,
    busName: String,
    destination: String,
    frequency: Number,
    date: Date,
    status: String
})

BusSchema.plugin(mongoosePaginate)
const Bus = mongoose.model('Bus', BusSchema)

module.exports = Bus;