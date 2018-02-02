var roleTender = {

    run: function(creep) {


      if(creep.memory.seeking) {
          console.log(creep.pos);
          console.log(creep.pos.roomName)
          if (creep.pos.roomName != 'E19N37') {
              creep.memory.seeking = true;
              creep.say('seeking...');

              ///creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo('E19N37)));
              //creep.moveTo(new RoomPosition(34,10,'E19N37'));
              //creep.moveTo(new RoomPosition(creep.memory.destx, creep.memory.desty, creep.memory.destroom));
          } else {
            creep.memory.seeking = false;
            creep.memory.upgrading = true;
            console.log('you made it!')
            var posInAnotherRoom = new RoomPosition(34, 10, 'E19N37');
            creep.moveTo(posInAnotherRoom);
            var preferredStation = creep.memory.preferredStation;
            Creep.memory.preferredSource = '5982ff24b097071b4adc227b';
            Creep.memory.preferredTarget = '5a67717e1dfdb80e93c5d633';            };
      } else {
            if(creep.memory.working == 'dumping' && creep.carry.energy == 0) {
                creep.memory.working = 'loading';
                creep.say(creep.memory.working);
            } else if (creep.memory.working == 'loading' && creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = 'dumping';
                creep.say(creep.memory.working);
                var creepjuicebefore  = creep.carry.energy;
                console.log('at capacity -' + creepjuicebefore +'...');
            }

            if(creep.memory.working == 'loading') {
                // go to container and get energy
                var preferredSource = creep.memory.preferredSource;
                var activesource = '5982ff24b097071b4adc227b';
                console.log('logout ' + preferredSource);
            if (preferredSource) {
                activesource = Game.getObjectById(preferredSource);
                console.log('tender ' + creep.name + ' -setting prefsource to ' + activesource)
            } else {
                    // go to source and get energy
                activesource = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                       filter: (s) => s.structureType == STRUCTURE_CONTAINER
                                   && s.store[RESOURCE_ENERGY] > 0
               })
            };

            if (activesource.structureType == 'storage') {
               task = creep.withdraw(activesource, RESOURCE_ENERGY);
            } else {
                task = creep.harvest(activesource);
            }

            if(task == ERR_NOT_IN_RANGE) {
                creep.moveTo(activesource);
                console.log('tender - moving to source.')
            } else if (task == -6) {
                console.log('tender - no juice, dude.')
                // create code for backup source
            } else {

                console.log('tower tender ' + creep.name + task );
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
    }

};

module.exports = roleTender;
