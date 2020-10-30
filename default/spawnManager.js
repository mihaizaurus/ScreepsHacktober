module.exports = {
  setSpawnLimits: function (room) {
    const harvs = 3;
    const upg = 4;
    const build = 1;
    const repair = 1;

    // Set the property in memory if doesn't exist ?Necessary?
    if (room.memory.spawnLimits) {
      room.memory.spawnLimits = {};
    }

    const spawnLimits = {
      harvester: harvs,
      upgrader: upg,
      builder: build,
      repairer: repair,
    };
    room.memory.spawnLimits = spawnLimits;
  },
};

StructureSpawn.prototype.spawnNextCreep = function () {
  const room = this.room;
  const energy = this.room.energyAvailable;

  const harvCount = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.role == "⛏ Harvester" && creep.memory.homeRoom === room.name
  ).length;
  const upgCount = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.role == "🙌 Upgrader" && creep.memory.homeRoom === room.name
  ).length;
  const builderCount = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.role == "🛠 Builder" && creep.memory.homeRoom === room.name
  ).length;
  const repairbotCount = _.filter(
    Game.creeps,
    (creep) =>
      creep.memory.role == "🛠 Repair Bot" && creep.memory.homeRoom === room.name
  ).length;

  //check units based on max, only if at least 300 energy
  if (energy >= 300) {
    if (harvCount < room.memory.spawnLimits["harvester"]) {
      this.spawnWorker("⛏ Harvester", "Harvey");
    } else if (upgCount < room.memory.spawnLimits["upgrader"]) {
      this.spawnWorker("🙌 Upgrader", "Gerald");
    } else if (builderCount < room.memory.spawnLimits["builder"]) {
      this.spawnWorker("🛠 Builder", "Billy");
    } else if (repairbotCount < room.memory.spawnLimits["builder"]) {
      this.spawnWorker("🛠 Repair Bot", "Reginald");
    }
  }
};

StructureSpawn.prototype.spawnWorker = function (role, nameGrp) {
  const energyCap = this.room.energyCapacityAvailable;
  const energy = this.room.energyAvailable;

  const body = [];
  const creepMemory = {
    role: role,
    working: false,
    homeRoom: this.room.name,
  };

  // Body definition
  /* Costs {WORK: 100, CARRY: 50, MOVE:50}*/
  /* Target is 35% W, n+1:n C:W, M = C+W */
  var work = Math.floor((energy * 0.35) / 100);
  var carry = work;
  var move = carry + work;
  const baseCost = work * 100 + carry * 50 + move * 50;
  var nowCost = baseCost;
  var cost = energy - baseCost;

  while (cost >= 50 && nowCost <= energy) {
    if (energy - nowCost >= 200) {
      work++;
      move++;
      carry++;
    } else if (energy - nowCost >= 100) {
      move++;
      carry++;
    } else if (energy - nowCost >= 50) {
      carry++;
    }
    nowCost = work * 100 + carry * 50 + move * 50;
    cost = energy - nowCost;
  }

  for (let i = 0; i < work; i++) {
    body.push(WORK);
  }

  for (let i = 0; i < carry; i++) {
    body.push(CARRY);
  }

  for (let i = 0; i < move; i++) {
    body.push(MOVE);
  }

  const name = nameGrp + "_[" + nowCost + "]_" + Game.time;

  this.spawnCreep(body, name, { memory: creepMemory });
};

// add function to spawn ...
// add function to spawn ...
