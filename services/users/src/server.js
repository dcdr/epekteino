const app = require('./app');
const debug = require('debug')('server:server');
const http = require('http');
const mongoose = require('mongoose');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') { throw error; }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${port}` : `Port ${port}`;
  debug(`Listening on ${bind}`);
}

//Bind connection to error event (to get notification of connection errors)
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});
