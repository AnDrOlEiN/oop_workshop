class GlobalConstants {
  static get ipRegex() {
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  }

  static get geoServiceURL() {
    return 'http://ip-api.com/json/';
  }
}

export default GlobalConstants;
