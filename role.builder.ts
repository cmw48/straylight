var roleBuilder = {
 /** @param {Creep} creep **/
 run: function(creep) {
     if(creep.memory.building && creep.carry.energy == 0) {
         creep.memory.building = false;
         creep.say('🔄 harvest');
     }
     if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
         creep.memory.building = true;
         creep.say('🚧 build');
     }
     if(creep.memory.building) {

spawn1
All
.*Aa\b
BRANCH: default
MODULES
main
role.builder
role.harvester
role.upgrader

New module name...

Open local folder
