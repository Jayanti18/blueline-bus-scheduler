// We need to be able to access the Service 
//that we just created so let's pull that in

var BusService = require('../services/bus.service.js');

// Make sure to save the context of 
//this module inside the _this variable

// _this = this

exports.getBuses = async function (req, res, next) {

    // We're going to use ternary to check 
    //the existence of the query parameters

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var buses = await BusService.getBus({}, page, limit)

        // Return the buses list with the appropriate 
        //HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: buses, message: "Succesfully Buses Recieved" });

    } catch (e) {

        //Return an Error Response Message 
        //with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

// Lets create Bus-Secheduler
exports.createBus = async function(req, res, next){

    // Note: Req.Body contains the form submit values.

    var bus = {
        busNum: req.body.busNum,
        busName: req.body.busName,
        destination: req.body.destination,
        frequency: req.body.frequency,
        date: req.body.date,
        status: req.body.status
    }

    try{
        
// Calling the Service function 
//with the new object from the Request Body
    
        var createdBus = await BusService.createBus(bus)
        return res.status(201).json({status: 201, data: createdBus, message: "Succesfully Created Bus-Scheduler"})
    }catch(e){
        
//Return an Error Response Message 
//with Code and the Error Message.
        
return res.status(400).json({status: 400, message: "Bus-Scheduler Creation was Unsuccesfull, I am sorry :( "})
    }
}

// Update Bus
exports.updateBus = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var bus = {
        id,
        busNum: req.body.busNum ? req.body.busNum : null,
        busName: req.body.busName ? req.body.busName : null,
        destination: req.body.destination ? req.body.destination : null,
        frequency: req.body.frequency ? req.body.frequency : null,
        date: req.body.date ? req.body.date : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedBus = await BusService.updateBus(bus)
        return res.status(200).json({status: 200, data: updatedBus, message: "Succesfully Updated Bus"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

// remove Bus scheduler
exports.removeBus = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await BusService.deleteBus(id)
        return res.status(204).json({status:204, message: "Succesfully Bus-Scheduler Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

