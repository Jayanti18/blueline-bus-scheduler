var express = require('express')

var router = express.Router()

// Getting the Bus-scheduler Controller that we just created

var BusController = require('../../controllers/bus.controller.js');


// Map each API to the Controller FUnctions

router.get('/', BusController.getBuses)

router.post('/',BusController.createBus)

router.put('/',BusController.updateBus)

router.delete('/:id',BusController.removeBus)


// Export the Router

module.exports = router;