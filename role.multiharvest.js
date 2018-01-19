var roleMultiharvest     = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            if (Game.spawns['Straylight'].memory.wartime) {
                var tower = Game.getObjectById('5a5063e77eb2135e2c99df24');
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                }

            } else {
                if (Game.spawns['Straylight'].memory.rebuild) {
                 var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                } else {
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                    });
                }
                if(targets.length > 0) {

                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                       creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    creep.moveTo(Game.flags.Flag1);
                }

            }



        }
	}

};

module.exports = roleMultiharvest;
