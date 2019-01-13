var express = require('express')

var router = express.Router()
var buses = require('./api/buses.route')


router.use('/buses', buses);


module.exports = router;