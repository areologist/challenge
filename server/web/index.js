import express from 'express';
import { createServer } from 'http';
import webSocketServer from './wss';
import config from '../config';
import log from '../lib/logger';

const app = express();
app.use('/', express.static('dist'));

const server = createServer(app);
const { port } = config.server;

server.listen(port, () => {
  log.info(`Listening at http://localhost:${port}`);
});

webSocketServer(server);
