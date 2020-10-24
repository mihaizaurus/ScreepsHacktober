// {⛏ Harvester}
// var pathLayer = require("pathlayer");

var roleHarvester = {
  run: function (creep) {
    var creepCarry = creep.store.getUsedCapacity(RESOURCE_ENERGY);
    var creepCarryCap = creep.store.getCapacity(RESOURCE_ENERGY);

    if (!creep.memory.working && creepCarry === 0) {
      creep.memory.working = true;
    } else if (creep.memory.working && creepCarry === creepCarryCap) {
      creep.memory.working = false;
    }

    if (creep.memory.working) {
      var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
        creep.say("⛏");
      }
    } else if (!creep.memory.working) {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: { stroke: "green" },
          });
          creep.say("🛒");
        }
      }
    }
  },
};

module.exports = roleHarvester;
