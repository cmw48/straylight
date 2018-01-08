/**
 var roleUpgrader = {

    // @param {Creep} creep
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}

};

module.exports = roleUpgrader;
**/
var roleUpgrader = {

    run: function(creep) {
        // is your tank full right now?
        var tanklatch = '';
        var tank = ((creep.carry.energy)/(creep.carryCapacity));

        if (tank == 1) {
            tanklatch = 'full';
        } else if ( tank > 0 && tank < 1) {
            tanklatch = 'not full';
        } else {
            tanklatch = 'empty';
        };

        //console.log(creep.carry.energy + ' / ' + creep.carryCapacity + ' = ' + tank )
        //console.log(creep.name + ' is ' + tanklatch + ': ' + tank*100 + ' percent.');
        //console.log(creep.name + ' is ' + tanklatch);

       if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
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

/**


        if (tank < 1 && tanklatch = ) {

            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);

        } else {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if(creep.carry.energy == 0) {
                tanklatch = 'empty';
            }

        }
**/


    }
};

module.exports = roleUpgrader;
