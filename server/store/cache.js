const put = async (db, id, data) => db.put(`cache!${id}`, data);
const del = async (db, id) => db.del(`cache!${id}`);
const get = async (db, id) => db.get(`cache!${id}`).catch(() => null);

const search = async (db, id) => {
  const results = [];
  return new Promise((resolve, reject) => {
    db.createKeyStream({ gte: `index!${id}`, lte: `index!${id}~` })
      .on('data', key => results.push(key))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};

const getAll = async (db, ids) => {
  const queries = ids.map(id => get(db, id));
  const result = await Promise.all(queries);
  return result.filter(item => item !== null);
};

const putAll = async (db, list) => {
  const ops = list.map(item => ({
    type: 'put',
    key: `cache!${item.id}`,
    value: item
  }));
  await db.batch(ops);
};

export default { del, get, getAll, put, putAll };
