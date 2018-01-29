var roleTender = {

    run: function(creep) {



       // if (creep.name == 'Builder5551884' || creep.name == 'Builder5551413') {
       // var posInAnotherRoom = new RoomPosition(34, 10, 'E19N37');
        //creep.moveTo(posInAnotherRoom);
        var preferredStation = creep.memory.preferredStation;

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
            var preferredSource = creep.memory.preferredSource;
            if (preferredSource) {
                activesource = Game.getObjectById(creep.memory.preferredSource);
            } else {
                // go to source and get energy
                var activesource = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                    && s.store[RESOURCE_ENERGY] > 0
                })
            }
            if(creep.withdraw(activesource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(activesource);
            } else if (creep.withdraw(activesource, RESOURCE_ENERGY) == -6) {
                console.log('no juice, dude.')
                // create code for backup source
            } else {

                console.log('tower tender ' + creep.name + (creep.withdraw(activesource, RESOURCE_ENERGY)) );
            }
        } else {
            // go to tower and dump energy
            var preferredTarget = creep.memory.preferredTarget;
            if (preferredTarget) {
                targetTower = Game.getObjectById(creep.memory.preferredTarget);
            } else {
                var TowerCount = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                       filter: (s) => (s.structureType == STRUCTURE_TOWER)
                })
                var targetTower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                    && s.energy < s.energyCapacity
                })
            }

            if (targetTower) {
                //console.log('You have  ' + TowerCount.length + 'towers and '+  TowerLow.length  + ' of them need energy');
                var task = (creep.transfer(targetTower, RESOURCE_ENERGY));
                if(task == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetTower)
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
                  creep.moveTo(preferredStation);
              }

        }
    }
};

module.exports = roleTender;
