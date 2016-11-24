
// Connection
var io = require('socket.io-client');
var socket = io.connect('/');

// User interface
var taaspace = require('taaspace');
var taach = require('taach');

// Helpers
var shortid = require('shortid');
var _ = require('lodash');
var utils = require('./utils');

// Init UI
var space = new taaspace.Space();
var viewElement = document.getElementById('space');
var view = new taaspace.HTMLSpaceView(space, viewElement);

socket.emit('read', {}, function (items) {
  // Initialization. Items will we our local database.

  var spaceItems = {};

  var showItem = function (item) {
    var taa = new taaspace.Taa(item.url);
    var staa = new taaspace.SpaceTaa(space, taa);
    spaceItems[item.id] = staa;

    staa.setGlobalTransform(utils.itemToSpaceTransform(item, space));
  };

  var updateItem = function (item) {
    var si = spaceItems[item.id];
    si.setGlobalTransform(utils.itemToSpaceTransform(item, space));
  };

  var hideItem = function (item) {
    var si = spaceItems[item.id];
    si.remove();
  };

  _.each(items, showItem);

  socket.on('created', function (item) {
    console.log('created', item);
    if (!items.hasOwnProperty(item.id)) {
      items[item.id] = item;
      showItem(item);
    }
  });

  socket.on('updated', function (item) {
    console.log('updated', item);
    if (items.hasOwnProperty(item.id)) {
      updateItem(item);
    }
  });

  socket.on('deleted', function (data) {
    console.log('deleted', data);
    if (items.hasOwnProperty(item.id)) {
      delete items[item.id];
      hideItem(item);
    }
  });
});
