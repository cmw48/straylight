/**
 var roleUpgrader = {


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
            if (Game.getObjectById('5982ff24b097071b4adc2278').energy = 0) {
              // go get filled up at container instead
              var containersWithEnergy = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
                 filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
                 });
                 console.log('nerp' + containersWithEnergy);
                 //for(var id in containersWithEnergy) {
                 for(var id in containers) {
                    var thisContainer = containers[id];
                    console.log('yerp' + thisContainer.pos + ' ' + thisContainer.store[RESOURCE_ENERGY]);
                    if(thisContainer.store[RESOURCE_ENERGY] < 0) {
                        // if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        //      creep.moveTo(storage);
                        if(creep.withdraw(thisContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(thisContainer.pos);
                        }
                    } else {
                        //creep.moveTo(26,9);
                        creep.moveTo(Game.flags.Flag2);
                    }
                 }
              if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
              }
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
