var pathLayer = {
  layPath: function (source, target) {
    var path = source.pos.findPathTo(target.pos);
    for (var i = 0; i < path.length; i++) {
      var x = path[i].x;
      var y = path[i].y;
      source.room.createConstructionSite(x, y, STRUCTURE_ROAD);
    }
  },
};

module.exports = pathLayer;
