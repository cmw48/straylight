var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleSBuilder = require('role.sbuilder');
var roleMultiharvest = require('role.multiharvest');

var roleClaimer = require('role.claimer');
var roleTender = require('role.tender');
//var roleMiner = require('role.miner');

var basicBody = [WORK,CARRY,MOVE];



module.exports.loop = function () {

//    var roadlocations = [];
        //var roadlocations = [[14,30], [13,31], [12,32], [11,33], [10,32], [9,31], [8,31], [7,30], [6,29], [6,28], [6,27], [6,26], [7,25], [8,24], [9,23], [10,22], [10,21], [10,20], [11,19], [12,18], [13,17], [14,16], [14,15], [14,14], [14,13], [15,12], [16,11], [17,10], [18,9], [19,9], [20,10], [21,11], [22,11], [22,12], [22,13], [23,13], [24,13], [25,13], [26,13], [27,13], [26,12], [26,11], [26,10], [26,9], [27,9], [28,9], [29,9]];
     //var roadlocations = [[15,29], [16,30], [17,31], [18,32], [19,33], [20,33], [21,33], [22,33], [22,34], [22,35], [22,36], [22,37], [22,38], [22,39], [22,40], [22,41], [22,42], [22,43], [22,44], [23,44], [24,44], [25,44], [26,44], [27,44], [28,44], [29,44], [30,44], [31,44], [32,44], [33,44], [34,44], [35,45], [36,46], [37,47], [38,48], [37,49]];
        //var roadlocations = [[10,20],[12,34], [13,35], [12,35], [11,36], [10,37], [9,38], [8,37],[8,38], [7,38], [8,39], [7,39], [6,39], [5,39], [4,39], [3,39], [2,38], [2, 40], [2,42], [3,40], [3,42],[4, 40], [5,40], [6,40], [7,40], [7,42], [8,40], [9, 41], [8,41], [7,41], [6,41], [5,41], [3,41], [2,41], [2,43], [2,44], [3,44], [4,43], [5,43], [6,43], [7,43], [8,43], [8,36], [7,35], [6,34], [6,33], [6,32], [6,30], [6,31], [5,32], [4,32], [3,32], [7,34], [7,35], [8,36], [7,33], [7,32], [7,31]];
         //console.log('duh ' + roadlocations.length);
         //for (var roadloc in roadlocations)  {
             //Game.spawns['Straylight'].room.createConstructionSite( (roadlocations[roadloc][0]), (roadlocations[roadloc][1]), STRUCTURE_ROAD);
             //Game.spawns['Straylight'].room.constructionSite.pos( (roadlocations[roadloc][0]), (roadlocations[roadloc][1]), STRUCTURE_ROAD).remove;
             //console.log(roadlocations[roadloc][0] + ', ' + roadlocations[roadloc][1]);
             //};






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
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester', working: 'loading'}});
    }


    var multiharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'multiharvest');
    //console.log('Multiharvesters: ' + multiharvesters.length);

    if(multiharvesters.length < 5) {
        var newName = 'Fran' + Game.time;
        console.log('Spawning new multiharvester: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,{memory: {role: 'multiharvest'}});

      //}
       // try {
       // Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE.MOVE,MOVE,MOVE,MOVE,MOVE], newName,{memory: {role: 'multiharvest'}});
      //} catch(err) {
       // console.log('Whoa! '+ err);
       // Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,{memory: {role: 'multiharvest'}});
      //}
    }

    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    //console.log('Claimers: ' + claimers.length);

    if(claimers.length < 0) {
        var newName = 'Ponce' + Game.time;
        console.log('Spawning new claimer: ' + newName);
       // try {
       // Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE.MOVE,MOVE,MOVE,MOVE,MOVE], newName,{memory: {role: 'multiharvest'}});
      //} catch(err) {
       // console.log('Whoa! '+ err);
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM], newName,{memory: {role: 'claimer', seeking: true, destx: '32', desty: '44', destroom: 'E19N35'}});
      //}
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

    if(upgraders.length < 6) {
        var newName = 'Felix' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
       Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
        //Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }


        var tenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'tender');
    //console.log('Upgraders: ' + upgraders.length);

    if(tenders.length < 2) {
        var newName = 'Fanny' + Game.time;
        console.log('Spawning new tender: ' + newName);
        //Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'tender', working: 'loading'}});
    }


    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);

    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Straylight'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
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
            'herp' + spawningCreep.memory.role,
            Game.spawns['Straylight'].pos.x + 1,
            Game.spawns['Straylight'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var extensions = Game.getObjectById('EXTENSION_ID');
    if(extensions) {
        //var numChargedExtensions = extensions.energy/extensions.energyCapacity
        console.log(extensions);
    }

    var towers = Game.rooms['E19N38'].find(FIND_STRUCTURES, {
       filter: (s) => (s.structureType == STRUCTURE_TOWER)
    });

    for (var tower in towers)  {

       var closestHostile = towers[tower].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
           if (closestHostile) {
                towers[tower].attack(closestHostile);
                //tower.attack(hostiles[0]);
                //tower.attack(getObjectById['5a5981f8caaf9622dd9f8eea']);
       }

        var closestDamagedContainer = towers[tower].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 250000 && structure.structureType == STRUCTURE_CONTAINER
        });

        if(closestDamagedContainer) {
            //console.log(closestDamagedContainer.id);
            towers[tower].repair(closestDamagedContainer);
        };

        var closestDamagedRampart = towers[tower].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 275000 && structure.structureType == STRUCTURE_RAMPART
        });

        if(closestDamagedRampart) {
            //console.log(closestDamagedRampart.id);
            towers[tower].repair(closestDamagedRampart);
        };
       if (!Game.spawns['Straylight'].memory.wartime) {

          if (Game.spawns['Straylight'].memory.repairRoads)  {

            var closestDamagedRoad = towers[tower].pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: (structure) => structure.hits < 5000 && structure.structureType == STRUCTURE_ROAD
            });
            if (closestDamagedRoad) {
                towers[tower].repair(closestDamagedRoad);
            }
          }


        var closestDamagedWall = towers[tower].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < 6000 && structure.structureType == STRUCTURE_WALL
        });

        if(closestDamagedWall) {
            //console.log(closestDamagedRampart.id);
            towers[tower].repair(closestDamagedWall);
        };

     }

   };

// inventory routines
  var towers = Game.rooms['E19N38'].find(FIND_STRUCTURES, {
       filter: (s) => (s.structureType == STRUCTURE_TOWER)
    });

  var extensionsBuilt = Game.spawns['Straylight'].room.find(FIND_STRUCTURES, {
       filter: (s) => (s.structureType == STRUCTURE_EXTENSION)
  });
  var extCount = 0;
  for (ext in extensionsBuilt) {
     if (extensionsBuilt[ext].energyCapacity - extensionsBuilt[ext].energy  == 0) {
         extCount += 1;

     }
  }

  console.log('You have ' + extensionsBuilt.length + ' extensions built, and ' + extCount + ' of them are fully charged.');
  //if ((extensionsBuilt.length-extCount = 0) && )
    //var rolearray = [];
    for(var name in Game.creeps) {

        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'tender') {
            roleTender.run(creep);
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
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        activecreeps += 1;
        //rolearray.push = creep.memory.role;
    }
    console.log('Tick ' + Game.time + ': ' + activecreeps + ' creeps alive - H'+ (multiharvesters.length + harvesters.length) + ' B' + (builders.length + southbuilders.length) + ' C' + claimers.length + ' T' + tenders.length + ' U' + upgraders.length);
    //console.log(rolearray);
};
