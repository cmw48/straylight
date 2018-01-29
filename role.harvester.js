var roleHarvester = {



    run: function(creep) {
       if (creep.name == 'Harv5589741' || creep.name == 'Harv5589819' ) {
          var posInAnotherRoom = new RoomPosition(34, 10, 'E19N37');
          creep.moveTo(posInAnotherRoom);
          creep.memory.preferredSource = '5982ff24b097071b4adc227b'
        }  else {

        // get all the other harvester creep ids
        //if (!preferredTarget) {
            // this creep needs a preferred target
            // index all targets
            // index all creeps
            // are there any targets that don't have at least one creep
        //}


        // if you are dumping and get to zero, go load up
        if(creep.memory.working == 'dumping' && creep.carry.energy == 0) {
            creep.memory.working = 'loading';
            creep.say(creep.memory.working);
        }
        // if you are loading and you are full up, go dump
        else if (creep.memory.working == 'loading' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = 'dumping';
            creep.say(creep.memory.working);
            console.log(creep.name + ' at capacity...');
        }

        //  if you are loading
        if(creep.memory.working == 'loading') {
            //console.log(creep.name + ' is trying to load...')
            var preferredSource = creep.memory.preferredSource;
            if (preferredSource) {
                activesource = Game.getObjectById(creep.memory.preferredSource);
            //console.log('preferred source is ...' + activesource)
            } else {
                // go to source and get energy
                var sources = creep.room.find(FIND_SOURCES);
                var activesource = sources[0]
            }

            if(creep.harvest(activesource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(activesource);
                //console.log(creep.name + 'just moved')
            } else if (creep.harvest(activesource) == -6) {
                // error checking
                console.log('activesource is dry - dump what we got..')
                creep.memory.working = 'dumping';
                creep.say(creep.memory.working);
            console.log(creep.name + ' dumping a short load...');
            } else {
                console.log('uncaught harvester error' + creep.harvest(activesource));
            }
            //console.log(creep.name + ' not moving');
        } else {
            // you're not loading, so you must be dumping
            var containers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });

            var roomStorage = Game.spawns['Straylight'].room.storage;


            var energyContainers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
             filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 0
            });
            var energyContainersThatNeedEnergy = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
             filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < 2000
            });
            console.log('there are ' + energyContainers.length + ' containers, and ' + energyContainersThatNeedEnergy.length + ' of them are not full.');


            for(var id in energyContainersThatNeedEnergy) {
                var thisContainer = energyContainersThatNeedEnergy[id];
                //console.log('container at ' + thisContainer.pos + ' ' + thisContainer.store[RESOURCE_ENERGY]);
            };    // does this container need energy?

            //var preferredTarget = creep.memory.preferredTarget;
            preferredTarget = '5a5a55a22c05cc5a80465460'
            if (preferredTarget) {

                Container = Game.getObjectById(creep.memory.preferredTarget);
        /**
                if (Container.energy == Container.energyCapacity) {

                    var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => {
                            return (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TOWER) &&
                                s.energy < s.energyCapacity;
                        }
                });
                }
        **/
            } else {
                console.log('no pref target for harvester')

                    var Container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => {
                            return (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_TOWER) &&
                                s.energy < s.energyCapacity;
                        }
            });

            }
            if(creep.transfer(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } else {
                console.log('Harv error' + (creep.transfer(Container, RESOURCE_ENERGY)))
                //console.log('transfer successful.');
            };
        }

        }
    }
};

module.exports = roleHarvester;


/**
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
            // go to container and dump energy
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
                    console.log(creep.name + 'transferred '+ totalTransfer + ' units of energy.');
                }
              } else {
                  console.log('There are no towers that need energy.');
              }
            }
    }
};

module.exports = roleHarvester;


        if(creep.memory.working == 'dumping' && creep.carry.energy == 0) {
            creep.memory.working = 'loading';
            creep.say(creep.memory.working);
        }
        else if (creep.memory.working == 'loading' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = 'dumping';
            creep.say(creep.memory.working);
            console.log(creep.name + ' at capacity...');
        }

        if(creep.memory.working == 'loading') {
            // go to source and get energy
            }
        } else {
            var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
        })

            var creepjuicebefore  = creep.carry.energy;
            if(creep.transfer(EnergyStructures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EnergyStructures)
            } else {
                var creepjuiceafter = creep.carry.energy;
                var totalTransfer = creepjuicebefore - creepjuiceafter;
                console.log('transferred '+ totalTransfer + ' units of energy.');
            }
        }

            }
};



---        if(creep.memory.working == 'dumping' && creep.carry.energy == 0) {
            creep.memory.working = 'loading';
            creep.say(creep.memory.working);
        }
        else if (creep.memory.working == 'loading' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = 'dumping';
            creep.say(creep.memory.working);
            console.log('at capacity...');
        }

        if(creep.memory.working == 'loading') {
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
            var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
        })
-----
            var tower = Game.getObjectById('5a5063e77eb2135e2c99df24');
            var EnergyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_TOWER)
                                && s.energy < s.energyCapacity
        })
----
            var creepjuicebefore  = creep.carry.energy;
            if(creep.transfer(EnergyStructures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(EnergyStructures)
            } else {
                var creepjuiceafter = creep.carry.energy;
                var totalTransfer = creepjuicebefore - creepjuiceafter;
                console.log('transferred '+ totalTransfer + ' units of energy.');
            }
        }

            }
};


	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }

        } else {
            var containers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
                filter: { structureType: STRUCTURE_CONTAINER }
            });


            var energyContainers = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
             filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
            });
            var energyContainersThatNeedEnergy = energyContainers {
                filter: (g) => g.store[RESOURCE_ENERGY] < 2000
            });
            console.log('there are ' + energyContainers.length + ', and ' + energyContainersThatNeedEnergy.length + ' of them are not full.');
            for(var id in energyContainersThanNeedEnergy) {
                var thisContainer = energyContainersThanNeedEnergy[id];
                console.log('yarp' + thisContainer.pos + ' ' + thisContainer.store[RESOURCE_ENERGY]);
                // does this container need energy?

            if(creep.transfer(Container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Container)
            } else {
                console.log('transfer successful.');



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

---

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
