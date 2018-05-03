import { createClient } from '@google/maps';
import config from '../config';
import limiter from './limiter';
import log from './logger';

const limit = limiter(40, 1000);

export default async function geocoder(address) {
  const googleMapsClient = createClient({
    key: config.geocode.apiToken,
    Promise,
  });

  try {
    await limit();
    const response = await googleMapsClient.geocode({ address }).asPromise();
    return [null, response.json.results];
  } catch (err) {
    log.error(err);
    return [err, null];
  }
}
