
var socket = io.connect('/');


socket.on('created', function (data) {
  console.log('created', data);
});

socket.on('updated', function (data) {
  console.log('updated', data);
});

socket.on('deleted', function (data) {
  console.log('deleted', data);
});


(function tick() {
  socket.emit('create', { id: 'hello', msg: 'hello' });
  setTimeout(tick, 1000);
}());
