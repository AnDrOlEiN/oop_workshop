import axios from 'axios';

const defaultHTTPClient = (url, options) => axios.get(url, options);

class Service {
  constructor(httpClient = defaultHTTPClient, apiKey) {
    this.apiKey = apiKey;
    this.httpClient = httpClient;
  }
}

export class GeocodingService extends Service {
  constructor(httpClient = defaultHTTPClient, apiKey) {
    super(httpClient, apiKey);
  }

  locate = city => this.httpClient('https://eu1.locationiq.com/v1/search.php', {
    params: {
      key: this.apiKey,
      q: city,
      format: 'json',
    },
  });
}
const defaultGeocodingService = new GeocodingService();

class WeatherService extends Service {
  constructor(httpClient = defaultHTTPClient, apiKey, locator = defaultGeocodingService) {
    super(httpClient, apiKey);
    this.locator = locator;
  }

  async getCityCoordinates(city) {
    const result = await this.locator(city);
    const parsedResult = result.data[0];
    return parsedResult;
  }
}

export class DarkSkyService extends WeatherService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService, apiKey) {
    super(httpClient, apiKey, locator);
    this.url = 'https://api.darksky.net/forecast/';
  }

  async getWeather(city) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const finalURL = `${this.url}${this.apiKey}/${lat},${lon}`;
    const result = await this.httpClient(finalURL);
    return result.data;
  }
}

export class OWMService extends WeatherService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService, apiKey) {
    super(httpClient, apiKey, locator);
    this.url = 'http://api.openweathermap.org/data/2.5/weather';
  }

  async getWeather(city) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const finalURL = `${this.url}?lat=${lat}&lon=${lon}&APPID=${this.apiKey}`;
    const result = await this.httpClient(finalURL);
    return result.data;
  }
}

export default class WeatherCollector {
  constructor(service) {
    this.service = service;
  }

  async collectWeather(city) {
    const finalResult = await this.service.getWeather(city);
    if (!finalResult) {
      throw Error('There is no such city');
    }
    return finalResult;
  }
}
