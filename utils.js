class Utils {
  static get ipRegex() {
    return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  }

  static get geoServiceURL() {
    return 'http://ip-api.com/json/';
  }

  static get geocodingServiceURL() {
    return 'https://eu1.locationiq.com/v1/search.php';
  }

  static get geocodingServiceToken() {
    return '0422a0f4f4894b';
  }

  static get darkSkyURL() {
    return 'https://api.darksky.net/forecast/';
  }

  static get darkSkyKey() {
    return 'bf0d17f8d73b922bd72b99b74eb6026e';
  }

  static get OWMURL() {
    return 'http://api.openweathermap.org/data/2.5/weather';
  }

  static get OWMKey() {
    return 'b7c24174b67641f90fc56df22bd01dab';
  }
}

export default Utils;
