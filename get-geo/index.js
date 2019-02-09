import axios from 'axios';
import Utils from '../utils';

const makeRequest = url => axios.get(url);
class GeoInfo {
  constructor(sourceOfInfo = makeRequest) {
    this.sourceOfInfo = sourceOfInfo;
  }

  /* eslint-disable class-methods-use-this */
  async getLocationByIP(ip = '') {
    if (ip && !ip.match(Utils.ipRegex)) {
      throw new Error('Argument should be a valid IP');
    }
    const response = await this.sourceOfInfo(`${Utils.geoServiceURL}${ip}`);
    return response.data;
  }
}

export default GeoInfo;
