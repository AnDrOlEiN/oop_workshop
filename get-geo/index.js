const axios = require('axios');

class GeoInfo {
  constructor(ip = '') {
    this.ip = ip;
  }

  async locate() {
    try {
      const response = await axios.get(`http://ip-api.com/json/${this.ip}`);
      return await response.data;
    } catch (e) {
      return 'Unable to get ip info, please try again';
    }
  }
}

module.exports = GeoInfo;
