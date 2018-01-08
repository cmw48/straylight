var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSBuilder = require('role.sbuilder');
var roleMultiharvest = require('role.multiharvest');
//var roleMiner = require('role.miner');

module.exports.loop = function () {
    var activecreeps = 0;

    // if a creep has
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

    if(multiharvesters.length < 4) {
        var newName = 'Fran' + Game.time;
        console.log('Spawning new multiharvester: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'multiharvest'}});
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
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
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
            '🛠️' + spawningCreep.memory.role,
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
    if(tower) {

/**
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 5000 && structure.structureType == STRUCTURE_ROAD
        });
**/
/**
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 2500 && structure.structureType == STRUCTURE_WALL
        });

**/
/**
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 250000 && structure.structureType == STRUCTURE_CONTAINER
        });

               if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
**/
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }


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
