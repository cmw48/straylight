var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSBuilder = require('role.sbuilder');
var roleMultiharvest = require('role.multiharvest');

var role
//var roleMiner = require('role.miner');

module.exports.loop = function () {
    var activecreeps = 0;

    // if a creep has expired, remove its memory entries
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 1) {
        var newName = 'Harv' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }


    var multiharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'multiharvest');
    //console.log('Multiharvesters: ' + multiharvesters.length);

    if(multiharvesters.length < 6) {
        var newName = 'Fran' + Game.time;
        console.log('Spawning new multiharvester: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE.MOVE,MOVE,MOVE,MOVE,MOVE], newName,{memory: {role: 'multiharvest'}});
        //Game.spawns['Straylight'].spawnCreep([WORK,CARRY,MOVE], newName,

    }

    /**
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    console.log('Miner: ' + miners.length);

    if(miners.length < 0) {
        var newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Straylight'].spawnCreep([MOVE,WORK,CARRY,WORK,CARRY,WORK,CARRY], newName,
            {memory: {role: 'miner'}});
    }
    **/

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);

    if(upgraders.length < 4) {
        var newName = 'Felix' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        //Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
        Game.spawns['Straylight'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);

    if(builders.length < 0) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK, WORK, WORK, WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    var southbuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'sbuilder');
    //console.log('Builders: ' + southbuilders.length);

    if(southbuilders.length < 0) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK, WORK, WORK, WORK,CARRY,MOVE], newName,
            {memory: {role: 'sbuilder'}});
    }

    if(Game.spawns['Straylight'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Straylight'].spawning.name];
        Game.spawns['Straylight'].room.visual.text(
            'ð ï¸' + spawningCreep.memory.role,
            Game.spawns['Straylight'].pos.x + 1,
            Game.spawns['Straylight'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var extensions = Game.getObjectById('EXTENSION_ID');
    if(extensions) {
        //var numChargedExtensions = extensions.energy/extensions.energyCapacity
        console.log(extensions);
    }


    var tower = Game.getObjectById('5a5063e77eb2135e2c99df24');
    if (tower) {

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    };


        var repairRoads = true;
        if (repairRoads == true) {

            var closestDamagedRoad = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < 5000 && structure.structureType == STRUCTURE_ROAD
            });
            if (closestDamagedRoad) {
                tower.repair(closestDamagedRoad);
            }
        }

/**
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 2500 && structure.structureType == STRUCTURE_WALL
        });

**/
        var closestDamagedContainer = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 250000 && structure.structureType == STRUCTURE_CONTAINER
        });

        if(closestDamagedContainer) {
            //console.log(closestDamagedContainer.id);
            tower.repair(closestDamagedContainer);
        };


/**
    var roadlocations = [[15,29], [16,30], [17,31], [18,32], [19,33], [20,33], [21,33], [22,33], [22,34], [22,35], [22,36], [22,37], [22,38], [22,39], [22,40], [22,41], [22,42], [22,43], [22,44], [23,44], [24,44], [25,44], [26,44], [27,44], [28,44], [29,44], [30,44], [31,44], [32,44], [33,44], [34,44], [35,44], [36,46], [37,47], [37,48], [37,49]];
    console.log('duh ' + roadlocations.length);
    for (var roadloc in roadlocations)  {
        console.log(roadloc[0] + ', ' + roadloc[1]);
        };

**/

    for(var name in Game.creeps) {

        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'multiharvest') {
            roleMultiharvest.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'sbuilder') {
            roleSBuilder.run(creep);
        }
        activecreeps += 1;
    }
    console.log('Tick ' + Game.time + ': ' + activecreeps + ' creeps alive - H'+ multiharvesters.length + ' B' + (builders.length + southbuilders.length) + ' U' + upgraders.length);

};
