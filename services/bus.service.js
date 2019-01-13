// Access our newly created Mongoose Model
var Bus = require('../models/bus.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getBuses = async function (query, page, limit) {

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }
    //Let's create a Try and Catch function 
    //that way we have some error handling set. 
    //Waiting for the promise

    try {
        var buses = await Bus.paginate(query, options)

        //Once the Mongoose promise is returned 
        //we're going to go ahead and return 
        //the To Do List it has produced 

        return buses;

    } catch (e) {

        //If the try didn't work we're going to 
        //go ahead and let the users know what kind of 
        //Error we have

        throw Error('Oh No! We got an error while Paginating our Bus, so sorry!')
    }
}
exports.createBus = async function(bus){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newBus = new Bus({
            busNum: bus.busNum,
            busName: bus.busName,
            destination: bus.destination,
            frequesncy: bus.frequesncy,
            date: new Date(),
            status: bus.status
        })
    
        try{
    
            // Let's go ahead and save the Bus-scheduler 
    
            var savedBus = await newBus.save()
    
            return savedBus;
        }catch(e){
          
            //if we can't create a Bus-schedular we want to throw an error 
    
            throw Error("Error while Creating Bus")
        }
    }

    exports.updateBus = async function(bus){
        var id = bus.id
    
        try{
            //Find the old Bus Object by the Id
        
            var oldBus = await Bus.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Bus")
        }
    
        // If no old Bus Object exists return false
    
        if(!oldBus){
            return false;
        }
    
        console.log(oldBus)
    
        //Edit the Bus Object
    
        oldBus.title = bus.title
        oldBus.description = bus.description
        oldBus.status = bus.status
    
    
        console.log(oldBus)
    
        try{
            var savedBus = await oldBus.save()
            return savedBus;
        }catch(e){
            throw Error("And Error occured while updating the Bus");
        }
    }
    // for deleting

    exports.deleteBus = async function(id){
    
        // Delete the Bus
    
        try{
            var deleted = await Bus.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Bus-Scheduler Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Bus-Seheduler")
        }
    }