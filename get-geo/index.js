import axios from 'axios';

class GeoInfo {
  constructor(ip = '') {
    this.ip = ip;
  }

  async getLocationByIP() {
    try {
      const response = await axios.get(`http://ip-api.com/json/${this.ip}`);
      return await response.data;
    } catch (e) {
      throw new Error('Unable to get ip info, please try again');
    }
  }
}

export default GeoInfo;
