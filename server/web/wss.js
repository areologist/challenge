import { Server as SocketServer } from 'ws';
import level from 'level';
import log from '../lib/logger';
import loadCsv from '../lib/load-csv';
import LocationSearch from '../lib/location-search';

async function initDb() {
  const db = level('./db', { valueEncoding: 'json' });
  await loadCsv(db, 'addresses.csv');
  log.info('Addresses loaded and indexed');
  return db;
}

export default async (server) => {
  const db = await initDb();
  const wss = new SocketServer({ server });

  wss.on('connection', async (ws) => {
    const locationSearch = new LocationSearch(db);
    locationSearch
      .on('match', (query, results) => ws.send(JSON.stringify({
        query,
        results,
      })))
      .on('done', (query, results = []) => ws.send(JSON.stringify({
        done: true,
        query,
        results,
      })))
      .on('error', (query, error) => ws.send(JSON.stringify({
        error,
        query,
      })));

    ws.on('message', async (json) => {
      const { data: { query } } = JSON.parse(json);
      locationSearch.search(query);
    });
  });
};
