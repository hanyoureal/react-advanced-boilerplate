const http = require('http');
const app = require('./server');

const PORT = process.env.MOCK_API_PORT || 3014;
const IP = 'localhost';
const server = http.createServer(app);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started, listening at: http://${IP}:${PORT}`);
});
