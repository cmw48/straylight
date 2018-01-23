var roleBuilder = {

    run: function(creep) {
       if (creep.name == 'Builder5562494' || creep.name == 'Builder5562165' ) {
          var posInAnotherRoom = new RoomPosition(34, 10, 'E19N37');
          creep.moveTo(posInAnotherRoom);
        }  else {


	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	        // you should be building something
	        //console.log('creep ' + creep.name + ' should be building')
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if (creep.memory.preferredTarget == 'last') {
                    console.log(creep.name  +' should build ' + targets[targets.length-1])
                    nexttarget = targets.length-1;
                } else {
                   console.log(creep.name + ' should build ' + targets[0])
                    nexttarget = 0;
                }
                if(creep.build(targets[nexttarget]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[nexttarget], {visualizePathStyle: {stroke: '#ffffff'}});
                } else {
                    console.log( 'Error ' + creep.build(targets[nexttarget]))
                }
            } else {
                console.log('There are no build targets.');
                creep.moveTo(Game.flags.Flag1);
            }
	    } else {
	        // you should be getting some energy

	        var task = creep.harvest(activesource);
	        var preferredSource = creep.memory.preferredSource;
            if (preferredSource) {
                console.log(creep.name + ' prefers energy from ' +  creep.memory.preferredSource)
                activesource = Game.getObjectById(creep.memory.preferredSource);
                if (activesource.structureType == 'storage') {
                  task = creep.withdraw(activesource, RESOURCE_ENERGY);
                } else {
                  task = creep.harvest(activesource);
                }
            } else {
                // go to source and get energy
                // var sources = creep.room.find(FIND_SOURCES);
                //var activesource = sources[0]

            var activesource = creep.pos.findClosestByPath(FIND_SOURCES);

            };
            /**
            const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);
            if(droppedEnergy) {
                task = (creep.pickup(droppedEnergy));
                if(task == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(activesource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.moveTo(droppedEnergy);
                    console.log('creep ' + creep.name + ' should be loading at' + activesource)
                } else {
                    console.log('pickup error ' + task)
                    creep.moveTo(35,46);
                }
	        }
	       **/

                if(task == ERR_NOT_IN_RANGE) {
                    creep.moveTo(activesource, {visualizePathStyle: {stroke: '#ffaa00'}});
                    console.log('creep ' + creep.name + ' should be loading at' + activesource)
                } else {
                    console.log('build error ' + task)
                }
	       }
        }
	}
};

module.exports = roleBuilder;
