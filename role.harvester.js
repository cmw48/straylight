var roleHarvester = {

    run: function(creep) {

	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }

        } else {
            var containers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            for(var id in containers) {
                var thisContainer = containers[id];
                console.log(thisContainer.pos + ' ' + thisContainer.energyCapacity);
                if(thisContainer.energy < thisContainer.energyCapacity) {
                    if(creep.transfer(thisContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(thisContainer.pos);
                     }
                }
            }

        }
    }
};

module.exports = roleHarvester;
/**

        var containers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
           filter: { structureType: STRUCTURE_CONTAINER }
        });

        for(var id in containers) {
          var thisContainer = containers[id];
          if(thisContainer.energy < thisContainer.energyCapacity) {
            if(creep.transfer('5a51c5cf7fe51a30f2436b64', RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.moveTo(30, 10);
            }
          }
	    }
    }
    }
};
    /**
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
        var containers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
           filter: { structureType: STRUCTURE_CONTAINER }
        });

        for(var id in containers) {
          var thisContainer = containers[id];
          if(thisContainer.energy < thisContainer.energyCapacity) {
            if(creep.transfer(thisContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
               creep.moveTo(30, 10);
            }
          }
	    }
    }
   }
};
**/
