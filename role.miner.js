var roleMiner     = {

    /** @param {Creep} creep **/
    run: function(creep) {
                    // creep.memory.seeking = true;
  //creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo('E19N37)));
 /**
     if (!creep.memory.staged) {
         if (creep.pos != [room 'E19N38' pos '37,48''] )  {
              Game.creeps['seamus5535071'].moveTo(17,30);
         } else {
             creep.memory.staged;
         }
    } else {

  **/
     var posInAnotherRoom = new RoomPosition(34, 10, 'E19N37');
       creep.moveTo(posInAnotherRoom);
     //creep.moveTo(new RoomPosition(creep.memory.destx, creep.memory.desty, creep.memory.destroom));
     if(creep.memory.seeking) {
         console.log(creep.pos);
         console.log(creep.pos.roomName)
         if (creep.pos.roomName != 'E19N37') {
             creep.memory.seeking = true;
             creep.say('seeking...');

             ///creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo('E19N37)));
             //creep.moveTo(new RoomPosition(34,10,'E19N37'));
             //creep.moveTo(new RoomPosition(creep.memory.destx, creep.memory.desty, creep.memory.destroom));
         } else {
           creep.memory.seeking = false;
           creep.memory.upgrading = true;
           console.log('you made it!')
           creep.moveTo(new RoomPosition(34,10,'E19N37'));
         };
     } else {

       if(creep.memory.upgrading && creep.carry.energy == 0) {
           creep.memory.upgrading = false;
           creep.say('harvest');
     }
     if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
         creep.memory.upgrading = true;
         creep.say('upgrade');
     }

     if(creep.memory.upgrading) {
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

    //}
	}

    }
};

module.exports = roleMiner;
