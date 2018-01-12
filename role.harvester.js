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


            var containersWithEnergy = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
             filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
            });
            console.log('derp' + containersWithEnergy);
            //for(var id in containersWithEnergy) {
            for(var id in containers) {
                var thisContainer = containers[id];
                console.log('yarp' + thisContainer.pos + ' ' + thisContainer.store[RESOURCE_ENERGY]);
                if(thisContainer.store[RESOURCE_ENERGY] < thisContainer.storeCapacity) {
                    // if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //      creep.moveTo(storage);
                    if(creep.transfer(thisContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(thisContainer.pos);
                    }
                } else {
                    //creep.moveTo(26,9);
                    creep.moveTo(Game.flags.Flag2);
                }
            }
            //creep.moveTo(Game.flags.Flag2);
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
