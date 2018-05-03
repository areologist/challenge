import csv from 'csvtojson';
import tokenize from '../lib/tokenize';
import addr from '../store/addr';

/**
 * Loads and indexes `addresses` CSV file
 * @param {level} db The level instance
 * @param {string} filepath Location of `addresses.csv`
 */
export default async (db, filepath) =>
  new Promise((resolve, reject) => {
    csv()
      .fromFile(filepath)
      .on('json', async (jsonObj) => {
        const tokens = tokenize(jsonObj.Address);
        const id = tokens.join('-');
        await addr.index(db, id, tokens);
        await addr.put(db, id, jsonObj.Address);
      })
      .on('done', (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
  });
