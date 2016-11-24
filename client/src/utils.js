var nudged = require('nudged');
var taaspace = require('taaspace');

exports.itemToSpaceTransform = function (item, space) {
  // Return
  //   a taaspace.SpaceTransform
  var rawTransform = nudged.createFromArray(item.transform);
  return new taaspace.SpaceTransform(space, rawTransform);
};
