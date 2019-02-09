import axios from 'axios';
import Utils from '../utils';

const ipAPI = url => axios.get(url);
class GeoInfo {
  constructor(sourceOfInfo = ipAPI) {
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
