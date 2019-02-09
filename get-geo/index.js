import axios from 'axios';
import Utils from '../utils';

const ipAPI = ip => axios.get(`http://ip-api.com/json/${ip}`);
class GeoInfo {
  constructor(sourceOfInfo = ipAPI) {
    this.sourceOfInfo = sourceOfInfo;
  }

  /* eslint-disable class-methods-use-this */
  async getLocationByIP(ip = '') {
    if (!ip || ip.match(Utils.ipRegex)) {
      const response = await this.sourceOfInfo(ip);
      return response.data;
    }
    throw new Error('Argument should be a valid IP');
  }
}

export default GeoInfo;
