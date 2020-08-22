import io from 'socket.io-client';
const socket = io('https://f2b638937c4b.ngrok.io');

module.exports = {
  socket,
};
