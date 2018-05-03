import head from 'lodash/head';
import intersection from 'lodash/intersection';
import takeRight from 'lodash/takeRight';
import tokenize from '../lib/tokenize';

const parseId = key => head(takeRight(key.split('!')));

const put = async (db, id, data) => db.put(`addr!${id}`, data);
const get = async (db, id) => db.get(`addr!${id}`);

const index = async (db, id, tokens) => {
  const value = 0;
  const ops = tokens
    .map(token => `index!${token}!${id}`)
    .map(key => ({ type: 'put', key, value }));
  await db.batch(ops);
};

const match = async (db, token) => {
  const results = [];
  return new Promise((resolve, reject) => {
    db.createKeyStream({ gte: `index!${token}`, lte: `index!${token}~` })
      .on('data', key => results.push(parseId(key)))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

const query = async (db, q) => {
  const tokens = tokenize(q);
  const queries = tokens.map(token => match(db, token));
  const result = await Promise.all(queries);
  return intersection(...result);
};

export default {
  get,
  put,
  index,
  query,
};
