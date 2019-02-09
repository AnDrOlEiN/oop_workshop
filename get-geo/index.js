import axios from 'axios';
import Utils from '../utils';

class GeoInfo {
  constructor(options = {}) {
    this.options = options;
  }

  /* eslint-disable class-methods-use-this */
  async getLocationByIP(ip = '') {
    if (!ip || ip.match(Utils.ipRegex)) {
      try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
      } catch (e) {
        throw new Error('Unable to get ip info, please try again');
      }
    } else {
      throw new Error('Argument should be a valid IP');
    }
  }
}

export default GeoInfo;
