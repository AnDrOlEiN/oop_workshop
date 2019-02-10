import axios from 'axios';

const defaultHTTPClient = (url, options) => axios.get(url, options);
export class GeocodingService {
  constructor(httpClient = defaultHTTPClient, apiKey) {
    this.apiKey = apiKey;
    this.httpClient = httpClient;
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

export class DarkSkyService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService.locate, apiKey) {
    this.httpClient = httpClient;
    this.locator = locator;
    this.apiKey = apiKey;
    this.url = 'https://api.darksky.net/forecast/';
  }

  async getCityCoordinates(city) {
    const result = await this.locator(city);
    const parsedResult = result.data[0];
    return parsedResult;
  }

  async getWeather(city) {
    const { lat, lon } = await this.getCityCoordinates(city);
    const finalURL = `${this.url}${this.apiKey}/${lat},${lon}`;
    const result = await this.httpClient(finalURL);
    return result.data;
  }
}

export class OWMService {
  constructor(httpClient = defaultHTTPClient, locator = defaultGeocodingService.locate, apiKey) {
    this.httpClient = httpClient;
    this.locator = locator;
    this.apiKey = apiKey;
    this.url = 'http://api.openweathermap.org/data/2.5/weather';
  }

  async getCityCoordinates(city) {
    const result = await this.locator(city);
    const parsedResult = result.data[0];
    return parsedResult;
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
