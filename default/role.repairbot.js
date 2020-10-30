// {🛠 Repair Bot}
var roleRepairer = {
    /** @param {Creep} creep **/
    run: function (creep) {
      var creepCarry = creep.store.getUsedCapacity(RESOURCE_ENERGY);
      var creepCarryCap = creep.store.getCapacity(RESOURCE_ENERGY);
  
      if (!creep.memory.working && creepCarry === 0) {
        creep.memory.working = true;
      } else if (creep.memory.working && creepCarry === creepCarryCap) {
        creep.memory.working = false;
      }
  
      if (!creep.memory.working) {
        var targets = creep.room.find(FIND_STRUCTURES, {
          filter: object => object.hits < (object.hitsMax/4)
         });
        if (targets.length) {
          if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: "#ffffff" },
            });
            creep.say("🚧");
          }
        }
      } else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
          creep.say("🔄");
        }
      }
    },
  };
  
  module.exports = roleRepairer;
  