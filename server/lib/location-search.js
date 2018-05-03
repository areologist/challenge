import { EventEmitter } from 'events';
import difference from 'lodash/difference';
import flatten from 'lodash/flatten';

import geocode from './geocode';
import log from './logger';
import addr from '../store/addr';
import cache from '../store/cache';

export default class LocationSearch extends EventEmitter {
  constructor(db) {
    super();
    this.db = db;
  }

  async search(query) {
    try {
      let ids = await addr.query(this.db, query);
      const cached = await cache.getAll(this.db, ids);
      this.emit('match', query, cached);
  
      ids = difference(ids, cached.map(x => x.id));
      if (ids.length === 0) {
        return this.emit('done', query, []);
      }
  
      const geocoded = await this.geocodeAll(ids);
      this.emit('match', query, geocoded);
      await cache.putAll(this.db, geocoded);
      this.emit('done', query, []);
    }
    catch (error) {
      this.emit('error', query, error);
    }
  }

  async geocodeAll(ids) {
    const all = await Promise.all(ids.map(async (id) => {
      const address = await addr.get(this.db, id);

      log.info(`querying geocoding service, "${address}"`);
      const [error, raw] = await geocode(address);
      if (error) {
        this.emit('error', null, error);
      }

      return raw
        .map(mapGeocode)
        .map(geo => ({ ...geo, address, id }))
        .filter(geo => geo.type === 'ROOFTOP');
    }));
    return flatten(all);
  }
}

const mapGeocode = res => ({
  formatted: res.formatted_address,
  placeId: res.place_id,
  type: res.geometry.location_type,
  ...res.geometry.location,
});
