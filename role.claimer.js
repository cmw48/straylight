var roleClaimer = {


    run: function(creep) {
     //haul ass to new room
     //if creep pos is not destination
     //then move to destination
     //else arrived
     // find controller pos
     // find nearest source to controller
     // set memory prefsource
     // get loaded
     // claim / reserve
     // repeat
     /**
     if(creep.memory.seeking) {
         if(creep.pos !=  RoomPosition(creep.memory.destx, creep.memory.desty, creep.memory.destroom )) {
             creep.memory.seeking = true;
             creep.say('seeking...');
             creep.moveTo(new RoomPosition(creep.memory.destx, creep.memory.desty, creep.memory.destroom));
         } else {
             creep.memory.seeking = false;
             creep.say('arrived...');
         };
     } else {
**/



     if(creep.memory.seeking && creep.carry.energy == 0) {
           creep.memory.seeking = false;
           creep.say('harvest');
     }
     if(!creep.memory.seeking && creep.carry.energy == creep.carryCapacity) {
         creep.memory.seeking = true;
         creep.say('upgrade');
     }

     if(creep.memory.seeking) {
           if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
               creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleClaimer;
/**
    // if a creep has expired, remove its memory entries
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


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




//creep.moveTo(new RoomPosition(44, 42, 'E19N35'));
**/
