const roles = {
  harvester: { name: "⛏ Harvester", source: require("role.harvester") },
  upgrader: { name: "🙌 Upgrader", source: require("role.upgrader") },
  builder: { name: "🛠 Builder", source: require("role.builder") },
};

const SpawnManager = require("spawnManager");

module.exports.loop = function () {
  var primarySpawn = Game.spawns["CreepQueen"];
  var roomEnergy = primarySpawn.room.energyAvailable;
  // Set Spawn Limits
  for (const key in Game.rooms) {
    const room = Game.rooms[key];
    if (!room.controller || !room.controller.my) {
      continue;
    }
    SpawnManager.setSpawnLimits(room);
  }

  for (var name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  // Run creep roles based on role name
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    var role = _.findKey(roles, function (r) {
      return r.name === creep.memory.role;
    });
    roles[role].source.run(creep);
  }

  for (const key in Game.spawns) {
    const spawn = Game.spawns[key];
    spawn.spawnNextCreep();
  }
};
