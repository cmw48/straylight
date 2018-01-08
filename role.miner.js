var roleMiner = {

    run: function(creep) {
	    if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {
            creep.upgradeController(creep.room.controller);
            creep.harvest;
            creep.transfer;
            creep.harvest;
            creep.transfer;
            creep.harvest;

            }

	}
};
