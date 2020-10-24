// {🛠 Builder}
var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {
    var creepCarry = creep.store.getUsedCapacity(RESOURCE_ENERGY);
    var creepCarryCap = creep.store.getCapacity(RESOURCE_ENERGY);

    if (!creep.memory.working && creepCarry === 0) {
      creep.memory.working = true;
    } else if (creep.memory.working && creepCarry === creepCarryCap) {
      creep.memory.working = false;
    }

    // if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    //   creep.memory.building = false;
    // //   creep.say("🔄");
    // }
    // if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    //   creep.memory.building = true;
    // //   creep.say("🚧 build");
    // }

    if (!creep.memory.working) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
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

module.exports = roleBuilder;
