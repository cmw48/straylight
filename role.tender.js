var roleTender = {

    run: function(creep) {

        if(creep.memory.working == 'dumping' && creep.carry.energy == 0) {
            creep.memory.working = 'loading';
            creep.say(creep.memory.working);
        }
        else if (creep.memory.working == 'loading' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = 'dumping';
            creep.say(creep.memory.working);
            var creepjuicebefore  = creep.carry.energy;
            console.log('at capacity -' + creepjuicebefore +'...');
        }

        if(creep.memory.working == 'loading') {
            // go to container and get energy
            var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                && s.store[RESOURCE_ENERGY] > 0
        })
            if(creep.withdraw(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } else {
                console.log('withdraw successful.');
            }
        } else {
            // go to tower and dump energy
            var TowerCount = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                       filter: (s) => (s.structureType == STRUCTURE_TOWER)
            })
            var TowerLow = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                    && s.energy < s.energyCapacity
            })

            if (TowerLow) {
                console.log('You have  ' + TowerCount.length + 'towers and '+  TowerLow.length  + ' of them need energy');
                var task = (creep.transfer(TowerLow, RESOURCE_ENERGY));
                if(task == ERR_NOT_IN_RANGE) {
                    creep.moveTo(TowerLow)
                } else if (task == ERR_FULL)  {
                        console.log('cannot transfer, resource full.');
                    } else {
                    console.log(task);
                    var creepjuiceafter = creep.carry.energy;
                    var totalTransfer = creepjuicebefore - creepjuiceafter;
                    console.log(creep.name + ' transferred '+ totalTransfer + ' units of energy.');
                }
              } else {
                  console.log('There are no towers that need energy.');
              }
            }
         }
};

module.exports = roleTender;
