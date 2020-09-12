import io from 'socket.io-client';
const socket = io('http://ec2-100-26-254-177.compute-1.amazonaws.com:3000');

module.exports = {
  socket,
};
