const { Server } = require('socket.io');

class WebSocketService {
  constructor(server) {
    this.io = new Server(server);
    this.setupListeners();
  }

  setupListeners() {
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join-poll', (pollId) => {
        socket.join(`poll-${pollId}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  broadcastPollUpdate(pollId, results) {
    console.log(`For Poll Id ${pollId} new vote is registered now updated poll result is ${JSON.stringify(results)}`);
    this.io.to(`poll-${pollId}`).emit('poll-update', results);
  }

  broadcastLeaderboard(leaderboard) {
    console.log(`Leaderboard updated new one is ${JSON.stringify(leaderboard)}`);
    this.io.emit('leaderboard-update', leaderboard);
  }
}

module.exports = WebSocketService;