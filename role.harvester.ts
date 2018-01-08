var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
      // start by filling up the spawn point
      var harvestlatch = true;
      // fill up the tank
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        } else {
            // if your tank is full, go empty it
            if (harvestlatch == false) {
                console.log('Spawn energy renewed.  Reassigning as upgraders.')
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
            } else {
                if(creep.transfer(Game.spawns['Straylight'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(Game.spawns['Straylight']);
                }
            }
            var rechargeRatio = (Game.spawns['Straylight'].energy)/(Game.spawns['Straylight'].energyCapacity);
            if ( rechargeRatio < 0.75 ) {

                console.log('Spawn energy dropping below 75 percent.  Reassigning Harvesters.')
                harvestlatch = true;
            } else {
              harvestlatch= false;
            }
      }

            } else {
              // harvester is latched on to spawn
              // continue harvesting until it reaches 100%, then go do something else
            }
        }
	}
};

module.exports = roleHarvester;
