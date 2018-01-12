var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

     if(creep.room.controller) {
         if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
             creep.moveTo(creep.room.controller);
         }
     }


	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};


creep.moveTo(new RoomPosition(32, 42, 'E19N35'));

creep.moveTo(new RoomPosition(44, 42, 'E19N35'));
module.exports = roleBuilder;
